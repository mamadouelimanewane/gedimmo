import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.pPPProject.findUnique({
      where: { id: params.id },
      include: {
        developer: true,
        documents: true,
        phases: {
          orderBy: { phaseNumber: 'asc' },
          include: {
            visas: true,
            documents: true
          }
        }
      }
    });
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
