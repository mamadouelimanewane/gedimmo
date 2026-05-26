import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const roles = await prisma.customRole.findMany({
            orderBy: { name: 'asc' }
        });
        return NextResponse.json({ success: true, roles });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, description, permissions } = await req.json();
        const role = await prisma.customRole.create({
            data: { name, description, permissions }
        });
        return NextResponse.json({ success: true, role });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erreur lors de la création' }, { status: 500 });
    }
}
