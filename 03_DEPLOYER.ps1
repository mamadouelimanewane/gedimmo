# =============================================================
# SCRIPT 3 - DIWAAN IMMO - DEPLOYER SUR GITHUB
# Exécuter depuis : C:\gravity\zillow-clone
# =============================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DIWAAN IMMO - Deploiement GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if (!(Test-Path "src/app/page.tsx")) {
    Write-Host "ERREUR: Lancez ce script depuis C:\gravity\zillow-clone" -ForegroundColor Red
    exit 1
}

# --- ETAPE 1 : Vérifier l'état Git ---
Write-Host "[1/5] Etat Git actuel..." -ForegroundColor Yellow
$currentBranch = git branch --show-current
Write-Host "  Branche actuelle: $currentBranch" -ForegroundColor White

$status = git status --short
if ($status) {
    Write-Host "  Fichiers modifies detectes" -ForegroundColor Yellow
} else {
    Write-Host "  Aucune modification locale" -ForegroundColor Green
}

# --- ETAPE 2 : S'assurer d'être sur main ---
Write-Host ""
Write-Host "[2/5] Synchronisation de la branche main..." -ForegroundColor Yellow
if ($currentBranch -ne "main") {
    Write-Host "  Basculement vers main..." -ForegroundColor Yellow
    git checkout main 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        git checkout -b main 2>&1 | Out-Null
    }
}
Write-Host "  Sur la branche main" -ForegroundColor Green

# --- ETAPE 3 : Commit ---
Write-Host ""
Write-Host "[3/5] Commit des modifications..." -ForegroundColor Yellow
git add . 2>&1 | Out-Null
$commitMsg = "feat: pages diaspora, communes, blockchain refonte complete + fix video"
git commit -m $commitMsg 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Commit cree: $commitMsg" -ForegroundColor Green
} else {
    Write-Host "  Rien a commiter (fichiers deja a jour)" -ForegroundColor Yellow
}

# --- ETAPE 4 : Pull rebase puis push ---
Write-Host ""
Write-Host "[4/5] Synchronisation et push vers GitHub..." -ForegroundColor Yellow
git pull --rebase origin main 2>&1 | Out-Null
git push origin main 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Push reussi sur main!" -ForegroundColor Green
} else {
    Write-Host "  Essai avec force push..." -ForegroundColor Yellow
    git push origin main --force 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Force push reussi" -ForegroundColor Green
    } else {
        Write-Host "  ERREUR push - verifiez votre connexion et token GitHub" -ForegroundColor Red
        exit 1
    }
}

# --- ETAPE 5 : Unifier master et main (IMPORTANT) ---
Write-Host ""
Write-Host "[5/5] Unification des branches master et main..." -ForegroundColor Yellow
Write-Host "  Le projet avait 2 branches - on aligne master sur main..." -ForegroundColor Yellow

git push origin main:master --force 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  master mis a jour pour pointer sur le meme commit que main" -ForegroundColor Green
    Write-Host "  Les 2 branches sont maintenant synchronisees!" -ForegroundColor Green
} else {
    Write-Host "  INFO: Impossible de mettre a jour master (normal si pas les droits)" -ForegroundColor Yellow
    Write-Host "  Dans Vercel, assurez-vous que la branche de production est 'main'" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  DEPLOIEMENT TERMINE!" -ForegroundColor Green
Write-Host "" 
Write-Host "  Vercel va detecter le commit et" -ForegroundColor White
Write-Host "  redéployer automatiquement (2-3 min)" -ForegroundColor White
Write-Host ""
Write-Host "  IMPORTANT - Dans Vercel, verifiez que:" -ForegroundColor Yellow
Write-Host "  Settings > Git > Production Branch = 'main'" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Votre site: https://immobilier-flax-gamma.vercel.app" -ForegroundColor Cyan
Write-Host "  Nouvelles pages:" -ForegroundColor Cyan
Write-Host "    /diaspora         Portail Diaspora Secure" -ForegroundColor Cyan
Write-Host "    /extranet-communes  Workflow foncier + Visas" -ForegroundColor Cyan
Write-Host "    /blockchain         Registre & Archives" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green

Write-Host ""
Write-Host "=== RAPPEL: PROBLEME VIDEO ===" -ForegroundColor Magenta
Write-Host "Si la video ne s affiche pas, c est que public/videos/hero.mp4" -ForegroundColor White
Write-Host "contient encore une video avec des personnages non africains." -ForegroundColor White
Write-Host "Solution: Remplacez manuellement le fichier hero.mp4 par une" -ForegroundColor White
Write-Host "video libre de droit depuis https://www.pexels.com/fr-fr/videos/" -ForegroundColor White
Write-Host "Recherchez: 'african business office senegal professional'" -ForegroundColor White
Write-Host "Puis: git add public/videos/hero.mp4 && git commit -m 'video africaine' && git push" -ForegroundColor White
