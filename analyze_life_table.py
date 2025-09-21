#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
간이 생명표 엑셀 파일 구조를 자세히 분석하는 스크립트
"""

import pandas as pd
import os

def analyze_life_table_file():
    """간이 생명표 엑셀 파일 구조 분석"""
    file_path = '간이생명표_5세별__20250922002524.xlsx'
    
    if not os.path.exists(file_path):
        print(f"파일을 찾을 수 없습니다: {file_path}")
        return
    
    print("=== 간이 생명표 엑셀 파일 분석 ===")
    
    # 모든 시트 확인
    excel_file = pd.ExcelFile(file_path)
    print(f"시트 목록: {excel_file.sheet_names}")
    
    for sheet_name in excel_file.sheet_names:
        print(f"\n--- 시트: {sheet_name} ---")
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        print(f"데이터 크기: {df.shape}")
        print(f"컬럼 목록: {list(df.columns)}")
        print("\n첫 20행 데이터:")
        print(df.head(20))
        print("\n마지막 5행 데이터:")
        print(df.tail(5))

if __name__ == "__main__":
    analyze_life_table_file()
