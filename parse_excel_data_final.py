#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
엑셀 파일을 파싱하여 JavaScript 데이터 파일로 변환하는 최종 스크립트
실제 엑셀 파일 구조에 맞춘 파싱 로직
"""

import pandas as pd
import json
import os

def parse_cancer_data():
    """암종 발생률 엑셀 파일을 파싱 (최종판)"""
    try:
        file_path = '24개_암종_성_연령_5세_별_암발생자수__발생률_20250921204341.xlsx'
        
        if not os.path.exists(file_path):
            print(f"파일을 찾을 수 없습니다: {file_path}")
            return None
            
        # 데이터 시트 읽기
        df = pd.read_excel(file_path, sheet_name='데이터', header=0)
        print(f"데이터 크기: {df.shape}")
        
        # 데이터 구조 생성
        cancer_data = {
            'male': {},
            'female': {}
        }
        
        # 나이대별 그룹핑
        age_groups = {
            '0-19': ['0-4세', '5-9세', '10-14세', '15-19세'],
            '20-29': ['20-24세', '25-29세'],
            '30-39': ['30-34세', '35-39세'],
            '40-49': ['40-44세', '45-49세'],
            '50-59': ['50-54세', '55-59세'],
            '60-69': ['60-64세', '65-69세'],
            '70+': ['70-74세', '75-79세', '80-84세', '85세이상']
        }
        
        # 성별 매핑
        gender_mapping = {
            '남자': 'male',
            '여자': 'female'
        }
        
        # 현재 암종 추적 변수
        current_cancer = None
        current_gender = None
        
        # 데이터 처리
        for index, row in df.iterrows():
            try:
                cancer_name = row['24개 암종별']
                gender = row['성별']
                age_range = row['연령별']
                rate = row['2022.1']  # 조발생률 컬럼
                
                # 암종명이 있는 경우 (새로운 암종 시작)
                if pd.notna(cancer_name) and cancer_name not in ['24개 암종별', '모든 암(C00-C96)']:
                    current_cancer = cancer_name
                    continue
                
                # 성별이 있는 경우 (새로운 성별 시작)
                if pd.notna(gender) and gender in ['남자', '여자']:
                    current_gender = gender
                    continue
                
                # 암종명이나 성별이 없으면 건너뛰기
                if pd.isna(current_cancer) or pd.isna(current_gender):
                    continue
                
                # 나이 범위가 NaN이거나 '계'인 경우 건너뛰기
                if pd.isna(age_range) or age_range == '계':
                    continue
                
                # 발생률이 NaN이거나 '-'인 경우 건너뛰기
                if pd.isna(rate) or rate == '-':
                    continue
                
                # 성별 매핑
                gender_key = gender_mapping.get(current_gender)
                if not gender_key:
                    continue
                
                # 나이대 계산
                age_group = None
                for group, age_list in age_groups.items():
                    if age_range in age_list:
                        age_group = group
                        break
                
                if not age_group:
                    continue
                
                # 데이터 저장
                if age_group not in cancer_data[gender_key]:
                    cancer_data[gender_key][age_group] = []
                
                # 발생률을 숫자로 변환
                try:
                    rate_num = float(rate)
                    if rate_num > 0:  # 0보다 큰 값만 저장
                        cancer_data[gender_key][age_group].append({
                            'name': current_cancer,
                            'rate': rate_num
                        })
                except (ValueError, TypeError):
                    continue
                
            except Exception as e:
                print(f"행 {index} 처리 오류: {e}")
                continue
        
        # 각 나이대별로 암종별 그룹화하고 평균 발생률 계산
        for gender in cancer_data:
            for age_group in cancer_data[gender]:
                # 암종별로 그룹화
                cancer_groups = {}
                for item in cancer_data[gender][age_group]:
                    if item['name'] in cancer_groups:
                        cancer_groups[item['name']].append(item['rate'])
                    else:
                        cancer_groups[item['name']] = [item['rate']]
                
                # 평균 발생률로 정렬
                final_data = []
                for cancer_name, rates in cancer_groups.items():
                    avg_rate = sum(rates) / len(rates)
                    final_data.append({
                        'name': cancer_name,
                        'rate': round(avg_rate, 1)
                    })
                
                cancer_data[gender][age_group] = sorted(final_data, key=lambda x: x['rate'], reverse=True)
        
        return cancer_data
        
    except Exception as e:
        print(f"암종 데이터 파싱 오류: {e}")
        return None

def parse_death_data():
    """사망원인 엑셀 파일을 파싱 (최종판)"""
    try:
        file_path = '사망원인생명표_5세별__20250921235108.xlsx'
        
        if not os.path.exists(file_path):
            print(f"파일을 찾을 수 없습니다: {file_path}")
            return None
            
        # 데이터 시트 읽기
        df = pd.read_excel(file_path, sheet_name='데이터', header=0)
        print(f"데이터 크기: {df.shape}")
        
        # 데이터 구조 생성
        death_data = {
            'male': {},
            'female': {}
        }
        
        # 나이대별 그룹핑
        age_groups = {
            '0-19': [0, 1, 5, 10, 15],
            '20-29': [20, 25],
            '30-39': [30, 35],
            '40-49': [40, 45],
            '50-59': [50, 55],
            '60-69': [60, 65],
            '70+': [70, 75, 80, 85, 90]  # 90+ 포함
        }
        
        # 현재 사망원인 추적 변수
        current_cause = None
        
        # 데이터 처리
        for index, row in df.iterrows():
            try:
                cause_name = row['사망원인별']
                age = row['연령별']
                male_rate = row['2023.2']  # 사망확률(남자) (%)
                female_rate = row['2023.4']  # 사망확률(여자) (%)
                
                # 사망원인명이 있는 경우 (새로운 사망원인 시작)
                if pd.notna(cause_name) and cause_name != '사망원인별':
                    current_cause = cause_name
                    continue
                
                # 사망원인명이 없으면 현재 사망원인 사용
                if pd.isna(current_cause):
                    continue
                
                # 나이가 NaN인 경우 건너뛰기
                if pd.isna(age):
                    continue
                
                # 나이를 숫자로 변환
                try:
                    age_num = int(age)
                except (ValueError, TypeError):
                    continue
                
                # 나이대 계산
                age_group = None
                for group, age_list in age_groups.items():
                    if age_num in age_list:
                        age_group = group
                        break
                
                if not age_group:
                    continue
                
                # 남성 데이터 처리
                if pd.notna(male_rate) and male_rate != '-':
                    try:
                        male_rate_num = float(male_rate)
                        if male_rate_num > 0:
                            if age_group not in death_data['male']:
                                death_data['male'][age_group] = []
                            
                            death_data['male'][age_group].append({
                                'name': current_cause,
                                'rate': round(male_rate_num, 2)
                            })
                    except (ValueError, TypeError):
                        pass
                
                # 여성 데이터 처리
                if pd.notna(female_rate) and female_rate != '-':
                    try:
                        female_rate_num = float(female_rate)
                        if female_rate_num > 0:
                            if age_group not in death_data['female']:
                                death_data['female'][age_group] = []
                            
                            death_data['female'][age_group].append({
                                'name': current_cause,
                                'rate': round(female_rate_num, 2)
                            })
                    except (ValueError, TypeError):
                        pass
                
            except Exception as e:
                print(f"행 {index} 처리 오류: {e}")
                continue
        
        # 각 나이대별로 사망원인별 그룹화하고 평균 발생률 계산
        for gender in death_data:
            for age_group in death_data[gender]:
                # 사망원인별로 그룹화
                cause_groups = {}
                for item in death_data[gender][age_group]:
                    if item['name'] in cause_groups:
                        cause_groups[item['name']].append(item['rate'])
                    else:
                        cause_groups[item['name']] = [item['rate']]
                
                # 평균 발생률로 정렬
                final_data = []
                for cause_name, rates in cause_groups.items():
                    avg_rate = sum(rates) / len(rates)
                    final_data.append({
                        'name': cause_name,
                        'rate': round(avg_rate, 2)
                    })
                
                death_data[gender][age_group] = sorted(final_data, key=lambda x: x['rate'], reverse=True)
        
        return death_data
        
    except Exception as e:
        print(f"사망원인 데이터 파싱 오류: {e}")
        return None

def save_cancer_data(cancer_data):
    """암종 데이터를 JavaScript 파일로 저장"""
    if not cancer_data:
        print("암종 데이터가 없습니다.")
        return
    
    # 데이터 통계 계산
    total_entries = 0
    for gender in cancer_data:
        for age_group in cancer_data[gender]:
            total_entries += len(cancer_data[gender][age_group])
    
    js_content = f"""// 암 발생률 데이터
