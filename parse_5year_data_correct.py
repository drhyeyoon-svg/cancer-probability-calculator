#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import json
import sys
import os

def parse_5year_cancer_data():
    """5개년 평균 암 발생률 데이터를 올바르게 파싱"""
    
    # 파일 경로 확인
    excel_files = [
        "24개암종 5년 발생률 raw data.xlsx",
        "암종별_5개년평균_발생자수_조발생률.xlsx"
    ]
    
    excel_file = None
    for file in excel_files:
        if os.path.exists(file):
            excel_file = file
            break
    
    if not excel_file:
        print("5개년 평균 엑셀 파일을 찾을 수 없습니다.")
        return None
    
    print(f"파싱할 파일: {excel_file}")
    
    try:
        # 엑셀 파일의 모든 시트 확인
        xl_file = pd.ExcelFile(excel_file)
        print(f"사용 가능한 시트: {xl_file.sheet_names}")
        
        # 첫 번째 시트 읽기
        df = pd.read_excel(excel_file, sheet_name=0)
        print(f"데이터 형태: {df.shape}")
        print("컬럼명들:")
        for i, col in enumerate(df.columns):
            print(f"  {i}: {col}")
        
        print("\n첫 10행 데이터:")
        print(df.head(10))
        
        # 성별과 연령대 컬럼 찾기
        gender_cols = []
        age_cols = []
        
        for col in df.columns:
            col_str = str(col).lower()
            if '남' in col_str or 'male' in col_str:
                gender_cols.append(col)
            elif '여' in col_str or 'female' in col_str:
                gender_cols.append(col)
            elif any(age in col_str for age in ['0-', '5-', '10-', '15-', '20-', '25-', '30-', '35-', '40-', '45-', '50-', '55-', '60-', '65-', '70-', '75-', '80-', '85+']):
                age_cols.append(col)
        
        print(f"\n성별 관련 컬럼: {gender_cols}")
        print(f"연령대 관련 컬럼: {age_cols}")
        
        return df
        
    except Exception as e:
        print(f"파일 읽기 오류: {e}")
        return None

def analyze_data_structure(df):
    """데이터 구조 분석"""
    if df is None:
        return
    
    print("\n=== 데이터 구조 분석 ===")
    
    # 암종 컬럼 찾기
    cancer_col = None
    for col in df.columns:
        if '암종' in str(col) or '질병' in str(col) or 'cancer' in str(col).lower():
            cancer_col = col
            break
    
    if cancer_col:
        print(f"암종 컬럼: {cancer_col}")
        unique_cancers = df[cancer_col].dropna().unique()
        print(f"고유 암종 개수: {len(unique_cancers)}")
        print("암종 목록:")
        for i, cancer in enumerate(unique_cancers[:20]):  # 처음 20개만
            print(f"  {i+1}: {cancer}")
        if len(unique_cancers) > 20:
            print(f"  ... 및 {len(unique_cancers) - 20}개 더")
    
    # 성별 데이터 확인
    for col in df.columns:
        if '남' in str(col) or '여' in str(col):
            print(f"\n{col} 컬럼 샘플 데이터:")
            sample_data = df[col].dropna().head(10)
            for idx, val in sample_data.items():
                cancer_name = df.loc[idx, cancer_col] if cancer_col else f"Row {idx}"
                print(f"  {cancer_name}: {val}")

def create_correct_5year_data():
    """올바른 5개년 평균 데이터 생성"""
    
    # 먼저 기존 2022년 데이터 구조 참고
    try:
        with open('cancer-data.js', 'r', encoding='utf-8') as f:
            content = f.read()
            # 2022년 데이터의 구조를 파악하여 동일한 형태로 생성
    except:
        pass
    
    df = parse_5year_cancer_data()
    if df is None:
        return
    
    analyze_data_structure(df)
    
    # 사용자에게 컬럼 매핑 정보 요청
    print("\n=== 컬럼 매핑 필요 ===")
    print("올바른 5개년 평균 데이터를 생성하기 위해 다음 정보가 필요합니다:")
    print("1. 암종 이름이 있는 컬럼")
    print("2. 남성/여성별 연령대별 발생률 컬럼들")
    print("3. 데이터 형태 (행/열 구조)")

if __name__ == "__main__":
    create_correct_5year_data()




