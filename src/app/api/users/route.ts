import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

// GET /api/users - Liste des utilisateurs
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const role = searchParams.get('role');
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');

        const where: any = {};
        if (role) where.role = role;
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    phone: true,
                    role: true,
                    avatar: true,
                    emailVerified: true,
                    createdAt: true,
                    updatedAt: true,
                    customRole: true,
                    agency: true,
                    _count: {
                        select: { properties: true, favorites: true },
                    },
                },
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip: (page - 1) * limit,
            }),
            prisma.user.count({ where }),
        ]);

        return NextResponse.json({
            success: true,
            users,
            count: users.length,
            total,
            pages: Math.ceil(total / limit),
            page,
        });
    } catch (error: any) {
        console.error('Users GET error:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des utilisateurs', details: error.message },
            { status: 500 }
        );
    }
}

// POST /api/users - Créer un utilisateur
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name, password, role, phone } = body;

        if (!email || !name) {
            return NextResponse.json(
                { success: false, error: 'Email et nom sont obligatoires' },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'Cet email est déjà utilisé' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password || 'changeme123', 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: role || 'USER',
                phone: phone || null,
            },
            select: {
                id: true, email: true, name: true, phone: true, role: true, createdAt: true,
            },
        });

        return NextResponse.json({ success: true, user }, { status: 201 });
    } catch (error: any) {
        console.error('Users POST error:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création', details: error.message },
            { status: 500 }
        );
    }
}
