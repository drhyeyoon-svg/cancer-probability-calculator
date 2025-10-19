#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import json
import os
import re

def analyze_excel_and_create_5year_data():
    """24개암종 5년 발생률 raw data.xlsx를 분석하여 실제 5개년 평균을 계산합니다."""
    
    print("=== Excel 파일 분석 및 5개년 평균 계산 시작 ===")
    
    try:
        # 파일 경로
        excel_file = "24개암종 5년 발생률 raw data.xlsx"
        
        if not os.path.exists(excel_file):
            print(f"Excel 파일을 찾을 수 없습니다: {excel_file}")
            return False
        
        print(f"Excel 파일 경로: {excel_file}")
        
        # Excel 파일 읽기
        xl_file = pd.ExcelFile(excel_file)
        print(f"시트 목록: {xl_file.sheet_names}")
        
        # 첫 번째 시트 분석
        sheet_name = xl_file.sheet_names[0]
        df = pd.read_excel(excel_file, sheet_name=sheet_name, header=None)
        print(f"데이터 형태: {df.shape}")
        
        # 처음 30행 출력하여 구조 파악
        print("\n=== 데이터 구조 분석 (처음 30행) ===")
        for i in range(min(30, len(df))):
            row_data = []
            for j in range(min(15, len(df.columns))):
                cell = df.iloc[i, j]
                if pd.notna(cell):
                    cell_str = str(cell).strip()
                    if len(cell_str) > 20:
                        cell_str = cell_str[:20] + "..."
                    row_data.append(cell_str)
                else:
                    row_data.append("NaN")
            print(f"행 {i:2d}: {row_data}")
        
        # 연도 헤더 찾기
        print("\n=== 연도 헤더 찾기 ===")
        year_row = None
        year_columns = {}
        
        for i in range(min(20, len(df))):
            for j in range(len(df.columns)):
                cell = df.iloc[i, j]
                if pd.notna(cell):
                    cell_str = str(cell).strip()
                    # 2018-2022년 찾기
                    for year in ['2018', '2019', '2020', '2021', '2022']:
                        if year in cell_str and len(cell_str) < 10:  # 너무 긴 문자열 제외
                            if year_row is None:
                                year_row = i
                            year_columns[year] = j
                            print(f"연도 {year} 발견: 행 {i}, 열 {j} - '{cell_str}'")
        
        if not year_columns:
            print("연도 헤더를 찾을 수 없습니다.")
            return False
        
        print(f"연도 헤더 행: {year_row}")
        print(f"연도별 열 위치: {year_columns}")
        
        # 암종 및 성별, 연령 정보 찾기
        print("\n=== 암종, 성별, 연령 정보 찾기 ===")
        
        # 결과 저장용 딕셔너리
        result_data = {
            'male': {},
            'female': {}
        }
        
        # 현재 상태 추적 변수
        current_cancer = None
        current_gender = None
        
        # 데이터 행들을 순회
        data_start_row = year_row + 1 if year_row else 10
        
        for i in range(data_start_row, len(df)):
            first_col = df.iloc[i, 0]
            second_col = df.iloc[i, 1] if len(df.columns) > 1 else None
            
            if pd.notna(first_col):
                first_str = str(first_col).strip()
                
                # 암종 확인 (더 포괄적으로)
                cancer_keywords = ['모든 암', '위', '간', '폐', '유방', '갑상선', '대장', '전립선', 
                                 '췌장', '신장', '방광', '백혈병', '뇌', '식도', '자궁경부', 
                                 '난소', '림프종', '구강', '인두', '후두', '골', '연조직']
                
                if any(keyword in first_str for keyword in cancer_keywords):
                    current_cancer = first_str
                    print(f"암종 발견: {current_cancer}")
                    continue
                
                # 성별 확인
                if first_str in ['남자', '여자', '남성', '여성']:
                    current_gender = 'male' if first_str in ['남자', '남성'] else 'female'
                    print(f"성별 발견: {current_gender}")
                    continue
                
                # 연령대 확인
                age_pattern = r'(\d+)-(\d+)|(\d+)\+|(\d+)세'
                if re.search(age_pattern, first_str):
                    current_age = first_str.replace('세', '').strip()
                    
                    # 연령대 매핑
                    age_mapping = {
                        '0-4': '0-4', '5-9': '5-9', '10-14': '10-14', '15-19': '15-19',
                        '20-24': '20-24', '25-29': '25-29', '30-34': '30-34', '35-39': '35-39',
                        '40-44': '40-44', '45-49': '45-49', '50-54': '50-54', '55-59': '55-59',
                        '60-64': '60-64', '65-69': '65-69', '70-74': '70-74', '75-79': '75-79',
                        '80-84': '80-84', '85+': '85+', '85세이상': '85+'
                    }
                    
                    if current_age in age_mapping:
                        mapped_age = age_mapping[current_age]
                        
                        if current_cancer and current_gender:
                            # 5개년 데이터 추출 및 평균 계산
                            year_values = []
                            for year in ['2018', '2019', '2020', '2021', '2022']:
                                if year in year_columns:
                                    col_idx = year_columns[year]
                                    if col_idx < len(df.columns):
                                        value = df.iloc[i, col_idx]
                                        if pd.notna(value) and str(value).strip() not in ['-', '']:
                                            try:
                                                year_values.append(float(value))
                                            except:
                                                pass
                            
                            if len(year_values) >= 3:  # 최소 3년 데이터가 있어야 평균 계산
                                average = sum(year_values) / len(year_values)
                                
                                # 데이터 저장
                                if current_gender not in result_data:
                                    result_data[current_gender] = {}
                                if mapped_age not in result_data[current_gender]:
                                    result_data[current_gender][mapped_age] = []
                                
                                result_data[current_gender][mapped_age].append({
                                    'name': current_cancer,
                                    'rate': round(average, 2),
                                    'source_years': len(year_values),
                                    'raw_values': year_values
                                })
                                
                                print(f"{current_gender} {mapped_age} {current_cancer}: {year_values} -> 평균: {average:.2f}")
        
        # 결과를 JavaScript 파일로 저장
        print("\n=== JavaScript 파일 생성 ===")
        
        # 각 연령대별로 rate 기준 정렬
        for gender in result_data:
            for age in result_data[gender]:
                result_data[gender][age].sort(key=lambda x: x['rate'], reverse=True)
        
        # JavaScript 형식으로 변환
        js_content = "// 암 발생률 5개년 평균 데이터 (2018-2022)\n"
        js_content += "// 24개암종 5년 발생률 raw data.xlsx에서 실제 계산된 평균\n\n"
        js_content += "const cancerData5Year = " + json.dumps(result_data, ensure_ascii=False, indent=2) + ";"
        
        # 백업 생성
        if os.path.exists('cancer-data-5year.js'):
            with open('cancer-data-5year-backup.js', 'w', encoding='utf-8') as f:
                with open('cancer-data-5year.js', 'r', encoding='utf-8') as original:
                    f.write(original.read())
            print("기존 파일 백업: cancer-data-5year-backup.js")
        
        # 새 파일 저장
        with open('cancer-data-5year.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print("cancer-data-5year.js 파일 업데이트 완료!")
        
        # 요약 정보 출력
        print("\n=== 생성 결과 요약 ===")
        total_items = 0
        for gender in result_data:
            print(f"{gender}: {len(result_data[gender])} 연령대")
            for age in result_data[gender]:
                count = len(result_data[gender][age])
                total_items += count
                print(f"  {age}: {count} 암종")
        
        print(f"총 {total_items}개 항목 생성됨")
        
        return True
        
    except Exception as e:
        print(f"오류 발생: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    analyze_excel_and_create_5year_data()






