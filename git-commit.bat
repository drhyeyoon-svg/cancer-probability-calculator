@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo ========================================
echo 생명표 정보 위치 이동 커밋
echo ========================================
echo.

git add -A
git status --short

echo.
echo 커밋 생성 중...
git commit -m "UI: Move life-table-info div above tab-controls

Changes:
- Moved life-table-info div position above tab-controls in HTML only
- No logic changes - all JavaScript functions remain unchanged
- Visual order: life table info -> tabs -> view controls -> death results
- All functionality preserved"

echo.
echo ========================================
echo 최근 커밋 이력
echo ========================================
git log --oneline -5

echo.
echo 현재 상태:
git status

