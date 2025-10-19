@echo off
chcp 65001 > nul
cd /d "%~dp0"
git add .
git commit -m "Clean up: Remove temporary batch files"
git status
git log --oneline -5

