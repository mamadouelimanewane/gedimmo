import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const { status, comments, validatedById } = data;
    
    // Fetch the visa and its phase
    const visaDetails = await prisma.pPPVisa.findUnique({
      where: { id: params.id },
      include: { phase: true }
    });

    if (!visaDetails) {
      return NextResponse.json({ error: 'Visa not found' }, { status: 404 });
    }

    // Check locking logic: A phase must be 'IN_PROGRESS', 'VALIDATED', or unlocked.
    // If it's PENDING and not unlocked, and it's not Phase 1, we must check if previous phase is validated.
    // To simplify: if the phase is PENDING and not unlocked, we shouldn't allow edits unless it's Phase 1.
    if (visaDetails.phase.phaseNumber > 1 && visaDetails.phase.status === 'PENDING' && !visaDetails.phase.isUnlocked) {
      // Check if previous phase is validated
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
    
    // Auto-validate phase if all visas are approved
    if (status === 'APPROVED') {
      const phase = await prisma.pPPPhase.findUnique({
        where: { id: visa.phaseId },
        include: { visas: true }
      });
      
      if (phase && phase.visas.every((v: any) => v.status === 'APPROVED' || v.id === visa.id)) {
        await prisma.pPPPhase.update({
          where: { id: phase.id },
          data: {
            status: 'VALIDATED',
            completedAt: new Date()
          }
        });
      } else if (phase && phase.status === 'PENDING') {
        // Mark phase as IN_PROGRESS if this is the first visa approved
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
