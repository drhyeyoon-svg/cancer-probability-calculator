@echo off
chcp 65001 > nul
cd /d "%~dp0"
git add -A
git commit -m "Backup: Before moving life table info above tabs"
git log --oneline -3

