@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo ========================================
echo 사망확률 분석 UI 업데이트 커밋
echo ========================================
echo.

git add -A
git status --short

echo.
echo 커밋 생성 중...
git commit -m "UI: Update death analysis tab title and add data source note

Changes:
- Changed tab title from '2022년 사망원인' to '2023년 완전생명표'
- Added data source attribution for 2023 complete life table data
- Consistent styling with cancer statistics source note"

echo.
echo ========================================
echo 최근 커밋 이력
echo ========================================
git log --oneline -5

echo.
echo 현재 상태:
git status

