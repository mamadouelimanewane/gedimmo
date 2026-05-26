import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const { status, comments, validatedById } = data;
    
    const visa = await prisma.pPPVisa.update({
      where: { id: params.id },
      data: {
        status,
        comments,
        ...(status === 'APPROVED' ? { validatedAt: new Date() } : {}),
        // validatedById can be set if user auth is fully hooked up
      }
    });
    
    // Check if all visas in the phase are approved, if so, mark phase as VALIDATED
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
      }
    }
    
    return NextResponse.json(visa);
  } catch (error) {
    console.error('Error updating visa:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