// 국가통계자료 기반 (24개_암종_성_연령_5세_별_암발생자수__발생률)
// 마지막 업데이트: 2025년 9월
// 데이터 출처: KOSIS 국가통계포털

const cancerData = {json.dumps(cancer_data, ensure_ascii=False, indent=2)};

// 데이터 검증 함수
function validateCancerData() {{
    const requiredAgeGroups = ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    const requiredGenders = ['male', 'female'];
    
    for (const gender of requiredGenders) {{
        if (!cancerData[gender]) {{
            console.error(`성별 데이터 누락: ${{gender}}`);
            return false;
        }}
        
        for (const ageGroup of requiredAgeGroups) {{
            if (!cancerData[gender][ageGroup] || cancerData[gender][ageGroup].length === 0) {{
                console.warn(`${{gender}} ${{ageGroup}} 데이터가 없습니다.`);
            }}
        }}
    }}
    
    console.log('암종 데이터 검증 완료');
    return true;
}}

// 데이터 통계 정보
function getCancerDataStats() {{
    let totalEntries = 0;
    let totalAgeGroups = 0;
    
    for (const gender of ['male', 'female']) {{
        for (const ageGroup in cancerData[gender]) {{
            totalAgeGroups++;
            totalEntries += cancerData[gender][ageGroup].length;
        }}
    }}
    
    return {{
        totalEntries: totalEntries,
        totalAgeGroups: totalAgeGroups,
        genders: ['male', 'female']
    }};
}}

