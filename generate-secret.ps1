# HavenStay - Generate NextAuth Secret
# This script generates a secure random secret for NextAuth

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  HavenStay - Secret Generator" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Generating a secure random secret for NEXTAUTH_SECRET..." -ForegroundColor Yellow
Write-Host ""

# Generate a random 32-byte secret and convert to Base64
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::Create()
$rng.GetBytes($bytes)
$secret = [Convert]::ToBase64String($bytes)

Write-Host "Your NEXTAUTH_SECRET:" -ForegroundColor Green
Write-Host $secret -ForegroundColor White
Write-Host ""

Write-Host "✅ Copy this secret and use it in your .env file or Render environment variables" -ForegroundColor Green
Write-Host ""

# Optional: Copy to clipboard
try {
    Set-Clipboard -Value $secret
    Write-Host "✅ Secret has been copied to your clipboard!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Could not copy to clipboard. Please copy manually." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
