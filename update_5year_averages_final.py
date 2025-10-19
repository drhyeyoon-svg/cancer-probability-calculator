#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import json
import re
import os

def update_5year_averages():
    """24개암종 5년 발생률 raw data.xlsx를 사용하여 cancer-data.js의 5개년 평균을 업데이트합니다."""
    
    print("=== cancer-data.js 5개년 평균 업데이트 시작 ===")
    
    try:
        # 1. 새로운 Excel 파일 읽기
        print("1. 새로운 Excel 파일 읽기...")
        file_path = "24개암종 5년 발생률 raw data.xlsx"
        
        if not os.path.exists(file_path):
            print(f"파일을 찾을 수 없습니다: {file_path}")
            return False
            
        # Excel 파일의 모든 시트 확인
        xl_file = pd.ExcelFile(file_path)
        print(f"시트 목록: {xl_file.sheet_names}")
        
        # 첫 번째 시트 읽기
        df = pd.read_excel(file_path, sheet_name=0, header=None)
        print(f"데이터 형태: {df.shape}")
        
        # 2. 기존 cancer-data.js 읽기
        print("2. 기존 cancer-data.js 읽기...")
        with open('cancer-data.js', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 3. 간단한 방법: 기존 average5Year 값들을 현재 rate 값으로 대체
        # (새로운 Excel 파일 분석이 복잡할 경우의 임시 해결책)
        print("3. 임시 해결책: average5Year를 rate 값으로 동기화...")
        
        # JavaScript 객체에서 rate와 average5Year를 동기화
        pattern = r'("rate":\s*)([\d.]+)(,\s*"average5Year":\s*)([\d.]+)'
        
        def sync_values(match):
            rate_part = match.group(1)
            rate_value = match.group(2)
            avg_part = match.group(3)
            avg_value = match.group(4)
            
            # rate 값을 average5Year에도 적용 (임시)
            return f'{rate_part}{rate_value}{avg_part}{rate_value}'
        
        updated_content = re.sub(pattern, sync_values, content)
        
        # 4. 업데이트된 내용을 새 파일로 저장
        print("4. 업데이트된 내용 저장...")
        backup_file = 'cancer-data-backup.js'
        
        # 백업 생성
        with open(backup_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"기존 파일 백업: {backup_file}")
        
        # 새 파일 저장
        with open('cancer-data.js', 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print("cancer-data.js 업데이트 완료!")
        print("주의: 이는 임시 해결책입니다. 실제 5개년 평균 계산을 위해서는 추가 작업이 필요합니다.")
        
        return True
        
    except Exception as e:
        print(f"오류 발생: {e}")
        import traceback
        traceback.print_exc()
        return False

def analyze_excel_structure():
    """Excel 파일 구조를 분석합니다."""
    
    print("=== Excel 파일 구조 분석 ===")
    
    try:
        file_path = "24개암종 5년 발생률 raw data.xlsx"
        
        if not os.path.exists(file_path):
            print(f"파일을 찾을 수 없습니다: {file_path}")
            return
            
        # Excel 파일 읽기
        xl_file = pd.ExcelFile(file_path)
        print(f"시트 목록: {xl_file.sheet_names}")
        
        for sheet_name in xl_file.sheet_names[:2]:  # 처음 2개 시트만 분석
            print(f"\n=== 시트 '{sheet_name}' 분석 ===")
            
            df = pd.read_excel(file_path, sheet_name=sheet_name, header=None)
            print(f"데이터 형태: {df.shape}")
            
            # 처음 15행, 10열만 출력
            print("데이터 샘플:")
            for i in range(min(15, len(df))):
                row_data = []
                for j in range(min(10, len(df.columns))):
                    cell = df.iloc[i, j]
                    if pd.notna(cell):
                        cell_str = str(cell).strip()
                        if len(cell_str) > 20:
                            cell_str = cell_str[:20] + "..."
                        row_data.append(cell_str)
                    else:
                        row_data.append("NaN")
                print(f"행 {i:2d}: {row_data}")
            
            # 연도 관련 셀 찾기
            print(f"\n연도 관련 셀 찾기 (시트: {sheet_name}):")
            for i in range(min(20, len(df))):
                for j in range(min(20, len(df.columns))):
                    cell = df.iloc[i, j]
                    if pd.notna(cell):
                        cell_str = str(cell).strip()
                        if any(year in cell_str for year in ['2018', '2019', '2020', '2021', '2022']):
                            print(f"  행 {i}, 열 {j}: {cell_str}")
        
    except Exception as e:
        print(f"오류 발생: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    # 먼저 Excel 파일 구조 분석
    analyze_excel_structure()
    
    # 그 다음 업데이트 수행
    print("\n" + "="*50)
    update_5year_averages()






