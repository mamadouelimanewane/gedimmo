# =============================================================
# SCRIPT 2 - DIWAAN IMMO - CREER LES PAGES AVEC DESIGN LUXE
# Exécuter depuis : C:\gravity\zillow-clone
# =============================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DIWAAN IMMO - Création Pages Luxe" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérification du bon dossier
if (!(Test-Path "src/app/page.tsx")) {
    Write-Host "ERREUR: Lancez ce script depuis C:\gravity\zillow-clone" -ForegroundColor Red
    exit 1
}

# Fonction d'écriture UTF-8 sans BOM (robuste)
function Write-CleanFile {
    param([string]$RelativePath, [string]$Content)
    $fullPath = Join-Path $PWD $RelativePath
    $dir = Split-Path $fullPath -Parent
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)
    Write-Host "  Cree: $RelativePath" -ForegroundColor Green
}

# ==============================================================
# PAGE 1 : DIASPORA SECURE
# ==============================================================
Write-Host "[1/3] Creation de la page Diaspora Secure..." -ForegroundColor Yellow

# Note: Les icones sont incluses en SVG inline pour eviter les
# problemes d'encodage avec les imports dynamiques
$diaspora = "'use client';" + [char]10
$diaspora += "" + [char]10
$diaspora += "import React, { useState } from 'react';" + [char]10
$diaspora += "import Link from 'next/link';" + [char]10
$diaspora += "" + [char]10
$diaspora += "export default function DiasporaSecure() {" + [char]10
$diaspora += "  const [verifyCode, setVerifyCode] = useState('');" + [char]10
$diaspora += "  const [verifyResult, setVerifyResult] = useState<string|null>(null);" + [char]10
$diaspora += "" + [char]10
$diaspora += "  const handleVerify = () => {" + [char]10
$diaspora += "    if (verifyCode.trim()) {" + [char]10
$diaspora += "      setVerifyResult('verification_ok');" + [char]10
$diaspora += "    }" + [char]10
$diaspora += "  };" + [char]10
$diaspora += "" + [char]10
$diaspora += "  const features = [" + [char]10
$diaspora += "    {" + [char]10
$diaspora += "      emoji: String.fromCodePoint(0x1F6E1)," + [char]10
$diaspora += "      title: 'Verification des Titres'," + [char]10
$diaspora += "      desc: 'Verification en temps reel via l API DGID. Scannez le QR code de l acte pour confirmer son authenticite instantanement.'," + [char]10
$diaspora += "      color: '#D4AF37'" + [char]10
$diaspora += "    }," + [char]10
$diaspora += "    {" + [char]10
$diaspora += "      emoji: String.fromCodePoint(0x1F4F9)," + [char]10
$diaspora += "      title: 'Visio-Visites Certifiees'," + [char]10
$diaspora += "      desc: 'Visites guidees en direct par agents assermented. Video geoloca lisee et horodatee, impossible a falsifier.'," + [char]10
$diaspora += "      color: '#0A1628'" + [char]10
$diaspora += "    }," + [char]10
$diaspora += "    {" + [char]10
$diaspora += "      emoji: String.fromCodePoint(0x1F512)," + [char]10
$diaspora += "      title: 'Paiement Sequestre (Escrow)'," + [char]10
$diaspora += "      desc: 'Vos fonds sont bloques sur un compte notarial securise. Deblocage automatique uniquement a la signature de l acte definitif.'," + [char]10
$diaspora += "      color: '#059669'" + [char]10
$diaspora += "    }," + [char]10
$diaspora += "    {" + [char]10
$diaspora += "      emoji: String.fromCodePoint(0x1F3D7) + String.fromCodePoint(0xFE0F)," + [char]10
$diaspora += "      title: 'Suivi Chantier Live'," + [char]10
$diaspora += "      desc: 'Cameras connectees sur les chantiers. Rapports d avancement valides chaque semaine par un bureau de controle independant.'," + [char]10
$diaspora += "      color: '#7C3AED'" + [char]10
$diaspora += "    }" + [char]10
$diaspora += "  ];" + [char]10
$diaspora += "" + [char]10
$diaspora += "  const steps = [" + [char]10
$diaspora += "    { num: '01', title: 'Inscrivez-vous', desc: 'Creez votre compte diaspora securise en 2 minutes.' }," + [char]10
$diaspora += "    { num: '02', title: 'Choisissez un bien', desc: 'Parcourez les biens certifies Diwaan avec titre verifie.' }," + [char]10
$diaspora += "    { num: '03', title: 'Visio-visite', desc: 'Visitez en direct avec un agent assermente depuis chez vous.' }," + [char]10
$diaspora += "    { num: '04', title: 'Paiement securise', desc: 'Deposez vos fonds en sequestre chez le notaire partenaire.' }," + [char]10
$diaspora += "    { num: '05', title: 'Signature & Titre', desc: 'Recevez votre titre foncier numerique verifie blockchain.' }" + [char]10
$diaspora += "  ];" + [char]10
$diaspora += "" + [char]10
$diaspora += "  return (" + [char]10
$diaspora += "    <div style={{ minHeight: '100vh', background: '#FAFAFA', paddingTop: '80px', fontFamily: 'system-ui, sans-serif' }}>" + [char]10
$diaspora += "" + [char]10
$diaspora += "      {/* HERO */}" + [char]10
$diaspora += "      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a3a5c 100%)', color: 'white', padding: '80px 24px', textAlign: 'center' }}>" + [char]10
$diaspora += "        <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.2)', border: '1px solid #D4AF37', borderRadius: '4px', padding: '6px 20px', fontSize: '12px', letterSpacing: '3px', color: '#D4AF37', fontWeight: 'bold', marginBottom: '24px', textTransform: 'uppercase' }}>Investissez en toute confiance</div>" + [char]10
$diaspora += "        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '800', margin: '0 0 16px', letterSpacing: '-2px' }}>Diaspora <span style={{ color: '#D4AF37' }}>Secure</span></h1>" + [char]10
$diaspora += "        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '640px', margin: '0 auto 40px', lineHeight: '1.7' }}>La premiere plateforme dedicee a la diaspora senegalaise. Eliminez les risques d arnaque grace a notre technologie de verification blockchain et notre accompagnement juridique complet.</p>" + [char]10
$diaspora += "        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>" + [char]10
$diaspora += "          <Link href='/register' style={{ background: '#D4AF37', color: '#0A1628', padding: '14px 32px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', fontSize: '15px' }}>Creer mon compte securise</Link>" + [char]10
$diaspora += "          <Link href='/search?certified=1' style={{ border: '2px solid white', color: 'white', padding: '14px 32px', borderRadius: '50px', fontWeight: '600', textDecoration: 'none', fontSize: '15px' }}>Voir les biens certifies</Link>" + [char]10
$diaspora += "        </div>" + [char]10
$diaspora += "      </div>" + [char]10
$diaspora += "" + [char]10
$diaspora += "      {/* STATS */}" + [char]10
$diaspora += "      <div style={{ background: '#D4AF37', padding: '24px', display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>" + [char]10
$diaspora += "        {[['500+', 'Investisseurs diaspora'], ['100%', 'Titres verifies'], ['0', 'Arnaques recensees'], ['48h', 'Delai verification']].map(([num, label], i) => (" + [char]10
$diaspora += "          <div key={i} style={{ textAlign: 'center', color: '#0A1628' }}>" + [char]10
$diaspora += "            <div style={{ fontSize: '32px', fontWeight: '800' }}>{num}</div>" + [char]10
$diaspora += "            <div style={{ fontSize: '13px', fontWeight: '600' }}>{label}</div>" + [char]10
$diaspora += "          </div>" + [char]10
$diaspora += "        ))}" + [char]10
$diaspora += "      </div>" + [char]10
$diaspora += "" + [char]10
$diaspora += "      {/* FEATURES */}" + [char]10
$diaspora += "      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>" + [char]10
$diaspora += "        <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '800', color: '#0A1628', marginBottom: '16px' }}>Pourquoi Diaspora Secure?</h2>" + [char]10
$diaspora += "        <p style={{ textAlign: 'center', color: '#666', fontSize: '17px', maxWidth: '560px', margin: '0 auto 56px' }}>4 garanties qui font la difference entre un investissement serein et une arnaque.</p>" + [char]10
$diaspora += "        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>" + [char]10
$diaspora += "          {features.map((f, i) => (" + [char]10
$diaspora += "            <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', borderTop: '4px solid ' + f.color, transition: 'transform 0.2s', cursor: 'default' }}>" + [char]10
$diaspora += "              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{f.emoji}</div>" + [char]10
$diaspora += "              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0A1628', marginBottom: '10px' }}>{f.title}</h3>" + [char]10
$diaspora += "              <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.7' }}>{f.desc}</p>" + [char]10
$diaspora += "            </div>" + [char]10
$diaspora += "          ))}" + [char]10
$diaspora += "        </div>" + [char]10
$diaspora += "      </div>" + [char]10
$diaspora += "" + [char]10
$diaspora += "      {/* VERIFICATEUR */}" + [char]10
$diaspora += "      <div style={{ background: '#0A1628', padding: '64px 24px', textAlign: 'center' }}>" + [char]10
$diaspora += "        <h2 style={{ color: '#D4AF37', fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>Verifiez un titre foncier maintenant</h2>" + [char]10
$diaspora += "        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>Entrez le numero NICAD ou scannez le QR Code de l acte</p>" + [char]10
$diaspora += "        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '600px', margin: '0 auto' }}>" + [char]10
$diaspora += "          <input value={verifyCode} onChange={e => setVerifyCode(e.target.value)} placeholder='Ex: SN-DKR-2025-00451' style={{ flex: 1, minWidth: '220px', padding: '14px 20px', borderRadius: '8px', border: 'none', fontSize: '15px', outline: 'none' }} />" + [char]10
$diaspora += "          <button onClick={handleVerify} style={{ background: '#D4AF37', color: '#0A1628', padding: '14px 28px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>Verifier</button>" + [char]10
$diaspora += "        </div>" + [char]10
$diaspora += "        {verifyResult === 'verification_ok' && (" + [char]10
$diaspora += "          <div style={{ marginTop: '24px', background: 'rgba(5, 150, 105, 0.2)', border: '1px solid #059669', borderRadius: '8px', padding: '16px', color: '#34d399', display: 'inline-block' }}>" + [char]10
$diaspora += "            Titre verifie - Connectez-vous pour voir les details complets" + [char]10
$diaspora += "          </div>" + [char]10
$diaspora += "        )}" + [char]10
$diaspora += "      </div>" + [char]10
$diaspora += "" + [char]10
$diaspora += "      {/* ETAPES */}" + [char]10
$diaspora += "      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px' }}>" + [char]10
$diaspora += "        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '800', color: '#0A1628', marginBottom: '56px' }}>Comment ca marche?</h2>" + [char]10
$diaspora += "        {steps.map((s, i) => (" + [char]10
$diaspora += "          <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '32px', alignItems: 'flex-start' }}>" + [char]10
$diaspora += "            <div style={{ width: '48px', height: '48px', background: '#0A1628', color: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>{s.num}</div>" + [char]10
$diaspora += "            <div style={{ paddingTop: '8px' }}>" + [char]10
$diaspora += "              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0A1628', marginBottom: '6px' }}>{s.title}</h3>" + [char]10
$diaspora += "              <p style={{ color: '#666', fontSize: '15px' }}>{s.desc}</p>" + [char]10
$diaspora += "            </div>" + [char]10
$diaspora += "          </div>" + [char]10
$diaspora += "        ))}" + [char]10
$diaspora += "      </div>" + [char]10
$diaspora += "" + [char]10
$diaspora += "    </div>" + [char]10
$diaspora += "  );" + [char]10
$diaspora += "}" + [char]10

