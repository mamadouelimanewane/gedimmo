'use client';
import React from 'react';
import Link from 'next/link';
import { FileText, CheckCircle, Database } from 'lucide-react';

export default function ExtranetCommunes() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#0A1628] font-bold tracking-widest uppercase text-sm mb-4 block">Administration & Promoteurs</span>
          <h1 className="text-5xl font-bold text-[#0A1628] font-serif mb-6">Extranet Communes & Promoteurs</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Centralisez la gestion foncière, suivez les workflows administratifs et obtenez vos visas techniques en temps réel.
          </p>
        </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#D4AF37] hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
              <FileText size={32} className="text-[#D4AF37]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A1628] mb-4 font-serif">Workflow Foncier</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">Suivi complet des 7 phases : Identification, NICAD, Bail, Autorisation de lotir, VRD, Vente et Titre Foncier.</p>
            <Link href="/admin/workflows/projet-senegal" className="text-[#D4AF37] font-bold hover:underline flex items-center gap-2">
              Accéder au Workflow <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#0A1628] hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-[#0A1628]/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={32} className="text-[#0A1628]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A1628] mb-4 font-serif">Visas Techniques</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">Validation accélérée par l'ONAS, la SENELEC, la SDE, l'AGEROUTE et la Protection Civile.</p>
            <button className="text-[#0A1628] font-bold hover:underline flex items-center gap-2">
              Voir les demandes <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-600 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Database size={32} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A1628] mb-4 font-serif">Registre Numérique</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">Base de données sécurisée des attributaires, actes scellés et preuves blockchain immuables.</p>
            <button className="text-green-600 font-bold hover:underline flex items-center gap-2">
              Consulter le registre <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="bg-[#0A1628] rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white font-serif mb-6">Accès réservé aux professionnels</h2>
          <Link href="/admin/login" className="inline-block bg-[#D4AF37] text-[#0A1628] px-10 py-4 rounded-full font-bold hover:bg-white transition-colors shadow-lg">
            Connexion Maire / Promoteur
          </Link>
        </div>
      </div>
    </div>
  );
}