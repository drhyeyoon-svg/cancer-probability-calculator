#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
데이터 중복 문제를 해결한 올바른 통합 스크립트
"""

import pandas as pd
import json

def map_5year_age_to_main_age(age_5year):
    """5개년 평균 데이터의 연령대를 기존 데이터의 연령대로 매핑"""
    age_mapping = {
        '0-4세': '0-19',
        '5-9세': '0-19', 
        '10-14세': '0-19',
        '15-19세': '0-19',
        '20-24세': '20-29',
        '25-29세': '20-29',
        '30-34세': '30-39',
        '35-39세': '30-39',
        '40-44세': '40-49',
        '45-49세': '40-49',
        '50-54세': '50-59',
        '55-59세': '50-59',
        '60-64세': '60-69',
        '65-69세': '60-69',
        '70-74세': '70+',
        '75-79세': '70+',
        '80-84세': '70+',
        '85세이상': '70+'
    }
    return age_mapping.get(age_5year, age_5year)

def create_correct_integrated_data():
    """중복을 제거한 올바른 통합 데이터 생성"""
    print("=== 올바른 통합 데이터 생성 시작 ===")
    
    # 1. 5개년 평균 데이터 로드
    try:
        df_5year = pd.read_excel('24개_암종_성_연령_5세_별_5개년평균_암발생률.xlsx')
        print(f"5개년 평균 데이터 로드: {df_5year.shape}")
    except Exception as e:
        print(f"5개년 평균 데이터 로드 오류: {e}")
        return False
    
    # 2. 데이터 전처리 및 그룹화
    integrated_data = {
        'male': {},
        'female': {}
    }
    
    # 성별 매핑
    gender_mapping = {'남자': 'male', '여자': 'female'}
    
    # 연령대별, 성별, 암종별로 그룹화하여 평균 계산
    for gender_kr in ['남자', '여자']:
        gender = gender_mapping[gender_kr]
        
        for main_age_group in ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+']:
            integrated_data[gender][main_age_group] = []
            
            # 해당 연령대에 매핑되는 5세별 연령대들
            age_mappings = {
                '0-19': ['0-4세', '5-9세', '10-14세', '15-19세'],
                '20-29': ['20-24세', '25-29세'],
                '30-39': ['30-34세', '35-39세'],
                '40-49': ['40-44세', '45-49세'],
                '50-59': ['50-54세', '55-59세'],
                '60-69': ['60-64세', '65-69세'],
                '70+': ['70-74세', '75-79세', '80-84세', '85세이상']
            }
            
            target_ages = age_mappings[main_age_group]
            
            # 해당 연령대의 데이터만 필터링
            age_data = df_5year[
                (df_5year['성별'] == gender_kr) & 
                (df_5year['연령별'].isin(target_ages))
            ]
            
            if age_data.empty:
                continue
            
            # 데이터 타입 변환
            age_data = age_data.copy()
            age_data['2022년'] = pd.to_numeric(age_data['2022년'], errors='coerce')
            age_data['5개년 평균'] = pd.to_numeric(age_data['5개년 평균'], errors='coerce')
            
            # NaN 값 제거
            age_data = age_data.dropna(subset=['2022년', '5개년 평균'])
            
            if age_data.empty:
                continue
            
            # 암종별로 그룹화하여 평균 계산
            cancer_groups = age_data.groupby('24개 암종별').agg({
                '2022년': 'mean',  # 2022년 데이터의 평균
                '5개년 평균': 'mean'  # 5개년 평균의 평균
            }).reset_index()
            
            # 데이터 정리
            for _, row in cancer_groups.iterrows():
                cancer_name = row['24개 암종별']
                rate_2022 = row['2022년']
                average_5year = row['5개년 평균']
                
                # 유효성 검사
                if pd.notna(rate_2022) and pd.notna(average_5year):
                    integrated_data[gender][main_age_group].append({
                        'name': cancer_name,
                        'rate': float(rate_2022),
                        'average5Year': float(average_5year)
                    })
            
            # 2022년 발생률 기준으로 정렬
            integrated_data[gender][main_age_group].sort(key=lambda x: x['rate'], reverse=True)
    
    print(f"✅ 올바른 통합 데이터 생성 완료:")
    print(f"   - 남성 연령대: {len(integrated_data['male'])}개")
    print(f"   - 여성 연령대: {len(integrated_data['female'])}개")
    
    # 3. JavaScript 파일 생성
    js_content = "// 암 발생률 데이터 (2022년 + 5개년 평균)\n"
    js_content += "// 국가통계자료 기반\n"
    js_content += "// 마지막 업데이트: 2025년 9월\n"
    js_content += "// 데이터 출처: KOSIS 국가통계포털\n\n"
    js_content += "const cancerData = {\n"
    
    # 남성 데이터
    js_content += "  \"male\": {\n"
    for age_group in sorted(integrated_data['male'].keys()):
        js_content += f"    \"{age_group}\": [\n"
        for item in integrated_data['male'][age_group]:
            js_content += f"      {{\n"
            js_content += f"        \"name\": \"{item['name']}\",\n"
            js_content += f"        \"rate\": {item['rate']},\n"
            js_content += f"        \"average5Year\": {item['average5Year']}\n"
            js_content += f"      }},\n"
        js_content += "    ],\n"
    js_content += "  },\n"
    
    # 여성 데이터
    js_content += "  \"female\": {\n"
    for age_group in sorted(integrated_data['female'].keys()):
        js_content += f"    \"{age_group}\": [\n"
        for item in integrated_data['female'][age_group]:
            js_content += f"      {{\n"
            js_content += f"        \"name\": \"{item['name']}\",\n"
            js_content += f"        \"rate\": {item['rate']},\n"
            js_content += f"        \"average5Year\": {item['average5Year']}\n"
            js_content += f"      }},\n"
        js_content += "    ],\n"
    js_content += "  }\n"
    
    js_content += "};\n\n"
    js_content += "// 데이터 검증\n"
    js_content += "console.log('수정된 통합 암 데이터 로드됨:', {\n"
    js_content += "  male: Object.keys(cancerData.male).length + '개 연령대',\n"
    js_content += "  female: Object.keys(cancerData.female).length + '개 연령대'\n"
    js_content += "});\n"
    
    # 파일 저장
    with open('cancer-data-fixed.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("✅ 수정된 통합 데이터가 저장되었습니다: cancer-data-fixed.js")
    
    # 샘플 데이터 확인
    print("\n=== 샘플 데이터 확인 ===")
    sample_age = '30-39'
    sample_gender = 'male'
    if sample_age in integrated_data[sample_gender]:
        sample_items = integrated_data[sample_gender][sample_age][:5]
        print(f"샘플 ({sample_gender}, {sample_age}) 상위 5개:")
        for i, item in enumerate(sample_items, 1):
            print(f"  {i}. {item['name']}: 2022년 {item['rate']:.1f}, 5개년평균 {item['average5Year']:.1f}")
    
    # 중복 확인
    print("\n=== 중복 확인 ===")
    for gender in ['male', 'female']:
        for age_group in integrated_data[gender]:
            names = [item['name'] for item in integrated_data[gender][age_group]]
            duplicates = [name for name in set(names) if names.count(name) > 1]
            if duplicates:
                print(f"❌ {gender} {age_group}: 중복된 암종 {duplicates}")
            else:
                print(f"✅ {gender} {age_group}: 중복 없음 ({len(names)}개 암종)")
    
    return True

if __name__ == "__main__":
    create_correct_integrated_data()
