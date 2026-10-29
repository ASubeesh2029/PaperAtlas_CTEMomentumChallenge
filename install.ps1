# ============================================================
#  Paper Atlas — Windows Installer
#  Adds a shortcut to the Start Menu (and optionally Desktop)
#  Run this script ONCE by right-clicking > "Run with PowerShell"
# ============================================================

$appName    = "Paper Atlas"
$appDir     = Split-Path -Parent $MyInvocation.MyCommand.Path
$edgePath   = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$indexFile  = Join-Path $appDir "index.html"
$iconPath   = Join-Path $appDir "assets\icon.ico"

# ── Verify files ────────────────────────────────────────────
if (-not (Test-Path $indexFile)) {
    Write-Host "ERROR: index.html not found at $indexFile" -ForegroundColor Red
    Write-Host "Make sure you are running this from the Paper Atlas folder." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

if (-not (Test-Path $edgePath)) {
    Write-Host "ERROR: Microsoft Edge not found. Please install it from microsoft.com/edge" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# ── Build the --app URL ──────────────────────────────────────
$fileUrl = "file:///" + ($indexFile -replace "\\", "/")

# Arguments for Edge App mode
$edgeArgs = "--app=`"$fileUrl`" --window-size=1440,900 --window-position=40,40 --no-first-run --disable-default-apps"

# ── Create Start Menu shortcut ───────────────────────────────
$startMenuDir = [System.Environment]::GetFolderPath("StartMenu") + "\Programs"
$shortcutPath = "$startMenuDir\$appName.lnk"

$wshell = New-Object -ComObject WScript.Shell
$sc = $wshell.CreateShortcut($shortcutPath)
$sc.TargetPath       = $edgePath
$sc.Arguments        = $edgeArgs
$sc.WorkingDirectory = $appDir
$sc.Description      = "Paper Atlas — Life-Sciences Job & Career Finder"
if (Test-Path $iconPath) { $sc.IconLocation = $iconPath }
else                      { $sc.IconLocation = $edgePath + ",0" }
$sc.Save()

Write-Host "✅  Start Menu shortcut created: $shortcutPath" -ForegroundColor Green

# ── Ask about Desktop shortcut ───────────────────────────────
$addDesktop = Read-Host "Add a Desktop shortcut too? (Y/N)"
if ($addDesktop -match "^[Yy]") {
    $desktopPath = [System.Environment]::GetFolderPath("Desktop") + "\$appName.lnk"
    $sc2 = $wshell.CreateShortcut($desktopPath)
    $sc2.TargetPath       = $edgePath
    $sc2.Arguments        = $edgeArgs
    $sc2.WorkingDirectory = $appDir
    $sc2.Description      = "Paper Atlas — Life-Sciences Job & Career Finder"
    if (Test-Path $iconPath) { $sc2.IconLocation = $iconPath }
    else                      { $sc2.IconLocation = $edgePath + ",0" }
    $sc2.Save()
    Write-Host "✅  Desktop shortcut created: $desktopPath" -ForegroundColor Green
}

# ── Done ─────────────────────────────────────────────────────
Write-Host ""
Write-Host "🚀  Paper Atlas is installed!" -ForegroundColor Cyan
Write-Host "    Find it in your Start Menu by searching 'Paper Atlas'" -ForegroundColor Cyan
Write-Host ""
$launch = Read-Host "Launch Paper Atlas now? (Y/N)"
if ($launch -match "^[Yy]") {
    Start-Process $edgePath $edgeArgs
}
