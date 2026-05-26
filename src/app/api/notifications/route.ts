import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        // Normally we'd get the userId from the session. For this MVP, we simulate by a query param or fetch all.
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            // For demo purposes, if no userId, return all notifications
            const notifications = await prisma.notification.findMany({
                orderBy: { createdAt: 'desc' },
                take: 50
            });
            return NextResponse.json({ success: true, notifications });
        }

        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 20
        });

        return NextResponse.json({ success: true, notifications });

    } catch (error) {
        console.error('Fetch notifications error:', error);
        return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { id } = await request.json();
        
        await prisma.notification.update({
            where: { id },
            data: { isRead: true }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
    }
}
