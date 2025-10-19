#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
암종별_5개년평균_모든암.xlsx 파일의 구조를 분석하여
각 연도별(2018-2022) 남성/여성 데이터를 개별 파싱하는 스크립트
"""

import pandas as pd
import numpy as np
import os

def analyze_excel_structure():
    """엑셀 파일 구조 상세 분석"""
    
    file_path = "암종별_5개년평균_모든암.xlsx"
    
    if not os.path.exists(file_path):
        print(f"파일을 찾을 수 없습니다: {file_path}")
        return None
    
    print(f"=== {file_path} 구조 분석 ===")
    
    try:
        # 엑셀 파일의 모든 시트 확인
        xl_file = pd.ExcelFile(file_path)
        print(f"시트 목록: {xl_file.sheet_names}")
        
        # 각 시트별로 분석
        for sheet_idx, sheet_name in enumerate(xl_file.sheet_names):
            print(f"\n=== 시트 {sheet_idx + 1}: {sheet_name} ===")
            
            try:
                # 헤더 없이 읽어서 전체 구조 파악
                df_raw = pd.read_excel(file_path, sheet_name=sheet_name, header=None)
                print(f"시트 크기: {df_raw.shape} (행 x 열)")
                
                # 처음 20행, 20열 출력
                print(f"\n처음 20행 x 20열 데이터:")
                for i in range(min(20, len(df_raw))):
                    row_data = []
                    for j in range(min(20, len(df_raw.columns))):
                        cell = df_raw.iloc[i, j]
                        if pd.notna(cell):
                            cell_str = str(cell).strip()
                            if len(cell_str) > 12:
                                cell_str = cell_str[:12] + "..."
                            row_data.append(cell_str)
                        else:
                            row_data.append("")
                    print(f"행{i:2d}: {row_data}")
                
                # 연도 패턴 찾기
                print(f"\n=== 연도 패턴 찾기 ===")
                years = ['2018', '2019', '2020', '2021', '2022']
                year_positions = {}
                
                for i in range(len(df_raw)):
                    for j in range(len(df_raw.columns)):
                        cell = df_raw.iloc[i, j]
                        if pd.notna(cell):
                            cell_str = str(cell)
                            for year in years:
                                if year in cell_str:
                                    if year not in year_positions:
                                        year_positions[year] = []
                                    year_positions[year].append((i, j, cell_str))
                
                for year, positions in year_positions.items():
                    print(f"{year}: {len(positions)}개 위치 발견")
                    for pos in positions[:3]:  # 처음 3개만 출력
                        print(f"  행{pos[0]}, 열{pos[1]}: {pos[2]}")
                
                # 성별 패턴 찾기
                print(f"\n=== 성별 패턴 찾기 ===")
                gender_patterns = ['남자', '여자', '남성', '여성', 'Male', 'Female', '남', '여']
                gender_positions = {}
                
                for i in range(len(df_raw)):
                    for j in range(len(df_raw.columns)):
                        cell = df_raw.iloc[i, j]
                        if pd.notna(cell):
                            cell_str = str(cell)
                            for pattern in gender_patterns:
                                if pattern in cell_str:
                                    if pattern not in gender_positions:
                                        gender_positions[pattern] = []
                                    gender_positions[pattern].append((i, j, cell_str))
                
                for pattern, positions in gender_positions.items():
                    print(f"'{pattern}': {len(positions)}개 위치 발견")
                    for pos in positions[:3]:  # 처음 3개만 출력
                        print(f"  행{pos[0]}, 열{pos[1]}: {pos[2]}")
                
                # 암종 패턴 찾기
                print(f"\n=== 암종 패턴 찾기 ===")
                cancer_patterns = ['모든', '전체', '유방', '폐', '위', '대장', '간', '전립선', '갑상선']
                cancer_positions = {}
                
                for i in range(min(50, len(df_raw))):  # 처음 50행만 검사
                    for j in range(min(10, len(df_raw.columns))):  # 처음 10열만 검사
                        cell = df_raw.iloc[i, j]
                        if pd.notna(cell):
                            cell_str = str(cell)
                            for pattern in cancer_patterns:
                                if pattern in cell_str and len(cell_str) < 30:  # 너무 긴 텍스트 제외
                                    if pattern not in cancer_positions:
                                        cancer_positions[pattern] = []
                                    cancer_positions[pattern].append((i, j, cell_str))
                
                for pattern, positions in cancer_positions.items():
                    print(f"'{pattern}': {len(positions)}개 위치 발견")
                    for pos in positions[:2]:  # 처음 2개만 출력
                        print(f"  행{pos[0]}, 열{pos[1]}: {pos[2]}")
                
                # 숫자 데이터 분포 확인
                print(f"\n=== 숫자 데이터 분포 ===")
                numeric_cells = []
                for i in range(min(100, len(df_raw))):
                    for j in range(len(df_raw.columns)):
                        cell = df_raw.iloc[i, j]
                        if pd.notna(cell):
                            try:
                                num_val = float(cell)
                                if 0.1 <= num_val <= 10000:  # 발생률 범위
                                    numeric_cells.append((i, j, num_val))
                            except:
                                pass
                
                if numeric_cells:
                    print(f"발생률 범위 숫자: {len(numeric_cells)}개")
                    # 값 범위별로 분류
                    ranges = {
                        '0.1-1': 0, '1-10': 0, '10-100': 0, '100-1000': 0, '1000+': 0
                    }
                    for _, _, val in numeric_cells:
                        if val < 1:
                            ranges['0.1-1'] += 1
                        elif val < 10:
                            ranges['1-10'] += 1
                        elif val < 100:
                            ranges['10-100'] += 1
                        elif val < 1000:
                            ranges['100-1000'] += 1
                        else:
                            ranges['1000+'] += 1
                    
                    for range_name, count in ranges.items():
                        print(f"  {range_name}: {count}개")
                    
                    # 샘플 값들
                    print("  샘플 값들:")
                    for i, (row, col, val) in enumerate(numeric_cells[:10]):
                        print(f"    행{row}, 열{col}: {val}")
                
            except Exception as e:
                print(f"시트 {sheet_name} 분석 중 오류: {e}")
                continue
        
        return xl_file
        
    except Exception as e:
        print(f"파일 분석 중 오류: {e}")
        import traceback
        traceback.print_exc()
        return None

def find_data_structure(xl_file):
    """데이터 구조 패턴 찾기"""
    
    if not xl_file:
        return None
    
    print(f"\n=== 데이터 구조 패턴 분석 ===")
    
    # 첫 번째 시트로 상세 분석
    sheet_name = xl_file.sheet_names[0]
    df = pd.read_excel(xl_file, sheet_name=sheet_name, header=None)
    
    print(f"분석 대상 시트: {sheet_name}")
    print(f"시트 크기: {df.shape}")
    
    # 가능한 헤더 행 찾기
    print(f"\n=== 헤더 행 후보 찾기 ===")
    
    for header_row in range(min(10, len(df))):
        row_data = df.iloc[header_row].fillna('').astype(str)
        
        # 연도와 성별이 포함된 행인지 확인
        year_count = sum(1 for cell in row_data if any(year in cell for year in ['2018', '2019', '2020', '2021', '2022']))
        gender_count = sum(1 for cell in row_data if any(gender in cell for gender in ['남', '여', 'Male', 'Female']))
        
        if year_count > 0 or gender_count > 0:
            print(f"행 {header_row}: 연도 {year_count}개, 성별 {gender_count}개")
            print(f"  내용: {list(row_data[:15])}")  # 처음 15개 셀만 출력
    
    # 암종명이 있을 것 같은 열 찾기
    print(f"\n=== 암종명 열 후보 찾기 ===")
    
    for col in range(min(5, len(df.columns))):
        col_data = df.iloc[:, col].fillna('').astype(str)
        
        # 암종 관련 키워드 개수
        cancer_keywords = ['암', '모든', '전체', '유방', '폐', '위', '대장', '간', '전립선', '갑상선', 'C00', 'C50']
        cancer_count = sum(1 for cell in col_data if any(keyword in cell for keyword in cancer_keywords))
        
        if cancer_count > 5:  # 5개 이상의 암종 관련 용어가 있으면
            print(f"열 {col}: 암종 관련 {cancer_count}개")
            print(f"  샘플: {list(col_data[col_data != ''][:10])}")  # 비어있지 않은 처음 10개
    
    return df

if __name__ == "__main__":
    print("=== 5개년 엑셀 파일 구조 분석 시작 ===")
    
    xl_file = analyze_excel_structure()
    
    if xl_file:
        df = find_data_structure(xl_file)
        print(f"\n=== 분석 완료 ===")
        print("다음 단계: 각 연도별/성별 데이터 위치를 파악하여 파싱 로직 구현")
    else:
        print("파일 분석 실패")




