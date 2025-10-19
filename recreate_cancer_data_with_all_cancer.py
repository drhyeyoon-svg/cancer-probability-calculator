#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import json

def parse_excel_to_js():
    """Excel 파일을 읽어서 JavaScript 데이터 파일을 생성합니다."""
    
    # Excel 파일 읽기 (2번째 행을 헤더로 사용)
    df = pd.read_excel('temp_cancer_data.xlsx', sheet_name='데이터', header=1)
    
    print("Excel 파일 로드 완료")
    print(f"총 행 수: {len(df)}")
    print(f"컬럼: {df.columns.tolist()}")
    
    # 빈 행 제거
    df = df.dropna(subset=['24개 암종별', '성별', '연령별'])
    
    print(f"정리 후 행 수: {len(df)}")
    print("첫 5행:")
    print(df.head())
    
    # 암종별, 성별, 연령별로 데이터 정리
    cancer_data = {
        "male": {},
        "female": {}
    }
    
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
    
    # 각 성별, 연령대별로 데이터 처리
    for gender_kr, gender_en in gender_mapping.items():
        print(f"\n{gender_kr} 데이터 처리 중...")
        
        gender_data = df[df['성별'] == gender_kr]
        
        for age_kr, age_en in age_mapping.items():
            age_data = gender_data[gender_data['연령별'] == age_kr]
            
            if len(age_data) == 0:
                continue
                
            cancer_list = []
            
            for _, row in age_data.iterrows():
                cancer_name = row['24개 암종별']
                rate_2022 = row['조발생률 (명/10만명)']
                
                # 숫자 변환 (문자열이면 숫자로 변환)
                if pd.isna(rate_2022) or rate_2022 == '-':
                    continue
                    
                try:
                    rate_2022 = float(rate_2022)
                except (ValueError, TypeError):
                    continue
                
                cancer_item = {
                    "name": cancer_name,
                    "rate": rate_2022
                }
                
                cancer_list.append(cancer_item)
            
            # 2022년 발생률 기준으로 내림차순 정렬
            cancer_list.sort(key=lambda x: x['rate'], reverse=True)
            
            cancer_data[gender_en][age_en] = cancer_list
            print(f"  {age_en}: {len(cancer_list)}개 암종")
    
    # JavaScript 파일 생성
    js_content = """// 암 발생률 데이터 (2022년 기준)
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
    
    print(f"\nJavaScript 파일 생성 완료: cancer-data.js")
    
    # 통계 출력
    total_male_ages = len(cancer_data['male'])
    total_female_ages = len(cancer_data['female'])
    
    print(f"\n생성된 데이터 통계:")
    print(f"  남성 연령대: {total_male_ages}개")
    print(f"  여성 연령대: {total_female_ages}개")
    
    # 모든 암 항목 확인
    print(f"\n모든 암 항목 확인:")
    for gender in ['male', 'female']:
        for age in ['45-49', '50-54', '60-64', '70-74']:
            if age in cancer_data[gender]:
                all_cancer = next((item for item in cancer_data[gender][age] if '모든 암' in item['name']), None)
                if all_cancer:
                    print(f"  {gender} {age}: {all_cancer['name']} = {all_cancer['rate']}")

if __name__ == "__main__":
    parse_excel_to_js()