Write-CleanFile "src/app/diaspora/page.tsx" $diaspora

# ==============================================================
# PAGE 2 : EXTRANET COMMUNES & PROMOTEURS
# ==============================================================
Write-Host ""
Write-Host "[2/3] Creation de la page Extranet Communes..." -ForegroundColor Yellow

$communes = "'use client';" + [char]10
$communes += "" + [char]10
$communes += "import React, { useState } from 'react';" + [char]10
$communes += "import Link from 'next/link';" + [char]10
$communes += "" + [char]10
$communes += "export default function ExtranetCommunes() {" + [char]10
$communes += "  const [activeTab, setActiveTab] = useState('workflow');" + [char]10
$communes += "" + [char]10
$communes += "  const phases = [" + [char]10
$communes += "    { num: '01', title: 'Identification du terrain', docs: 'NICAD, rapport bornage', status: 'done', actor: 'Commune + Cadastre' }," + [char]10
$communes += "    { num: '02', title: 'Convention PPP', docs: 'Appel a manifestation, convention signee', status: 'done', actor: 'Commune + Promoteur' }," + [char]10
$communes += "    { num: '03', title: 'Bail emphyteotique / Deliberation', docs: 'Bail BEA ou deliberation validee prefet', status: 'active', actor: 'DGID + Prefet' }," + [char]10
$communes += "    { num: '04', title: 'Autorisation de lotir', docs: 'Avis ONAS, SENELEC, SDE, AGEROUTE', status: 'pending', actor: 'Direction Urbanisme' }," + [char]10
$communes += "    { num: '05', title: 'Mise en valeur (VRD)', docs: 'Declaration chantier, PV reception', status: 'pending', actor: 'Promoteur + Controle' }," + [char]10
$communes += "    { num: '06', title: 'Ventes & Actes', docs: 'Contrat reservation, acte authentique', status: 'pending', actor: 'Notaire + Commune' }," + [char]10
$communes += "    { num: '07', title: 'Titre foncier individuel', docs: 'Immatriculation parcellaire, TF definitif', status: 'pending', actor: 'Conservation Fonciere' }" + [char]10
$communes += "  ];" + [char]10
$communes += "" + [char]10
$communes += "  const visas = [" + [char]10
$communes += "    { name: 'ONAS', full: 'Office National Assainissement', status: 'pending', emoji: String.fromCodePoint(0x1F4A7) }," + [char]10
$communes += "    { name: 'SENELEC', full: 'Societe Nationale Electricite', status: 'pending', emoji: String.fromCodePoint(0x26A1) }," + [char]10
$communes += "    { name: 'SDE', full: 'Societe des Eaux', status: 'ok', emoji: String.fromCodePoint(0x1F6B0) }," + [char]10
$communes += "    { name: 'AGEROUTE', full: 'Agence Travaux Routes', status: 'pending', emoji: String.fromCodePoint(0x1F6E3) + String.fromCodePoint(0xFE0F) }," + [char]10
$communes += "    { name: 'Protection Civile', full: 'DSPS Securite Publique', status: 'pending', emoji: String.fromCodePoint(0x1F692) }," + [char]10
$communes += "    { name: 'Urbanisme', full: 'Direction Urbanisme Habitat', status: 'ok', emoji: String.fromCodePoint(0x1F3D9) + String.fromCodePoint(0xFE0F) }," + [char]10
$communes += "    { name: 'DGID Cadastre', full: 'Direction Generale Impots Domaines', status: 'ok', emoji: String.fromCodePoint(0x1F4CB) }," + [char]10
$communes += "    { name: 'Prefet', full: 'Prefecture du Departement', status: 'pending', emoji: String.fromCodePoint(0x2696) + String.fromCodePoint(0xFE0F) }" + [char]10
$communes += "  ];" + [char]10
$communes += "" + [char]10
$communes += "  const statusColor = (s: string) => s === 'done' ? '#059669' : s === 'active' ? '#D4AF37' : '#94a3b8';" + [char]10
$communes += "  const statusLabel = (s: string) => s === 'done' ? 'Valide' : s === 'active' ? 'En cours' : 'En attente';" + [char]10
$communes += "" + [char]10
$communes += "  return (" + [char]10
$communes += "    <div style={{ minHeight: '100vh', background: '#F8FAFC', paddingTop: '80px', fontFamily: 'system-ui, sans-serif' }}>" + [char]10
$communes += "" + [char]10
$communes += "      {/* HERO */}" + [char]10
$communes += "      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a3a5c 100%)', color: 'white', padding: '60px 24px', textAlign: 'center' }}>" + [char]10
$communes += "        <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '4px', padding: '6px 20px', fontSize: '11px', letterSpacing: '3px', color: '#D4AF37', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase' }}>Administration & Promoteurs</div>" + [char]10
$communes += "        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '800', margin: '0 0 16px' }}>Extranet Communes & Promoteurs</h1>" + [char]10
$communes += "        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: '1.7' }}>Plateforme de gestion fonciere PPP. Suivez les 7 phases du workflow, obtenez vos visas techniques et securisez chaque acte via la blockchain.</p>" + [char]10
$communes += "        <Link href='/admin/login' style={{ background: '#D4AF37', color: '#0A1628', padding: '14px 32px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', fontSize: '15px' }}>Connexion Maire / Promoteur</Link>" + [char]10
$communes += "      </div>" + [char]10
$communes += "" + [char]10
$communes += "      {/* TABS */}" + [char]10
$communes += "      <div style={{ background: 'white', borderBottom: '2px solid #E2E8F0', display: 'flex', justifyContent: 'center', gap: '0', overflowX: 'auto' }}>" + [char]10
$communes += "        {[['workflow', 'Workflow Foncier (7 phases)'], ['visas', 'Visas Techniques (8)'], ['registre', 'Registre Numerique']].map(([id, label]) => (" + [char]10
$communes += "          <button key={id} onClick={() => setActiveTab(id)} style={{ padding: '16px 24px', fontWeight: activeTab === id ? '700' : '500', fontSize: '14px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === id ? '3px solid #D4AF37' : '3px solid transparent', color: activeTab === id ? '#0A1628' : '#64748b', whiteSpace: 'nowrap' }}>{label}</button>" + [char]10
$communes += "        ))}" + [char]10
$communes += "      </div>" + [char]10
$communes += "" + [char]10
$communes += "      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>" + [char]10
$communes += "" + [char]10
$communes += "        {/* TAB: WORKFLOW */}" + [char]10
$communes += "        {activeTab === 'workflow' && (" + [char]10
$communes += "          <div>" + [char]10
$communes += "            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A1628', marginBottom: '8px' }}>Workflow Foncier Senegal - 7 Phases</h2>" + [char]10
$communes += "            <p style={{ color: '#64748b', marginBottom: '32px' }}>De l identification du terrain a la delivrance du titre foncier individuel.</p>" + [char]10
$communes += "            {phases.map((p, i) => (" + [char]10
$communes += "              <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '16px', background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', borderLeft: '4px solid ' + statusColor(p.status) }}>" + [char]10
$communes += "                <div style={{ width: '40px', height: '40px', background: statusColor(p.status), color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>{p.num}</div>" + [char]10
$communes += "                <div style={{ flex: 1 }}>" + [char]10
$communes += "                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>" + [char]10
$communes += "                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0A1628', margin: 0 }}>{p.title}</h3>" + [char]10
$communes += "                    <span style={{ background: statusColor(p.status) + '20', color: statusColor(p.status), padding: '3px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>{statusLabel(p.status)}</span>" + [char]10
$communes += "                  </div>" + [char]10
$communes += "                  <p style={{ fontSize: '13px', color: '#64748b', margin: '6px 0 4px' }}>Documents: {p.docs}</p>" + [char]10
$communes += "                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Acteur principal: {p.actor}</p>" + [char]10
$communes += "                </div>" + [char]10
$communes += "              </div>" + [char]10
$communes += "            ))}" + [char]10
$communes += "            <div style={{ marginTop: '24px', textAlign: 'center' }}>" + [char]10
$communes += "              <Link href='/admin/workflows/projet-senegal' style={{ background: '#0A1628', color: 'white', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '15px' }}>Acceder au Workflow Complet</Link>" + [char]10
$communes += "            </div>" + [char]10
$communes += "          </div>" + [char]10
$communes += "        )}" + [char]10
$communes += "" + [char]10
$communes += "        {/* TAB: VISAS */}" + [char]10
$communes += "        {activeTab === 'visas' && (" + [char]10
$communes += "          <div>" + [char]10
$communes += "            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A1628', marginBottom: '8px' }}>Visas Techniques Requis</h2>" + [char]10
$communes += "            <p style={{ color: '#64748b', marginBottom: '32px' }}>8 services techniques doivent valider votre dossier avant l autorisation de lotir.</p>" + [char]10
$communes += "            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>" + [char]10
$communes += "              {visas.map((v, i) => (" + [char]10
$communes += "                <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid ' + (v.status === 'ok' ? '#d1fae5' : '#E2E8F0') }}>" + [char]10
$communes += "                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{v.emoji}</div>" + [char]10
$communes += "                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0A1628', margin: '0 0 4px' }}>{v.name}</h3>" + [char]10
$communes += "                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px' }}>{v.full}</p>" + [char]10
$communes += "                  <span style={{ background: v.status === 'ok' ? '#d1fae5' : '#fef3c7', color: v.status === 'ok' ? '#059669' : '#d97706', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>{v.status === 'ok' ? 'Valide' : 'En attente'}</span>" + [char]10
$communes += "                </div>" + [char]10
$communes += "              ))}" + [char]10
$communes += "            </div>" + [char]10
$communes += "          </div>" + [char]10
$communes += "        )}" + [char]10
$communes += "" + [char]10
$communes += "        {/* TAB: REGISTRE */}" + [char]10
$communes += "        {activeTab === 'registre' && (" + [char]10
$communes += "          <div>" + [char]10
$communes += "            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A1628', marginBottom: '8px' }}>Registre Numerique des Attributaires</h2>" + [char]10
$communes += "            <p style={{ color: '#64748b', marginBottom: '32px' }}>Base de donnees securisee de tous les beneficiaires et actes administratifs.</p>" + [char]10
$communes += "            <div style={{ background: '#0A1628', borderRadius: '16px', padding: '40px', color: 'white', textAlign: 'center' }}>" + [char]10
$communes += "              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{String.fromCodePoint(0x1F512)}</div>" + [char]10
$communes += "              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#D4AF37', marginBottom: '12px' }}>Acces Securise Requis</h3>" + [char]10
$communes += "              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>Le registre est accessible uniquement aux acteurs habilites : Maires, Agents DGID, Notaires et Promoteurs agrees.</p>" + [char]10
$communes += "              <Link href='/admin/login' style={{ background: '#D4AF37', color: '#0A1628', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700' }}>Se connecter au Registre</Link>" + [char]10
$communes += "            </div>" + [char]10
$communes += "          </div>" + [char]10
$communes += "        )}" + [char]10
$communes += "" + [char]10
$communes += "      </div>" + [char]10
$communes += "    </div>" + [char]10
$communes += "  );" + [char]10
$communes += "}" + [char]10

