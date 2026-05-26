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
    if (data.phases && data.phases.length > 0 && !activePhase) {
      // Find the first non-validated phase to set as active initially
      const firstPending = data.phases.find((p: any) => p.status !== 'VALIDATED');
      setActivePhase(firstPending ? firstPending.id : data.phases[0].id);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const updateVisaStatus = async (visaId: string, status: string) => {
    const res = await fetch(`/api/ppp/visas/${visaId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) {
      const error = await res.json();
      alert(error.error || 'Erreur lors de la validation');
    }
    fetchProject(); // refresh data
  };

  const toggleUnlockPhase = async (phaseId: string, currentState: boolean) => {
    if (!confirm(currentState ? 'Reverrouiller cette phase ?' : 'Déverrouiller exceptionnellement cette phase (Action Administrateur) ?')) return;
    await fetch(`/api/ppp/phases/${phaseId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isUnlocked: !currentState })
    });
    fetchProject();
  };

  if (loading) return <div>Chargement du projet...</div>;
  if (!project) return <div>Projet non trouvé.</div>;

  const currentPhaseDetails = project.phases.find((p: any) => p.id === activePhase);
  
  // Determine if current phase is locked
  let isLocked = false;
  if (currentPhaseDetails && currentPhaseDetails.phaseNumber > 1 && !currentPhaseDetails.isUnlocked) {
    const prevPhase = project.phases.find((p: any) => p.phaseNumber === currentPhaseDetails.phaseNumber - 1);
    if (prevPhase && prevPhase.status !== 'VALIDATED') {
      isLocked = true;
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: 0 }}>{project.name}</h1>
          <span style={{ background: '#f1f5f9', color: '#475569', padding: '6px 12px', borderRadius: '50px', fontSize: '13px', fontWeight: '700' }}>{project.commune}</span>
        </div>
        <p style={{ color: '#64748b', margin: 0, fontSize: '16px' }}>{project.description}</p>
      </div>

      {/* HORIZONTAL TIMELINE */}
      <div style={{ marginBottom: '40px', background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#64748b', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>Progression du Projet (7 Phases)</h2>
        <div style={{ display: 'flex', alignItems: 'center', minWidth: '800px', position: 'relative' }}>
          {/* Progress Line Background */}
          <div style={{ position: 'absolute', top: '24px', left: '40px', right: '40px', height: '4px', background: '#e2e8f0', zIndex: 0 }}></div>
          
          {project.phases.map((phase: any, index: number) => {
            const isValide = phase.status === 'VALIDATED';
            const isActive = activePhase === phase.id;
            
            // Check if locked
            let phaseLocked = false;
            if (phase.phaseNumber > 1 && !phase.isUnlocked) {
              const prev = project.phases.find((p: any) => p.phaseNumber === phase.phaseNumber - 1);
              if (prev && prev.status !== 'VALIDATED') phaseLocked = true;
            }

            return (
              <div key={phase.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, cursor: 'pointer' }} onClick={() => setActivePhase(phase.id)}>
                {/* Node */}
                <div style={{ 
                  width: isActive ? '56px' : '48px', 
                  height: isActive ? '56px' : '48px', 
                  borderRadius: '50%', 
                  background: isValide ? '#10b981' : (phaseLocked ? '#cbd5e1' : (isActive ? '#0A1628' : 'white')), 
                  border: isValide ? '4px solid #d1fae5' : (isActive ? '4px solid #D4AF37' : '4px solid #e2e8f0'),
                  color: isValide ? 'white' : (phaseLocked ? '#64748b' : (isActive ? 'white' : '#0f172a')), 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '16px', fontWeight: '800', 
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 0 4px rgba(212,175,55,0.2)' : 'none'
                }}>
                  {isValide ? '✓' : (phaseLocked && !phase.isUnlocked ? '🔒' : phase.phaseNumber)}
                </div>
                {/* Label */}
                <div style={{ marginTop: '16px', textAlign: 'center', maxWidth: '120px' }}>
                  <div style={{ fontSize: '13px', fontWeight: isActive ? '800' : '600', color: isActive ? '#0f172a' : '#64748b', lineHeight: '1.4' }}>{phase.title}</div>
                  {phase.isUnlocked && <div style={{ fontSize: '10px', color: '#d97706', marginTop: '4px', fontWeight: 'bold' }}>DÉVERROUILLÉ</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PHASE DETAILS */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', position: 'relative' }}>
        
        {isLocked && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔒</div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Phase Verrouillée</h2>
            <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '400px', textAlign: 'center', marginBottom: '24px' }}>Vous devez d'abord valider toutes les étapes de la phase précédente pour accéder à celle-ci.</p>
            <button 
              onClick={() => toggleUnlockPhase(currentPhaseDetails.id, false)}
              style={{ background: '#fef3c7', color: '#d97706', border: '1px solid #fcd34d', padding: '10px 24px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span>🔑</span> Forcer le déverrouillage (Admin)
            </button>
          </div>
        )}

        {currentPhaseDetails && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                  <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Phase {currentPhaseDetails.phaseNumber} : {currentPhaseDetails.title}</h2>
                  <span style={{ background: currentPhaseDetails.status === 'VALIDATED' ? '#d1fae5' : '#fef3c7', color: currentPhaseDetails.status === 'VALIDATED' ? '#059669' : '#d97706', padding: '6px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: '800' }}>
                    {currentPhaseDetails.status === 'VALIDATED' ? 'PHASE VALIDÉE' : 'EN ATTENTE'}
                  </span>
                </div>
                <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>{currentPhaseDetails.description}</p>
              </div>
              
              {currentPhaseDetails.isUnlocked && (
                <button 
                  onClick={() => toggleUnlockPhase(currentPhaseDetails.id, true)}
                  style={{ background: 'white', color: '#64748b', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  Annuler le déverrouillage
                </button>
              )}
            </div>

            {/* VISAS ET GED INTEGREE */}
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '24px', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>8 Visas Techniques Requis & Dépôt Documentaire</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
              {currentPhaseDetails.visas.map((visa: any) => (
                <div key={visa.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', background: visa.status === 'APPROVED' ? '#f8fafc' : 'white', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{visa.name}</div>
                      <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>{visa.authority}</div>
                    </div>
                    {visa.status === 'APPROVED' ? (
                      <span style={{ color: '#10b981', background: '#d1fae5', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>✓ VALIDÉ</span>
                    ) : (
                      <span style={{ color: '#d97706', background: '#fef3c7', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>ATTENTE</span>
                    )}
                  </div>
                  
                  {/* Mini-GED Drap & Drop for this Visa */}
                  <div style={{ border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '16px', textAlign: 'center', background: '#f1f5f9', cursor: 'pointer', marginBottom: '16px', transition: 'background 0.2s' }}>
                    <div style={{ fontSize: '20px', marginBottom: '8px' }}>📄</div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>Attacher le justificatif</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>PDF/PNG (max 5MB)</div>
                  </div>

                  {visa.status !== 'APPROVED' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => updateVisaStatus(visa.id, 'APPROVED')} style={{ flex: 1, padding: '10px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s' }}>Approuver</button>
                      <button onClick={() => updateVisaStatus(visa.id, 'REJECTED')} style={{ flex: 1, padding: '10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s' }}>Rejeter</button>
                    </div>
                  )}
                  {visa.status === 'APPROVED' && (
                    <div style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '12px' }}>
                      Validé le {new Date(visa.updatedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </>
        )}
      </div>
    </div>
  );
}
