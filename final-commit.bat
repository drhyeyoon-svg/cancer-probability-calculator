@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo ========================================
echo 최종 정리 커밋
echo ========================================
echo.

git add -A
git status --short

echo.
echo 커밋 생성 중...
git commit -m "Clean up: Remove temporary development files

- Removed 47 temporary Python scripts (analyze, extract, fix, integrate, recreate, etc.)
- Removed 3 temporary Excel files (temp_*.xlsx)
- Removed 3 backup folders (excel_backup, js_backup, python_backup)
- Removed backup JS files (cancer-data-backup-with-average5year.js)
- Removed utility scripts (convert-js-to-json.js, test scripts, etc.)
- All core functionality preserved and tested
- Kept final parser scripts for future data updates"

echo.
echo ========================================
echo 최근 커밋 이력
echo ========================================
git log --oneline -5

echo.
echo ========================================
echo 현재 상태
echo ========================================
git status

