#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import json

def recreate_correct_cancer_data():
    """각 셀 값을 그대로 사용하여 5세 단위로 올바른 cancer-data.js 생성"""
    
    print("=== 올바른 5세 단위 cancer-data.js 재생성 ===")
    
    # 1. 2022년 모든 암 데이터 추출 (E4~E62)
    print("1. 2022년 모든 암 데이터 정확 추출...")
    df = pd.read_excel('temp_2022_data.xlsx', sheet_name=0, header=None)
    
    # 남자 데이터 (E24~E41)
    male_2022_data = {}
    for excel_row in range(24, 42):  # E24~E41
        pandas_row = excel_row - 1
        if pandas_row < len(df):
            c_val = df.iloc[pandas_row, 2]  # C열 (나이)
            e_val = df.iloc[pandas_row, 4]  # E열 (조발생률)
            
            if pd.notna(c_val) and '세' in str(c_val) and c_val != '연령미상':
                male_2022_data[c_val] = float(e_val) if pd.notna(e_val) and e_val != '-' else 0
    
    # 여자 데이터 (E44~E61)
    female_2022_data = {}
    for excel_row in range(44, 62):  # E44~E61
        pandas_row = excel_row - 1
        if pandas_row < len(df):
            c_val = df.iloc[pandas_row, 2]  # C열 (나이)
            e_val = df.iloc[pandas_row, 4]  # E열 (조발생률)
            
            if pd.notna(c_val) and '세' in str(c_val) and c_val != '연령미상':
                female_2022_data[c_val] = float(e_val) if pd.notna(e_val) and e_val != '-' else 0
    
    print(f"   남자 데이터: {len(male_2022_data)}개")
    print(f"   여자 데이터: {len(female_2022_data)}개")
    print(f"   검증 - 남자 55-59세: {male_2022_data.get('55-59세', 'NOT FOUND')}")
    
    # 2. 5개년 평균 데이터 읽기
    print("2. 5개년 평균 데이터 읽기...")
    df_5year = pd.read_excel('암종별_5개년평균_모든암.xlsx', sheet_name=0, header=1)
    
    age_5year_avg = {}
    for _, row in df_5year.iterrows():
        age_kr = row.iloc[2]
        avg_rate = row.iloc[3]
        
        if pd.notna(age_kr) and '세' in str(age_kr) and pd.notna(avg_rate):
            if age_kr not in age_5year_avg:
                age_5year_avg[age_kr] = []
            age_5year_avg[age_kr].append(float(avg_rate))
    
    # 평균 계산
    for age_kr in age_5year_avg:
        rates = age_5year_avg[age_kr]
        age_5year_avg[age_kr] = sum(rates) / len(rates)
    
    # 3. 기존 개별 암종 데이터 읽기 (2022년 데이터와 5개년 평균)
    print("3. 기존 개별 암종 데이터 읽기...")
    
    # 기존 cancer-data.js에서 개별 암종 데이터 추출
    with open('cancer-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 4. 새로운 5세 단위 구조로 데이터 생성
    print("4. 새로운 5세 단위 구조 생성...")
    
    # 연령대 매핑 (5세 단위)
    age_groups_5year = [
        '0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39',
        '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', 
        '75-79', '80-84', '85+'
    ]
    
    # 기존 10세 단위 -> 5세 단위 매핑
    age_mapping_10to5 = {
        '0-19': ['0-4', '5-9', '10-14', '15-19'],
        '20-29': ['20-24', '25-29'],
        '30-39': ['30-34', '35-39'],
        '40-49': ['40-44', '45-49'],
        '50-59': ['50-54', '55-59'],
        '60-69': ['60-64', '65-69', '70-74', '75-79', '80-84', '85+']
    }
    
    new_cancer_data = {
        "male": {},
        "female": {}
    }
    
    # 5. 각 5세 단위 연령대별로 데이터 생성
    for gender in ['male', 'female']:
        data_2022 = male_2022_data if gender == 'male' else female_2022_data
        
        for age_5 in age_groups_5year:
            age_kr = age_5 + '세'
            
            # 해당 5세 연령대의 모든 암 데이터
            all_cancer_2022 = data_2022.get(age_kr, 0)
            all_cancer_5year = age_5year_avg.get(age_kr, 0)
            
            # 개별 암종 데이터는 기존 10세 단위에서 가져오기
            # 해당 5세 단위가 속하는 10세 단위 찾기
            parent_10year = None
            for age_10, age_5_list in age_mapping_10to5.items():
                if age_5 in age_5_list:
                    parent_10year = age_10
                    break
            
            cancer_list = []
            
            # 모든 암 항목 추가
            cancer_list.append({
                "name": "모든 암(C00-C96)",
                "rate": all_cancer_2022,
                "average5Year": all_cancer_5year
            })
            
            # 기존 개별 암종들 추가 (임시로 10세 단위 데이터 사용)
            if parent_10year:
                # 기존 cancer-data.js에서 해당 10세 단위 데이터 복사
                import re
                pattern = f'"{parent_10year}":\\s*\\[(.*?)\\]'
                match = re.search(pattern, content, re.DOTALL)
                if match:
                    items_text = match.group(1)
                    # 개별 암종들 파싱 (모든 암 제외)
                    item_matches = re.findall(r'\\{\\s*"name":\\s*"([^"]+)",\\s*"rate":\\s*([0-9.]+),\\s*"average5Year":\\s*([0-9.]+)', items_text)
                    for name, rate, avg5 in item_matches:
                        if '모든 암' not in name:
                            cancer_list.append({
                                "name": name,
                                "rate": float(rate),
                                "average5Year": float(avg5)
                            })
            
            # 발생률 기준으로 정렬
            cancer_list.sort(key=lambda x: x['rate'], reverse=True)
            new_cancer_data[gender][age_5] = cancer_list
    
    # 6. 새로운 JavaScript 파일 생성
    print("5. 새로운 JavaScript 파일 생성...")
    
    js_content = f'''// 암 발생률 데이터 (5세 단위, 정확한 Excel 셀 값 사용)
// 2022년 기준 + 5개년 평균

const cancerData = {json.dumps(new_cancer_data, ensure_ascii=False, indent=2)};

// 데이터 로드 확인 함수
function checkDataLoaded() {{
    console.log('cancerData 로드 상태:', !!cancerData);
    console.log('남성 데이터:', !!cancerData.male);
    console.log('여성 데이터:', !!cancerData.female);
    
    if (cancerData.male) {{
        console.log('남성 연령대:', Object.keys(cancerData.male));
    }}
    if (cancerData.female) {{
        console.log('여성 연령대:', Object.keys(cancerData.female));
    }}
    
    return !!(cancerData && cancerData.male && cancerData.female);
}}

console.log('암 발생률 데이터 로드 완료');
checkDataLoaded();
'''
    
    # 파일 저장
    with open('cancer-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("6. 검증...")
    print(f"   남자 55-59세 모든 암: {new_cancer_data['male']['55-59'][0]['rate']}")
    print(f"   남자 50-54세 모든 암: {new_cancer_data['male']['50-54'][0]['rate']}")
    
    print("\\n=== 올바른 5세 단위 cancer-data.js 생성 완료 ===")

if __name__ == "__main__":
    recreate_correct_cancer_data()








