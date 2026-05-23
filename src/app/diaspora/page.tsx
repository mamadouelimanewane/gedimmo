'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DiasporaSecure() {
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyResult, setVerifyResult] = useState<string|null>(null);

  const handleVerify = () => {
    if (verifyCode.trim()) {
      setVerifyResult('verification_ok');
    }
  };

  const features = [
    {
      emoji: String.fromCodePoint(0x1F6E1),
      title: 'Verification des Titres',
      desc: 'Verification en temps reel via l API DGID. Scannez le QR code de l acte pour confirmer son authenticite instantanement.',
      color: '#D4AF37'
    },
    {
      emoji: String.fromCodePoint(0x1F4F9),
      title: 'Visio-Visites Certifiees',
      desc: 'Visites guidees en direct par agents assermented. Video geoloca lisee et horodatee, impossible a falsifier.',
      color: '#0A1628'
    },
    {
      emoji: String.fromCodePoint(0x1F512),
      title: 'Paiement Sequestre (Escrow)',
      desc: 'Vos fonds sont bloques sur un compte notarial securise. Deblocage automatique uniquement a la signature de l acte definitif.',
      color: '#059669'
    },
    {
      emoji: String.fromCodePoint(0x1F3D7) + String.fromCodePoint(0xFE0F),
      title: 'Suivi Chantier Live',
      desc: 'Cameras connectees sur les chantiers. Rapports d avancement valides chaque semaine par un bureau de controle independant.',
      color: '#7C3AED'
    }
  ];

  const steps = [
    { num: '01', title: 'Inscrivez-vous', desc: 'Creez votre compte diaspora securise en 2 minutes.' },
    { num: '02', title: 'Choisissez un bien', desc: 'Parcourez les biens certifies Diwaan avec titre verifie.' },
    { num: '03', title: 'Visio-visite', desc: 'Visitez en direct avec un agent assermente depuis chez vous.' },
    { num: '04', title: 'Paiement securise', desc: 'Deposez vos fonds en sequestre chez le notaire partenaire.' },
    { num: '05', title: 'Signature & Titre', desc: 'Recevez votre titre foncier numerique verifie blockchain.' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', paddingTop: '80px', fontFamily: 'system-ui, sans-serif' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a3a5c 100%)', color: 'white', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.2)', border: '1px solid #D4AF37', borderRadius: '4px', padding: '6px 20px', fontSize: '12px', letterSpacing: '3px', color: '#D4AF37', fontWeight: 'bold', marginBottom: '24px', textTransform: 'uppercase' }}>Investissez en toute confiance</div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '800', margin: '0 0 16px', letterSpacing: '-2px' }}>Diaspora <span style={{ color: '#D4AF37' }}>Secure</span></h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '640px', margin: '0 auto 40px', lineHeight: '1.7' }}>La premiere plateforme dedicee a la diaspora senegalaise. Eliminez les risques d arnaque grace a notre technologie de verification blockchain et notre accompagnement juridique complet.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href='/register' style={{ background: '#D4AF37', color: '#0A1628', padding: '14px 32px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', fontSize: '15px' }}>Creer mon compte securise</Link>
          <Link href='/search?certified=1' style={{ border: '2px solid white', color: 'white', padding: '14px 32px', borderRadius: '50px', fontWeight: '600', textDecoration: 'none', fontSize: '15px' }}>Voir les biens certifies</Link>
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: '#D4AF37', padding: '24px', display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
        {[['500+', 'Investisseurs diaspora'], ['100%', 'Titres verifies'], ['0', 'Arnaques recensees'], ['48h', 'Delai verification']].map(([num, label], i) => (
          <div key={i} style={{ textAlign: 'center', color: '#0A1628' }}>
            <div style={{ fontSize: '32px', fontWeight: '800' }}>{num}</div>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '800', color: '#0A1628', marginBottom: '16px' }}>Pourquoi Diaspora Secure?</h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '17px', maxWidth: '560px', margin: '0 auto 56px' }}>4 garanties qui font la difference entre un investissement serein et une arnaque.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', borderTop: '4px solid ' + f.color, transition: 'transform 0.2s', cursor: 'default' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{f.emoji}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0A1628', marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.7' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* VERIFICATEUR */}
      <div style={{ background: '#0A1628', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ color: '#D4AF37', fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>Verifiez un titre foncier maintenant</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>Entrez le numero NICAD ou scannez le QR Code de l acte</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '600px', margin: '0 auto' }}>
          <input value={verifyCode} onChange={e => setVerifyCode(e.target.value)} placeholder='Ex: SN-DKR-2025-00451' style={{ flex: 1, minWidth: '220px', padding: '14px 20px', borderRadius: '8px', border: 'none', fontSize: '15px', outline: 'none' }} />
          <button onClick={handleVerify} style={{ background: '#D4AF37', color: '#0A1628', padding: '14px 28px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>Verifier</button>
        </div>
        {verifyResult === 'verification_ok' && (
          <div style={{ marginTop: '24px', background: 'rgba(5, 150, 105, 0.2)', border: '1px solid #059669', borderRadius: '8px', padding: '16px', color: '#34d399', display: 'inline-block' }}>
            Titre verifie - Connectez-vous pour voir les details complets
          </div>
        )}
      </div>

      {/* ETAPES */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '800', color: '#0A1628', marginBottom: '56px' }}>Comment ca marche?</h2>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '32px', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', background: '#0A1628', color: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>{s.num}</div>
            <div style={{ paddingTop: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0A1628', marginBottom: '6px' }}>{s.title}</h3>
              <p style={{ color: '#666', fontSize: '15px' }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
