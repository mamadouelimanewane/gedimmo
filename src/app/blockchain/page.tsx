'use client';

import React, { useState } from 'react';

export default function BlockchainPage() {
  const [hashInput, setHashInput] = useState('');
  const [showHash, setShowHash] = useState(false);

  const generateHash = (input: string): string => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  };

  const exampleHash = '7f83b1657ff1fc53b92dc18148a1d65dfa13502451a4d70' + generateHash('diwaan-2026') + '9f8e7d6c5b4a';

  const records = [
    { id: 'TF-2026-001847', type: 'Titre Foncier', actor: 'Conservation Fonciere', date: '22 Mai 2026', hash: '7f83b165...3502451a', status: 'Certifie' },
    { id: 'BAIL-2026-000234', type: 'Bail Emphyteotique', actor: 'DGID Dakar', date: '18 Mai 2026', hash: 'a8c9d2e1...f7b3c4d5', status: 'Certifie' },
    { id: 'DELIB-2026-00891', type: 'Deliberation Commune', actor: 'Commune Diamniadio', date: '15 Mai 2026', hash: 'b3e4f512...8a9c0d1e', status: 'Certifie' },
    { id: 'VENTE-2026-002156', type: 'Acte de Vente', actor: 'Me Sene - Notaire', date: '10 Mai 2026', hash: 'c5d6e789...0b1c2d3f', status: 'Certifie' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', paddingTop: '80px', fontFamily: 'system-ui, sans-serif', color: 'white' }}>

      {/* HERO */}
      <div style={{ textAlign: 'center', padding: '80px 24px 48px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '4px', padding: '6px 20px', fontSize: '11px', letterSpacing: '3px', color: '#D4AF37', fontWeight: 'bold', marginBottom: '24px', textTransform: 'uppercase' }}>Securite Immutabilite Confiance</div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: '800', color: '#D4AF37', margin: '0 0 20px', letterSpacing: '-1px' }}>Registre Blockchain & Archives Scellees</h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.65)', maxWidth: '640px', margin: '0 auto', lineHeight: '1.7' }}>Chaque acte foncier est hache cryptographiquement (SHA-256) et ancre sur un registre prive inalterable. TraÃ§abilite totale. Prevention radicale des doubles ventes.</p>
      </div>

      {/* STATS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', padding: '0 24px 64px' }}>
        {[['12,847', 'Actes scellee'], ['100%', 'Integrite verifiee'], ['0', 'Doubles ventes'], ['2026', 'Depuis']].map(([num, label], i) => (
          <div key={i} style={{ textAlign: 'center', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px', padding: '24px 32px', background: 'rgba(255,255,255,0.04)' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#D4AF37' }}>{num}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* DEMO HASH */}
      <div style={{ maxWidth: '800px', margin: '0 auto 64px', padding: '0 24px' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '16px', padding: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#D4AF37', marginBottom: '16px' }}>Generateur de Hash SHA-256 (Demo)</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input value={hashInput} onChange={e => setHashInput(e.target.value)} placeholder='Entrez un identifiant de titre (ex: TF-2026-001847)' style={{ flex: 1, minWidth: '220px', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.07)', color: 'white', fontSize: '14px', outline: 'none' }} />
            <button onClick={() => setShowHash(true)} style={{ background: '#D4AF37', color: '#0A1628', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Generer</button>
          </div>
          {showHash && hashInput && (
            <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px', color: '#4ade80', wordBreak: 'break-all' }}>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '8px', letterSpacing: '2px' }}>EMPREINTE CRYPTOGRAPHIQUE (SHA-256 DEMO)</div>
              {'sha256::' + generateHash(hashInput) + generateHash(hashInput + 'diwaan') + generateHash('salt' + hashInput) + generateHash(hashInput + '2026')}
            </div>
          )}
        </div>
      </div>

      {/* REGISTRE */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'white', marginBottom: '24px' }}>Derniers actes scelles</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(212,175,55,0.3)' }}>
                {['Reference', 'Type', 'Acteur', 'Date', 'Hash', 'Statut'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#D4AF37', fontWeight: '600', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#60a5fa' }}>{r.id}</td>
                  <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.8)' }}>{r.type}</td>
                  <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.6)' }}>{r.actor}</td>
                  <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.6)' }}>{r.date}</td>
                  <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontSize: '12px', color: '#4ade80' }}>{r.hash}</td>
                  <td style={{ padding: '14px 16px' }}><span style={{ background: 'rgba(5,150,105,0.2)', color: '#4ade80', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textAlign: 'center', marginTop: '32px', fontStyle: 'italic' }}>Securise par Diwaan ChainT - Registre prive conforme OHADA et loi senegalaise sur la protection des donnees</p>
      </div>

    </div>
  );
}
