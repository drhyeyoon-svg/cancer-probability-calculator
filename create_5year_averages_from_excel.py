#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import json
import re
import os

def create_5year_averages_from_excel():
    """24개암종 5년 발생률 raw data.xlsx에서 실제 5개년 평균을 계산하여 JS 파일을 생성합니다."""
    
    print("=== Excel에서 5개년 평균 계산 시작 ===")
    
    try:
        # Excel 파일 경로 - 올바른 5개년 평균 파일 사용
        excel_file = "암종별_5개년평균_모든암.xlsx"
        
        if not os.path.exists(excel_file):
            print(f"Excel 파일을 찾을 수 없습니다: {excel_file}")
            return False
        
        print(f"Excel 파일: {excel_file}")
        
        # Excel 파일 읽기
        xl_file = pd.ExcelFile(excel_file)
        print(f"시트 목록: {xl_file.sheet_names}")
        
        # 첫 번째 시트 분석
        sheet_name = xl_file.sheet_names[0]
        df = pd.read_excel(excel_file, sheet_name=sheet_name, header=None)
        print(f"데이터 형태: {df.shape}")
        
        # 처음 50행 출력하여 구조 파악
        print("\n=== 데이터 구조 분석 ===")
        for i in range(min(50, len(df))):
            row_data = []
            for j in range(min(20, len(df.columns))):
                cell = df.iloc[i, j]
                if pd.notna(cell):
                    cell_str = str(cell).strip()
                    if len(cell_str) > 15:
                        cell_str = cell_str[:15] + "..."
                    row_data.append(cell_str)
                else:
                    row_data.append("")
            print(f"행 {i:2d}: {row_data}")
        
        # 연도 헤더 찾기
        print("\n=== 연도 헤더 찾기 ===")
        year_columns = {}
        year_row = None
        
        for i in range(min(30, len(df))):
            for j in range(len(df.columns)):
                cell = df.iloc[i, j]
                if pd.notna(cell):
                    cell_str = str(cell).strip()
                    # 2018-2022년 찾기
                    for year in ['2018', '2019', '2020', '2021', '2022']:
                        if year == cell_str or (year in cell_str and len(cell_str) <= 10):
                            if year_row is None:
                                year_row = i
                            year_columns[year] = j
                            print(f"연도 {year} 발견: 행 {i}, 열 {j} - '{cell_str}'")
        
        if not year_columns:
            print("연도 헤더를 찾을 수 없습니다.")
            # 수동으로 연도 열 설정 (추정)
            print("수동으로 연도 열 추정...")
            year_columns = {'2018': 3, '2019': 4, '2020': 5, '2021': 6, '2022': 7}
            year_row = 2
            print(f"추정된 연도 열: {year_columns}")
        
        print(f"연도 헤더 행: {year_row}")
        print(f"연도별 열 위치: {year_columns}")
        
        # 결과 저장용 딕셔너리
        result_data = {
            'male': {},
            'female': {}
        }
        
        # 현재 상태 추적 변수
        current_cancer = None
        current_gender = None
        
        # 연령대 매핑
        age_mapping = {
            '0-4': '0-4', '5-9': '5-9', '10-14': '10-14', '15-19': '15-19',
            '20-24': '20-24', '25-29': '25-29', '30-34': '30-34', '35-39': '35-39',
            '40-44': '40-44', '45-49': '45-49', '50-54': '50-54', '55-59': '55-59',
            '60-64': '60-64', '65-69': '65-69', '70-74': '70-74', '75-79': '75-79',
            '80-84': '80-84', '85+': '85+', '85세이상': '85+'
        }
        
        # 데이터 행들을 순회
        data_start_row = year_row + 1 if year_row else 10
        
        print(f"\n=== 데이터 추출 시작 (행 {data_start_row}부터) ===")
        
        for i in range(data_start_row, len(df)):
            first_col = df.iloc[i, 0]
            second_col = df.iloc[i, 1] if len(df.columns) > 1 else None
            
            if pd.notna(first_col):
                first_str = str(first_col).strip()
                
                # 암종 확인
                cancer_keywords = [
                    '모든 암', '위', '간', '폐', '유방', '갑상선', '대장', '전립선', 
                    '췌장', '신장', '방광', '백혈병', '뇌', '식도', '자궁경부', 
                    '난소', '림프종', '구강', '인두', '후두', '골', '연조직',
                    '기타 암', '담낭', '자궁체부', '다발성 골수종', '호지킨'
                ]
                
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
                    
                    if current_age in age_mapping:
                        mapped_age = age_mapping[current_age]
                        
                        if current_cancer and current_gender:
                            # 5개년 데이터 추출
                            year_values = []
                            year_data = {}
                            
                            for year in ['2018', '2019', '2020', '2021', '2022']:
                                if year in year_columns:
                                    col_idx = year_columns[year]
                                    if col_idx < len(df.columns):
                                        value = df.iloc[i, col_idx]
                                        if pd.notna(value) and str(value).strip() not in ['-', '', 'NaN']:
                                            try:
                                                float_value = float(value)
                                                year_values.append(float_value)
                                                year_data[year] = float_value
                                            except:
                                                pass
                            
                            # 최소 3년 데이터가 있어야 평균 계산
                            if len(year_values) >= 3:
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
                                    'yearly_data': year_data
                                })
                                
                                print(f"{current_gender} {mapped_age} {current_cancer}: {year_values} -> 평균: {average:.2f}")
        
        # 각 연령대별로 rate 기준 정렬
        print("\n=== 데이터 정렬 ===")
        for gender in result_data:
            for age in result_data[gender]:
                result_data[gender][age].sort(key=lambda x: x['rate'], reverse=True)
                print(f"{gender} {age}: {len(result_data[gender][age])} 암종")
        
        # JavaScript 파일 생성
        print("\n=== JavaScript 파일 생성 ===")
        
        # 불필요한 필드 제거 (rate만 남김)
        clean_data = {}
        for gender in result_data:
            clean_data[gender] = {}
            for age in result_data[gender]:
                clean_data[gender][age] = []
                for item in result_data[gender][age]:
                    clean_data[gender][age].append({
                        'name': item['name'],
                        'rate': item['rate']
                    })
        
        # JavaScript 형식으로 변환
        js_content = """// 암 발생률 5개년 평균 데이터 (2018-2022)
// 24개암종 5년 발생률 raw data.xlsx에서 실제 계산된 평균

const cancerData5Year = """ + json.dumps(clean_data, ensure_ascii=False, indent=2) + ";"
        
        # 백업 생성
        if os.path.exists('cancer-data-5year.js'):
            with open('cancer-data-5year-backup-old.js', 'w', encoding='utf-8') as f:
                with open('cancer-data-5year.js', 'r', encoding='utf-8') as original:
                    f.write(original.read())
            print("기존 파일 백업: cancer-data-5year-backup-old.js")
        
        # 새 파일 저장
        with open('cancer-data-5year.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print("cancer-data-5year.js 파일 생성 완료!")
        
        # 요약 정보 출력
        print("\n=== 생성 결과 요약 ===")
        total_items = 0
        for gender in clean_data:
            print(f"{gender}: {len(clean_data[gender])} 연령대")
            for age in clean_data[gender]:
                count = len(clean_data[gender][age])
                total_items += count
                print(f"  {age}: {count} 암종")
        
        print(f"총 {total_items}개 항목 생성됨")
        
        # 샘플 데이터 출력
        print("\n=== 샘플 데이터 ===")
        if 'male' in clean_data and '30-34' in clean_data['male']:
            print("남성 30-34세 상위 5개:")
            for i, item in enumerate(clean_data['male']['30-34'][:5]):
                print(f"  {i+1}. {item['name']}: {item['rate']}")
        
        if 'female' in clean_data and '30-34' in clean_data['female']:
            print("여성 30-34세 상위 5개:")
            for i, item in enumerate(clean_data['female']['30-34'][:5]):
                print(f"  {i+1}. {item['name']}: {item['rate']}")
        
        return True
        
    except Exception as e:
        print(f"오류 발생: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    create_5year_averages_from_excel()


