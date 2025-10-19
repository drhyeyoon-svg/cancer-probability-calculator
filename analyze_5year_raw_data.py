#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import numpy as np

def analyze_5year_raw_data():
    """24개암종 5년 발생률 raw data.xlsx 파일의 구조를 분석합니다."""
    
    print("=== 24개암종 5년 발생률 raw data.xlsx 파일 분석 시작 ===")
    
    try:
        # 파일 읽기 (절대 경로 사용)
        import os
        base_dir = r"C:\Users\drhye\OneDrive\바탕 화면\암확률계산기"
        file_path = os.path.join(base_dir, "암종별_5개년평균_모든암.xlsx")
        
        # 시트 목록 확인
        xl_file = pd.ExcelFile(file_path)
        print(f"시트 목록: {xl_file.sheet_names}")
        
        # 첫 번째 시트 분석
        sheet_name = xl_file.sheet_names[0]
        print(f"\n첫 번째 시트 '{sheet_name}' 분석:")
        
        # 헤더 없이 읽어서 구조 파악
        df = pd.read_excel(file_path, sheet_name=sheet_name, header=None)
        print(f"전체 행 수: {len(df)}")
        print(f"전체 열 수: {len(df.columns)}")
        
        # 처음 10행 출력
        print("\n처음 10행:")
        print(df.head(10))
        
        # 첫 번째 행 분석 (헤더 후보)
        print(f"\n첫 번째 행 (헤더 후보):")
        print(df.iloc[0].tolist())
        
        # 두 번째 행 분석
        print(f"\n두 번째 행:")
        print(df.iloc[1].tolist())
        
        # 세 번째 행 분석
        print(f"\n세 번째 행:")
        print(df.iloc[2].tolist())
        
        # 연도 관련 열 찾기
        print("\n연도 관련 정보 찾기:")
        for i in range(min(5, len(df))):
            row = df.iloc[i]
            for j, cell in enumerate(row):
                if pd.notna(cell) and str(cell).strip():
                    cell_str = str(cell).strip()
                    if any(year in cell_str for year in ['2018', '2019', '2020', '2021', '2022']):
                        print(f"행 {i}, 열 {j}: {cell_str}")
        
        # 암종 관련 정보 찾기
        print("\n암종 관련 정보 찾기:")
        for i in range(min(20, len(df))):
            row = df.iloc[i]
            first_cell = row.iloc[0] if len(row) > 0 else None
            if pd.notna(first_cell) and str(first_cell).strip():
                cell_str = str(first_cell).strip()
                if any(cancer in cell_str for cancer in ['암', '위', '간', '폐', '유방', '갑상선']):
                    print(f"행 {i}: {cell_str}")
        
    except Exception as e:
        print(f"오류 발생: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    analyze_5year_raw_data()
