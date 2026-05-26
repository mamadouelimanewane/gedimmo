'use client';

import React, { useEffect, useState } from 'react';

export default function MyVisasPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');

  useEffect(() => {
    fetch('/api/ppp/projects')
      .then(r => r.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Chargement...</div>;

  // Flatten all visas
  const allVisas = projects.flatMap(p =>
    (p.phases || []).flatMap((ph: any) =>
      (ph.visas || []).map((v: any) => ({
        ...v,
        phaseTitle: ph.title,
        phaseNumber: ph.phaseNumber,
        projectName: p.name,
        projectId: p.id
      }))
    )
  );

  const filtered = filter === 'ALL' ? allVisas : allVisas.filter(v => v.status === filter);
  const counts = {
    ALL: allVisas.length,
    PENDING: allVisas.filter(v => v.status === 'PENDING').length,
    APPROVED: allVisas.filter(v => v.status === 'APPROVED').length,
    REJECTED: allVisas.filter(v => v.status === 'REJECTED').length,
  };

  const updateVisa = async (visaId: string, status: string) => {
    await fetch(`/api/ppp/visas/${visaId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    // refresh
    const res = await fetch('/api/ppp/projects');
    setProjects(await res.json());
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>Mes Validations (Visas)</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Vue consolidée des 8 visas techniques requis par phase, tous projets confondus.</p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map(f => {
          const labels: Record<string, { label: string; color: string }> = {
            'ALL': { label: 'Tous', color: '#0f172a' },
            'PENDING': { label: 'En attente', color: '#d97706' },
            'APPROVED': { label: 'Approuvés', color: '#059669' },
            'REJECTED': { label: 'Rejetés', color: '#dc2626' },
          };
          const isActive = filter === f;
          return (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              style={{ padding: '10px 20px', borderRadius: '8px', border: isActive ? 'none' : '1px solid #e2e8f0', background: isActive ? labels[f].color : 'white', color: isActive ? 'white' : labels[f].color, fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}
            >
              {labels[f].label} ({counts[f]})
            </button>
          );
        })}
      </div>

      {/* Visas Table */}
      {filtered.length === 0 ? (
        <div style={{ background: 'white', padding: '60px', borderRadius: '16px', textAlign: 'center', border: '2px dashed #cbd5e1' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>Aucun visa dans cette catégorie</h3>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8fafc' }}>
              <tr>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>Visa</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' as const }}>Projet</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' as const }}>Phase</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' as const }}>Statut</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' as const }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((visa: any) => (
                <tr key={visa.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>{visa.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{visa.authority}</div>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '14px', color: '#0f172a' }}>{visa.projectName}</td>
                  <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>Phase {visa.phaseNumber} — {visa.phaseTitle}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: '700',
                      background: visa.status === 'APPROVED' ? '#d1fae5' : (visa.status === 'REJECTED' ? '#fee2e2' : '#fef3c7'),
                      color: visa.status === 'APPROVED' ? '#059669' : (visa.status === 'REJECTED' ? '#dc2626' : '#d97706'),
                    }}>
                      {visa.status === 'APPROVED' ? 'VALIDÉ' : (visa.status === 'REJECTED' ? 'REJETÉ' : 'EN ATTENTE')}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    {visa.status === 'PENDING' && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => updateVisa(visa.id, 'APPROVED')} style={{ padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Approuver</button>
                        <button onClick={() => updateVisa(visa.id, 'REJECTED')} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Rejeter</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
