import React, { useState } from 'react';
import { ShieldCheck, Video, FileText, Globe, Lock, TrendingUp, UserCheck, Camera, DollarSign, AlertTriangle, CheckCircle, Smartphone, Users, Award } from 'lucide-react';

const DiasporaPortal = () => {
  const [activeTab, setActiveTab] = useState('verify');

  // Données simulées pour la démo
  const verifiedProperties = [
    {
      id: 'PROP-2024-001',
      title: 'Villa Les Almadies - Dakar',
      price: '120,000,000 FCFA',
      status: 'Titre Foncier Vérifié',
      blockchainHash: '0x7a8...3f9b',
      progress: 100,
      ownerVerified: true
    },
    {
      id: 'PROP-2024-008',
      title: 'Appartement Diamniadio Smart City',
      price: '45,000,000 FCFA',
      status: 'Bail Emphytéotique Validé',
      blockchainHash: '0x9c2...1a4d',
      progress: 85,
      ownerVerified: true
    },
    {
      id: 'PROP-2024-015',
      title: 'Résidence Saly Portudal',
      price: '85,000,000 FCFA',
      status: 'Permis de Construire OK',
      blockchainHash: '0x4b1...8e2c',
      progress: 60,
      ownerVerified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 pb-20">
      {/* Hero Section - Rassurante */}
      <section className="relative bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 mb-6 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm font-medium">Certifié Anti-Fraude & Conforme OHADA</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 leading-tight">
            Investissez au Sénégal <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              en Toute Sécurité
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Le premier portail dédié à la <strong className="text-white">Diaspora Sénégalaise</strong>. 
            Vérification blockchain, paiements séquestres et suivi de chantier en temps réel. 
            <br className="hidden md:block"/>Ne vous faites plus jamais arnaquer sur vos investissements immobiliers.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
              <UserCheck className="w-5 h-5" />
              Vérifier un Bien Gratuitement
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
              <Video className="w-5 h-5" />
              Visites Virtuelles 360°
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: CheckCircle, label: '100% Biens Vérifiés', sub: 'Par notaires agréés' },
              { icon: Lock, label: 'Paiement Séquestre', sub: '0% Risque financier' },
              { icon: Smartphone, label: 'Support 24/7', sub: 'WhatsApp & Téléphone' },
              { icon: Award, label: 'Garantie Totale', sub: 'Remboursé si fraude' }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <item.icon className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="font-bold text-white">{item.label}</div>
                <div className="text-xs text-slate-400">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Dashboard Tabs */}
      <section className="container mx-auto px-4 py-16 -mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto scrollbar-hide border-b border-slate-200 dark:border-slate-800">
            {[
              { id: 'verify', icon: ShieldCheck, label: 'Vérificateur Anti-Arnaque' },
              { id: 'properties', icon: Globe, label: 'Biens Certifiés' },
              { id: 'escrow', icon: DollarSign, label: 'Paiement Sécurisé' },
              { id: 'monitoring', icon: Camera, label: 'Suivi Chantier Live' },
              { id: 'support', icon: Users, label: 'Assistance Juridique' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-blue-900 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-900/10'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8 min-h-[600px]">
            {/* TAB 1: VERIFY */}
            {activeTab === 'verify' && (
              <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h2 className="text-3xl font-playfair font-bold text-blue-900 dark:text-white mb-3">
                    Vérifiez n'importe quel bien en 2 minutes
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Entrez le NICAD, le nom du promoteur ou l'adresse pour obtenir un audit complet basé sur les registres officiels et la blockchain.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
                  <input
                    type="text"
                    placeholder="Ex: NICAD SN-12345, Nom du promoteur, Adresse..."
                    className="flex-1 px-6 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-lg focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 outline-none transition-all dark:bg-slate-800 dark:text-white"
                  />
                  <button className="px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap">
                    🚀 Lancer l'Audit
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                    <h3 className="font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2 text-lg">
                      <CheckCircle className="w-5 h-5" />
                      Ce que nous vérifions
                    </h3>
                    <ul className="space-y-3 text-sm text-green-700 dark:text-green-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span><strong>Titre Foncier :</strong> Existence réelle vérifiée à la Conservation Foncière</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span><strong>Non-Gage :</strong> Absence de litiges, saisies ou hypothèques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span><strong>Identité Vendeur :</strong> KYC biométrique et vérification fiscale (NINEA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span><strong>Urbanisme :</strong> Permis de construire valide et conformité POS/PDU</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span><strong>Historique :</strong> Traçabilité complète des ventes (anti-double vente)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-4 flex items-center gap-2 text-lg">
                      <Award className="w-5 h-5" />
                      Garantie Diwaan Immo
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-6 leading-relaxed">
                      Si un bien certifié <strong className="text-green-600">"Vert"</strong> sur notre plateforme s'avère être une arnaque ou présente un vice juridique caché, 
                      Diwaan Immo couvre jusqu'à <strong className="text-yellow-600">100% des frais de notaire</strong> engagés et vous assiste gratuitement dans les procédures de recouvrement.
                    </p>
                    <button className="w-full py-3 px-4 bg-white dark:bg-slate-800 border-2 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                      📄 Télécharger les conditions de garantie (PDF)
                    </button>
                  </div>
                </div>

                {/* Sample Report */}
                <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-4">Exemple de rapport d'audit</h4>
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-green-600">CONFORME</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Score: 98/100</Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Parcelle NICAD SN-2024-0892 - Lotissement Les Cocotiers, Dakar</p>
                      <p className="text-xs text-slate-500 mt-1">Vérifié le 21 Mai 2024 • Hash Blockchain: 0x7a8f...3f9b</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-900 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors">
                      Voir le rapport complet
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PROPERTIES */}
            {activeTab === 'properties' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-playfair font-bold text-blue-900 dark:text-white">
                    Biens Certifiés pour la Diaspora
                  </h2>
                  <div className="flex gap-2">
                    <select className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm dark:text-white">
                      <option>Toutes les régions</option>
                      <option>Dakar</option>
                      <option>Saly</option>
                      <option>Diamniadio</option>
                    </select>
                    <select className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm dark:text-white">
                      <option>Tous prix</option>
                      <option>&lt; 50M FCFA</option>
                      <option>50M - 100M FCFA</option>
                      <option>&gt; 100M FCFA</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {verifiedProperties.map((prop) => (
                    <div key={prop.id} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:border-yellow-500/50 transition-all duration-300">
                      <div className="relative h-48 bg-slate-200 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                          <Globe className="w-16 h-16 text-slate-500/50" />
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                            <ShieldCheck className="w-3 h-3" />
                            Certifié
                          </span>
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-blue-900/90 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
                            {prop.id}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-lg text-slate-800 dark:text-white line-clamp-1">{prop.title}</h3>
                          <span className="font-playfair text-blue-900 dark:text-yellow-500 font-bold whitespace-nowrap">{prop.price}</span>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                            <FileText className="w-3 h-3 mr-2" />
                            <span>Statut: <strong className="text-green-600">{prop.status}</strong></span>
                          </div>
                          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                            <Lock className="w-3 h-3 mr-2" />
                            <span className="font-mono">Blockchain: {prop.blockchainHash}</span>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs mb-2 text-slate-600 dark:text-slate-400">
                              <span>Avancement du projet</span>
                              <span className="font-bold">{prop.progress}%</span>
                            </div>
                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full transition-all duration-500"
                                style={{ width: `${prop.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <button className="flex-1 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                            <Video className="w-4 h-4" />
                            Visite 360°
                          </button>
                          <button className="px-4 py-2.5 border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-sm font-semibold rounded-lg transition-colors">
                            Audit PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: ESCROW */}
            {activeTab === 'escrow' && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-playfair font-bold text-blue-900 dark:text-white mb-3">
                    Votre argent est 100% protégé
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Grâce au système de paiement séquestre, vos fonds sont bloqués chez un notaire tiers jusqu'à la validation de chaque étape du projet.
                  </p>
                </div>

                <div className="relative pl-8 border-l-4 border-slate-200 dark:border-slate-700 space-y-10 my-12">
                  {[
                    {
                      num: 1,
                      color: 'bg-green-500',
                      title: 'Signature du Contrat',
                      desc: 'Vous signez électroniquement le contrat de réservation avec validation biométrique.',
                      icon: '✍️'
                    },
                    {
                      num: 2,
                      color: 'bg-blue-500',
                      title: 'Dépôt des Fonds (Séquestre)',
                      desc: 'Vous versez l\'acompte. L\'argent est immédiatement bloqué sur le Compte Tiers Détenteur du notaire partenaire. Inaccessible par le promoteur.',
                      icon: '🔒'
                    },
                    {
                      num: 3,
                      color: 'bg-orange-500',
                      title: 'Réalisation des Jalons',
                      desc: 'Le promoteur construit selon le calendrier. Vous suivez l\'avancement en temps réel via webcams et rapports certifiés.',
                      icon: '🏗️'
                    },
                    {
                      num: 4,
                      color: 'bg-purple-500',
                      title: 'Validation & Déblocage',
                      desc: 'Une fois le jalon validé par vos soins et le géomètre (ex: Titre Foncier émis), le notaire débloque automatiquement les fonds correspondants.',
                      icon: '✅'
                    }
                  ].map((step) => (
                    <div key={step.num} className="relative">
                      <div className={`absolute -left-[54px] ${step.color} text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg ring-4 ring-white dark:ring-slate-900`}>
                        {step.num}
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                        <div className="text-3xl mb-2">{step.icon}</div>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-white mb-2">{step.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-blue-900 dark:text-white mb-2">Sécurité Bancaire de Niveau Maximum</h4>
                      <p className="text-blue-700 dark:text-blue-300 leading-relaxed mb-4">
                        Les fonds sont déposés sur un <strong>compte séquestre notarial</strong> (Compte Tiers Détenteur) régulé par l'<strong>Ordre des Notaires du Sénégal</strong> et garanti par la <strong>BCEAO</strong>. 
                        Aucun promoteur ne peut y accéder sans votre validation explicite et celle du géomètre expert.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 bg-white dark:bg-slate-800 text-blue-800 dark:text-blue-300 text-sm font-semibold rounded-full border border-blue-200 dark:border-blue-700">
                          ✓ Regularisé BCEAO
                        </span>
                        <span className="px-3 py-1 bg-white dark:bg-slate-800 text-blue-800 dark:text-blue-300 text-sm font-semibold rounded-full border border-blue-200 dark:border-blue-700">
                          ✓ Assurance Groupama
                        </span>
                        <span className="px-3 py-1 bg-white dark:bg-slate-800 text-blue-800 dark:text-blue-300 text-sm font-semibold rounded-full border border-blue-200 dark:border-blue-700">
                          ✓ Audit trimestriel
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: MONITORING */}
            {activeTab === 'monitoring' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-playfair font-bold text-blue-900 dark:text-white mb-3">
                    Suivez votre investissement en temps réel
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Webcams HD, drones et rapports certifiés pour une transparence totale depuis l'étranger.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Live Camera */}
                  <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="relative aspect-video">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        <Camera className="w-20 h-20 text-slate-600" />
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-full border-4 border-red-500 animate-pulse flex items-center justify-center mb-3 bg-red-500/20 backdrop-blur-sm">
                          <div className="w-10 h-10 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="font-bold text-white tracking-wider text-lg">EN DIRECT</span>
                        <span className="text-slate-300 text-sm mt-1">Lotissement Les Manguiers - Phase 2</span>
                        <span className="text-slate-400 text-xs mt-1">Dakar, Sénégal • 14:32 GMT</span>
                      </div>
                      <button className="absolute bottom-4 right-4 px-4 py-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-sm font-semibold rounded-lg border border-white/30 transition-colors flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Plein Écran
                      </button>
                    </div>
                    <div className="p-4 bg-slate-800 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm text-slate-300">Dernière mise à jour: Il y a 2 min</span>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">
                        Travaux en cours
                      </span>
                    </div>
                  </div>

                  {/* Reports */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-900" />
                      Rapports d'Avancement Certifiés
                    </h3>
                    <div className="space-y-4">
                      {[
                        { date: '15 Mai 2024', title: 'Rapport de Fondations', author: 'Me. Diop, Géomètre', status: 'Validé', type: 'PDF' },
                        { date: '01 Juin 2024', title: 'Photos Aériennes Drone', author: 'Arch. Sow', status: 'Validé', type: 'Galerie' },
                        { date: '20 Juin 2024', title: 'Attestation de Gros Œuvre', author: 'Entreprise Eiffage', status: 'En attente', type: 'PDF' },
                        { date: '10 Juil 2024', title: 'Inspection ONAS', author: 'Technicien ONAS', status: 'Programmé', type: 'Rapport' }
                      ].map((report, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-yellow-500 transition-colors group">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="w-5 h-5 text-blue-900 dark:text-blue-400" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-sm text-slate-800 dark:text-white truncate">{report.title}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{report.date} • {report.author}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                              report.status === 'Validé' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                              report.status === 'En attente' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                              'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                            }`}>
                              {report.status}
                            </span>
                            <button className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-yellow-50 dark:hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100">
                              <TrendingUp className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 py-3 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                      Voir tous les rapports (12)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SUPPORT */}
            {activeTab === 'support' && (
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-playfair font-bold text-blue-900 dark:text-white mb-3">
                    Assistance Juridique Dédiée Diaspora
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Une équipe d'experts disponibles 24/7 pour vous accompagner dans tous vos projets immobiliers au Sénégal.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {[
                    {
                      icon: '📞',
                      title: 'Hotline Prioritaire',
                      desc: 'Numéro vert international disponible 24h/24 et 7j/7',
                      action: '+221 800 000 000',
                      color: 'green'
                    },
                    {
                      icon: '💬',
                      title: 'WhatsApp Dédié',
                      desc: 'Chat direct avec un juriste francophone',
                      action: 'Démarrer une conversation',
                      color: 'blue'
                    },
                    {
                      icon: '📧',
                      title: 'Email Support',
                      desc: 'Réponse garantie sous 2 heures ouvrées',
                      action: 'support@diwaan.sn',
                      color: 'purple'
                    },
                    {
                      icon: '🎥',
                      title: 'Visioconférence',
                      desc: 'Rendez-vous vidéo avec notaire ou conseiller',
                      action: 'Prendre rendez-vous',
                      color: 'orange'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className={`p-6 rounded-2xl border-2 border-${item.color}-200 dark:border-${item.color}-800 bg-${item.color}-50 dark:bg-${item.color}-900/20 hover:shadow-lg transition-shadow`}>
                      <div className="text-4xl mb-3">{item.icon}</div>
                      <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{item.desc}</p>
                      <button className={`w-full py-3 px-4 bg-${item.color}-600 hover:bg-${item.color}-700 text-white font-semibold rounded-xl transition-colors`}>
                        {item.action}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-6">Questions Fréquentes de la Diaspora</h3>
                  <div className="space-y-4">
                    {[
                      { q: 'Comment vérifier qu\'un terrain n\'est pas vendu à plusieurs personnes ?', a: 'Notre système blockchain enregistre chaque transaction de manière immuable. Avant toute vente, nous effectuons une recherche approfondie à la Conservation Foncière et générons un certificat de non-gage.' },
                      { q: 'Puis-je acheter sans venir au Sénégal ?', a: 'Absolument ! 85% de nos clients diaspora achètent 100% à distance grâce à la signature électronique certifiée, aux visites virtuelles et à notre assistance juridique complète.' },
                      { q: 'Que se passe-t-il si le promoteur ne respecte pas les délais ?', a: 'Le contrat inclut des pénalités de retard automatiques. De plus, les fonds étant en séquestre, vous pouvez suspendre les déblocages en cas de non-respect du calendrier.' },
                      { q: 'Quels sont les frais totaux pour un achat ?', a: 'En plus du prix du bien, comptez environ 8-9% de frais (notaire, conservation, enregistrement). Notre simulateur intégré vous donne un chiffrage exact avant toute engagement.' }
                    ].map((faq, idx) => (
                      <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-start gap-2">
                          <span className="text-yellow-500">Q:</span>
                          {faq.q}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 pl-6">
                          <span className="text-blue-500 font-bold">R:</span> {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-950 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Prêt à investir en toute confiance ?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Rejoignez les 5000+ membres de la diaspora qui ont sécurisé leur patrimoine immobilier avec Diwaan Immo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Créer mon compte gratuit
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-300">
              Parler à un conseiller
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Composant Badge simple pour fallback
const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

export default DiasporaPortal;
