import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
// Import standard auth if using it, or verify via simple token/permissions.

export async function GET() {
  try {
    const projects = await prisma.pPPProject.findMany({
      include: {
        phases: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching PPP projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, commune, description, developerId } = data;
    
    // Create project with its 7 phases
    const project = await prisma.pPPProject.create({
      data: {
        name,
        commune,
        description,
        developerId: developerId || null,
        status: 'INITIATED',
        progress: 0,
        phases: {
          create: [
            { phaseNumber: 1, title: 'Identification du terrain', description: 'NICAD + bornage' },
            { phaseNumber: 2, title: 'Convention PPP', description: 'commune + promoteur' },
            { phaseNumber: 3, title: 'Bail emphyteotique / deliberation', description: 'Bail ou deliberation prefet' },
            { phaseNumber: 4, title: 'Autorisation de lotir', description: 'ONAS, SENELEC, SDE' },
            { phaseNumber: 5, title: 'Mise en valeur VRD', description: 'declaration chantier' },
            { phaseNumber: 6, title: 'Ventes & actes notaries', description: 'actes' },
            { phaseNumber: 7, title: 'Titre foncier individuel', description: 'Conservation' },
          ]
        }
      },
      include: {
        phases: true
      }
    });
    
    // Now create the 8 visas for each phase
    const visaNames = [
      { name: 'ONAS', authority: 'Assainissement' },
      { name: 'SENELEC', authority: 'Electricite' },
      { name: 'SDE', authority: 'Eaux' },
      { name: 'AGEROUTE', authority: 'Routes' },
      { name: 'Protection Civile', authority: 'Securite' },
      { name: 'Urbanisme', authority: 'Urbanisme' },
      { name: 'DGID', authority: 'Domaines' },
      { name: 'Prefet', authority: 'Prefecture' }
    ];
    
    for (const phase of project.phases) {
      await prisma.pPPVisa.createMany({
        data: visaNames.map(v => ({
          phaseId: phase.id,
          name: v.name,
          authority: v.authority,
          status: 'PENDING'
        }))
      });
    }
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating PPP project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
