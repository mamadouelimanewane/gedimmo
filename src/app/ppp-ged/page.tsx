'use client';

import React from 'react';
import Link from 'next/link';

export default function PppGedLanding() {
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', paddingTop: '80px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a3a5c 100%)', color: 'white', padding: '80px 24px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '4px', padding: '6px 20px', fontSize: '12px', letterSpacing: '3px', color: '#D4AF37', fontWeight: 'bold', marginBottom: '24px', textTransform: 'uppercase' }}>
          GED Indépendante
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: '800', margin: '0 0 24px' }}>
          Extranet Communes & Promoteurs (PPP)
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', maxWidth: '700px', margin: '0 auto 40px', lineHeight: '1.8' }}>
          Plateforme centralisée de Gestion Électronique de Documents pour le suivi des 7 phases du workflow foncier et la validation des 8 visas techniques.
        </p>
        <Link href='/ppp-ged/dashboard' style={{ background: '#D4AF37', color: '#0A1628', padding: '16px 40px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', fontSize: '16px', transition: 'transform 0.2s', display: 'inline-block' }}>
          Accéder au Backoffice PPP
        </Link>
      </div>

      <div style={{ maxWidth: '1200px', margin: '-40px auto 40px', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', position: 'relative', zIndex: 10 }}>
        {[
          { title: '7 Phases Sécurisées', desc: 'De l identification du terrain à la délivrance du titre foncier individuel.', icon: '📋' },
          { title: '8 Visas Techniques', desc: 'Validation ONAS, SENELEC, SDE, Urbanisme et autres autorités.', icon: '✅' },
          { title: 'Dépôt de Documents', desc: 'GED complète pour sauvegarder actes, conventions et baux.', icon: '📁' }
        ].map((feat, i) => (
          <div key={i} style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{feat.icon}</div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0A1628', marginBottom: '12px' }}>{feat.title}</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
