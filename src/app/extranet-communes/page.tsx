'use client';
import React from 'react';
import Link from 'next/link';

export default function ExtranetCommunes() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 font-serif">Extranet Communes & Promoteurs</h1>
          <p className="mt-4 text-xl text-slate-600">Gestion foncière, workflows administratifs et visas techniques au Sénégal</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#D4AF37]">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Workflow Foncier</h3>
            <p className="text-slate-600 mb-4">Suivi des 7 phases : Identification, NICAD, Bail, Lotir, VRD, Vente, Titre Foncier.</p>
            <Link href="/admin/workflows/projet-senegal" className="text-[#D4AF37] font-semibold hover:underline">Accéder au Workflow →</Link>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#0A1628]">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Visas Techniques</h3>
            <p className="text-slate-600 mb-4">Validation ONAS, SENELEC, SDE, AGEROUTE et Protection Civile en temps réel.</p>
            <button className="text-[#0A1628] font-semibold hover:underline">Voir les demandes</button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-600">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Registre Numérique</h3>
            <p className="text-slate-600 mb-4">Base de données des attributaires, actes scellés et preuves blockchain.</p>
            <button className="text-green-600 font-semibold hover:underline">Consulter le registre</button>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link href="/admin/login" className="inline-block bg-[#0A1628] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#D4AF37] transition-colors">
            Connexion Maire / Promoteur
          </Link>
        </div>
      </div>
    </div>
  );
}