'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ExtranetCommunes() {
  const [activeTab, setActiveTab] = useState('workflow');

  const phases = [
    { num: '01', title: 'Identification du terrain', docs: 'NICAD, rapport bornage', status: 'done', actor: 'Commune + Cadastre' },
    { num: '02', title: 'Convention PPP', docs: 'Appel a manifestation, convention signee', status: 'done', actor: 'Commune + Promoteur' },
    { num: '03', title: 'Bail emphyteotique / Deliberation', docs: 'Bail BEA ou deliberation validee prefet', status: 'active', actor: 'DGID + Prefet' },
    { num: '04', title: 'Autorisation de lotir', docs: 'Avis ONAS, SENELEC, SDE, AGEROUTE', status: 'pending', actor: 'Direction Urbanisme' },
    { num: '05', title: 'Mise en valeur (VRD)', docs: 'Declaration chantier, PV reception', status: 'pending', actor: 'Promoteur + Controle' },
    { num: '06', title: 'Ventes & Actes', docs: 'Contrat reservation, acte authentique', status: 'pending', actor: 'Notaire + Commune' },
    { num: '07', title: 'Titre foncier individuel', docs: 'Immatriculation parcellaire, TF definitif', status: 'pending', actor: 'Conservation Fonciere' }
  ];

  const visas = [
    { name: 'ONAS', full: 'Office National Assainissement', status: 'pending', emoji: String.fromCodePoint(0x1F4A7) },
    { name: 'SENELEC', full: 'Societe Nationale Electricite', status: 'pending', emoji: String.fromCodePoint(0x26A1) },
    { name: 'SDE', full: 'Societe des Eaux', status: 'ok', emoji: String.fromCodePoint(0x1F6B0) },
    { name: 'AGEROUTE', full: 'Agence Travaux Routes', status: 'pending', emoji: String.fromCodePoint(0x1F6E3) + String.fromCodePoint(0xFE0F) },
    { name: 'Protection Civile', full: 'DSPS Securite Publique', status: 'pending', emoji: String.fromCodePoint(0x1F692) },
    { name: 'Urbanisme', full: 'Direction Urbanisme Habitat', status: 'ok', emoji: String.fromCodePoint(0x1F3D9) + String.fromCodePoint(0xFE0F) },
    { name: 'DGID Cadastre', full: 'Direction Generale Impots Domaines', status: 'ok', emoji: String.fromCodePoint(0x1F4CB) },
    { name: 'Prefet', full: 'Prefecture du Departement', status: 'pending', emoji: String.fromCodePoint(0x2696) + String.fromCodePoint(0xFE0F) }
  ];

  const statusColor = (s: string) => s === 'done' ? '#059669' : s === 'active' ? '#D4AF37' : '#94a3b8';
  const statusLabel = (s: string) => s === 'done' ? 'Valide' : s === 'active' ? 'En cours' : 'En attente';

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', paddingTop: '80px', fontFamily: 'system-ui, sans-serif' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a3a5c 100%)', color: 'white', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '4px', padding: '6px 20px', fontSize: '11px', letterSpacing: '3px', color: '#D4AF37', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase' }}>Administration & Promoteurs</div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '800', margin: '0 0 16px' }}>Extranet Communes & Promoteurs</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: '1.7' }}>Plateforme de gestion fonciere PPP. Suivez les 7 phases du workflow, obtenez vos visas techniques et securisez chaque acte via la blockchain.</p>
        <Link href='/admin/login' style={{ background: '#D4AF37', color: '#0A1628', padding: '14px 32px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', fontSize: '15px' }}>Connexion Maire / Promoteur</Link>
      </div>

      {/* TABS */}
      <div style={{ background: 'white', borderBottom: '2px solid #E2E8F0', display: 'flex', justifyContent: 'center', gap: '0', overflowX: 'auto' }}>
        {[['workflow', 'Workflow Foncier (7 phases)'], ['visas', 'Visas Techniques (8)'], ['registre', 'Registre Numerique']].map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{ padding: '16px 24px', fontWeight: activeTab === id ? '700' : '500', fontSize: '14px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === id ? '3px solid #D4AF37' : '3px solid transparent', color: activeTab === id ? '#0A1628' : '#64748b', whiteSpace: 'nowrap' }}>{label}</button>
        ))}
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>

        {/* TAB: WORKFLOW */}
        {activeTab === 'workflow' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A1628', marginBottom: '8px' }}>Workflow Foncier Senegal - 7 Phases</h2>
            <p style={{ color: '#64748b', marginBottom: '32px' }}>De l identification du terrain a la delivrance du titre foncier individuel.</p>
            {phases.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '16px', background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', borderLeft: '4px solid ' + statusColor(p.status) }}>
                <div style={{ width: '40px', height: '40px', background: statusColor(p.status), color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>{p.num}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0A1628', margin: 0 }}>{p.title}</h3>
                    <span style={{ background: statusColor(p.status) + '20', color: statusColor(p.status), padding: '3px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>{statusLabel(p.status)}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '6px 0 4px' }}>Documents: {p.docs}</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Acteur principal: {p.actor}</p>
                </div>
              </div>
            ))}
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <Link href='/admin/workflows/projet-senegal' style={{ background: '#0A1628', color: 'white', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '15px' }}>Acceder au Workflow Complet</Link>
            </div>
          </div>
        )}

        {/* TAB: VISAS */}
        {activeTab === 'visas' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A1628', marginBottom: '8px' }}>Visas Techniques Requis</h2>
            <p style={{ color: '#64748b', marginBottom: '32px' }}>8 services techniques doivent valider votre dossier avant l autorisation de lotir.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {visas.map((v, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid ' + (v.status === 'ok' ? '#d1fae5' : '#E2E8F0') }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{v.emoji}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0A1628', margin: '0 0 4px' }}>{v.name}</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px' }}>{v.full}</p>
                  <span style={{ background: v.status === 'ok' ? '#d1fae5' : '#fef3c7', color: v.status === 'ok' ? '#059669' : '#d97706', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>{v.status === 'ok' ? 'Valide' : 'En attente'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: REGISTRE */}
        {activeTab === 'registre' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A1628', marginBottom: '8px' }}>Registre Numerique des Attributaires</h2>
            <p style={{ color: '#64748b', marginBottom: '32px' }}>Base de donnees securisee de tous les beneficiaires et actes administratifs.</p>
            <div style={{ background: '#0A1628', borderRadius: '16px', padding: '40px', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{String.fromCodePoint(0x1F512)}</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#D4AF37', marginBottom: '12px' }}>Acces Securise Requis</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>Le registre est accessible uniquement aux acteurs habilites : Maires, Agents DGID, Notaires et Promoteurs agrees.</p>
              <Link href='/admin/login' style={{ background: '#D4AF37', color: '#0A1628', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700' }}>Se connecter au Registre</Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
