import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const visaId = formData.get('visaId') as string;
    const projectId = formData.get('projectId') as string;
    const phaseId = formData.get('phaseId') as string;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Upload to Cloudinary via their unsigned upload API
    const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    const cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'gedimmo_unsigned';

    if (!cloudinaryCloudName) {
      // Fallback: store locally (for demo only)
      const fileName = `${Date.now()}_${file.name}`;
      const firstUser = await prisma.user.findFirst();
      if (firstUser) {
        const gedDoc = await prisma.gEDDocument.create({
          data: {
            name: file.name,
            url: `/uploads/${fileName}`,
            fileType: file.type,
            fileSize: file.size,
            phaseId: phaseId || null,
            projectId: projectId || null,
            uploadedById: firstUser.id
          }
        });
        await prisma.auditLog.create({
          data: {
            action: 'DOCUMENT_UPLOADED',
            entityId: gedDoc.id,
            entityType: 'GEDDocument',
            userId: firstUser.id,
            details: { fileName: file.name, visaId }
          }
        });
        await prisma.notification.create({
          data: {
            message: `📎 Document "${file.name}" a été déposé.`,
            userId: firstUser.id,
            link: `/ppp-ged/dashboard/projects/${projectId}`
          }
        });
        return NextResponse.json({ success: true, document: gedDoc });
      }
      return NextResponse.json({ error: 'Configuration Cloudinary manquante' }, { status: 500 });
    }

    // Real Cloudinary upload
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', cloudinaryUploadPreset);
    uploadFormData.append('folder', `gedimmo/projects/${projectId}`);

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/auto/upload`,
      { method: 'POST', body: uploadFormData }
    );

    if (!cloudinaryResponse.ok) {
      return NextResponse.json({ error: 'Échec de l\'upload Cloudinary' }, { status: 500 });
    }

    const cloudinaryData = await cloudinaryResponse.json();
    const firstUser = await prisma.user.findFirst();

    if (!firstUser) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const gedDoc = await prisma.gEDDocument.create({
      data: {
        name: file.name,
        url: cloudinaryData.secure_url,
        fileType: file.type,
        fileSize: file.size,
        phaseId: phaseId || null,
        projectId: projectId || null,
        uploadedById: firstUser.id
      }
    });

    await prisma.auditLog.create({
      data: {
        action: 'DOCUMENT_UPLOADED',
        entityId: gedDoc.id,
        entityType: 'GEDDocument',
        userId: firstUser.id,
        details: { fileName: file.name, cloudinaryId: cloudinaryData.public_id, visaId }
      }
    });

    await prisma.notification.create({
      data: {
        message: `📎 Document "${file.name}" a été déposé dans la GED.`,
        userId: firstUser.id,
        link: `/ppp-ged/dashboard/projects/${projectId}`
      }
    });

    return NextResponse.json({ success: true, document: gedDoc, url: cloudinaryData.secure_url });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'upload' }, { status: 500 });
  }
}
