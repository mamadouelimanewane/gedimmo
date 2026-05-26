import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const { status, comments, isUnlocked } = data;

    // ---- PHASE UNLOCK (Admin action) ----
    if (typeof isUnlocked !== 'undefined') {
      const phase = await prisma.pPPPhase.update({
        where: { id: params.id },
        data: { isUnlocked }
      });
      const firstUser = await prisma.user.findFirst();
      if (firstUser) {
        await prisma.auditLog.create({
          data: {
            action: isUnlocked ? 'PHASE_UNLOCKED' : 'PHASE_LOCKED',
            entityId: phase.id,
            entityType: 'PPPPhase',
            userId: firstUser.id,
            details: { phaseOrder: phase.order, isUnlocked }
          }
        });
      }
      return NextResponse.json({ success: true, phase });
    }

    // ---- VISA STATUS UPDATE ----
    const visaDetails = await prisma.pPPVisa.findUnique({
      where: { id: params.id },
      include: { phase: true }
    });

    if (!visaDetails) {
      return NextResponse.json({ error: 'Visa not found' }, { status: 404 });
    }

    // Locking logic
    if (visaDetails.phase.phaseNumber > 1 && visaDetails.phase.status === 'PENDING' && !visaDetails.phase.isUnlocked) {
      const prevPhase = await prisma.pPPPhase.findFirst({
        where: { 
          projectId: visaDetails.phase.projectId,
          phaseNumber: visaDetails.phase.phaseNumber - 1
        }
      });
      if (prevPhase && prevPhase.status !== 'VALIDATED') {
        return NextResponse.json({ error: 'Phase is locked. Previous phase must be validated first.' }, { status: 403 });
      }
    }

    const visa = await prisma.pPPVisa.update({
      where: { id: params.id },
      data: {
        status,
        comments,
        ...(status === 'APPROVED' ? { validatedAt: new Date() } : {}),
      }
    });

    // AUDIT LOG + NOTIFICATION
    const firstUser = await prisma.user.findFirst();
    if (firstUser) {
      await prisma.auditLog.create({
        data: {
          action: `VISA_${status}`,
          entityId: visa.id,
          entityType: 'PPPVisa',
          userId: firstUser.id,
          details: { visaName: visa.name, authority: visa.authority, status }
        }
      });
      await prisma.notification.create({
        data: {
          message: `Visa "${visa.name}" → ${status === 'APPROVED' ? '✅ Approuvé' : status === 'REJECTED' ? '❌ Rejeté' : 'Mis à jour'}.`,
          userId: firstUser.id,
          link: `/ppp-ged/dashboard/projects/${visaDetails.phase.projectId}`
        }
      });
    }

    // Auto-validate phase if all visas are approved
    if (status === 'APPROVED') {
      const phase = await prisma.pPPPhase.findUnique({
        where: { id: visa.phaseId },
        include: { visas: true }
      });
      
      if (phase && phase.visas.every((v: any) => v.status === 'APPROVED' || v.id === visa.id)) {
        await prisma.pPPPhase.update({
          where: { id: phase.id },
          data: { status: 'VALIDATED', completedAt: new Date() }
        });
        const firstUser2 = await prisma.user.findFirst();
        if (firstUser2) {
          await prisma.auditLog.create({
            data: {
              action: 'PHASE_VALIDATED',
              entityId: phase.id,
              entityType: 'PPPPhase',
              userId: firstUser2.id,
              details: { phaseNumber: phase.phaseNumber }
            }
          });
        }
      } else if (phase && phase.status === 'PENDING') {
        await prisma.pPPPhase.update({
          where: { id: phase.id },
          data: { status: 'IN_PROGRESS' }
        });
      }
    }
    
    return NextResponse.json(visa);
  } catch (error) {
    console.error('Error updating visa:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
