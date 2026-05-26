'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PppGedDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', commune: '', description: '' });
  const [creating, setCreating] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetchProjects();
    fetchAnalytics();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('/api/ppp/projects');
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/ppp/analytics');
      const data = await res.json();
      if (data.success) setAnalytics(data);
    } catch {}
  };

  const getProgress = (project: any) => {
    if (!project.phases || project.phases.length === 0) return 0;
    const validated = project.phases.filter((p: any) => p.status === 'VALIDATED').length;
    return Math.round((validated / 7) * 100);
  };

  const getVisaProgress = (project: any) => {
    if (!project.phases) return { approved: 0, total: 0 };
    let approved = 0, total = 0;
    for (const phase of project.phases) {
      if (phase.visas) {
        total += phase.visas.length;
        approved += phase.visas.filter((v: any) => v.status === 'APPROVED').length;
      }
    }
    return { approved, total };
  };

  const getCurrentPhase = (project: any) => {
    if (!project.phases) return null;
    const pending = project.phases.find((p: any) => p.status !== 'VALIDATED');
    return pending || project.phases[project.phases.length - 1];
  };

  const createProject = async () => {
    if (!formData.name || !formData.commune) return;
    setCreating(true);
    await fetch('/api/ppp/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setShowModal(false);
    setFormData({ name: '', commune: '', description: '' });
    setCreating(false);
    fetchProjects();
    fetchAnalytics();
  };

  const statusLabels: Record<string, { label: string; bg: string; color: string }> = {
    'INITIATED': { label: 'Initié', bg: '#f1f5f9', color: '#64748b' },
    'IN_PROGRESS': { label: 'En cours', bg: '#dbeafe', color: '#2563eb' },
    'COMPLETED': { label: 'Terminé', bg: '#d1fae5', color: '#059669' },
    'SUSPENDED': { label: 'Suspendu', bg: '#fee2e2', color: '#dc2626' },
  };

  const getActionLabel = (action: string) => {
    const map: Record<string, string> = {
      'VISA_APPROVED': '✅ Visa approuvé', 'VISA_REJECTED': '❌ Visa rejeté',
      'PHASE_UNLOCKED': '🔑 Phase déverrouillée', 'PHASE_LOCKED': '🔒 Phase reverrouillée',
      'PHASE_VALIDATED': '🏆 Phase validée', 'DOCUMENT_UPLOADED': '📎 Document déposé',
    };
    return map[action] || action;
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>Tableau de Bord PPP</h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '16px' }}>Suivi analytique de l'ensemble des projets Commune–Promoteur.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a3a5c 100%)', color: 'white', padding: '14px 28px', borderRadius: '10px', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(10,22,40,0.3)' }}
        >
          <span style={{ fontSize: '18px' }}>+</span> Nouveau Projet PPP
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <StatCard icon="📁" title="Projets Totaux" value={analytics?.stats?.totalProjects || projects.length} color="#0A1628" />
        <StatCard icon="🔄" title="En Cours" value={analytics?.stats?.inProgress || 0} color="#2563eb" />
        <StatCard icon="✅" title="Terminés" value={analytics?.stats?.completed || 0} color="#059669" />
        <StatCard icon="📄" title="Visas Validés" value={analytics?.stats?.approvedVisas || 0} color="#D4AF37" />
        <StatCard icon="⏳" title="En Attente" value={analytics?.stats?.pendingVisas || 0} color="#d97706" />
        <StatCard icon="📊" title="Taux Approbation" value={`${analytics?.stats?.approvalRate || 0}%`} color="#8b5cf6" />
      </div>

      {/* ANALYTICS SECTION */}
      {analytics && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>

          {/* CHART: Performance par Autorité */}
          <div style={{ background: 'white', padding: '28px', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>📊 Performance par Autorité</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.entries(analytics.authorityStats || {}).map(([name, stat]: [string, any]) => {
                const pct = stat.total > 0 ? Math.round((stat.approved / stat.total) * 100) : 0;
                return (
                  <div key={name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#334155' }}>{name}</span>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>
                        {stat.approved}/{stat.total} ({pct}%)
                        {stat.avgDays > 0 && <span style={{ marginLeft: '8px', color: stat.avgDays > 15 ? '#ef4444' : '#10b981' }}>⏱ {stat.avgDays}j</span>}
                      </span>
                    </div>
                    <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${pct}%`, height: '100%', 
                        background: pct === 100 ? '#10b981' : pct >= 50 ? '#D4AF37' : '#ef4444', 
                        borderRadius: '5px', transition: 'width 0.5s ease' 
                      }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CHART: Distribution par Phase */}
          <div style={{ background: 'white', padding: '28px', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>🏗️ Avancement par Phase</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.entries(analytics.phaseDistribution || {}).map(([name, dist]: [string, any]) => {
                const total = dist.validated + dist.inProgress + dist.pending;
                if (total === 0) return null;
                return (
                  <div key={name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#334155' }}>{name}</span>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                        <span style={{ color: '#10b981' }}>✓ {dist.validated}</span>
                        <span style={{ color: '#2563eb' }}>⟳ {dist.inProgress}</span>
                        <span style={{ color: '#94a3b8' }}>⏳ {dist.pending}</span>
                      </div>
                    </div>
                    <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
                      <div style={{ width: `${(dist.validated / total) * 100}%`, height: '100%', background: '#10b981' }}></div>
                      <div style={{ width: `${(dist.inProgress / total) * 100}%`, height: '100%', background: '#3b82f6' }}></div>
                      <div style={{ width: `${(dist.pending / total) * 100}%`, height: '100%', background: '#e2e8f0' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* OVERDUE ALERTS */}
          <div style={{ background: 'white', padding: '28px', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: (analytics.overdueAlerts?.length > 0) ? '2px solid #fecaca' : '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: analytics.overdueAlerts?.length > 0 ? '#dc2626' : '#0f172a', marginBottom: '20px' }}>
              🚨 Alertes de Délai ({analytics.overdueAlerts?.length || 0})
            </h3>
            {(!analytics.overdueAlerts || analytics.overdueAlerts.length === 0) ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#10b981', fontSize: '14px' }}>
                ✅ Aucun visa en retard. Tous les délais sont respectés.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                {analytics.overdueAlerts.slice(0, 10).map((alert: any, i: number) => (
                  <Link key={i} href={`/ppp-ged/dashboard/projects/${alert.projectId}`} style={{ textDecoration: 'none' }}>
                    <div style={{ 
                      padding: '12px 16px', borderRadius: '8px', 
                      background: alert.daysPending >= 30 ? '#fef2f2' : '#fffbeb',
                      borderLeft: `3px solid ${alert.daysPending >= 30 ? '#dc2626' : '#f59e0b'}`,
                      cursor: 'pointer'
                    }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                        {alert.visaName} — <span style={{ color: '#dc2626' }}>{alert.daysPending} jours</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                        {alert.projectName} • Phase {alert.phaseNumber} • {alert.authority}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* RECENT ACTIVITY */}
          <div style={{ background: 'white', padding: '28px', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>📜 Activité Récente</h3>
            {(!analytics.recentLogs || analytics.recentLogs.length === 0) ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8', fontSize: '14px' }}>Aucune activité récente.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                {analytics.recentLogs.map((log: any) => (
                  <div key={log.id} style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #0A1628' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{getActionLabel(log.action)}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                      {log.user?.name || 'Système'} — {new Date(log.createdAt).toLocaleString('fr-FR')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Projects List */}
      <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>📋 Projets</h2>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Chargement des projets...</div>
      ) : projects.length === 0 ? (
        <div style={{ background: 'white', padding: '60px', borderRadius: '16px', textAlign: 'center', border: '2px dashed #cbd5e1' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📋</div>
          <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Aucun projet PPP</h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>Créez votre premier projet pour démarrer le workflow foncier.</p>
          <button onClick={() => setShowModal(true)} style={{ background: '#0A1628', color: 'white', padding: '14px 28px', borderRadius: '10px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>
            + Créer un projet
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {projects.map((project: any) => {
            const progress = getProgress(project);
            const visa = getVisaProgress(project);
            const current = getCurrentPhase(project);
            const st = statusLabels[project.status] || statusLabels['INITIATED'];

            return (
              <Link key={project.id} href={`/ppp-ged/dashboard/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', padding: '24px 28px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', transition: 'box-shadow 0.2s, border-color 0.2s', cursor: 'pointer' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>{project.name}</h3>
                      <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '700' }}>{project.commune}</span>
                      <span style={{ background: st.bg, color: st.color, padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '700' }}>{st.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#64748b' }}>
                      <span>Créé le {new Date(project.createdAt).toLocaleDateString('fr-FR')}</span>
                      {current && <span>📍 Phase en cours : <strong style={{ color: '#0f172a' }}>{current.title}</strong></span>}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', minWidth: '80px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#D4AF37' }}>{visa.approved}/{visa.total}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>VISAS</div>
                  </div>
                  <div style={{ width: '180px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                      <span>Progression</span>
                      <span>{progress}%</span>
                    </div>
                    <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: progress === 100 ? '#10b981' : 'linear-gradient(90deg, #D4AF37 0%, #f59e0b 100%)', borderRadius: '5px', transition: 'width 0.5s ease' }}></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '20px', color: '#cbd5e1' }}>→</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Modal Création de projet */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '40px', width: '500px', maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Nouveau Projet PPP</h2>
            <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '14px' }}>Ce projet générera automatiquement les 7 phases et les 56 visas techniques (8 par phase).</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Nom du projet *</label>
                <input 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Lotissement Diamniadio Phase 3"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Commune *</label>
                <input 
                  value={formData.commune}
                  onChange={e => setFormData({ ...formData, commune: e.target.value })}
                  placeholder="Ex: Diamniadio"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Description</label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ex: Aménagement de 500 parcelles viabilisées"
                  rows={3}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '32px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '600', cursor: 'pointer', color: '#64748b' }}>
                Annuler
              </button>
              <button 
                onClick={createProject} 
                disabled={creating || !formData.name || !formData.commune}
                style={{ padding: '12px 28px', borderRadius: '8px', border: 'none', background: (!formData.name || !formData.commune) ? '#cbd5e1' : '#0A1628', color: 'white', fontWeight: '700', cursor: (!formData.name || !formData.commune) ? 'not-allowed' : 'pointer' }}
              >
                {creating ? 'Création...' : 'Créer le Projet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value, color }: { icon: string; title: string; value: number | string; color: string }) {
  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>{title}</div>
      <div style={{ fontSize: '24px', fontWeight: '800', color }}>{value}</div>
    </div>
  );
}
