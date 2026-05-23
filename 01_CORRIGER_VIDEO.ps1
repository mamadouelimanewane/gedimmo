# =============================================================
# SCRIPT 1 - DIWAAN IMMO - CORRIGER LA VIDEO D'ACCUEIL
# Exécuter depuis : C:\gravity\zillow-clone
# =============================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DIWAAN IMMO - Correction Vidéo Hero" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérification du bon dossier
if (!(Test-Path "src/app/page.tsx")) {
    Write-Host "ERREUR: Lancez ce script depuis C:\gravity\zillow-clone" -ForegroundColor Red
    exit 1
}

# --- ETAPE 1 : Diagnostic vidéo ---
Write-Host "[1/4] Diagnostic des fichiers vidéo..." -ForegroundColor Yellow
if (Test-Path "public/videos/hero.mp4") {
    $size = (Get-Item "public/videos/hero.mp4").Length / 1MB
    Write-Host "  OK - hero.mp4 existe ($([math]::Round($size,1)) MB)" -ForegroundColor Green
} else {
    Write-Host "  MANQUANT - hero.mp4 introuvable" -ForegroundColor Red
}
if (Test-Path "public/videos/hero-africa.mp4") {
    Write-Host "  OK - hero-africa.mp4 existe" -ForegroundColor Green
} else {
    Write-Host "  INFO - hero-africa.mp4 absent (normal, on va le gérer)" -ForegroundColor Yellow
}

# --- ETAPE 2 : Lire le fichier page.tsx ---
Write-Host ""
Write-Host "[2/4] Lecture de src/app/page.tsx..." -ForegroundColor Yellow
$content = Get-Content "src/app/page.tsx" -Raw

# Chercher quelle vidéo est référencée
if ($content -match 'hero-africa\.mp4') {
    Write-Host "  La page pointe vers 'hero-africa.mp4' mais ce fichier n'existe pas!" -ForegroundColor Red
    Write-Host "  => Correction: remplacer par 'hero.mp4'" -ForegroundColor Yellow

    $content = $content -replace 'hero-africa\.mp4', 'hero.mp4'
    Write-Host "  Chemin vidéo corrigé vers /videos/hero.mp4" -ForegroundColor Green
} elseif ($content -match 'hero\.mp4') {
    Write-Host "  La page pointe déjà vers 'hero.mp4' - OK" -ForegroundColor Green
} else {
    Write-Host "  Aucune référence vidéo trouvée dans page.tsx" -ForegroundColor Yellow
}

# --- ETAPE 3 : S'assurer que tous les attributs video sont présents ---
Write-Host ""
Write-Host "[3/4] Vérification des attributs de la balise <video>..." -ForegroundColor Yellow

# Corriger la balise video pour autoplay muet en boucle
$videoPatterns = @(
    @{ Pattern = 'autoPlay muted playsInline loop'; Replacement = 'autoPlay muted loop playsInline' },
    @{ Pattern = '<video\s+className=\{styles\.heroVideo\}\s*>'; Replacement = '<video className={styles.heroVideo} autoPlay muted loop playsInline>' }
)

$hasAutoPlay = $content -match 'autoPlay'
$hasMuted    = $content -match '\bmuted\b'
$hasLoop     = $content -match '\bloop\b'
$hasInline   = $content -match 'playsInline'

Write-Host "  autoPlay: $(if($hasAutoPlay){'✓'}else{'MANQUANT'})" -ForegroundColor $(if($hasAutoPlay){'Green'}else{'Red'})
Write-Host "  muted:    $(if($hasMuted){'✓'}else{'MANQUANT'})" -ForegroundColor $(if($hasMuted){'Green'}else{'Red'})
Write-Host "  loop:     $(if($hasLoop){'✓'}else{'MANQUANT'})" -ForegroundColor $(if($hasLoop){'Green'}else{'Red'})
Write-Host "  playsInline: $(if($hasInline){'✓'}else{'MANQUANT'})" -ForegroundColor $(if($hasInline){'Green'}else{'Red'})

# Injecter les attributs manquants sur la ligne autoPlay existante
if ($hasAutoPlay -and (!$hasMuted -or !$hasLoop -or !$hasInline)) {
    $content = $content -replace 'autoPlay(\s+muted)?(\s+loop)?(\s+playsInline)?', 'autoPlay muted loop playsInline'
    Write-Host "  Attributs manquants ajoutés" -ForegroundColor Green
}

# --- ETAPE 4 : Sauvegarder en UTF-8 sans BOM ---
Write-Host ""
Write-Host "[4/4] Sauvegarde de page.tsx (UTF-8 sans BOM)..." -ForegroundColor Yellow
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText((Join-Path $PWD "src/app/page.tsx"), $content, $utf8NoBom)
Write-Host "  Fichier sauvegardé avec succès" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Script 1 terminé avec succès!" -ForegroundColor Green
Write-Host "  Exécutez maintenant : 02_CREER_PAGES.ps1" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
