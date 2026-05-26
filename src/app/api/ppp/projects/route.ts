import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.pPPProject.findMany({
      include: {
        phases: {
          orderBy: { phaseNumber: 'asc' },
          include: { visas: true }
        },
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
    
    // Create project with its 7 phases — Phase 1 is unlocked by default
    const project = await prisma.pPPProject.create({
      data: {
        name,
        commune,
        description,
        developerId: developerId || null,
        status: 'IN_PROGRESS',
        progress: 0,
        phases: {
          create: [
            { phaseNumber: 1, title: 'Identification du terrain', description: 'NICAD + bornage', isUnlocked: true, status: 'IN_PROGRESS' },
            { phaseNumber: 2, title: 'Convention PPP', description: 'Commune + promoteur' },
            { phaseNumber: 3, title: 'Bail emphytéotique / délibération', description: 'Bail ou délibération préfet' },
            { phaseNumber: 4, title: 'Autorisation de lotir', description: 'ONAS, SENELEC, SDE' },
            { phaseNumber: 5, title: 'Mise en valeur VRD', description: 'VRD + déclaration chantier' },
            { phaseNumber: 6, title: 'Ventes & actes notariés', description: 'Actes notariés' },
            { phaseNumber: 7, title: 'Titre foncier individuel', description: 'Conservation foncière' },
          ]
        }
      },
      include: {
        phases: true
      }
    });
    
    // Create the 8 visas for each phase
    const visaNames = [
      { name: 'ONAS', authority: 'Office National de l\'Assainissement' },
      { name: 'SENELEC', authority: 'Société Nationale d\'Électricité' },
      { name: 'SDE', authority: 'Société des Eaux' },
      { name: 'AGEROUTE', authority: 'Agence des Routes' },
      { name: 'Protection Civile', authority: 'Direction Protection Civile' },
      { name: 'Urbanisme', authority: 'Direction de l\'Urbanisme' },
      { name: 'DGID', authority: 'Direction Générale des Impôts et Domaines' },
      { name: 'Préfet', authority: 'Préfecture du Département' }
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
