import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Lazy import prisma
let prisma: any;
try {
    prisma = require('@/lib/prisma').prisma;
} catch (e) {
    console.warn('Prisma not available');
}

let bcrypt: any;
try {
    bcrypt = require('bcryptjs');
} catch (e) {
    console.warn('bcryptjs not available');
}

// PUT /api/users/[id] - Modifier un utilisateur
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        if (!prisma) {
            return NextResponse.json({
                error: 'Service indisponible'
            }, { status: 503 });
        }

        const body = await request.json();
        const { name, email, role, phone, department } = body;

        const user = await prisma.user.update({
            where: { id: params.id },
            data: {
                name,
                email,
                role,
                phone,
                department
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                department: true,
                updatedAt: true
            }
        });

        return NextResponse.json({
            success: true,
            user
        });

    } catch (error) {
        console.error('Update user error:', error);
        return NextResponse.json({
            error: 'Erreur lors de la modification'
        }, { status: 500 });
    }
}

// DELETE /api/users/[id] - Supprimer un utilisateur
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        if (!prisma) {
            return NextResponse.json({
                error: 'Service indisponible'
            }, { status: 503 });
        }

        await prisma.user.delete({
            where: { id: params.id }
        });

        return NextResponse.json({
            success: true,
            message: 'Utilisateur supprimé'
        });

    } catch (error) {
        console.error('Delete user error:', error);
        return NextResponse.json({
            error: 'Erreur lors de la suppression'
        }, { status: 500 });
    }
}
