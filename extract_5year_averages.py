#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import json
import os
import re

def extract_5year_averages():
    """24개암종 5년 발생률 raw data.xlsx에서 2018-2022년 평균을 계산합니다."""
    
    print("=== 5개년 평균 데이터 추출 시작 ===")
    
    try:
        # 파일 경로 설정
        base_dir = r"C:\Users\drhye\OneDrive\바탕 화면\암확률계산기"
        file_path = os.path.join(base_dir, "24개암종 5년 발생률 raw data.xlsx")
        
        if not os.path.exists(file_path):
            print(f"파일을 찾을 수 없습니다: {file_path}")
            return None
            
        print(f"파일 경로: {file_path}")
        
        # Excel 파일 열기
        xl_file = pd.ExcelFile(file_path)
        print(f"시트 목록: {xl_file.sheet_names}")
        
        # 첫 번째 시트 읽기 (헤더 없이)
        df = pd.read_excel(file_path, sheet_name=0, header=None)
        print(f"데이터 형태: {df.shape}")
        
        # 처음 20행 출력하여 구조 파악
        print("\n=== 데이터 구조 분석 ===")
        for i in range(min(20, len(df))):
            row_data = []
            for j in range(min(10, len(df.columns))):
                cell = df.iloc[i, j]
                if pd.notna(cell):
                    row_data.append(str(cell).strip())
                else:
                    row_data.append("NaN")
            print(f"행 {i:2d}: {row_data}")
        
        # 연도 헤더 찾기
        print("\n=== 연도 헤더 찾기 ===")
        year_row = None
        year_columns = {}
        
        for i in range(min(10, len(df))):
            for j in range(len(df.columns)):
                cell = df.iloc[i, j]
                if pd.notna(cell):
                    cell_str = str(cell).strip()
                    # 2018-2022년 찾기
                    for year in ['2018', '2019', '2020', '2021', '2022']:
                        if year in cell_str:
                            if year_row is None:
                                year_row = i
                            year_columns[year] = j
                            print(f"연도 {year} 발견: 행 {i}, 열 {j} - '{cell_str}'")
        
        if year_row is None:
            print("연도 헤더를 찾을 수 없습니다.")
            return None
            
        print(f"연도 헤더 행: {year_row}")
        print(f"연도별 열 위치: {year_columns}")
        
        # 암종 및 성별 정보 찾기
        print("\n=== 암종 및 성별 정보 찾기 ===")
        data_start_row = year_row + 1
        
        # 결과 저장용 딕셔너리
        cancer_averages = {
            'male': {},
            'female': {}
        }
        
        # 연령대 매핑
        age_mapping = {
            '0-4': '0-4',
            '5-9': '5-9', 
            '10-14': '10-14',
            '15-19': '15-19',
            '20-24': '20-24',
            '25-29': '25-29',
            '30-34': '30-34',
            '35-39': '35-39',
            '40-44': '40-44',
            '45-49': '45-49',
            '50-54': '50-54',
            '55-59': '55-59',
            '60-64': '60-64',
            '65-69': '65-69',
            '70-74': '70-74',
            '75-79': '75-79',
            '80-84': '80-84',
            '85+': '85+'
        }
        
        current_cancer = None
        current_gender = None
        current_age = None
        
        # 데이터 행들을 순회하면서 정보 추출
        for i in range(data_start_row, len(df)):
            first_col = df.iloc[i, 0]
            second_col = df.iloc[i, 1] if len(df.columns) > 1 else None
            
            if pd.notna(first_col):
                first_str = str(first_col).strip()
                
                # 암종 확인
                if any(cancer in first_str for cancer in ['모든 암', '위', '간', '폐', '유방', '갑상선', '대장', '전립선']):
                    current_cancer = first_str
                    print(f"암종 발견: {current_cancer}")
                    continue
                
                # 성별 확인
                if first_str in ['남자', '여자']:
                    current_gender = 'male' if first_str == '남자' else 'female'
                    print(f"성별 발견: {current_gender}")
                    continue
                
                # 연령대 확인
                age_match = re.search(r'(\d+)-(\d+)|(\d+)\+|(\d+)세', first_str)
                if age_match:
                    current_age = first_str.replace('세', '')
                    if current_age in age_mapping:
                        current_age = age_mapping[current_age]
                    
                    # 5개년 데이터 추출 및 평균 계산
                    if current_cancer and current_gender and current_age:
                        year_values = []
                        for year in ['2018', '2019', '2020', '2021', '2022']:
                            if year in year_columns:
                                col_idx = year_columns[year]
                                if col_idx < len(df.columns):
                                    value = df.iloc[i, col_idx]
                                    if pd.notna(value) and str(value).strip() != '-':
                                        try:
                                            year_values.append(float(value))
                                        except:
                                            pass
                        
                        if year_values:
                            average = sum(year_values) / len(year_values)
                            
                            # 데이터 저장
                            if current_gender not in cancer_averages:
                                cancer_averages[current_gender] = {}
                            if current_age not in cancer_averages[current_gender]:
                                cancer_averages[current_gender][current_age] = {}
                            
                            cancer_averages[current_gender][current_age][current_cancer] = {
                                'values': year_values,
                                'average': round(average, 2)
                            }
                            
                            print(f"{current_gender} {current_age} {current_cancer}: {year_values} -> 평균: {average:.2f}")
        
        # 결과 저장
        output_file = os.path.join(base_dir, "extracted_5year_averages.json")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(cancer_averages, f, ensure_ascii=False, indent=2)
        
        print(f"\n결과가 저장되었습니다: {output_file}")
        
        # 요약 정보 출력
        print("\n=== 추출 결과 요약 ===")
        for gender in cancer_averages:
            print(f"{gender}: {len(cancer_averages[gender])} 연령대")
            for age in cancer_averages[gender]:
                print(f"  {age}: {len(cancer_averages[gender][age])} 암종")
        
        return cancer_averages
        
    except Exception as e:
        print(f"오류 발생: {e}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    extract_5year_averages()






