'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Moon, Sun, ChevronDown, Globe } from 'lucide-react';

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const { isAuthenticated, logout } = useAuth();

    const toggleLanguage = () => {
        setLanguage(language === 'fr' ? 'wo' : 'fr');
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <nav className={styles.nav}><!-- Liens Modules --> <Link href="/diaspora" class="hover:text-[#D4AF37]">Diaspora</Link> <Link href="/extranet-communes" class="hover:text-[#D4AF37]">Communes</Link> <Link href="/blockchain" class="hover:text-[#D4AF37]">Blockchain</Link>
                    <div className={styles.navItem}>
                        <Link href="/search" className={styles.navLink}>{t.buy} <ChevronDown size={14} style={{ marginLeft: 4 }} /></Link>
                        <div className={styles.dropdownMenu}>
                            <Link href="/search" className={styles.dropdownItem}>Maisons à vendre</Link>
                            <Link href="/search?filter=new" className={styles.dropdownItem}>Programmes neufs</Link>
                            <Link href="/search?filter=coming_soon" className={styles.dropdownItem}>Bientôt disponible</Link>
                            <Link href="/search?filter=open" className={styles.dropdownItem}>Portes ouvertes</Link>
                            <div className={styles.separator} />
                            <Link href="/search?filter=foreclosure" className={styles.dropdownItem}>Saisies immobilières</Link>
                            <Link href="/search?filter=fsbo" className={styles.dropdownItem}>Vente par propriétaire</Link>
                            <Link href="/search?filter=sold" className={styles.dropdownItem}>Vendus récemment</Link>

                            <div className={styles.separator} />
                            <div style={{ fontWeight: 'bold', padding: '12px 24px 4px', fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Financement</div>
                            <Link href="/loans" className={styles.dropdownItem}>Découvrir Diwaan Home Loans</Link>
                            <Link href="/loans/buy-ability" className={styles.dropdownItem}>Calculer votre capacité d'achat</Link>
                            <Link href="/loans/pre-qualify" className={styles.dropdownItem}>Obtenir une pré-qualification</Link>
                            <Link href="/loans#calculator" className={styles.dropdownItem}>Estimer vos mensualités</Link>
                            <Link href="/loans/rates" className={styles.dropdownItem}>Voir les taux actuels</Link>
                            <Link href="/loans/dashboard" className={styles.dropdownItem} style={{ color: '#006AFF' }}>Mon dossier de prêt</Link>
                        </div>
                    </div>

                    <div className={styles.navItem}>
                        <Link href="/rent" className={styles.navLink}>{t.rent} <ChevronDown size={14} style={{ marginLeft: 4 }} /></Link>
                        <div className={styles.dropdownMenu} style={{ minWidth: 300 }}>
                            <div style={{ fontWeight: 'bold', padding: '12px 24px 4px', fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Chercher une location</div>
                            <Link href="/rent" className={styles.dropdownItem}>Appartements à louer</Link>
                            <Link href="/rent?type=house" className={styles.dropdownItem}>Maisons à louer</Link>

                            <div className={styles.separator} />

                            <div style={{ fontWeight: 'bold', padding: '12px 24px 4px', fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Outils de Gestion Locative</div>
                            <Link href="/rent/manager/list" className={styles.dropdownItem}>Publier une location</Link>
                            <Link href="/rent/manager/listings" className={styles.dropdownItem}>Mes Annonces</Link>
                            <Link href="/rent/manager/inbox" className={styles.dropdownItem}>Messagerie</Link>
                            <Link href="/rent/manager/applications" className={styles.dropdownItem}>Dossiers de location</Link>
                            <Link href="/rent/manager/leases" className={styles.dropdownItem}>Baux & Contrats</Link>
                            <Link href="/rent/manager/payments" className={styles.dropdownItem}>Paiements</Link>

                            <div className={styles.separator} />

                            <div style={{ fontWeight: 'bold', padding: '12px 24px 4px', fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>En savoir plus</div>
                            <Link href="/rent/manager" className={styles.dropdownItem}>Diwaan Rental Manager</Link>
                            <Link href="/rent/price-my-rental" className={styles.dropdownItem}>Estimer mon loyer</Link>
                        </div>
                    </div>

                    <div className={styles.navItem}>
                        <Link href="/sell" className={styles.navLink}>{t.sell} <ChevronDown size={14} style={{ marginLeft: 4 }} /></Link>
                        <div className={styles.dropdownMenu}>
                            <div style={{ fontWeight: 'bold', padding: '12px 24px 4px', fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Ressources</div>
                            <Link href="/sell" className={styles.dropdownItem}>Explorer vos options</Link>
                            <Link href="/sell/valuation" className={styles.dropdownItem}>Estimer votre bien (Zestimate)</Link>
                            <Link href="/market-trends" className={styles.dropdownItem}>Marché immobilier Sénégal</Link>
                            <Link href="/guides" className={styles.dropdownItem}>Guide du vendeur</Link>
                            <div className={styles.separator} />
                            <Link href="/agents" className={styles.dropdownItem}>Trouver un agent vendeur</Link>
                            <Link href="/sell/fsbo" className={styles.dropdownItem}>Publier une annonce (Propriétaire)</Link>
                        </div>
                    </div>

                    <div className={styles.navItem}>
                        <Link href="/guides" className={styles.navLink}>Guides <ChevronDown size={14} style={{ marginLeft: 4 }} /></Link>
                        <div className={styles.dropdownMenu}>
                            <Link href="/guides" className={styles.dropdownItem}>Tous les guides</Link>
                            <div className={styles.separator} />
                            <Link href="/guides/acheteur" className={styles.dropdownItem}>Guide de l'Acheteur</Link>
                            <Link href="/guides/vendeur" className={styles.dropdownItem}>Guide du Vendeur</Link>
                            <Link href="/guides/juridique" className={styles.dropdownItem}>Juridique & Fiscalité</Link>
                            <Link href="/guides/financement" className={styles.dropdownItem}>Financement & Prêts</Link>
                            <Link href="/guides/construction" className={styles.dropdownItem}>Construction & Rénovation</Link>
                        </div>
                    </div>

                    <div className={styles.navItem}>
                        <Link href="/legal-assistant" className={styles.navLink}>
                            Assistant IA
                        </Link>
                    </div>

                    <div className={styles.navItem}>
                        <span className={styles.navLink}>{t.agents} <ChevronDown size={14} style={{ marginLeft: 4 }} /></span>
                        <div className={styles.dropdownMenu} style={{ minWidth: 280 }}>
                            <div style={{ padding: '12px 24px 4px', fontSize: '12px', color: '#666', fontWeight: 'bold', textTransform: 'uppercase' }}>Chercher un pro ?</div>
                            <Link href="/agents" className={styles.dropdownItem}>Agents immobiliers</Link>
                            <Link href="/rent/manager" className={styles.dropdownItem}>Gestionnaires de biens</Link>
                            <Link href="/pros/builders" className={styles.dropdownItem}>Constructeurs de maisons</Link>
                            <Link href="/pros" className={styles.dropdownItem}>Photographes immobiliers</Link>

                            <div className={styles.separator} />

                            <div style={{ padding: '12px 24px 4px', fontSize: '12px', color: '#666', fontWeight: 'bold', textTransform: 'uppercase' }}>Je suis un pro</div>
                            <Link href="/pros/solutions" className={styles.dropdownItem}>Solutions pour agents</Link>
                            <Link href="/pros/solutions" className={styles.dropdownItem}>Publicité agent</Link>
                            <Link href="/pros/resources" className={styles.dropdownItem}>Centre de ressources</Link>
                            <Link href="/pros" className={styles.dropdownItem}>Créer un compte gratuit</Link>

                            <div className={styles.separator} />
                            <Link href="/pros/resources/business-plan" className={styles.dropdownItem}>Business Plan Immobilier</Link>
                            <Link href="/pros/resources" className={styles.dropdownItem}>Scripts de vente</Link>
                            <Link href="/pros/resources" className={styles.dropdownItem}>Modèles de flyers</Link>
                        </div>
                    </div>
                </nav>

                <Link href="/" className={styles.logo}>
                    Diwaan
                </Link>

                <div className={styles.actions}>
                    <button onClick={toggleLanguage} className="btn btn-ghost" style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 'bold' }}>
                        <Globe size={18} />
                        {language === 'fr' ? 'FR' : 'WO'}
                    </button>
                    <button onClick={toggleTheme} className="btn btn-ghost" style={{ padding: '8px' }}>
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <Link href="/dashboard" className={styles.navLink}>Mon Tableau de Bord</Link>

                    {isAuthenticated ? (
                        <button onClick={logout} className="btn btn-ghost" style={{ color: 'red' }}>Déconnexion</button>
                    ) : (
                        <Link href="/login" style={{ textDecoration: 'none' }}>
                            <button className="btn btn-ghost">{t.signIn}</button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

