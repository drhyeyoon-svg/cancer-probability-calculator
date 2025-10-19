#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import re

def integrate_5year_average_simple():
    """5개년 평균 데이터를 기존 cancer-data.js에 통합합니다."""
    
    # 5개년 평균 Excel 파일 읽기
    df = pd.read_excel('암종별_5개년평균_발생자수_조발생률.xlsx', sheet_name=0, header=None)
    
    print("5개년 평균 Excel 파일 로드 완료")
    print(f"총 행 수: {len(df)}")
    
    # 첫 번째 행이 실제 헤더인지 확인하고 제거
    if df.iloc[0][0] == '24개 암종별':
        df = df.iloc[1:].reset_index(drop=True)
        print("헤더 행 제거 완료")
    
    # 빈 행 제거
    df = df.dropna(subset=[0, 1, 2])
    
    print(f"정리 후 행 수: {len(df)}")
    
    # 기존 cancer-data.js 읽기
    with open('cancer-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 5개년 평균 데이터를 딕셔너리로 저장
    five_year_data = {}
    
    # 연령대 매핑
    age_mapping = {
        '0-4세': '0-4',
        '5-9세': '5-9', 
        '10-14세': '10-14',
        '15-19세': '15-19',
        '20-24세': '20-24',
        '25-29세': '25-29',
        '30-34세': '30-34',
        '35-39세': '35-39',
        '40-44세': '40-44',
        '45-49세': '45-49',
        '50-54세': '50-54',
        '55-59세': '55-59',
        '60-64세': '60-64',
        '65-69세': '65-69',
        '70-74세': '70-74',
        '75-79세': '75-79',
        '80-84세': '80-84',
        '85세이상': '85+'
    }
    
    # 성별 매핑
    gender_mapping = {
        '남자': 'male',
        '여자': 'female'
    }
    
    # 각 성별, 연령대별로 5개년 평균 데이터 처리
    for gender_kr, gender_en in gender_mapping.items():
        print(f"\n{gender_kr} 5개년 평균 데이터 처리 중...")
        
        gender_data = df[df[1] == gender_kr]
        
        for age_kr, age_en in age_mapping.items():
            age_data = gender_data[gender_data[2] == age_kr]
            
            if len(age_data) == 0:
                continue
                
            for _, row in age_data.iterrows():
                cancer_name = row[0]  # 24개 암종별
                avg_rate = row[4]     # 평균 조발생률
                
                # 숫자 변환
                if pd.isna(avg_rate) or avg_rate == '-':
                    continue
                    
                try:
                    avg_rate = float(avg_rate)
                except (ValueError, TypeError):
                    continue
                
                key = f"{gender_en}_{age_en}_{cancer_name}"
                five_year_data[key] = avg_rate
    
    print(f"\n5개년 평균 데이터 {len(five_year_data)}개 항목 추출 완료")
    
    # JavaScript 파일에서 각 항목에 average5Year 추가
    lines = content.split('\n')
    new_lines = []
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # 암종 항목 찾기
        if '"name":' in line and '"rate":' in lines[i+1]:
            # 암종 이름 추출
            name_match = re.search(r'"name":\s*"([^"]+)"', line)
            if name_match:
                cancer_name = name_match.group(1)
                
                # 현재 성별과 연령대 찾기
                current_gender = None
                current_age = None
                
                # 위로 올라가면서 성별과 연령대 찾기
                for j in range(i, max(0, i-50), -1):
                    if '"male":' in lines[j] or '"female":' in lines[j]:
                        if '"male":' in lines[j]:
                            current_gender = 'male'
                        else:
                            current_gender = 'female'
                    if re.search(r'"[0-9]+-[0-9]+":|"[0-9]+\+":', lines[j]):
                        age_match = re.search(r'"([0-9]+-[0-9]+)":|"([0-9]+\+)":', lines[j])
                        if age_match:
                            current_age = age_match.group(1) or age_match.group(2)
                
                # 5개년 평균 데이터 찾기
                if current_gender and current_age:
                    key = f"{current_gender}_{current_age}_{cancer_name}"
                    if key in five_year_data:
                        avg_rate = five_year_data[key]
                        
                        # rate 다음에 average5Year 추가
                        if i+1 < len(lines) and '"rate":' in lines[i+1]:
                            new_lines.append(line)
                            new_lines.append(lines[i+1])
                            new_lines.append(f'        "average5Year": {avg_rate},')
                            i += 2
                            continue
        
        new_lines.append(line)
        i += 1
    
    # 새로운 내용 생성
    new_content = '\n'.join(new_lines)
    
    # 파일 저장
    with open('cancer-data.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"\nJavaScript 파일 업데이트 완료: cancer-data.js")
    
    # 샘플 확인
    print(f"\n샘플 확인:")
    sample_lines = new_content.split('\n')
    for i, line in enumerate(sample_lines):
        if '모든 암' in line and 'average5Year' in line:
            print(f"  {line.strip()}")
            if i+1 < len(sample_lines):
                print(f"  {sample_lines[i+1].strip()}")
            break

if __name__ == "__main__":
    integrate_5year_average_simple()








