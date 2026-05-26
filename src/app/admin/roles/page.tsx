'use client';
import { useState, useEffect } from 'react';

const AVAILABLE_PERMISSIONS = [
    { id: 'READ_PROJECTS', label: 'Voir les projets PPP' },
    { id: 'UPLOAD_DOCUMENTS', label: 'Déposer des documents' },
    { id: 'VALIDATE_VISAS', label: 'Valider des visas techniques' },
    { id: 'FORCE_UNLOCK', label: 'Forcer le déverrouillage des phases' },
    { id: 'MANAGE_USERS', label: 'Gérer les utilisateurs' }
];

export default function RolesPage() {
    const [roles, setRoles] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/admin/roles').then(r => r.json()).then(d => {
            if (d.success) setRoles(d.roles);
        });
    }, []);

    const togglePerm = (perm: string) => {
        if (selectedPerms.includes(perm)) {
            setSelectedPerms(selectedPerms.filter(p => p !== perm));
        } else {
            setSelectedPerms([...selectedPerms, perm]);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch('/api/admin/roles', {
            method: 'POST',
            body: JSON.stringify({ name, description, permissions: selectedPerms })
        });
        const data = await res.json();
        if (data.success) {
            setRoles([...roles, data.role]);
            setName('');
            setDescription('');
            setSelectedPerms([]);
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B', marginBottom: '24px' }}>Gestion des Rôles Spécifiques</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Créer un Rôle Sur-mesure</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Nom du Rôle (ex: Auditeur)</label>
                            <input value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
                            <input value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Permissions Granulaires</label>
                            {AVAILABLE_PERMISSIONS.map(p => (
                                <label key={p.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={selectedPerms.includes(p.id)} onChange={() => togglePerm(p.id)} style={{ marginRight: '8px' }} />
                                    {p.label}
                                </label>
                            ))}
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '12px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Créer le Rôle</button>
                    </form>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Liste des Rôles Spécifiques</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '12px' }}>Rôle</th>
                                <th style={{ padding: '12px' }}>Permissions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(r => (
                                <tr key={r.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{r.name}</td>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                            {r.permissions.map((p: string) => (
                                                <span key={p} style={{ background: '#eef2ff', color: '#4338ca', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>{p}</span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
