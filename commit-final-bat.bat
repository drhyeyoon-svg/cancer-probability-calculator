@echo off
chcp 65001 > nul
cd /d "%~dp0"
git add -A
git commit -m "Clean up: Remove final temporary batch file"
git log --oneline -6
echo.
echo ========================================
echo Clean Status:
git status

