@echo off
chcp 65001 > nul
cd /d "%~dp0"
git add -A
git commit -m "Backup: Before fixing life table to always show 2023 data"
git log --oneline -3

