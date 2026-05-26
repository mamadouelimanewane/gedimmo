import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const agencies = await prisma.agency.findMany({
            orderBy: { name: 'asc' }
        });
        return NextResponse.json({ success: true, agencies });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, description } = await req.json();
        const agency = await prisma.agency.create({
            data: { name, description }
        });
        return NextResponse.json({ success: true, agency });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erreur lors de la création' }, { status: 500 });
    }
}
