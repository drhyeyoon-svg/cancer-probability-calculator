#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import re

def fix_all_cancer_final():
    """올바른 모든 암 데이터로 최종 수정합니다."""
    
    print("=== 모든 암 데이터 최종 수정 시작 ===")
    
    # 1. 5개년 평균 모든 암 데이터 읽기
    print("1. 5개년 평균 모든 암 데이터 읽기...")
    df_5year = pd.read_excel('암종별_5개년평균_모든암.xlsx', sheet_name=0, header=1)
    
    # 연령대별 5개년 평균 데이터 추출
    age_5year_rates = {}
    for _, row in df_5year.iterrows():
        age_kr = row.iloc[2]  # 연령별
        avg_rate = row.iloc[3]  # 5개년 평균 발생률
        
        if pd.notna(age_kr) and '세' in str(age_kr) and pd.notna(avg_rate):
            if age_kr not in age_5year_rates:
                age_5year_rates[age_kr] = []
            age_5year_rates[age_kr].append(float(avg_rate))
    
    # 각 연령대별 평균 계산 (성별 구분 없이)
    age_5year_avg = {}
    for age_kr, rates in age_5year_rates.items():
        age_5year_avg[age_kr] = sum(rates) / len(rates)
    
    print("   연령대별 5개년 평균:")
    for age, rate in age_5year_avg.items():
        print(f"     {age}: {rate:.2f}")
    
    # 2. cancer-data.js 연령대 매핑에 따른 그룹별 평균 계산
    age_group_mapping = {
        '0-19': ['0-4세', '5-9세', '10-14세', '15-19세'],
        '20-29': ['20-24세', '25-29세'],
        '30-39': ['30-34세', '35-39세'],
        '40-49': ['40-44세', '45-49세'],
        '50-59': ['50-54세', '55-59세'],
        '60-69': ['60-64세', '65-69세', '70-74세', '75-79세', '80-84세', '85세이상']  # 60-69가 최고 그룹
    }
    
    age_group_rates = {}
    for group, ages in age_group_mapping.items():
        rates = []
        for age in ages:
            if age in age_5year_avg:
                rates.append(age_5year_avg[age])
        
        if rates:
            age_group_rates[group] = sum(rates) / len(rates)
            print(f"   {group} 그룹 평균: {age_group_rates[group]:.2f}")
    
    # 3. 2022년 데이터는 전체 평균을 사용 (550.2)
    total_2022_rate = 550.2
    
    # 4. cancer-data.js 수정
    print("2. cancer-data.js 수정...")
    with open('cancer-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 각 연령대의 모든 암 항목을 올바른 값으로 수정
    lines = content.split('\n')
    new_lines = []
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # 모든 암 항목 찾기
        if '"name": "모든 암(C00-C96)",' in line:
            # 현재 연령대 찾기
            current_age_group = None
            for j in range(i, max(0, i-50), -1):
                age_match = re.search(r'"(0-19|20-29|30-39|40-49|50-59|60-69)":', lines[j])
                if age_match:
                    current_age_group = age_match.group(1)
                    break
            
            if current_age_group and current_age_group in age_group_rates:
                # rate와 average5Year 라인 수정
                new_lines.append(line)
                
                # rate 라인 수정
                if i+1 < len(lines) and '"rate":' in lines[i+1]:
                    rate_5year = age_group_rates[current_age_group]
                    new_lines.append(f'        "rate": {total_2022_rate},')
                    
                    # average5Year 라인 수정
                    if i+2 < len(lines) and '"average5Year":' in lines[i+2]:
                        new_lines.append(f'        "average5Year": {rate_5year}')
                        i += 3
                        continue
                    else:
                        new_lines.append(f'        "average5Year": {rate_5year}')
                        i += 2
                        continue
        
        new_lines.append(line)
        i += 1
    
    # 파일 저장
    new_content = '\n'.join(new_lines)
    with open('cancer-data.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("   JavaScript 파일 업데이트 완료")
    
    # 5. 검증
    print("3. 수정 결과 검증...")
    sample_lines = new_content.split('\n')
    for i, line in enumerate(sample_lines):
        if '모든 암' in line and '50-59' in sample_lines[max(0, i-10):i]:
            print(f"   50-59 모든 암: {line.strip()}")
            if i+1 < len(sample_lines):
                print(f"     {sample_lines[i+1].strip()}")
            if i+2 < len(sample_lines):
                print(f"     {sample_lines[i+2].strip()}")
            break
    
    print("\n=== 모든 암 데이터 최종 수정 완료 ===")
    print(f"이제 56세 남성의 전체 암 발생률이 {total_2022_rate/100}% = {total_2022_rate/1000:.3f}%로 표시될 것입니다.")

if __name__ == "__main__":
    fix_all_cancer_final()








