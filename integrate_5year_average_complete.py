#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import json
import re

def integrate_5year_average_complete():
    """5개년 평균 데이터를 기존 cancer-data.js에 완전히 통합합니다."""
    
    print("=== 5개년 평균 데이터 통합 시작 ===")
    
    # 1. 모든 암 5개년 평균 데이터 읽기
    print("1. 모든 암 5개년 평균 데이터 읽기...")
    df_all_cancer = pd.read_excel('excel_backup_20250923_003020/암종별_5개년평균_모든암.xlsx', sheet_name=0, header=1)
    
    # 첫 번째 행이 실제 헤더인지 확인하고 제거
    if df_all_cancer.iloc[0, 0] == '모든 암(C00-C96)':
        df_all_cancer = df_all_cancer.iloc[1:].reset_index(drop=True)
    
    # 빈 행 제거
    df_all_cancer = df_all_cancer.dropna(subset=[df_all_cancer.columns[0], df_all_cancer.columns[2]])
    
    print(f"   모든 암 데이터 행 수: {len(df_all_cancer)}")
    
    # 2. 개별 암종 5개년 평균 데이터 읽기
    print("2. 개별 암종 5개년 평균 데이터 읽기...")
    df_individual = pd.read_excel('excel_backup_20250923_003020/5개년평균.xlsx', sheet_name=0, header=1)
    
    # 첫 번째 행이 실제 헤더인지 확인하고 제거
    if df_individual.iloc[0, 0] == '24개 암종별':
        df_individual = df_individual.iloc[1:].reset_index(drop=True)
    
    # 빈 행 제거
    df_individual = df_individual.dropna(subset=[df_individual.columns[0], df_individual.columns[1], df_individual.columns[2]])
    
    print(f"   개별 암종 데이터 행 수: {len(df_individual)}")
    
    # 3. 기존 cancer-data.js 읽기
    print("3. 기존 cancer-data.js 읽기...")
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
        print("   기존 cancer-data.js 파싱 완료")
        
    except json.JSONDecodeError as e:
        print(f"JSON 파싱 오류: {e}")
        return
    
    # 4. 모든 암 5개년 평균 데이터 처리
    print("4. 모든 암 5개년 평균 데이터 처리...")
    
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
    
    # 모든 암 5개년 평균 데이터를 딕셔너리로 저장
    all_cancer_5year = {}
    
    for _, row in df_all_cancer.iterrows():
        age_kr = row.iloc[2]  # 연령별
        avg_rate = row.iloc[3]  # 5개년 평균 발생률
        
        if pd.isna(avg_rate) or avg_rate == '-':
            continue
            
        try:
            avg_rate = float(avg_rate)
        except (ValueError, TypeError):
            continue
        
        if age_kr in age_mapping:
            age_en = age_mapping[age_kr]
            all_cancer_5year[age_en] = avg_rate
    
    print(f"   모든 암 5개년 평균 데이터 {len(all_cancer_5year)}개 연령대 추출 완료")
    
    # 5. 개별 암종 5개년 평균 데이터 처리
    print("5. 개별 암종 5개년 평균 데이터 처리...")
    
    # 성별 매핑
    gender_mapping = {
        '남자': 'male',
        '여자': 'female'
    }
    
    # 개별 암종 5개년 평균 데이터를 딕셔너리로 저장
    individual_5year = {}
    
    for _, row in df_individual.iterrows():
        cancer_name = row.iloc[0]  # 24개 암종별
        gender_kr = row.iloc[1]    # 성별
        age_kr = row.iloc[2]       # 연령별
        avg_rate = row.iloc[4]     # 평균 조발생률 (5번째 컬럼)
        
        if pd.isna(avg_rate) or avg_rate == '-' or avg_rate == '-':
            continue
            
        try:
            avg_rate = float(avg_rate)
        except (ValueError, TypeError):
            continue
        
        if gender_kr in gender_mapping and age_kr in age_mapping:
            gender_en = gender_mapping[gender_kr]
            age_en = age_mapping[age_kr]
            
            key = f"{gender_en}_{age_en}_{cancer_name}"
            individual_5year[key] = avg_rate
    
    print(f"   개별 암종 5개년 평균 데이터 {len(individual_5year)}개 항목 추출 완료")
    
    # 6. 기존 데이터에 5개년 평균 추가
    print("6. 기존 데이터에 5개년 평균 추가...")
    
    for gender in ['male', 'female']:
        if gender in cancer_data:
            for age_group in cancer_data[gender]:
                # 모든 암 5개년 평균 추가
                if age_group in all_cancer_5year:
                    all_cancer_item = None
                    for item in cancer_data[gender][age_group]:
                        if item['name'] == '모든 암(C00-C96)':
                            all_cancer_item = item
                            break
                    
                    if all_cancer_item:
                        all_cancer_item['average5Year'] = all_cancer_5year[age_group]
                
                # 개별 암종 5개년 평균 추가
                for item in cancer_data[gender][age_group]:
                    if item['name'] != '모든 암(C00-C96)':
                        key = f"{gender}_{age_group}_{item['name']}"
                        if key in individual_5year:
                            item['average5Year'] = individual_5year[key]
    
    # 7. 새로운 JavaScript 파일 생성
    print("7. 새로운 JavaScript 파일 생성...")
    
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
    
    print(f"   JavaScript 파일 업데이트 완료: cancer-data.js")
    
    # 8. 통계 출력
    print("8. 통계 확인...")
    
    total_male_ages = len(cancer_data['male'])
    total_female_ages = len(cancer_data['female'])
    
    print(f"   남성 연령대: {total_male_ages}개")
    print(f"   여성 연령대: {total_female_ages}개")
    
    # 샘플 확인
    print(f"\n   샘플 확인 (모든 암 5개년 평균 포함):")
    for gender in ['male', 'female']:
        for age in ['45-49', '50-54', '60-64', '70-74']:
            if age in cancer_data[gender]:
                all_cancer = next((item for item in cancer_data[gender][age] if '모든 암' in item['name']), None)
                if all_cancer:
                    rate_2022 = all_cancer.get('rate', 'N/A')
                    avg_5year = all_cancer.get('average5Year', 'N/A')
                    print(f"     {gender} {age}: {all_cancer['name']} = 2022: {rate_2022}, 5년평균: {avg_5year}")
                    break
    
    print("\n=== 5개년 평균 데이터 통합 완료 ===")

if __name__ == "__main__":
    integrate_5year_average_complete()
