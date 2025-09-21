#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
엑셀 파일 구조를 자세히 분석하는 스크립트
"""

import pandas as pd
import os

def analyze_cancer_file():
    """암종 엑셀 파일 구조 분석"""
    file_path = '24개_암종_성_연령_5세_별_암발생자수__발생률_20250921204341.xlsx'
    
    if not os.path.exists(file_path):
        print(f"파일을 찾을 수 없습니다: {file_path}")
        return
    
    print("=== 암종 엑셀 파일 분석 ===")
    
    # 모든 시트 확인
    excel_file = pd.ExcelFile(file_path)
    print(f"시트 목록: {excel_file.sheet_names}")
    
    for sheet_name in excel_file.sheet_names:
        print(f"\n--- 시트: {sheet_name} ---")
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        print(f"데이터 크기: {df.shape}")
        print(f"컬럼 목록: {list(df.columns)}")
        print("\n첫 10행 데이터:")
        print(df.head(10))
        print("\n마지막 5행 데이터:")
        print(df.tail(5))

def analyze_death_file():
    """사망원인 엑셀 파일 구조 분석"""
    file_path = '사망원인생명표_5세별__20250921235108.xlsx'
    
    if not os.path.exists(file_path):
        print(f"파일을 찾을 수 없습니다: {file_path}")
        return
    
    print("\n=== 사망원인 엑셀 파일 분석 ===")
    
    # 모든 시트 확인
    excel_file = pd.ExcelFile(file_path)
    print(f"시트 목록: {excel_file.sheet_names}")
    
    for sheet_name in excel_file.sheet_names:
        print(f"\n--- 시트: {sheet_name} ---")
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        print(f"데이터 크기: {df.shape}")
        print(f"컬럼 목록: {list(df.columns)}")
        print("\n첫 10행 데이터:")
        print(df.head(10))
        print("\n마지막 5행 데이터:")
        print(df.tail(5))

if __name__ == "__main__":
    analyze_cancer_file()
    analyze_death_file()
