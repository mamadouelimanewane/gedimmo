'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PppGedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
        <header style={{ height: '70px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>Admin Commune</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Mairie de Diamniadio</div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              🏛️
            </div>
          </div>
        </header>
        <div style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
