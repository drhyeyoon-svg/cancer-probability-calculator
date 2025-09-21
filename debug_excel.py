#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
엑셀 파일의 실제 데이터를 디버깅하는 스크립트
"""

import pandas as pd

def debug_cancer_file():
    """암종 엑셀 파일 디버깅"""
    file_path = '24개_암종_성_연령_5세_별_암발생자수__발생률_20250921204341.xlsx'
    
    print("=== 암종 파일 디버깅 ===")
    df = pd.read_excel(file_path, sheet_name='데이터', header=0)
    
    print(f"데이터 크기: {df.shape}")
    print("\n첫 20행 데이터:")
    for i in range(min(20, len(df))):
        print(f"행 {i}: {df.iloc[i].to_dict()}")
    
    print("\n암종별 데이터 확인:")
    cancer_counts = df['24개 암종별'].value_counts()
    print(cancer_counts.head(10))
    
    print("\n성별 데이터 확인:")
    gender_counts = df['성별'].value_counts()
    print(gender_counts)
    
    print("\n연령별 데이터 확인:")
    age_counts = df['연령별'].value_counts()
    print(age_counts.head(10))

def debug_death_file():
    """사망원인 엑셀 파일 디버깅"""
    file_path = '사망원인생명표_5세별__20250921235108.xlsx'
    
    print("\n=== 사망원인 파일 디버깅 ===")
    df = pd.read_excel(file_path, sheet_name='데이터', header=0)
    
    print(f"데이터 크기: {df.shape}")
    print("\n첫 20행 데이터:")
    for i in range(min(20, len(df))):
        print(f"행 {i}: {df.iloc[i].to_dict()}")
    
    print("\n사망원인별 데이터 확인:")
    cause_counts = df['사망원인별'].value_counts()
    print(cause_counts.head(10))
    
    print("\n연령별 데이터 확인:")
    age_counts = df['연령별'].value_counts()
    print(age_counts.head(10))

if __name__ == "__main__":
    debug_cancer_file()
    debug_death_file()
