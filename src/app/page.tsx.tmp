import Link from 'next/link';
import styles from './page.module.css';
import { Search, Building2, User, ArrowRight, Bot, Sparkles, Briefcase } from 'lucide-react';

export default function HomePage() {
    return (
        <main className={styles.main}>
            {/* HERO SECTION */}
            <section className={styles.hero}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.heroVideo}
                    poster="/images/hero-poster.jpg"
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <div className={styles.badge}>
                        <Sparkles size={16} />
                        Proptech N°1 au Sénégal
                    </div>
                    <h1 className={styles.title}>L'Immobilier de Nouvelle Génération.</h1>
                    <p className={styles.subtitle}>
                        Découvrez un écosystème intelligent où locataires, promoteurs et municipalités se rencontrent. Sécurisé avec l'IA et conforme OHADA.
                    </p>
                    
                    <div className={styles.searchContainer}>
                        <div className={styles.searchInputWrapper}>
                            <Search color="#64748b" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher à Dakar, Saly, Diamniadio..."
                                className={styles.searchInput}
                            />
                        </div>
                        <Link href="/search">
                            <button className={styles.searchButton}>
                                Chercher
                            </button>
                        </Link>
                    </div>

                    <div className={styles.quickFilters}>
                        <div className={styles.filterPill}># Villas Saly</div>
                        <div className={styles.filterPill}># Appartements Dakar</div>
                        <div className={styles.filterPill}># Projets Neufs</div>
                        <div className={styles.filterPill}># Bureaux Centre-Ville</div>
                    </div>
                </div>
            </section>

            {/* B2B / B2C ECOSYSTEM PATHS */}
            <section className={`${styles.section} ${styles.sectionLight}`}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Votre portail immobilier</h2>
                    <p className={styles.sectionSubtitle}>
                        Que vous cherchiez la maison de vos rêves ou que vous soyez un professionnel, nous avons l'outil parfait pour vous.
                    </p>
                </div>

                <div className={styles.ecosystemGrid}>
                    <div className={styles.pathCard}>
                        <div className={`${styles.pathIconBox} ${styles.bgBlue}`}>
                            <User size={32} />
                        </div>
                        <h3 className={styles.pathTitle}>Acheteurs & Locataires</h3>
                        <p className={styles.pathDesc}>
                            Explorez le plus grand réseau immobilier du Sénégal. Visites immersives, paiements sécurisés et accompagnement juridique bout en bout.
                        </p>
                        <Link href="/search" className={styles.pathBtn}>
                            Trouver un bien <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className={styles.pathCard}>
                        <div className={`${styles.pathIconBox} ${styles.bgPurple}`}>
                            <Building2 size={32} />
                        </div>
                        <h3 className={styles.pathTitle}>Promoteurs & Communes</h3>
                        <p className={styles.pathDesc}>
                            Virtualisez vos projets. Coffre-fort numérique, signatures probatoires et workflows fluides entre secteur privé et administration.
                        </p>
                        <Link href="/admin" className={styles.pathBtn}>
                            Accéder au Portail Pro <Briefcase size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* AI LEX LEGAL TEASER */}
            <section className={styles.section}>
                <div className={styles.aiSection}>
                    <div className={styles.aiContent}>
                        <span className={styles.aiTag}>Nouveau: Diwaan AI</span>
                        <h2 className={styles.aiTitle}>Votre Juriste Personnel 24/7</h2>
                        <p className={styles.aiDesc}>
                            Notre IA experte "LexAI" analyse vos contrats, vérifie la conformité OHADA et vous guide dans chaque transaction immobilière en toute sérénité.
                        </p>
                        <Link href="/legal-assistant">
                            <button className={styles.aiBtn}>
                                <Bot size={20} />
                                Discuter avec LexAI
                            </button>
                        </Link>
                    </div>
                    <div className={styles.aiVisual}>
                        <div className={styles.chatBubble}>
                            Bonjour, je souhaite acheter un terrain à Diamniadio. Quelles sont les démarches ?
                        </div>
                        <div className={styles.chatBubbleReply}>
                            Pour un terrain à Diamniadio, il est crucial de vérifier d'abord le Titre Foncier (TF) ou le Bail à la conservation foncière. Je peux générer un mandat de vérification pour vous.
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
