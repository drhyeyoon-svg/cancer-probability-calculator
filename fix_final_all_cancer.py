#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import re

def fix_final_all_cancer():
    """E4~E62 범위 데이터로 정확한 모든 암 데이터 수정"""
    
    print("=== E4~E62 범위로 정확한 모든 암 데이터 수정 ===")
    
    # 1. E4~E62 범위에서 정확한 데이터 추출
    print("1. E4~E62 범위에서 정확한 데이터 추출...")
    df = pd.read_excel('temp_2022_data.xlsx', sheet_name=0, header=None)
    
    # 남자 데이터 (E24~E41 범위)
    male_2022_data = {}
    for excel_row in range(24, 42):  # E24~E41
        pandas_row = excel_row - 1
        if pandas_row < len(df):
            b_val = df.iloc[pandas_row, 1]  # B열 (성별)
            c_val = df.iloc[pandas_row, 2]  # C열 (나이)
            e_val = df.iloc[pandas_row, 4]  # E열 (조발생률)
            
            # 연령 데이터만 추출 (계, 연령미상 제외)
            if pd.notna(c_val) and '세' in str(c_val) and c_val != '연령미상':
                male_2022_data[c_val] = float(e_val) if pd.notna(e_val) and e_val != '-' else 0
    
    # 여자 데이터 (E44~E61 범위)
    female_2022_data = {}
    for excel_row in range(44, 62):  # E44~E61
        pandas_row = excel_row - 1
        if pandas_row < len(df):
            b_val = df.iloc[pandas_row, 1]  # B열 (성별)
            c_val = df.iloc[pandas_row, 2]  # C열 (나이)
            e_val = df.iloc[pandas_row, 4]  # E열 (조발생률)
            
            # 연령 데이터만 추출 (계, 연령미상 제외)
            if pd.notna(c_val) and '세' in str(c_val) and c_val != '연령미상':
                female_2022_data[c_val] = float(e_val) if pd.notna(e_val) and e_val != '-' else 0
    
    print(f"   남자 2022년 데이터: {len(male_2022_data)}개")
    print(f"   여자 2022년 데이터: {len(female_2022_data)}개")
    
    # 검증: E35 (남자 55-59세) 확인
    print(f"   검증 - 남자 55-59세 (E35): {male_2022_data.get('55-59세', 'NOT FOUND')}")
    print(f"   검증 - 여자 55-59세 (E55): {female_2022_data.get('55-59세', 'NOT FOUND')}")
    
    # 2. 5개년 평균 데이터 읽기
    print("2. 5개년 평균 모든 암 데이터 읽기...")
    df_5year = pd.read_excel('암종별_5개년평균_모든암.xlsx', sheet_name=0, header=1)
    
    # 연령대별 5개년 평균 데이터 추출 (남녀 통합)
    age_5year_rates = {}
    for _, row in df_5year.iterrows():
        age_kr = row.iloc[2]
        avg_rate = row.iloc[3]
        
        if pd.notna(age_kr) and '세' in str(age_kr) and pd.notna(avg_rate):
            if age_kr not in age_5year_rates:
                age_5year_rates[age_kr] = []
            age_5year_rates[age_kr].append(float(avg_rate))
    
    # 각 연령대별 평균 계산
    age_5year_avg = {}
    for age_kr, rates in age_5year_rates.items():
        age_5year_avg[age_kr] = sum(rates) / len(rates)
    
    # 3. cancer-data.js 연령대 매핑
    age_mapping = {
        '0-4세': '0-19', '5-9세': '0-19', '10-14세': '0-19', '15-19세': '0-19',
        '20-24세': '20-29', '25-29세': '20-29',
        '30-34세': '30-39', '35-39세': '30-39',
        '40-44세': '40-49', '45-49세': '40-49',
        '50-54세': '50-59', '55-59세': '50-59',
        '60-64세': '60-69', '65-69세': '60-69', '70-74세': '60-69', '75-79세': '60-69', '80-84세': '60-69', '85세이상': '60-69'
    }
    
    # 4. 연령대별 2022년 및 5개년 평균 계산
    def calculate_group_average(data_dict, age_group, ages_in_group):
        rates = []
        for age in ages_in_group:
            if age in data_dict:
                rates.append(float(data_dict[age]))
        return sum(rates) / len(rates) if rates else 0
    
    # 성별 및 연령대별 데이터 계산
    group_data = {}
    for gender, data_2022 in [('male', male_2022_data), ('female', female_2022_data)]:
        group_data[gender] = {}
        
        for age_group in ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69']:
            ages_in_group = [age for age, group in age_mapping.items() if group == age_group]
            
            # 2022년 데이터
            rate_2022 = calculate_group_average(data_2022, age_group, ages_in_group)
            
            # 5개년 평균 데이터
            rate_5year = calculate_group_average(age_5year_avg, age_group, ages_in_group)
            
            group_data[gender][age_group] = {
                'rate_2022': rate_2022,
                'rate_5year': rate_5year
            }
            
            print(f"   {gender} {age_group}: 2022년={rate_2022:.1f}, 5년평균={rate_5year:.1f}")
    
    # 5. cancer-data.js 수정
    print("3. cancer-data.js 수정...")
    with open('cancer-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    new_lines = []
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # 모든 암 항목 찾기
        if '"name": "모든 암(C00-C96)",' in line:
            # 현재 성별과 연령대 찾기
            current_gender = None
            current_age_group = None
            
            for j in range(i, max(0, i-50), -1):
                if '"male":' in lines[j] or '"female":' in lines[j]:
                    current_gender = 'male' if '"male":' in lines[j] else 'female'
                age_match = re.search(r'"(0-19|20-29|30-39|40-49|50-59|60-69)":', lines[j])
                if age_match:
                    current_age_group = age_match.group(1)
                    break
            
            if current_gender and current_age_group:
                data = group_data[current_gender][current_age_group]
                
                # rate와 average5Year 라인 수정
                new_lines.append(line)
                
                # rate 라인 수정
                if i+1 < len(lines) and '"rate":' in lines[i+1]:
                    new_lines.append(f'        "rate": {data["rate_2022"]},')
                    
                    # average5Year 라인 수정
                    if i+2 < len(lines) and '"average5Year":' in lines[i+2]:
                        new_lines.append(f'        "average5Year": {data["rate_5year"]}')
                        i += 3
                        continue
                    else:
                        new_lines.append(f'        "average5Year": {data["rate_5year"]}')
                        i += 2
                        continue
        
        new_lines.append(line)
        i += 1
    
    # 파일 저장
    new_content = '\n'.join(new_lines)
    with open('cancer-data.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("   JavaScript 파일 업데이트 완료")
    
    # 6. 최종 검증
    print("4. 최종 검증...")
    male_50_59 = group_data['male']['50-59']
    print(f"   남자 50-59세 최종 결과:")
    print(f"     2022년: {male_50_59['rate_2022']:.1f} (명/10만명) = {male_50_59['rate_2022']/100:.3f}%")
    print(f"     5년평균: {male_50_59['rate_5year']:.1f} (명/10만명) = {male_50_59['rate_5year']/100:.3f}%")
    
    print(f"   원본 검증: 남자 50-54세={male_2022_data.get('50-54세', 0)}, 55-59세={male_2022_data.get('55-59세', 0)}")
    print(f"   계산된 평균: ({male_2022_data.get('50-54세', 0)} + {male_2022_data.get('55-59세', 0)}) / 2 = {(male_2022_data.get('50-54세', 0) + male_2022_data.get('55-59세', 0)) / 2:.1f}")
    
    print("\n=== E4~E62 범위 정확한 모든 암 데이터 수정 완료 ===")

if __name__ == "__main__":
    fix_final_all_cancer()








