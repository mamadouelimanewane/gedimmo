'use client';
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Video, Lock, Hammer } from 'lucide-react';

export default function DiasporaSecure() {
  const features = [
    { title: "Vérification Titres", desc: "Scan QR Code & API DGID en temps réel.", icon: <ShieldCheck size={40} className="text-[#D4AF37]" /> },
    { title: "Visio-Visites", desc: "Visites guidées en direct par agents assermentés.", icon: <Video size={40} className="text-[#D4AF37]" /> },
    { title: "Paiement Escrow", desc: "Fonds bloqués chez notaire jusqu'à signature.", icon: <Lock size={40} className="text-[#D4AF37]" /> },
    { title: "Suivi Chantier", desc: "Caméras live et rapports hebdomadaires.", icon: <Hammer size={40} className="text-[#D4AF37]" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 font-sans">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm mb-4 block">Investissez en toute confiance</span>
        <h1 className="text-5xl md:text-6xl font-bold text-[#0A1628] font-serif mb-6">Diaspora Secure</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          La première plateforme dédiée à la diaspora sénégalaise. Éliminez les risques d'arnaque grâce à notre technologie de vérification blockchain et notre accompagnement juridique complet.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group">
              <div className="mb-6 bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0A1628] mb-3 font-serif">{feat.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A1628] rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Prêt à investir sans risque au Sénégal ?</h2>
            <p className="mb-10 text-slate-300 text-lg max-w-2xl mx-auto">Rejoignez les centaines de membres de la diaspora qui ont sécurisé leur investissement immobilier avec Diwaan.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="bg-[#D4AF37] text-[#0A1628] px-8 py-4 rounded-full font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg">
                Créer un compte sécurisé
              </Link>
              <Link href="/search?category=diaspora-certified" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#0A1628] transition-all duration-300">
                Voir les biens certifiés
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}