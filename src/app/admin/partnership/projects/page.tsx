'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PartnershipProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, active: 0, availablePlots: 0 });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();

            if (data.success) {
                setProjects(data.projects);
                setStats({
                    total: data.count || 0,
                    active: data.projects.filter((p: any) => p.status === 'ACTIVE').length,
                    availablePlots: data.projects.reduce((sum: number, p: any) => sum + (p.availablePlots || 0), 0)
                });
            }
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
                    <p>Chargement des projets...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B', marginBottom: '8px' }}>
                    🏗️ Projets Immobiliers (Promoteurs)
                </h1>
                <p style={{ color: '#888' }}>Supervision des programmes neufs et lotissements</p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <StatCard icon="🏢" title="Total Projets" value={stats.total} color="#4318FF" />
                <StatCard icon="🟢" title="Projets Actifs" value={stats.active} color="#05CD99" />
                <StatCard icon="📍" title="Lots Disponibles" value={stats.availablePlots} color="#006AFF" />
            </div>

            {/* Actions */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B' }}>
                    Liste des Projets ({projects.length})
                </h2>
                <button
                    onClick={() => window.location.href = '/admin/partnership/projects/new'}
                    style={{
                        background: '#006AFF',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    + Nouveau Projet
                </button>
            </div>

            {/* Liste */}
            {projects.length === 0 ? (
                <div style={{ background: 'white', padding: '60px', borderRadius: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏢</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Aucun projet</h3>
                    <p style={{ color: '#888', marginBottom: '24px' }}>Aucun projet immobilier n'a été créé.</p>
                </div>
            ) : (
                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#F4F7FE' }}>
                            <tr>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1B254B' }}>Nom du Projet</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1B254B' }}>Localisation</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1B254B' }}>Promoteur</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1B254B' }}>Lots</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1B254B' }}>Statut</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1B254B' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: 'bold', color: '#1B254B', marginBottom: '4px' }}>{project.name}</div>
                                        <div style={{ fontSize: '12px', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{project.description}</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontSize: '14px', color: '#1B254B', marginBottom: '4px' }}>{project.city}</div>
                                        <div style={{ fontSize: '12px', color: '#888' }}>{project.region}</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{ color: '#1B254B' }}>{project.developer?.legalName || 'N/A'}</span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontSize: '12px' }}>
                                            <span style={{ color: '#05CD99', fontWeight: 'bold' }}>{project.availablePlots}</span> dispos / {project.totalPlots} total
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#888' }}>
                                            {project.soldPlots} vendus
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            background: project.status === 'ACTIVE' ? '#E6F8F1' : (project.status === 'PLANNING' ? '#FEF3C7' : '#F1F5F9'),
                                            color: project.status === 'ACTIVE' ? '#05CD99' : (project.status === 'PLANNING' ? '#D97706' : '#64748B')
                                        }}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <Link href={`/admin/partnership/projects/${project.id}`}>
                                            <button style={{
                                                background: '#006AFF',
                                                color: 'white',
                                                border: 'none',
                                                padding: '6px 12px',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '12px'
                                            }}>
                                                Voir
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function StatCard({ icon, title, value, color }: any) {
    return (
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</div>
            <div style={{ fontSize: '12px', color: '#A3AED0', marginBottom: '4px' }}>{title}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color }}>{value}</div>
        </div>
    );
}
