@echo off
chcp 65001 > nul
cd /d "%~dp0"
git add .
git status
git commit -m "Initial commit: Cancer probability calculator with complete features"
git log --oneline -3

