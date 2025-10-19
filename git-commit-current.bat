@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo ===== Current Status =====
git status
echo.
echo ===== Adding all changes =====
git add -A
echo.
echo ===== Committing current state as backup =====
git commit -m "Backup: Current working state before cleanup"
echo.
echo ===== Recent commits =====
git log --oneline -5

