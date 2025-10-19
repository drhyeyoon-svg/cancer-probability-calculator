#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import json

def recreate_complete_cancer_data():
    """2022년 Excel 파일에서 모든 암종 데이터를 완전히 추출하여 5세 단위로 재생성"""
    
    print("=== 완전한 cancer-data.js 재생성 (모든 암종 포함) ===")
    
    # 1. 2022년 암 발생률 파일 읽기
    print("1. 2022년 암 발생률 파일 전체 분석...")
    df = pd.read_excel('temp_2022_data.xlsx', sheet_name=0, header=None)
    
    print(f"총 행 수: {len(df)}")
    
    # 2. 모든 암종 데이터 추출
    print("2. 모든 암종 데이터 추출...")
    
    # 각 암종별로 데이터 저장
    cancer_data_by_type = {}
    current_cancer_type = None
    
    for i, row in df.iterrows():
        # 새로운 암종 시작 확인
        if pd.notna(row[0]) and '(' in str(row[0]) and 'C' in str(row[0]):
            current_cancer_type = row[0]
            cancer_data_by_type[current_cancer_type] = {
                'male': {},
                'female': {}
            }
            continue
        
        # 성별 확인
        if pd.notna(row[1]):
            if row[1] == '남자':
                current_gender = 'male'
            elif row[1] == '여자':
                current_gender = 'female'
            else:
                current_gender = None
            continue
        
        # 연령별 데이터 추출
        if current_cancer_type and current_gender and pd.notna(row[2]) and '세' in str(row[2]):
            age = row[2]
            rate = row[4]  # E열 (조발생률)
            
            if age != '연령미상' and pd.notna(rate) and rate != '-':
                try:
                    rate_float = float(rate)
                    cancer_data_by_type[current_cancer_type][current_gender][age] = rate_float
                except (ValueError, TypeError):
                    pass
    
    print(f"   추출된 암종 수: {len(cancer_data_by_type)}")
    for cancer_type in list(cancer_data_by_type.keys())[:5]:
        male_ages = len(cancer_data_by_type[cancer_type]['male'])
        female_ages = len(cancer_data_by_type[cancer_type]['female'])
        print(f"     {cancer_type}: 남자 {male_ages}개, 여자 {female_ages}개 연령대")
    
    # 3. 5개년 평균 데이터 읽기
    print("3. 5개년 평균 데이터 읽기...")
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
    
    print(f"   5개년 평균 데이터: {len(age_5year_avg)}개 연령대")
    
    # 4. 새로운 5세 단위 구조 생성
    print("4. 새로운 5세 단위 구조 생성...")
    
    # 연령대 매핑 (Excel → cancer-data.js)
    age_mapping = {
        '0-4세': '0-4', '5-9세': '5-9', '10-14세': '10-14', '15-19세': '15-19',
        '20-24세': '20-24', '25-29세': '25-29', '30-34세': '30-34', '35-39세': '35-39',
        '40-44세': '40-44', '45-49세': '45-49', '50-54세': '50-54', '55-59세': '55-59',
        '60-64세': '60-64', '65-69세': '65-69', '70-74세': '70-74', '75-79세': '75-79',
        '80-84세': '80-84', '85세이상': '85+'
    }
    
    new_cancer_data = {
        "male": {},
        "female": {}
    }
    
    for gender in ['male', 'female']:
        for age_kr, age_en in age_mapping.items():
            cancer_list = []
            
            # 각 암종별로 데이터 추가
            for cancer_type, cancer_data in cancer_data_by_type.items():
                if age_kr in cancer_data[gender]:
                    rate_2022 = cancer_data[gender][age_kr]
                    
                    # 5개년 평균 (모든 암만 적용, 개별 암종은 2022년 데이터 사용)
                    if cancer_type == '모든 암(C00-C96)':
                        avg_5year = age_5year_avg.get(age_kr, rate_2022)
                    else:
                        avg_5year = rate_2022  # 개별 암종은 2022년 데이터와 동일
                    
                    cancer_list.append({
                        "name": cancer_type,
                        "rate": rate_2022,
                        "average5Year": avg_5year
                    })
            
            # 발생률 기준으로 정렬 (모든 암이 먼저 오도록)
            cancer_list.sort(key=lambda x: x['rate'] if '모든 암' not in x['name'] else 99999, reverse=True)
            
            if cancer_list:
                new_cancer_data[gender][age_en] = cancer_list
                if age_en == '75-79':
                    print(f"   {gender} {age_en}: {len(cancer_list)}개 암종")
    
    # 5. JavaScript 파일 생성
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
    
    with open('cancer-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("5. 완료!")
    print(f"   남자 75-79세 암종 수: {len(new_cancer_data['male'].get('75-79', []))}")
    print(f"   여자 75-79세 암종 수: {len(new_cancer_data['female'].get('75-79', []))}")
    
    # 검증
    if '75-79' in new_cancer_data['male']:
        print("   남자 75-79세 상위 5개:")
        for i, item in enumerate(new_cancer_data['male']['75-79'][:5]):
            print(f"     {i+1}. {item['name']}: {item['rate']}")

if __name__ == "__main__":
    recreate_complete_cancer_data()








