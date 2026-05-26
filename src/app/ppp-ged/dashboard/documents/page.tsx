'use client';

import React, { useEffect, useState } from 'react';

export default function AllDocumentsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ppp/projects')
      .then(r => r.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Chargement...</div>;

  // Flatten all documents from all projects
  // For now we show the visa-level document placeholders (what documents are expected per phase/visa)
  const allPhases = projects.flatMap(p => (p.phases || []).map((ph: any) => ({ ...ph, projectName: p.name, projectCommune: p.commune })));

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>Documents GED</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Vue centralisée de tous les documents justificatifs par projet et par phase.</p>
      </div>

      {allPhases.length === 0 ? (
        <div style={{ background: 'white', padding: '60px', borderRadius: '16px', textAlign: 'center', border: '2px dashed #cbd5e1' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📁</div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>Aucun document</h3>
          <p style={{ color: '#64748b' }}>Les documents apparaîtront ici dès qu'ils seront attachés aux visas techniques.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {allPhases.map((phase: any) => (
            <div key={phase.id} style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: phase.status === 'VALIDATED' ? '#d1fae5' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: phase.status === 'VALIDATED' ? '#059669' : '#64748b' }}>
                  {phase.status === 'VALIDATED' ? '✓' : phase.phaseNumber}
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Phase {phase.phaseNumber} — {phase.title}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{phase.projectName} • {phase.projectCommune}</div>
                </div>
                <span style={{ marginLeft: 'auto', background: phase.status === 'VALIDATED' ? '#d1fae5' : '#fef3c7', color: phase.status === 'VALIDATED' ? '#059669' : '#d97706', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: '700' }}>
                  {phase.status === 'VALIDATED' ? 'VALIDÉE' : phase.status === 'IN_PROGRESS' ? 'EN COURS' : 'EN ATTENTE'}
                </span>
              </div>
              
              {/* Documents expected for this phase */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {(phase.visas || []).map((visa: any) => (
                  <div key={visa.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '16px' }}>{visa.status === 'APPROVED' ? '✅' : '⏳'}</span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{visa.name}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{visa.status === 'APPROVED' ? 'Document validé' : 'En attente'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
