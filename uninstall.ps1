# ============================================================
#  Paper Atlas — Uninstaller
#  Removes Start Menu and Desktop shortcuts
#  Run by right-clicking > "Run with PowerShell"
# ============================================================

$appName = "Paper Atlas"

$startMenuShortcut = [System.Environment]::GetFolderPath("StartMenu") + "\Programs\$appName.lnk"
$desktopShortcut   = [System.Environment]::GetFolderPath("Desktop") + "\$appName.lnk"

$removed = $false

if (Test-Path $startMenuShortcut) {
    Remove-Item $startMenuShortcut -Force
    Write-Host "✅  Removed Start Menu shortcut." -ForegroundColor Green
    $removed = $true
}

if (Test-Path $desktopShortcut) {
    Remove-Item $desktopShortcut -Force
    Write-Host "✅  Removed Desktop shortcut." -ForegroundColor Green
    $removed = $true
}

if (-not $removed) {
    Write-Host "No shortcuts found to remove." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Paper Atlas has been uninstalled from your Start Menu." -ForegroundColor Cyan
Write-Host "Your app files are still in:" -ForegroundColor Gray
Write-Host "  $(Split-Path -Parent $MyInvocation.MyCommand.Path)" -ForegroundColor Gray
Read-Host "Press Enter to close"
