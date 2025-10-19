@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo ========================================
echo 5개년 탭 복원 및 데이터 참조 수정 커밋
echo ========================================
echo.

git add -A
git status --short

echo.
echo 커밋 생성 중...
git commit -m "Fix: Restore 5-year death tab and fix data reference

Changes:
- Fixed searchDeathData function to use currentLifeTab instead of currentTab
- Restored 5-year average tab in death probability analysis
- Now correctly references deathData5Year when life-average tab is selected
- No changes to data files, only logic fix in script.js

Bug: The function was using currentTab (for cancer data) instead of currentLifeTab (for death data)
Fix: Changed line 920 from 'currentTab' to 'currentLifeTab'"

echo.
echo ========================================
echo 최근 커밋 이력
echo ========================================
git log --oneline -6

echo.
echo 현재 상태:
git status

