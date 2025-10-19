@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo ========================================
echo 생명표 정보 고정 표시 기능 구현 커밋
echo ========================================
echo.

git add -A
git status --short

echo.
echo 커밋 생성 중...
git commit -m "Fix: Life table info always shows 2023 data regardless of tab

Changes:
- displayLifeTableInfo now always uses lifeData.current (2023 data)
- Title fixed to '2023년 생명표' regardless of selected tab
- Removed life table info re-rendering on tab clicks
- Only death cause rankings change when switching tabs

Result:
- 2023년 완전생명표 tab: 2023 life table + 2023 death data
- 5개년 평균 tab: 2023 life table + 5-year average death data
- Life table values (기대여명, 연간 사망확률, 동갑중 생존자 비율) always same"

echo.
echo ========================================
echo 최근 커밋 이력
echo ========================================
git log --oneline -6

echo.
echo 현재 상태:
git status

