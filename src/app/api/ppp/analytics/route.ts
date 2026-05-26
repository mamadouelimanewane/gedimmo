import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch all projects with phases and visas
    const projects = await prisma.pPPProject.findMany({
      include: {
        phases: {
          include: { visas: true }
        }
      }
    });

    // ---- BASIC STATS ----
    const totalProjects = projects.length;
    const inProgress = projects.filter(p => p.status === 'IN_PROGRESS').length;
    const completed = projects.filter(p => p.status === 'COMPLETED').length;

    let totalVisas = 0;
    let approvedVisas = 0;
    let rejectedVisas = 0;
    let pendingVisas = 0;

    // ---- PER-AUTHORITY STATS ----
    const authorityStats: Record<string, { total: number; approved: number; rejected: number; pending: number; avgDays: number; totalDays: number; countDays: number }> = {};

    // ---- OVERDUE ALERTS ----
    const overdueAlerts: any[] = [];
    const DELAY_THRESHOLD_DAYS = 15;
    const now = new Date();

    // ---- PHASE DISTRIBUTION ----
    const phaseDistribution: Record<string, { validated: number; inProgress: number; pending: number }> = {};

    for (const project of projects) {
      for (const phase of project.phases) {
        // Phase distribution
        const phaseKey = `Phase ${phase.phaseNumber}`;
        if (!phaseDistribution[phaseKey]) {
          phaseDistribution[phaseKey] = { validated: 0, inProgress: 0, pending: 0 };
        }
        if (phase.status === 'VALIDATED') phaseDistribution[phaseKey].validated++;
        else if (phase.status === 'IN_PROGRESS') phaseDistribution[phaseKey].inProgress++;
        else phaseDistribution[phaseKey].pending++;

        for (const visa of phase.visas) {
          totalVisas++;
          const authority = visa.authority || visa.name || 'Inconnu';

          if (!authorityStats[authority]) {
            authorityStats[authority] = { total: 0, approved: 0, rejected: 0, pending: 0, avgDays: 0, totalDays: 0, countDays: 0 };
          }
          authorityStats[authority].total++;

          if (visa.status === 'APPROVED') {
            approvedVisas++;
            authorityStats[authority].approved++;
            // Calculate processing time
            if (visa.validatedAt && visa.createdAt) {
              const days = Math.round((new Date(visa.validatedAt).getTime() - new Date(visa.createdAt).getTime()) / (1000 * 60 * 60 * 24));
              authorityStats[authority].totalDays += days;
              authorityStats[authority].countDays++;
            }
          } else if (visa.status === 'REJECTED') {
            rejectedVisas++;
            authorityStats[authority].rejected++;
          } else {
            pendingVisas++;
            authorityStats[authority].pending++;

            // Check overdue
            const createdDate = new Date(visa.createdAt);
            const daysPending = Math.round((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysPending >= DELAY_THRESHOLD_DAYS) {
              overdueAlerts.push({
                projectName: project.name,
                projectId: project.id,
                phaseName: phase.title,
                phaseNumber: phase.phaseNumber,
                visaName: visa.name,
                authority: visa.authority,
                daysPending,
                createdAt: visa.createdAt
              });
            }
          }
        }
      }
    }

    // Calculate averages
    for (const key of Object.keys(authorityStats)) {
      const s = authorityStats[key];
      s.avgDays = s.countDays > 0 ? Math.round(s.totalDays / s.countDays) : 0;
    }

    // ---- RECENT AUDIT LOGS ----
    const recentLogs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        user: { select: { name: true } }
      }
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalProjects,
        inProgress,
        completed,
        totalVisas,
        approvedVisas,
        rejectedVisas,
        pendingVisas,
        approvalRate: totalVisas > 0 ? Math.round((approvedVisas / totalVisas) * 100) : 0,
      },
      authorityStats,
      phaseDistribution,
      overdueAlerts: overdueAlerts.sort((a, b) => b.daysPending - a.daysPending),
      recentLogs
    });

  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to compute analytics' }, { status: 500 });
  }
}
