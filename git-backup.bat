@echo off
chcp 65001 > nul
cd /d "%~dp0"
git add -A
git commit -m "Backup: Before moving life-table-info div position"
git log --oneline -3

