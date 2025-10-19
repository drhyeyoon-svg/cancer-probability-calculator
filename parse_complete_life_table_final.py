#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
완전생명표 데이터 파싱 및 JavaScript 파일 생성 (최종)
"""

import pandas as pd
import json

def parse_complete_life_table_final():
    """완전생명표 데이터 파싱 (최종)"""
    try:
        # 엑셀 파일 읽기 (헤더 없이)
        df = pd.read_excel('완전생명표_1세별__20250922233739.xlsx', header=None)
        
        print("=== 완전생명표 데이터 파싱 (최종) ===")
        print(f"데이터 크기: {df.shape}")
        
        # 각 연도별 컬럼 인덱스 정의
        years = ['2019', '2020', '2021', '2022', '2023']
        year_columns = {
            '2019': list(range(1, 19)),    # 1-18
            '2020': list(range(19, 37)),   # 19-36
            '2021': list(range(37, 55)),   # 37-54
            '2022': list(range(55, 73)),   # 55-72
            '2023': list(range(73, 91))    # 73-90
        }
        
        # 각 연도별 헤더 정의 (두 번째 행에서 가져옴)
        headers = df.iloc[1].tolist()
        
        # 각 연도별 데이터 추출
        life_table_data = {}
        
        for year in years:
            print(f"\n{year}년 데이터 처리 중...")
            year_data = {}
            
            # 해당 연도 컬럼 인덱스
            col_indices = year_columns[year]
            
            # 각 연령별 데이터 추출 (3번째 행부터)
            for row_idx in range(2, len(df)):
                age_str = str(df.iloc[row_idx, 0])  # 첫 번째 컬럼이 연령
                
                if age_str.replace('세', '').isdigit():
                    age = int(age_str.replace('세', ''))
                    
                    # 해당 연도 데이터 추출
                    age_info = {}
                    for i, col_idx in enumerate(col_indices):
                        if col_idx < len(headers):
                            header = headers[col_idx]
                            value = df.iloc[row_idx, col_idx]
                            
                            # 숫자 데이터만 추출
                            try:
                                if pd.notna(value) and str(value).replace('.', '').replace('-', '').isdigit():
                                    age_info[header] = float(value)
                                else:
                                    age_info[header] = 0
                            except:
                                age_info[header] = 0
                    
                    year_data[age] = age_info
            
            life_table_data[year] = year_data
            print(f"{year}년 데이터: {len(year_data)}개 연령")
        
        # 5개년 평균 계산
        print("\n=== 5개년 평균 계산 ===")
        average_data = {}
        
        # 모든 연령에 대해 평균 계산
        all_ages = set()
        for year_data in life_table_data.values():
            all_ages.update(year_data.keys())
        
        for age in sorted(all_ages):
            age_averages = {}
            
            # 각 연도별 데이터 수집
            year_values = {}
            for year in years:
                if year in life_table_data and age in life_table_data[year]:
                    year_values[year] = life_table_data[year][age]
            
            if year_values:
                # 각 지표별 평균 계산
                key_indicators = [
                    '기대여명(전체) (년)', '기대여명(남자) (년)', '기대여명(여자) (년)',
                    '사망확률(전체)', '사망확률(남자)', '사망확률(여자)',
                    '생존자(전체)', '생존자(남자)', '생존자(여자)'
                ]
                
                for indicator in key_indicators:
                    values = []
                    for year_data in year_values.values():
                        if indicator in year_data:
                            values.append(year_data[indicator])
                    
                    if values:
                        age_averages[indicator] = sum(values) / len(values)
            
            if age_averages:
                average_data[age] = age_averages
        
        print(f"5개년 평균 데이터: {len(average_data)}개 연령")
        
        # JavaScript 파일 생성
        js_content = f"""// 완전생명표 데이터 (2019-2023년)
const completeLifeTableData = {json.dumps(life_table_data, ensure_ascii=False, indent=2)};

// 5개년 평균 데이터
const averageLifeTableData = {json.dumps(average_data, ensure_ascii=False, indent=2)};
"""
        
        with open('complete-life-table-data.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print(f"\nJavaScript 파일 생성 완료: complete-life-table-data.js")
        
        # 샘플 데이터 확인
        print("\n=== 샘플 데이터 확인 ===")
        if 30 in average_data:
            print(f"30세 5개년 평균:")
            for key, value in average_data[30].items():
                print(f"  {key}: {value}")
        
        if 30 in life_table_data['2023']:
            print(f"\n30세 2023년 데이터:")
            for key, value in life_table_data['2023'][30].items():
                print(f"  {key}: {value}")
        
        return life_table_data, average_data
        
    except Exception as e:
        print(f"오류: {e}")
        import traceback
        traceback.print_exc()
        return None, None

if __name__ == "__main__":
    parse_complete_life_table_final()





