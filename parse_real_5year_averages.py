#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
암종별_5개년평균_모든암.xlsx에서 각 연도별(2018-2022) 남성/여성 데이터를 
개별 파싱하여 진짜 5개년 평균을 계산하는 스크립트
"""

import pandas as pd
import json
import numpy as np
import os

def parse_real_5year_data():
    """실제 5개년 데이터를 연도별/성별로 파싱하여 평균 계산"""
    
    # 절대 경로 사용
    base_dir = r"C:\Users\drhye\OneDrive\바탕 화면\암확률계산기"
    file_path = os.path.join(base_dir, "암종별_5개년평균_모든암.xlsx")
    
    if not os.path.exists(file_path):
        print(f"파일을 찾을 수 없습니다: {file_path}")
        return None
    
    print(f"=== 실제 5개년 평균 계산 시작 ===")
    print(f"파일: {file_path}")
    
    try:
        # 엑셀 파일 시트 확인
        xl_file = pd.ExcelFile(file_path)
        print(f"시트 목록: {xl_file.sheet_names}")
        
        # 첫 번째 시트 분석
        sheet_name = xl_file.sheet_names[0]
        print(f"\n분석 대상 시트: {sheet_name}")
        
        # 헤더 없이 읽어서 구조 파악
        df_raw = pd.read_excel(file_path, sheet_name=sheet_name, header=None)
        print(f"시트 크기: {df_raw.shape}")
        
        # 처음 20행 출력하여 구조 파악
        print(f"\n=== 처음 20행 구조 분석 ===")
        for i in range(min(20, len(df_raw))):
            row_data = []
            for j in range(min(15, len(df_raw.columns))):
                cell = df_raw.iloc[i, j]
                if pd.notna(cell):
                    cell_str = str(cell).strip()
                    if len(cell_str) > 15:
                        cell_str = cell_str[:15] + "..."
                    row_data.append(cell_str)
                else:
                    row_data.append("")
            print(f"행{i:2d}: {row_data}")
        
        # 연도별 데이터 위치 찾기
        print(f"\n=== 연도별 데이터 위치 찾기 ===")
        years = ['2018', '2019', '2020', '2021', '2022']
        year_columns = {}
        
        # 헤더 행들 검사 (보통 처음 5행 내에 있음)
        for header_row in range(min(5, len(df_raw))):
            row_data = df_raw.iloc[header_row].fillna('').astype(str)
            
            for col_idx, cell in enumerate(row_data):
                for year in years:
                    if year in cell:
                        if year not in year_columns:
                            year_columns[year] = []
                        year_columns[year].append((header_row, col_idx, cell))
        
        print("발견된 연도별 위치:")
        for year, positions in year_columns.items():
            print(f"  {year}: {len(positions)}개 위치")
            for pos in positions[:3]:  # 처음 3개만 출력
                print(f"    행{pos[0]}, 열{pos[1]}: '{pos[2]}'")
        
        # 성별 데이터 위치 찾기
        print(f"\n=== 성별 데이터 위치 찾기 ===")
        gender_patterns = ['남자', '여자', '남성', '여성', '남', '여']
        gender_positions = {}
        
        for i in range(min(10, len(df_raw))):
            row_data = df_raw.iloc[i].fillna('').astype(str)
            
            for col_idx, cell in enumerate(row_data):
                for pattern in gender_patterns:
                    if pattern in cell and len(cell) < 20:  # 너무 긴 텍스트 제외
                        if pattern not in gender_positions:
                            gender_positions[pattern] = []
                        gender_positions[pattern].append((i, col_idx, cell))
        
        print("발견된 성별 위치:")
        for pattern, positions in gender_positions.items():
            print(f"  '{pattern}': {len(positions)}개 위치")
            for pos in positions[:3]:  # 처음 3개만 출력
                print(f"    행{pos[0]}, 열{pos[1]}: '{pos[2]}'")
        
        # 암종명 컬럼 찾기
        print(f"\n=== 암종명 컬럼 찾기 ===")
        cancer_keywords = ['모든', '전체', '유방', '폐', '위', '대장', '간', '전립선', '갑상선', 'C00', 'C50']
        
        for col in range(min(5, len(df_raw.columns))):
            col_data = df_raw.iloc[:, col].fillna('').astype(str)
            cancer_count = sum(1 for cell in col_data if any(keyword in cell for keyword in cancer_keywords) and len(cell) < 50)
            
            if cancer_count > 5:
                print(f"열 {col}: 암종 관련 {cancer_count}개 발견")
                # 샘플 데이터 출력
                samples = [cell for cell in col_data if cell != '' and len(cell) < 50][:10]
                print(f"  샘플: {samples}")
        
        # 가능한 데이터 구조 추측
        print(f"\n=== 데이터 구조 추측 ===")
        
        # 패턴 1: 연도별 컬럼이 있는 경우
        if year_columns:
            print("패턴 1: 연도별 컬럼 구조로 추정됨")
            return parse_yearly_columns(df_raw, year_columns, gender_positions)
        
        # 패턴 2: 시트별로 연도가 나뉜 경우
        elif len(xl_file.sheet_names) >= 5:
            print("패턴 2: 연도별 시트 구조로 추정됨")
            return parse_yearly_sheets(xl_file)
        
        # 패턴 3: 단일 시트에 모든 데이터가 있는 경우
        else:
            print("패턴 3: 단일 시트 통합 구조로 추정됨")
            return parse_integrated_sheet(df_raw)
        
    except Exception as e:
        print(f"파일 분석 중 오류: {e}")
        import traceback
        traceback.print_exc()
        return None

def parse_yearly_columns(df_raw, year_columns, gender_positions):
    """연도별 컬럼 구조 파싱"""
    
    print(f"=== 연도별 컬럼 구조 파싱 ===")
    
    # 각 연도별로 남성/여성 데이터 추출
    yearly_data = {}
    
    for year in ['2018', '2019', '2020', '2021', '2022']:
        yearly_data[year] = {'male': {}, 'female': {}}
        
        if year in year_columns:
            print(f"\n{year}년 데이터 파싱...")
            
            # 해당 연도의 컬럼들에서 데이터 추출
            for row_idx, col_idx, cell_content in year_columns[year]:
                # 이 컬럼 주변에서 남성/여성 데이터 찾기
                # (실제 구현은 엑셀 구조에 따라 달라짐)
                pass
    
    return yearly_data

def parse_yearly_sheets(xl_file):
    """연도별 시트 구조 파싱"""
    
    print(f"=== 연도별 시트 구조 파싱 ===")
    
    yearly_data = {}
    
    for sheet_name in xl_file.sheet_names:
        print(f"\n시트 '{sheet_name}' 분석...")
        
        # 시트명에서 연도 추출
        year = None
        for y in ['2018', '2019', '2020', '2021', '2022']:
            if y in sheet_name:
                year = y
                break
        
        if year:
            print(f"  {year}년 데이터로 인식")
            yearly_data[year] = {'male': {}, 'female': {}}
            
            # 시트 데이터 파싱
            df = pd.read_excel(xl_file, sheet_name=sheet_name, header=None)
            # 실제 파싱 로직 구현 필요
    
    return yearly_data

def parse_integrated_sheet(df_raw):
    """단일 시트 통합 구조 파싱"""
    
    print(f"=== 단일 시트 통합 구조 파싱 ===")
    
    # 기본 구조 생성
    yearly_data = {}
    for year in ['2018', '2019', '2020', '2021', '2022']:
        yearly_data[year] = {
            'male': {
                '0-4': [], '5-9': [], '10-14': [], '15-19': [],
                '20-24': [], '25-29': [], '30-34': [], '35-39': [],
                '40-44': [], '45-49': [], '50-54': [], '55-59': [],
                '60-64': [], '65-69': [], '70-74': [], '75-79': [],
                '80-84': [], '85+': []
            },
            'female': {
                '0-4': [], '5-9': [], '10-14': [], '15-19': [],
                '20-24': [], '25-29': [], '30-34': [], '35-39': [],
                '40-44': [], '45-49': [], '50-54': [], '55-59': [],
                '60-64': [], '65-69': [], '70-74': [], '75-79': [],
                '80-84': [], '85+': []
            }
        }
    
    # 실제 파싱 로직은 엑셀 구조 파악 후 구현
    print("실제 데이터 파싱을 위해서는 엑셀 구조를 더 자세히 분석해야 합니다.")
    
    return yearly_data

def calculate_real_averages(yearly_data):
    """5개년 데이터에서 실제 평균 계산"""
    
    print(f"\n=== 5개년 실제 평균 계산 ===")
    
    if not yearly_data:
        return None
    
    # 평균 데이터 구조 생성
    average_data = {
        'male': {
            '0-4': [], '5-9': [], '10-14': [], '15-19': [],
            '20-24': [], '25-29': [], '30-34': [], '35-39': [],
            '40-44': [], '45-49': [], '50-54': [], '55-59': [],
            '60-64': [], '65-69': [], '70-74': [], '75-79': [],
            '80-84': [], '85+': []
        },
        'female': {
            '0-4': [], '5-9': [], '10-14': [], '15-19': [],
            '20-24': [], '25-29': [], '30-34': [], '35-39': [],
            '40-44': [], '45-49': [], '50-54': [], '55-59': [],
            '60-64': [], '65-69': [], '70-74': [], '75-79': [],
            '80-84': [], '85+': []
        }
    }
    
    # 각 성별/연령대/암종별로 5년간 평균 계산
    for gender in ['male', 'female']:
        for age_group in average_data[gender]:
            
            # 각 암종별로 5년간 데이터 수집
            cancer_rates = {}
            
            for year in ['2018', '2019', '2020', '2021', '2022']:
                if year in yearly_data and gender in yearly_data[year] and age_group in yearly_data[year][gender]:
                    year_data = yearly_data[year][gender][age_group]
                    
                    for cancer_item in year_data:
                        cancer_name = cancer_item['name']
                        rate = cancer_item['rate']
                        
                        if cancer_name not in cancer_rates:
                            cancer_rates[cancer_name] = []
                        cancer_rates[cancer_name].append(rate)
            
            # 각 암종별 평균 계산
            for cancer_name, rates in cancer_rates.items():
                if len(rates) >= 3:  # 최소 3년 이상 데이터가 있는 경우만
                    avg_rate = np.mean(rates)
                    average_data[gender][age_group].append({
                        'name': cancer_name,
                        'rate': round(avg_rate, 1)
                    })
            
            # 발생률 순으로 정렬
            average_data[gender][age_group].sort(key=lambda x: x['rate'], reverse=True)
    
    return average_data

if __name__ == "__main__":
    yearly_data = parse_real_5year_data()
    
    if yearly_data:
        average_data = calculate_real_averages(yearly_data)
        
        if average_data:
            print(f"\n=== 실제 5개년 평균 계산 완료 ===")
            # 결과를 파일로 저장하는 로직 추가 예정
        else:
            print("평균 계산 실패")
    else:
        print("데이터 파싱 실패")
        print("\n다음 단계:")
        print("1. 엑셀 파일을 직접 열어서 구조 확인")
        print("2. 각 연도별/성별 데이터 위치 파악")
        print("3. 파싱 로직 세부 구현")