// 페이지 로드 시 데이터 검증 실행
document.addEventListener('DOMContentLoaded', function() {{
    validateCancerData();
    const stats = getCancerDataStats();
    console.log('암종 데이터 통계:', stats);
    console.log('총 데이터 항목 수: {total_entries}');
}});
"""
    
    with open('cancer-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"암종 데이터가 cancer-data.js 파일로 저장되었습니다. (총 {total_entries}개 항목)")

def save_death_data(death_data):
    """사망원인 데이터를 JavaScript 파일로 저장"""
    if not death_data:
        print("사망원인 데이터가 없습니다.")
        return
    
    # 데이터 통계 계산
    total_entries = 0
    for gender in death_data:
        for age_group in death_data[gender]:
            total_entries += len(death_data[gender][age_group])
    
    js_content = f"""// 사망원인별 발생률 데이터
// 국가통계자료 기반 (사망원인생명표_5세별)
// 마지막 업데이트: 2025년 9월
// 데이터 출처: KOSIS 국가통계포털

const deathData = {json.dumps(death_data, ensure_ascii=False, indent=2)};

// 데이터 검증 함수
function validateDeathData() {{
    const requiredAgeGroups = ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    const requiredGenders = ['male', 'female'];
    
    for (const gender of requiredGenders) {{
        if (!deathData[gender]) {{
            console.error(`성별 데이터 누락: ${{gender}}`);
            return false;
        }}
        
        for (const ageGroup of requiredAgeGroups) {{
            if (!deathData[gender][ageGroup] || deathData[gender][ageGroup].length === 0) {{
                console.warn(`${{gender}} ${{ageGroup}} 데이터가 없습니다.`);
            }}
        }}
    }}
    
    console.log('사망원인 데이터 검증 완료');
    return true;
}}

// 데이터 통계 정보
function getDeathDataStats() {{
    let totalEntries = 0;
    let totalAgeGroups = 0;
    
    for (const gender of ['male', 'female']) {{
        for (const ageGroup in deathData[gender]) {{
            totalAgeGroups++;
            totalEntries += deathData[gender][ageGroup].length;
        }}
    }}
    
    return {{
        totalEntries: totalEntries,
        totalAgeGroups: totalAgeGroups,
        genders: ['male', 'female']
    }};
}}

// 페이지 로드 시 데이터 검증 실행
document.addEventListener('DOMContentLoaded', function() {{
    validateDeathData();
    const stats = getDeathDataStats();
    console.log('사망원인 데이터 통계:', stats);
    console.log('총 데이터 항목 수: {total_entries}');
}});
"""
    
    with open('death-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"사망원인 데이터가 death-data.js 파일로 저장되었습니다. (총 {total_entries}개 항목)")

def main():
    """메인 함수"""
    print("=== 국가통계자료 엑셀 파일 파싱 시작 (최종판) ===")
    
    # 암종 데이터 파싱
    print("\n1. 암종 발생률 데이터 파싱 중...")
    cancer_data = parse_cancer_data()
    
    if cancer_data:
        save_cancer_data(cancer_data)
        print("암종 데이터 파싱 완료!")
    else:
        print("암종 데이터 파싱 실패!")
    
    # 사망원인 데이터 파싱
    print("\n2. 사망원인별 발생률 데이터 파싱 중...")
    death_data = parse_death_data()
    
    if death_data:
        save_death_data(death_data)
        print("사망원인 데이터 파싱 완료!")
    else:
        print("사망원인 데이터 파싱 실패!")
    
    print("\n=== 파싱 완료 ===")
    print("생성된 파일:")
    print("- cancer-data.js (암종 발생률 데이터)")
    print("- death-data.js (사망원인별 발생률 데이터)")
    print("\n이제 이 파일들을 HTML에서 로드하여 사용할 수 있습니다.")

if __name__ == "__main__":
    main()
