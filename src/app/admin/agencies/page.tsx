'use client';
import { useState, useEffect } from 'react';

export default function AgenciesPage() {
    const [agencies, setAgencies] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetch('/api/admin/agencies').then(r => r.json()).then(d => {
            if (d.success) setAgencies(d.agencies);
        });
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch('/api/admin/agencies', {
            method: 'POST',
            body: JSON.stringify({ name, description })
        });
        const data = await res.json();
        if (data.success) {
            setAgencies([...agencies, data.agency]);
            setName('');
            setDescription('');
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B', marginBottom: '24px' }}>Gestion des Agences / Départements</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Ajouter une Agence</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Nom de l'Agence (ex: ONAS)</label>
                            <input value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
                            <input value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '12px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Créer l'Agence</button>
                    </form>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Liste des Agences</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '12px' }}>Nom</th>
                                <th style={{ padding: '12px' }}>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agencies.map(a => (
                                <tr key={a.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{a.name}</td>
                                    <td style={{ padding: '12px', color: '#666' }}>{a.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
