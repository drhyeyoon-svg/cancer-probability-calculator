@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo ========================================
echo UI 수정사항 커밋
echo ========================================
echo.

git add -A
git status --short

echo.
echo 커밋 생성 중...
git commit -m "UI: Add data source note and hide 5-year death tab

Changes:
- Added data source attribution below cancer statistics
- Hidden 5-year average tab in death probability analysis (functionality preserved)
- Added CSS styling for data-source-note section
- No functional changes, UI adjustments only"

echo.
echo ========================================
echo 최근 커밋 이력
echo ========================================
git log --oneline -5

echo.
echo 현재 상태:
git status

