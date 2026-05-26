'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PppGedDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', commune: '', description: '' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('/api/ppp/projects');
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
    setLoading(false);
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
  };

  const statusLabels: Record<string, { label: string; bg: string; color: string }> = {
    'INITIATED': { label: 'Initié', bg: '#f1f5f9', color: '#64748b' },
    'IN_PROGRESS': { label: 'En cours', bg: '#dbeafe', color: '#2563eb' },
    'COMPLETED': { label: 'Terminé', bg: '#d1fae5', color: '#059669' },
    'SUSPENDED': { label: 'Suspendu', bg: '#fee2e2', color: '#dc2626' },
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>Tableau de Bord PPP</h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '16px' }}>Suivi de l'ensemble des projets Commune–Promoteur en temps réel.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a3a5c 100%)', color: 'white', padding: '14px 28px', borderRadius: '10px', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(10,22,40,0.3)' }}
        >
          <span style={{ fontSize: '18px' }}>+</span> Nouveau Projet PPP
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <StatCard icon="📁" title="Projets Totaux" value={projects.length} color="#0A1628" />
        <StatCard icon="🔄" title="En Cours" value={projects.filter(p => p.status === 'IN_PROGRESS').length} color="#2563eb" />
        <StatCard icon="✅" title="Terminés" value={projects.filter(p => p.status === 'COMPLETED').length} color="#059669" />
        <StatCard icon="📄" title="Visas Validés" value={projects.reduce((s, p) => s + getVisaProgress(p).approved, 0)} color="#D4AF37" />
      </div>

      {/* Projects Table */}
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
                  
                  {/* Project Info */}
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

                  {/* Visa Count */}
                  <div style={{ textAlign: 'center', minWidth: '80px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#D4AF37' }}>{visa.approved}/{visa.total}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>VISAS</div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ width: '180px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                      <span>Progression</span>
                      <span>{progress}%</span>
                    </div>
                    <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: progress === 100 ? '#10b981' : 'linear-gradient(90deg, #D4AF37 0%, #f59e0b 100%)', borderRadius: '5px', transition: 'width 0.5s ease' }}></div>
                    </div>
                  </div>

                  {/* Arrow */}
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

function StatCard({ icon, title, value, color }: { icon: string; title: string; value: number; color: string }) {
  return (
    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
      <div style={{ fontSize: '28px', marginBottom: '12px' }}>{icon}</div>
      <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>{title}</div>
      <div style={{ fontSize: '28px', fontWeight: '800', color }}>{value}</div>
    </div>
  );
}
