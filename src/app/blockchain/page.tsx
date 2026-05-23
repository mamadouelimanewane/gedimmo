'use client';
import React from 'react';
import { Shield, Hash, Clock, Users } from 'lucide-react';

export default function BlockchainPage() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white pt-24 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold font-serif text-[#D4AF37] mb-6">Registre Blockchain & Archives Scellées</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            La technologie au service de la confiance foncière. Traçabilité immuable, hash SHA-256 et prévention radicale des doubles ventes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#D4AF37]/20 rounded-lg">
                <Shield size={32} className="text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold text-[#D4AF37] font-serif">Coffre-fort Numérique</h3>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Chaque acte administratif, délibération communale et titre foncier est haché cryptographiquement et stocké de manière immuable sur notre registre privé.
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-3"><Hash size={18} className="text-[#D4AF37]" /> Hash SHA-256 généré automatiquement</li>
              <li className="flex items-center gap-3"><Clock size={18} className="text-[#D4AF37]" /> Horodatage certifié et inaltérable</li>
              <li className="flex items-center gap-3"><Users size={18} className="text-[#D4AF37]" /> Accès restreint par rôle (RBAC)</li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#D4AF37]/20 rounded-lg">
                <Hash size={32} className="text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold text-[#D4AF37] font-serif">Vérificateur d'Intégrité</h3>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Garantissez l'authenticité de n'importe quel document foncier en comparant son empreinte numérique avec celle enregistrée sur la blockchain.
            </p>
            <div className="mt-6 p-5 bg-black/40 rounded-xl border border-white/10 font-mono text-xs text-green-400 break-all shadow-inner">
              <div className="text-slate-500 mb-2 uppercase tracking-wider text-[10px]">Exemple d'empreinte cryptographique</div>
              7f83b1657ff1fc53b92dc18148a1d65dfa1350...
            </div>
          </div>
        </div>

        <div className="text-center">
            <p className="text-slate-400 italic">Sécurisé par la technologie Diwaan Chain™ conforme OHADA.</p>
      </div>
      </div>
    </div>
  );
}