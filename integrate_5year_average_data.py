#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import json
import re

def integrate_5year_average():
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
    
    # JavaScript 객체 추출
    pattern = r'const cancerData = ({.*?});'
    match = re.search(pattern, content, re.DOTALL)
    
    if not match:
        print("cancer-data.js에서 데이터 객체를 찾을 수 없습니다.")
        return
    
    js_data_str = match.group(1)
    
    try:
        # JSON 파싱을 위해 JavaScript 객체를 JSON으로 변환
        js_data_str = js_data_str.replace('"male":', '"male":')
        js_data_str = js_data_str.replace('"female":', '"female":')
        
        # 나이 그룹 키들을 따옴표로 감싸기
        age_groups = ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', 
                     '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85+']
        
        for age_group in age_groups:
            js_data_str = js_data_str.replace(f'"{age_group}":', f'"{age_group}":')
        
        cancer_data = json.loads(js_data_str)
        print("기존 cancer-data.js 파싱 완료")
        
    except json.JSONDecodeError as e:
        print(f"JSON 파싱 오류: {e}")
        return
    
    # 5개년 평균 데이터 처리
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
                
            cancer_list = []
            
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
                
                cancer_item = {
                    "name": cancer_name,
                    "average5Year": avg_rate
                }
                
                cancer_list.append(cancer_item)
            
            if cancer_list:
                five_year_data[f"{gender_en}_{age_en}"] = cancer_list
                print(f"  {age_en}: {len(cancer_list)}개 암종")
    
    # 기존 데이터에 5개년 평균 추가
    for gender in ['male', 'female']:
        if gender in cancer_data:
            for age_group in cancer_data[gender]:
                key = f"{gender}_{age_group}"
                if key in five_year_data:
                    # 기존 데이터에 average5Year 추가
                    existing_items = cancer_data[gender][age_group]
                    new_items = five_year_data[key]
                    
                    # 이름으로 매칭해서 average5Year 추가
                    for existing_item in existing_items:
                        for new_item in new_items:
                            if existing_item['name'] == new_item['name']:
                                existing_item['average5Year'] = new_item['average5Year']
                                break
    
    # 새로운 JavaScript 파일 생성
    js_content = """// 암 발생률 데이터 (2022년 기준 + 5개년 평균)
// 모든 암(C00-C96) 데이터 포함

const cancerData = """ + json.dumps(cancer_data, ensure_ascii=False, indent=2) + """;

// 데이터 로드 확인 함수
function checkDataLoaded() {
    console.log('cancerData 로드 상태:', !!cancerData);
    console.log('남성 데이터:', !!cancerData.male);
    console.log('여성 데이터:', !!cancerData.female);
    
    if (cancerData.male) {
        console.log('남성 연령대:', Object.keys(cancerData.male));
    }
    if (cancerData.female) {
        console.log('여성 연령대:', Object.keys(cancerData.female));
    }
    
    return !!(cancerData && cancerData.male && cancerData.female);
}

console.log('암 발생률 데이터 로드 완료');
checkDataLoaded();
"""
    
    # 파일 저장
    with open('cancer-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"\nJavaScript 파일 업데이트 완료: cancer-data.js")
    
    # 통계 출력
    total_male_ages = len(cancer_data['male'])
    total_female_ages = len(cancer_data['female'])
    
    print(f"\n업데이트된 데이터 통계:")
    print(f"  남성 연령대: {total_male_ages}개")
    print(f"  여성 연령대: {total_female_ages}개")
    
    # 모든 암 항목 확인
    print(f"\n모든 암 항목 확인 (5개년 평균 포함):")
    for gender in ['male', 'female']:
        for age in ['45-49', '50-54', '60-64', '70-74']:
            if age in cancer_data[gender]:
                all_cancer = next((item for item in cancer_data[gender][age] if '모든 암' in item['name']), None)
                if all_cancer:
                    rate_2022 = all_cancer.get('rate', 'N/A')
                    avg_5year = all_cancer.get('average5Year', 'N/A')
                    print(f"  {gender} {age}: {all_cancer['name']} = 2022: {rate_2022}, 5년평균: {avg_5year}")

if __name__ == "__main__":
    integrate_5year_average()