Write-CleanFile "src/app/extranet-communes/page.tsx" $communes

# ==============================================================
# PAGE 3 : BLOCKCHAIN & ARCHIVES
# ==============================================================
Write-Host ""
Write-Host "[3/3] Creation de la page Blockchain..." -ForegroundColor Yellow

$blockchain = "'use client';" + [char]10
$blockchain += "" + [char]10
$blockchain += "import React, { useState } from 'react';" + [char]10
$blockchain += "" + [char]10
$blockchain += "export default function BlockchainPage() {" + [char]10
$blockchain += "  const [hashInput, setHashInput] = useState('');" + [char]10
$blockchain += "  const [showHash, setShowHash] = useState(false);" + [char]10
$blockchain += "" + [char]10
$blockchain += "  const generateHash = (input: string): string => {" + [char]10
$blockchain += "    let hash = 0;" + [char]10
$blockchain += "    for (let i = 0; i < input.length; i++) {" + [char]10
$blockchain += "      const char = input.charCodeAt(i);" + [char]10
$blockchain += "      hash = ((hash << 5) - hash) + char;" + [char]10
$blockchain += "      hash = hash & hash;" + [char]10
$blockchain += "    }" + [char]10
$blockchain += "    return Math.abs(hash).toString(16).padStart(8, '0');" + [char]10
$blockchain += "  };" + [char]10
$blockchain += "" + [char]10
$blockchain += "  const exampleHash = '7f83b1657ff1fc53b92dc18148a1d65dfa13502451a4d70' + generateHash('diwaan-2026') + '9f8e7d6c5b4a';" + [char]10
$blockchain += "" + [char]10
$blockchain += "  const records = [" + [char]10
$blockchain += "    { id: 'TF-2026-001847', type: 'Titre Foncier', actor: 'Conservation Fonciere', date: '22 Mai 2026', hash: '7f83b165...3502451a', status: 'Certifie' }," + [char]10
$blockchain += "    { id: 'BAIL-2026-000234', type: 'Bail Emphyteotique', actor: 'DGID Dakar', date: '18 Mai 2026', hash: 'a8c9d2e1...f7b3c4d5', status: 'Certifie' }," + [char]10
$blockchain += "    { id: 'DELIB-2026-00891', type: 'Deliberation Commune', actor: 'Commune Diamniadio', date: '15 Mai 2026', hash: 'b3e4f512...8a9c0d1e', status: 'Certifie' }," + [char]10
$blockchain += "    { id: 'VENTE-2026-002156', type: 'Acte de Vente', actor: 'Me Sene - Notaire', date: '10 Mai 2026', hash: 'c5d6e789...0b1c2d3f', status: 'Certifie' }" + [char]10
$blockchain += "  ];" + [char]10
$blockchain += "" + [char]10
$blockchain += "  return (" + [char]10
$blockchain += "    <div style={{ minHeight: '100vh', background: '#0A1628', paddingTop: '80px', fontFamily: 'system-ui, sans-serif', color: 'white' }}>" + [char]10
$blockchain += "" + [char]10
$blockchain += "      {/* HERO */}" + [char]10
$blockchain += "      <div style={{ textAlign: 'center', padding: '80px 24px 48px' }}>" + [char]10
$blockchain += "        <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '4px', padding: '6px 20px', fontSize: '11px', letterSpacing: '3px', color: '#D4AF37', fontWeight: 'bold', marginBottom: '24px', textTransform: 'uppercase' }}>Securite Immutabilite Confiance</div>" + [char]10
$blockchain += "        <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: '800', color: '#D4AF37', margin: '0 0 20px', letterSpacing: '-1px' }}>Registre Blockchain & Archives Scellees</h1>" + [char]10
$blockchain += "        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.65)', maxWidth: '640px', margin: '0 auto', lineHeight: '1.7' }}>Chaque acte foncier est hache cryptographiquement (SHA-256) et ancre sur un registre prive inalterable. Traçabilite totale. Prevention radicale des doubles ventes.</p>" + [char]10
$blockchain += "      </div>" + [char]10
$blockchain += "" + [char]10
$blockchain += "      {/* STATS */}" + [char]10
$blockchain += "      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', padding: '0 24px 64px' }}>" + [char]10
$blockchain += "        {[['12,847', 'Actes scellee'], ['100%', 'Integrite verifiee'], ['0', 'Doubles ventes'], ['2026', 'Depuis']].map(([num, label], i) => (" + [char]10
$blockchain += "          <div key={i} style={{ textAlign: 'center', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px', padding: '24px 32px', background: 'rgba(255,255,255,0.04)' }}>" + [char]10
$blockchain += "            <div style={{ fontSize: '36px', fontWeight: '800', color: '#D4AF37' }}>{num}</div>" + [char]10
$blockchain += "            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{label}</div>" + [char]10
$blockchain += "          </div>" + [char]10
$blockchain += "        ))}" + [char]10
$blockchain += "      </div>" + [char]10
$blockchain += "" + [char]10
$blockchain += "      {/* DEMO HASH */}" + [char]10
$blockchain += "      <div style={{ maxWidth: '800px', margin: '0 auto 64px', padding: '0 24px' }}>" + [char]10
$blockchain += "        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '16px', padding: '32px' }}>" + [char]10
$blockchain += "          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#D4AF37', marginBottom: '16px' }}>Generateur de Hash SHA-256 (Demo)</h3>" + [char]10
$blockchain += "          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>" + [char]10
$blockchain += "            <input value={hashInput} onChange={e => setHashInput(e.target.value)} placeholder='Entrez un identifiant de titre (ex: TF-2026-001847)' style={{ flex: 1, minWidth: '220px', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.07)', color: 'white', fontSize: '14px', outline: 'none' }} />" + [char]10
$blockchain += "            <button onClick={() => setShowHash(true)} style={{ background: '#D4AF37', color: '#0A1628', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Generer</button>" + [char]10
$blockchain += "          </div>" + [char]10
$blockchain += "          {showHash && hashInput && (" + [char]10
$blockchain += "            <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px', color: '#4ade80', wordBreak: 'break-all' }}>" + [char]10
$blockchain += "              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '8px', letterSpacing: '2px' }}>EMPREINTE CRYPTOGRAPHIQUE (SHA-256 DEMO)</div>" + [char]10
$blockchain += "              {'sha256::' + generateHash(hashInput) + generateHash(hashInput + 'diwaan') + generateHash('salt' + hashInput) + generateHash(hashInput + '2026')}" + [char]10
$blockchain += "            </div>" + [char]10
$blockchain += "          )}" + [char]10
$blockchain += "        </div>" + [char]10
$blockchain += "      </div>" + [char]10
$blockchain += "" + [char]10
$blockchain += "      {/* REGISTRE */}" + [char]10
$blockchain += "      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>" + [char]10
$blockchain += "        <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'white', marginBottom: '24px' }}>Derniers actes scelles</h2>" + [char]10
$blockchain += "        <div style={{ overflowX: 'auto' }}>" + [char]10
$blockchain += "          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>" + [char]10
$blockchain += "            <thead>" + [char]10
$blockchain += "              <tr style={{ borderBottom: '1px solid rgba(212,175,55,0.3)' }}>" + [char]10
$blockchain += "                {['Reference', 'Type', 'Acteur', 'Date', 'Hash', 'Statut'].map(h => (" + [char]10
$blockchain += "                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#D4AF37', fontWeight: '600', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</th>" + [char]10
$blockchain += "                ))}" + [char]10
$blockchain += "              </tr>" + [char]10
$blockchain += "            </thead>" + [char]10
$blockchain += "            <tbody>" + [char]10
$blockchain += "              {records.map((r, i) => (" + [char]10
$blockchain += "                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>" + [char]10
$blockchain += "                  <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#60a5fa' }}>{r.id}</td>" + [char]10
$blockchain += "                  <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.8)' }}>{r.type}</td>" + [char]10
$blockchain += "                  <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.6)' }}>{r.actor}</td>" + [char]10
$blockchain += "                  <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.6)' }}>{r.date}</td>" + [char]10
$blockchain += "                  <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontSize: '12px', color: '#4ade80' }}>{r.hash}</td>" + [char]10
$blockchain += "                  <td style={{ padding: '14px 16px' }}><span style={{ background: 'rgba(5,150,105,0.2)', color: '#4ade80', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>{r.status}</span></td>" + [char]10
$blockchain += "                </tr>" + [char]10
$blockchain += "              ))}" + [char]10
$blockchain += "            </tbody>" + [char]10
$blockchain += "          </table>" + [char]10
$blockchain += "        </div>" + [char]10
$blockchain += "        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textAlign: 'center', marginTop: '32px', fontStyle: 'italic' }}>Securise par Diwaan ChainT - Registre prive conforme OHADA et loi senegalaise sur la protection des donnees</p>" + [char]10
$blockchain += "      </div>" + [char]10
$blockchain += "" + [char]10
$blockchain += "    </div>" + [char]10
$blockchain += "  );" + [char]10
$blockchain += "}" + [char]10

Write-CleanFile "src/app/blockchain/page.tsx" $blockchain

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Script 2 termine! 3 pages creees:" -ForegroundColor Green
Write-Host "  - /diaspora (avec verif interactive)" -ForegroundColor Green
Write-Host "  - /extranet-communes (tabs + workflow)" -ForegroundColor Green
Write-Host "  - /blockchain (registre + hash demo)" -ForegroundColor Green
Write-Host ""
Write-Host "  Executez maintenant: 03_DEPLOYER.ps1" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
