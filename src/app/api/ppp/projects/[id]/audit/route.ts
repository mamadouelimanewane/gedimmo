import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Fetch visas and phases related to this project to filter audit logs
        const project = await prisma.pPPProject.findUnique({
            where: { id: params.id },
            include: {
                phases: {
                    select: { id: true, visas: { select: { id: true } } }
                }
            }
        });

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        const phaseIds = project.phases.map(p => p.id);
        const visaIds = project.phases.flatMap(p => p.visas.map(v => v.id));

        const auditLogs = await prisma.auditLog.findMany({
            where: {
                OR: [
                    { entityId: { in: visaIds }, entityType: 'PPPVisa' },
                    { entityId: { in: phaseIds }, entityType: 'PPPPhase' },
                    { entityId: params.id, entityType: 'PPPProject' }
                ]
            },
            include: {
                user: {
                    select: { name: true, customRole: { select: { name: true } }, agency: { select: { name: true } } }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ success: true, auditLogs });

    } catch (error) {
        console.error('Fetch audit logs error:', error);
        return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 });
    }
}
