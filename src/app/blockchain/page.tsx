'use client';
import React from 'react';

export default function BlockchainPage() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-serif text-[#D4AF37]">Registre Blockchain & Archives Scellées</h1>
          <p className="mt-4 text-xl text-slate-300">Traçabilité immuable, hash SHA-256 et prévention des doubles ventes.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">?? Coffre-fort Numérique</h3>
            <p className="text-slate-300 mb-4">Chaque acte administratif, délibération et titre foncier est haché et stocké de manière immuable.</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Hash SHA-256 généré automatiquement</li>
              <li>• Horodatage certifié</li>
              <li>• Accès restreint par rôle (RBAC)</li>
            </ul>
          </div>
  <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">?? Vérificateur d'Intégrité</h3>
            <p className="text-slate-300 mb-4">Vérifiez l'authenticité de n'importe quel document foncier en comparant son hash avec la blockchain.</p>
            <div className="mt-4 p-4 bg-black/30 rounded font-mono text-xs text-green-400 break-all">
              Exemple Hash: 7f83b1657ff1fc53b92dc18148a1d65dfa1350...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
