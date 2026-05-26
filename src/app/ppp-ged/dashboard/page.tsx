'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PppGedDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ppp/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const getProgress = (project: any) => {
    if (!project.phases || project.phases.length === 0) return 0;
    const validated = project.phases.filter((p: any) => p.status === 'VALIDATED').length;
    return Math.round((validated / 7) * 100);
  };

  const createDemoProject = async () => {
    setLoading(true);
    await fetch('/api/ppp/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Projet Extension Diamniadio',
        commune: 'Diamniadio',
        description: 'Aménagement de 500 parcelles viabilisées.'
      })
    });
    const res = await fetch('/api/ppp/projects');
    setProjects(await res.json());
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>Projets PPP en cours</h1>
          <p style={{ color: '#64748b', margin: 0 }}>Gérez et suivez l'avancement des projets immobiliers de la commune.</p>
        </div>
        <button 
          onClick={createDemoProject}
          style={{ background: '#0A1628', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer' }}
        >
          + Nouveau Projet
        </button>
      </div>

      {loading ? (
        <div>Chargement des projets...</div>
      ) : projects.length === 0 ? (
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center', color: '#64748b', border: '1px dashed #cbd5e1' }}>
          Aucun projet PPP trouvé. Créez-en un pour commencer.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {projects.map((project: any) => (
            <Link key={project.id} href={`/ppp-ged/dashboard/projects/${project.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', padding: '24px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid transparent', transition: 'border-color 0.2s' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{project.name}</h3>
                    <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>{project.commune}</span>
                    <span style={{ background: project.status === 'COMPLETED' ? '#d1fae5' : '#fef3c7', color: project.status === 'COMPLETED' ? '#059669' : '#d97706', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>{project.status}</span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Créé le {new Date(project.createdAt).toLocaleDateString()}</p>
                </div>
                <div style={{ width: '200px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                    <span>Progression</span>
                    <span>{getProgress(project)}%</span>
                  </div>
                  <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${getProgress(project)}%`, height: '100%', background: '#D4AF37', borderRadius: '4px' }}></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
