import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const { isUnlocked } = data;
    
    const phase = await prisma.pPPPhase.update({
      where: { id: params.id },
      data: { isUnlocked }
    });
    
    return NextResponse.json(phase);
  } catch (error) {
    console.error('Error unlocking phase:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
