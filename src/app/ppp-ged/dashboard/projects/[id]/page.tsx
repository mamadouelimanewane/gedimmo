'use client';

import React, { useEffect, useState } from 'react';

export default function PppProjectDetails({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activePhase, setActivePhase] = useState<string | null>(null);

  const fetchProject = async () => {
    const res = await fetch(`/api/ppp/projects/${params.id}`);
    const data = await res.json();
    setProject(data);
    if (data.phases && data.phases.length > 0) {
      setActivePhase(data.phases[0].id);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const updateVisaStatus = async (visaId: string, status: string) => {
    await fetch(`/api/ppp/visas/${visaId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchProject(); // refresh data
  };

  if (loading) return <div>Chargement du projet...</div>;
  if (!project) return <div>Projet non trouvé.</div>;

  const currentPhaseDetails = project.phases.find((p: any) => p.id === activePhase);

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: 0 }}>{project.name}</h1>
          <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '50px', fontSize: '13px', fontWeight: '600' }}>{project.commune}</span>
        </div>
        <p style={{ color: '#64748b', margin: 0 }}>{project.description}</p>
      </div>

      <div style={{ display: 'flex', gap: '32px' }}>
        {/* Stepper / Timeline (Phases) */}
        <div style={{ width: '300px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Les 7 Phases</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {project.phases.map((phase: any) => {
              const isActive = activePhase === phase.id;
              const isValide = phase.status === 'VALIDATED';
              return (
                <div 
                  key={phase.id} 
                  onClick={() => setActivePhase(phase.id)}
                  style={{ 
                    padding: '16px', 
                    background: isActive ? '#0A1628' : 'white', 
                    color: isActive ? 'white' : '#0f172a',
                    borderRadius: '12px', 
                    cursor: 'pointer',
                    border: isActive ? '1px solid #0A1628' : '1px solid #e2e8f0',
                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                    boxShadow: isActive ? '0 4px 12px rgba(10,22,40,0.1)' : 'none'
                  }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isValide ? '#10b981' : (isActive ? '#D4AF37' : '#f1f5f9'), color: isValide ? 'white' : (isActive ? '#0A1628' : '#64748b'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', flexShrink: 0 }}>
                    {isValide ? '✓' : phase.phaseNumber}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>{phase.title}</div>
                    <div style={{ fontSize: '12px', color: isActive ? 'rgba(255,255,255,0.7)' : '#64748b' }}>{phase.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase Details (Visas & Documents) */}
        <div style={{ flex: 1 }}>
          {currentPhaseDetails && (
            <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>Phase {currentPhaseDetails.phaseNumber} : {currentPhaseDetails.title}</h2>
                  <span style={{ background: currentPhaseDetails.status === 'VALIDATED' ? '#d1fae5' : '#fef3c7', color: currentPhaseDetails.status === 'VALIDATED' ? '#059669' : '#d97706', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '700' }}>
                    {currentPhaseDetails.status === 'VALIDATED' ? 'PHASE VALIDÉE' : 'EN ATTENTE'}
                  </span>
                </div>
              </div>

              {/* Visas Techniques */}
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>8 Visas Techniques Requis</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '40px' }}>
                {currentPhaseDetails.visas.map((visa: any) => (
                  <div key={visa.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>{visa.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{visa.authority}</div>
                      </div>
                      {visa.status === 'APPROVED' ? (
                        <span style={{ color: '#10b981', background: '#d1fae5', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>OK</span>
                      ) : (
                        <span style={{ color: '#d97706', background: '#fef3c7', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>ATTENTE</span>
                      )}
                    </div>
                    {visa.status !== 'APPROVED' && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                        <button onClick={() => updateVisaStatus(visa.id, 'APPROVED')} style={{ flex: 1, padding: '6px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Approuver</button>
                        <button onClick={() => updateVisaStatus(visa.id, 'REJECTED')} style={{ flex: 1, padding: '6px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Rejeter</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* GED Upload Section */}
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Documents de la phase (GED)</h3>
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '40px', textAlign: 'center', background: '#f8fafc', cursor: 'pointer' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📄</div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a', marginBottom: '4px' }}>Cliquez ou glissez-déposez des fichiers ici</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>PDF, JPG, PNG (Max 10MB)</div>
                {/* Note: In a real app, this would trigger an upload to Cloudinary/S3 and save to GEDDocument */}
                <button style={{ marginTop: '16px', background: 'white', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Parcourir les fichiers</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
