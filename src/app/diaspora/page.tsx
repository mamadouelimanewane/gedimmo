'use client';
import React from 'react';
import Link from 'next/link';

export default function DiasporaSecure() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-bold tracking-wider uppercase text-sm">Investissez en toute confiance</span>
          <h1 className="text-5xl font-bold text-[#0A1628] mt-2 font-serif">Diaspora Secure</h1>
          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
            La plateforme n°1 pour la diaspora sénégalaise. Anti-arnaque, visites virtuelles certifiées et paiement séquestre.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { title: "Vérification Titres", desc: "Scan QR Code & API DGID en temps réel.", icon: "🛡️" },
            { title: "Visio-Visites", desc: "Visites guidées en direct par agents assermentés.", icon": "📹" },
            { title: "Paiement Escrow", desc: "Fonds bloqués chez notaire jusqu'à signature.", icon: "🔒" },
            { title: "Suivi Chantier", desc: "Caméras live et rapports hebdomadaires.", icon: "🏗️" }
          ].map((feat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <div className="text-4xl mb-4">{feat.icon}</div>
              <h3 className="text-lg font-bold text-[#0A1628] mb-2">{feat.title}</h3>
              <p className="text-slate-600 text-sm">{feat.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#0A1628] rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold font-serif mb-6">Prêt à investir sans risque ?</h2>
            <p className="mb-8 text-slate-300">Rejoignez les 500+ membres de la diaspora qui ont sécurisé leur investissement avec Diwaan.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="bg-[#D4AF37] text-[#0A1628] px-8 py-4 rounded-full font-bold hover:bg-white transition-colors">
                Créer un compte sécurisé
              </Link>
              <Link href="/search?category=diaspora-certified" className="border border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#0A1628] transition-colors">
                Voir les biens certifiés
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}