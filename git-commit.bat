@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo ========================================
echo 사망확률 5개년 평균 필드 참조 수정 커밋
echo ========================================
echo.

git add -A
git status --short

echo.
echo 커밋 생성 중...
git commit -m "Fix: Use average5Year field for 5-year death data display

Changes:
- Fixed displayResults function to use correct field based on tab
- life-current tab: uses 'rate' field from deathData2022
- life-average tab: uses 'average5Year' field from deathData5Year
- Added is5YearAverage flag to determine which field to use
- Now correctly shows different values for 2023 vs 5-year average

Bug: Both tabs were showing same values because always using 'rate' field
Fix: Now uses 'average5Year' field when life-average tab is active"

echo.
echo ========================================
echo 최근 커밋 이력
echo ========================================
git log --oneline -6

echo.
echo 현재 상태:
git status

