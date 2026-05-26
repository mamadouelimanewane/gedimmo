'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function PppProjectDetails({ params, userRole }: { params: { id: string }, userRole?: any }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'visas' | 'audit'>('visas');
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [uploadingVisaId, setUploadingVisaId] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, any[]>>({});
  const printRef = useRef<HTMLDivElement>(null);

  const fetchProject = async () => {
    const res = await fetch(`/api/ppp/projects/${params.id}`);
    const data = await res.json();
    setProject(data);
    if (data.phases && data.phases.length > 0 && !activePhase) {
      const firstPending = data.phases.find((p: any) => p.status !== 'VALIDATED');
      setActivePhase(firstPending ? firstPending.id : data.phases[0].id);
    }
    setLoading(false);
  };

  const fetchAuditLogs = async () => {
    const res = await fetch(`/api/ppp/projects/${params.id}/audit`);
    const data = await res.json();
    if (data.success) setAuditLogs(data.auditLogs);
  };

  useEffect(() => {
    fetchProject();
    fetchAuditLogs();
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
    } else {
      fetchProject();
      fetchAuditLogs();
    }
  };

  const toggleUnlockPhase = async (phaseId: string, currentState: boolean) => {
    if (!confirm(currentState ? 'Reverrouiller cette phase ?' : 'Déverrouiller exceptionnellement cette phase (Action Administrateur) ?')) return;
    await fetch(`/api/ppp/visas/${phaseId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isUnlocked: !currentState })
    });
    fetchProject();
    fetchAuditLogs();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, visaId: string, phaseId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Fichier trop lourd (max 5MB)'); return; }
    
    setUploadingVisaId(visaId);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('visaId', visaId);
    formData.append('phaseId', phaseId);
    formData.append('projectId', params.id);

    try {
      const res = await fetch('/api/ppp/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setUploadedDocs(prev => ({ ...prev, [visaId]: [...(prev[visaId] || []), data.document] }));
        fetchAuditLogs();
      } else {
        alert('Erreur upload: ' + data.error);
      }
    } catch (err) {
      alert('Erreur lors de l\'upload');
    } finally {
      setUploadingVisaId(null);
    }
  };

  const handleExportPDF = () => {
    const printContent = document.getElementById('pdf-export-zone');
    if (!printContent) return;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = `
      <style>
        body { font-family: Arial, sans-serif; padding: 32px; }
        h1 { font-size: 24px; color: #0f172a; }
        h2 { font-size: 18px; color: #334155; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        th, td { padding: 8px 12px; text-align: left; border: 1px solid #e2e8f0; font-size: 13px; }
        th { background: #f1f5f9; font-weight: bold; }
        .badge-ok { color: #059669; font-weight: bold; }
        .badge-wait { color: #d97706; font-weight: bold; }
        .footer { margin-top: 40px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px; }
      </style>
      ${printContent.innerHTML}
    `;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const getActionLabel = (action: string) => {
    const map: Record<string, string> = {
      'VISA_APPROVED': '✅ Visa Approuvé',
      'VISA_REJECTED': '❌ Visa Rejeté',
      'VISA_PENDING': '⏳ Visa Réinitialisé',
      'PHASE_UNLOCKED': '🔑 Phase Déverrouillée',
      'PHASE_LOCKED': '🔒 Phase Reverrouillée',
      'PHASE_VALIDATED': '🏆 Phase Validée',
      'DOCUMENT_UPLOADED': '📎 Document Déposé',
    };
    return map[action] || action;
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTop: '4px solid #0A1628', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <div style={{ color: '#64748b' }}>Chargement du projet...</div>
    </div>
  );
  if (!project) return <div>Projet non trouvé.</div>;

  const currentPhaseDetails = project.phases.find((p: any) => p.id === activePhase);
  let isLocked = false;
  if (currentPhaseDetails && currentPhaseDetails.phaseNumber > 1 && !currentPhaseDetails.isUnlocked) {
    const prevPhase = project.phases.find((p: any) => p.phaseNumber === currentPhaseDetails.phaseNumber - 1);
    if (prevPhase && prevPhase.status !== 'VALIDATED') isLocked = true;
  }

  const totalVisas = project.phases.flatMap((p: any) => p.visas).length;
  const approvedVisas = project.phases.flatMap((p: any) => p.visas).filter((v: any) => v.status === 'APPROVED').length;
  const progressPct = totalVisas > 0 ? Math.round((approvedVisas / totalVisas) * 100) : 0;

  return (
    <div>
      {/* HEADER */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: 0 }}>{project.name}</h1>
            <span style={{ background: '#f1f5f9', color: '#475569', padding: '6px 12px', borderRadius: '50px', fontSize: '13px', fontWeight: '700' }}>{project.commune}</span>
          </div>
          <p style={{ color: '#64748b', margin: 0, fontSize: '16px' }}>{project.description}</p>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1, maxWidth: '300px', background: '#e2e8f0', borderRadius: '99px', height: '8px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressPct}%`, background: progressPct === 100 ? '#10b981' : '#0A1628', borderRadius: '99px', transition: 'width 0.5s ease' }}></div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{approvedVisas}/{totalVisas} visas validés ({progressPct}%)</span>
          </div>
        </div>
        <button
          onClick={handleExportPDF}
          style={{ background: '#0A1628', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          📄 Exporter Bordereau PDF
        </button>
      </div>

      {/* HORIZONTAL TIMELINE */}
      <div style={{ marginBottom: '32px', background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#64748b', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>Progression (7 Phases)</h2>
        <div style={{ display: 'flex', alignItems: 'center', minWidth: '800px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '24px', left: '40px', right: '40px', height: '4px', background: '#e2e8f0', zIndex: 0 }}></div>
          {project.phases.map((phase: any) => {
            const isValide = phase.status === 'VALIDATED';
            const isActive = activePhase === phase.id;
            let phaseLocked = false;
            if (phase.phaseNumber > 1 && !phase.isUnlocked) {
              const prev = project.phases.find((p: any) => p.phaseNumber === phase.phaseNumber - 1);
              if (prev && prev.status !== 'VALIDATED') phaseLocked = true;
            }
            return (
              <div key={phase.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, cursor: 'pointer' }} onClick={() => setActivePhase(phase.id)}>
                <div style={{ width: isActive ? '56px' : '48px', height: isActive ? '56px' : '48px', borderRadius: '50%', background: isValide ? '#10b981' : (phaseLocked ? '#cbd5e1' : (isActive ? '#0A1628' : 'white')), border: isValide ? '4px solid #d1fae5' : (isActive ? '4px solid #D4AF37' : '4px solid #e2e8f0'), color: isValide ? 'white' : (phaseLocked ? '#64748b' : (isActive ? 'white' : '#0f172a')), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', transition: 'all 0.2s ease', boxShadow: isActive ? '0 0 0 4px rgba(212,175,55,0.2)' : 'none' }}>
                  {isValide ? '✓' : (phaseLocked && !phase.isUnlocked ? '🔒' : phase.phaseNumber)}
                </div>
                <div style={{ marginTop: '16px', textAlign: 'center', maxWidth: '120px' }}>
                  <div style={{ fontSize: '13px', fontWeight: isActive ? '800' : '600', color: isActive ? '#0f172a' : '#64748b', lineHeight: '1.4' }}>{phase.title}</div>
                  {phase.isUnlocked && <div style={{ fontSize: '10px', color: '#d97706', marginTop: '4px', fontWeight: 'bold' }}>DÉVERROUILLÉ</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button onClick={() => setActiveTab('visas')} style={{ padding: '10px 24px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', border: 'none', background: activeTab === 'visas' ? '#0A1628' : '#f1f5f9', color: activeTab === 'visas' ? 'white' : '#64748b' }}>📋 Visas & GED</button>
        <button onClick={() => { setActiveTab('audit'); fetchAuditLogs(); }} style={{ padding: '10px 24px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', border: 'none', background: activeTab === 'audit' ? '#0A1628' : '#f1f5f9', color: activeTab === 'audit' ? 'white' : '#64748b' }}>
          📜 Historique ({auditLogs.length})
        </button>
      </div>

      {/* TAB: VISAS */}
      {activeTab === 'visas' && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', position: 'relative' }}>
          {isLocked && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔒</div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Phase Verrouillée</h2>
              <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '400px', textAlign: 'center', marginBottom: '24px' }}>Validez d'abord toutes les étapes de la phase précédente.</p>
              {userRole?.role === 'COMMUNE_ADMIN' && (
                <button onClick={() => toggleUnlockPhase(currentPhaseDetails.id, false)} style={{ background: '#fef3c7', color: '#d97706', border: '1px solid #fcd34d', padding: '10px 24px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🔑</span> Forcer le déverrouillage (Admin)
                </button>
              )}
            </div>
          )}

          {currentPhaseDetails && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Phase {currentPhaseDetails.phaseNumber} : {currentPhaseDetails.title}</h2>
                    <span style={{ background: currentPhaseDetails.status === 'VALIDATED' ? '#d1fae5' : '#fef3c7', color: currentPhaseDetails.status === 'VALIDATED' ? '#059669' : '#d97706', padding: '6px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: '800' }}>
                      {currentPhaseDetails.status === 'VALIDATED' ? '✓ PHASE VALIDÉE' : 'EN ATTENTE'}
                    </span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>{currentPhaseDetails.description}</p>
                </div>
                {currentPhaseDetails.isUnlocked && userRole?.role === 'COMMUNE_ADMIN' && (
                  <button onClick={() => toggleUnlockPhase(currentPhaseDetails.id, true)} style={{ background: 'white', color: '#64748b', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
                    Reverrouiller
                  </button>
                )}
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '20px', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>Visas Techniques & Dépôt GED</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {currentPhaseDetails.visas.map((visa: any) => {
                  const canValidate = userRole?.role === 'COMMUNE_ADMIN' || (userRole?.role === 'TECH_AGENT' && userRole?.department && visa.name.toUpperCase().includes(userRole.department.toUpperCase()));
                  const canUpload = !userRole || userRole?.role === 'COMMUNE_ADMIN' || userRole?.role === 'PROMOTEUR';
                  const visaDocs = uploadedDocs[visa.id] || [];
                  const isUploading = uploadingVisaId === visa.id;

                  return (
                    <div key={visa.id} style={{ border: `1px solid ${visa.status === 'APPROVED' ? '#a7f3d0' : visa.status === 'REJECTED' ? '#fecaca' : '#e2e8f0'}`, borderRadius: '12px', padding: '20px', background: visa.status === 'APPROVED' ? '#f0fdf4' : 'white', transition: 'all 0.2s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>{visa.name}</div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{visa.authority}</div>
                        </div>
                        {visa.status === 'APPROVED' && <span style={{ color: '#10b981', background: '#d1fae5', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>✓ VALIDÉ</span>}
                        {visa.status === 'REJECTED' && <span style={{ color: '#ef4444', background: '#fee2e2', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>✗ REJETÉ</span>}
                        {visa.status === 'PENDING' && <span style={{ color: '#d97706', background: '#fef3c7', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>ATTENTE</span>}
                      </div>

                      {/* UPLOAD ZONE */}
                      {canUpload ? (
                        <label style={{ display: 'block', border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '12px', textAlign: 'center', background: '#f8fafc', cursor: 'pointer', marginBottom: '12px' }}>
                          <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => handleFileUpload(e, visa.id, currentPhaseDetails.id)} style={{ display: 'none' }} />
                          {isUploading ? (
                            <div style={{ fontSize: '12px', color: '#64748b' }}>⏳ Upload en cours...</div>
                          ) : (
                            <>
                              <div style={{ fontSize: '18px', marginBottom: '4px' }}>📎</div>
                              <div style={{ fontSize: '12px', fontWeight: '600', color: '#0f172a' }}>Déposer le justificatif</div>
                              <div style={{ fontSize: '10px', color: '#94a3b8' }}>PDF/PNG/JPG max 5MB</div>
                            </>
                          )}
                        </label>
                      ) : (
                        <div style={{ border: '1px solid #f1f5f9', borderRadius: '8px', padding: '10px', textAlign: 'center', background: '#f8fafc', marginBottom: '12px' }}>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Dépôt réservé au Promoteur</div>
                        </div>
                      )}

                      {/* Uploaded docs list */}
                      {visaDocs.map((doc: any, i: number) => (
                        <a key={i} href={doc.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', background: '#f0fdf4', borderRadius: '6px', marginBottom: '6px', textDecoration: 'none', fontSize: '12px', color: '#059669' }}>
                          📄 {doc.name}
                        </a>
                      ))}

                      {/* VALIDATION BUTTONS */}
                      {visa.status !== 'APPROVED' && canValidate && (
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                          <button onClick={() => updateVisaStatus(visa.id, 'APPROVED')} style={{ flex: 1, padding: '9px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>✓ Approuver</button>
                          <button onClick={() => updateVisaStatus(visa.id, 'REJECTED')} style={{ flex: 1, padding: '9px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>✗ Rejeter</button>
                        </div>
                      )}
                      {visa.status === 'APPROVED' && (
                        <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', marginTop: '8px' }}>
                          Validé le {new Date(visa.updatedAt).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB: AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>📜 Historique des Actions</h2>
          {auditLogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Aucune action enregistrée pour l'instant.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {auditLogs.map((log: any) => (
                <div key={log.id} style={{ display: 'flex', gap: '16px', padding: '16px', background: '#f8fafc', borderRadius: '10px', borderLeft: '3px solid #0A1628' }}>
                  <div style={{ fontSize: '24px', flexShrink: 0 }}>
                    {log.action.includes('APPROVED') || log.action.includes('VALIDATED') ? '✅' : log.action.includes('REJECTED') ? '❌' : log.action.includes('UNLOCK') ? '🔑' : log.action.includes('LOCKED') ? '🔒' : '📎'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{getActionLabel(log.action)}</div>
                    {log.details && (
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                        {log.details.visaName && `Visa : ${log.details.visaName}`}
                        {log.details.fileName && `Fichier : ${log.details.fileName}`}
                      </div>
                    )}
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                      Par : {log.user?.name || 'Système'} — {new Date(log.createdAt).toLocaleString('fr-FR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ZONE PDF (Hidden, for print) */}
      <div id="pdf-export-zone" style={{ display: 'none' }}>
        <h1>Bordereau de Validation — {project.name}</h1>
        <p>Commune : {project.commune} | Exporté le : {new Date().toLocaleDateString('fr-FR')}</p>
        {project.phases.map((phase: any) => (
          <div key={phase.id}>
            <h2>Phase {phase.phaseNumber} : {phase.title} — {phase.status}</h2>
            <table>
              <thead><tr><th>Visa</th><th>Autorité</th><th>Statut</th><th>Date Validation</th></tr></thead>
              <tbody>
                {phase.visas.map((visa: any) => (
                  <tr key={visa.id}>
                    <td>{visa.name}</td>
                    <td>{visa.authority}</td>
                    <td className={visa.status === 'APPROVED' ? 'badge-ok' : 'badge-wait'}>
                      {visa.status === 'APPROVED' ? '✓ Approuvé' : visa.status === 'REJECTED' ? '✗ Rejeté' : 'En attente'}
                    </td>
                    <td>{visa.validatedAt ? new Date(visa.validatedAt).toLocaleDateString('fr-FR') : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <div className="footer">Document généré automatiquement par la plateforme GED PPP Diwaan</div>
      </div>
    </div>
  );
}
