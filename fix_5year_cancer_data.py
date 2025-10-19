#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
5개년 평균 암 발생률 데이터를 올바르게 파싱하는 스크립트
성별 분류 오류를 수정합니다.
"""

import pandas as pd
import json
import os

def fix_5year_cancer_data():
    """5개년 평균 암 발생률 데이터 수정"""
    
    # 기존 2022년 데이터를 참조하여 올바른 구조 파악
    try:
        with open('cancer-data.js', 'r', encoding='utf-8') as f:
            content = f.read()
            # cancerData 객체 추출
            start = content.find('const cancerData = {')
            end = content.find('};', start) + 2
            cancer_data_str = content[start:end]
            
        print("2022년 데이터 구조를 참조합니다...")
        
    except Exception as e:
        print(f"2022년 데이터 파일 읽기 오류: {e}")
        return
    
    # 올바른 5개년 평균 데이터 구조 생성
    cancer_data_5year = {
        "male": {
            "0-4": [],
            "5-9": [],
            "10-14": [],
            "15-19": [],
            "20-24": [],
            "25-29": [],
            "30-34": [],
            "35-39": [],
            "40-44": [],
            "45-49": [],
            "50-54": [],
            "55-59": [],
            "60-64": [],
            "65-69": [],
            "70-74": [],
            "75-79": [],
            "80-84": [],
            "85+": []
        },
        "female": {
            "0-4": [],
            "5-9": [],
            "10-14": [],
            "15-19": [],
            "20-24": [],
            "25-29": [],
            "30-34": [],
            "35-39": [],
            "40-44": [],
            "45-49": [],
            "50-54": [],
            "55-59": [],
            "60-64": [],
            "65-69": [],
            "70-74": [],
            "75-79": [],
            "80-84": [],
            "85+": []
        }
    }
    
    # 남성 전용 암종
    male_only_cancers = [
        "전립선", "고환", "음경", "전립선(C61)", "고환(C62)"
    ]
    
    # 여성 전용 암종
    female_only_cancers = [
        "유방", "자궁경부", "자궁체부", "난소", "외음부", "질",
        "유방(C50)", "자궁경부(C53)", "자궁체부(C54)", "난소(C56)"
    ]
    
    # 기존 잘못된 5개년 데이터에서 올바른 데이터 추출
    try:
        with open('cancer-data-5year.js', 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 기존 데이터 파싱 (간단한 방법)
        lines = content.split('\n')
        
        current_gender = None
        current_age = None
        
        for line in lines:
            line = line.strip()
            
            # 성별 구분
            if '"male":' in line:
                current_gender = 'male'
                continue
            elif '"female":' in line:
                current_gender = 'female'
                continue
            
            # 연령대 구분
            if current_gender and '"' in line and '":' in line:
                age_match = line.split('"')[1]
                if age_match in cancer_data_5year[current_gender]:
                    current_age = age_match
                    continue
            
            # 암종 데이터 추출
            if current_gender and current_age and '"name":' in line and '"rate":' in line:
                try:
                    # name 추출
                    name_start = line.find('"name": "') + 9
                    name_end = line.find('",', name_start)
                    cancer_name = line[name_start:name_end]
                    
                    # rate 추출
                    rate_start = line.find('"rate": ') + 8
                    rate_end = line.find('\n', rate_start)
                    if rate_end == -1:
                        rate_end = len(line)
                    rate_str = line[rate_start:rate_end].strip().rstrip(',')
                    rate = float(rate_str)
                    
                    # 성별 검증
                    is_valid = True
                    
                    # 남성 전용 암종이 여성 데이터에 있는지 확인
                    if current_gender == 'female':
                        for male_cancer in male_only_cancers:
                            if male_cancer in cancer_name:
                                print(f"여성 데이터에서 남성 전용 암종 제거: {cancer_name} (연령: {current_age})")
                                is_valid = False
                                break
                    
                    # 여성 전용 암종이 남성 데이터에 있는지 확인
                    if current_gender == 'male':
                        for female_cancer in female_only_cancers:
                            if female_cancer in cancer_name:
                                print(f"남성 데이터에서 여성 전용 암종 제거: {cancer_name} (연령: {current_age})")
                                is_valid = False
                                break
                    
                    # 유효한 데이터만 추가
                    if is_valid:
                        cancer_data_5year[current_gender][current_age].append({
                            "name": cancer_name,
                            "rate": rate
                        })
                        
                except Exception as e:
                    print(f"데이터 파싱 오류: {line} - {e}")
                    continue
                    
    except Exception as e:
        print(f"기존 5개년 데이터 파일 읽기 오류: {e}")
        return
    
    # 각 연령대별로 발생률 순으로 정렬
    for gender in cancer_data_5year:
        for age_group in cancer_data_5year[gender]:
            cancer_data_5year[gender][age_group].sort(key=lambda x: x['rate'], reverse=True)
    
    # 수정된 데이터를 새 파일로 저장
    js_content = f"""// 암 발생률 5개년 평균 데이터 (2018-2022) - 성별 분류 수정됨
// 데이터 출처: 국가암등록통계

const cancerData5Year = {json.dumps(cancer_data_5year, ensure_ascii=False, indent=2)};

// Node.js 환경에서 사용
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = cancerData5Year;
}}
"""
    
    # 백업 생성
    if os.path.exists('cancer-data-5year.js'):
        os.rename('cancer-data-5year.js', 'cancer-data-5year-backup.js')
        print("기존 파일을 cancer-data-5year-backup.js로 백업했습니다.")
    
    # 새 파일 저장
    with open('cancer-data-5year-fixed.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("수정된 5개년 평균 데이터가 cancer-data-5year-fixed.js에 저장되었습니다.")
    
    # 통계 출력
    print("\n=== 수정 통계 ===")
    for gender in ['male', 'female']:
        gender_name = '남성' if gender == 'male' else '여성'
        total_entries = sum(len(cancer_data_5year[gender][age]) for age in cancer_data_5year[gender])
        print(f"{gender_name}: {total_entries}개 항목")
        
        # 70-74 연령대 확인 (문제가 있던 부분)
        age_70_74 = cancer_data_5year[gender]['70-74']
        print(f"  70-74세: {len(age_70_74)}개 암종")
        if age_70_74:
            print(f"    상위 3개: {[c['name'] for c in age_70_74[:3]]}")

if __name__ == "__main__":
    fix_5year_cancer_data()




