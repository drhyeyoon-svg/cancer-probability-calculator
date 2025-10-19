@echo off
chcp 65001 > nul
cd /d "%~dp0"
git add -A
git commit -m "Backup: Before death analysis UI update"
git log --oneline -3

