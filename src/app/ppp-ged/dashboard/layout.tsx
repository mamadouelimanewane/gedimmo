'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PppGedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Mock State for Role Testing
  const [userRole, setUserRole] = useState({ role: 'COMMUNE_ADMIN', department: undefined as string | undefined });


  const links = [
    { href: '/ppp-ged/dashboard', label: 'Tableau de bord', icon: '📊' },
    { href: '/ppp-ged/dashboard/projects', label: 'Projets PPP', icon: '🏗️' },
    { href: '/ppp-ged/dashboard/documents', label: 'Tous les documents', icon: '📁' },
    { href: '/ppp-ged/dashboard/visas', label: 'Mes validations (Visas)', icon: '✅' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', background: '#0A1628', color: 'white', padding: '24px 0', flexShrink: 0 }}>
        <div style={{ padding: '0 24px', marginBottom: '40px' }}>
          <Link href="/ppp-ged" style={{ textDecoration: 'none', color: 'white' }}>
            <div style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>
              <span style={{ color: '#D4AF37' }}>PPP</span> Extranet
            </div>
          </Link>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Espace Communes & Promoteurs</div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' }}>
          {links.map(link => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/ppp-ged/dashboard');
            return (
              <Link 
                key={link.href} 
                href={link.href}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
                  borderRadius: '8px', textDecoration: 'none', 
                  background: isActive ? 'rgba(212,175,55,0.1)' : 'transparent',
                  color: isActive ? '#D4AF37' : '#cbd5e1',
                  fontWeight: isActive ? '600' : '500',
                  transition: 'all 0.2s'
                }}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '70px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
          
          {/* SIMULATEUR DE RÔLES POUR LES TESTS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b' }}>Simuler le rôle :</span>
            <select 
              value={userRole.role + (userRole.department ? `:${userRole.department}` : '')}
              onChange={(e) => {
                const val = e.target.value;
                if (val.includes(':')) {
                  const [r, d] = val.split(':');
                  setUserRole({ role: r, department: d });
                } else {
                  setUserRole({ role: val, department: undefined });
                }
              }}
              style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '600', color: '#0f172a', outline: 'none' }}
            >
              <option value="COMMUNE_ADMIN">Commune (Superviseur)</option>
              <option value="PROMOTEUR">Promoteur (Lecture / Dépôt)</option>
              <option value="TECH_AGENT:ONAS">Agent ONAS (Assainissement)</option>
              <option value="TECH_AGENT:SENELEC">Agent SENELEC (Électricité)</option>
              <option value="TECH_AGENT:SDE">Agent SDE (Eaux)</option>
              <option value="TECH_AGENT:Urbanisme">Agent Urbanisme</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                {userRole.role === 'COMMUNE_ADMIN' ? 'Admin Commune' : userRole.role === 'PROMOTEUR' ? 'Promoteur' : `Agent ${userRole.department}`}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {userRole.role === 'COMMUNE_ADMIN' ? 'Mairie de Diamniadio' : userRole.role === 'PROMOTEUR' ? 'Entreprise BTP' : 'Service Technique'}
              </div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              {userRole.role === 'COMMUNE_ADMIN' ? '🏛️' : userRole.role === 'PROMOTEUR' ? '🏗️' : '👷'}
            </div>
          </div>
        </header>
        <div style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
          {/* We pass userRole context via a crude window variable since it's a mock for testing without full Context refactor */}
          {React.cloneElement(children as React.ReactElement, { userRole })}
        </div>
      </main>
    </div>
  );
}
