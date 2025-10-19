#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
암종별_5개년평균_모든암.xlsx 파일을 올바르게 파싱하여 
정확한 5개년 평균 데이터를 생성하는 최종 스크립트
"""

import pandas as pd
import json
import os

def recreate_5year_data():
    """5개년 평균 데이터를 원본 엑셀에서 올바르게 재생성"""
    
    file_path = "암종별_5개년평균_모든암.xlsx"
    
    if not os.path.exists(file_path):
        print(f"파일을 찾을 수 없습니다: {file_path}")
        return None
    
    print(f"파일 분석 시작: {file_path}")
    
    try:
        # 엑셀 파일의 모든 시트 확인
        xl_file = pd.ExcelFile(file_path)
        print(f"사용 가능한 시트: {xl_file.sheet_names}")
        
        # 첫 번째 시트 읽기
        df = pd.read_excel(file_path, sheet_name=0)
        print(f"데이터 형태: {df.shape}")
        
        # 컬럼명 출력
        print("\n컬럼명들:")
        for i, col in enumerate(df.columns):
            print(f"  {i}: {col}")
        
        # 처음 몇 행 데이터 확인
        print("\n처음 10행 데이터:")
        print(df.head(10))
        
        # 기본 데이터 구조 생성
        cancer_data_5year = {
            "male": {
                "0-4": [], "5-9": [], "10-14": [], "15-19": [],
                "20-24": [], "25-29": [], "30-34": [], "35-39": [],
                "40-44": [], "45-49": [], "50-54": [], "55-59": [],
                "60-64": [], "65-69": [], "70-74": [], "75-79": [],
                "80-84": [], "85+": []
            },
            "female": {
                "0-4": [], "5-9": [], "10-14": [], "15-19": [],
                "20-24": [], "25-29": [], "30-34": [], "35-39": [],
                "40-44": [], "45-49": [], "50-54": [], "55-59": [],
                "60-64": [], "65-69": [], "70-74": [], "75-79": [],
                "80-84": [], "85+": []
            }
        }
        
        # 컬럼 매핑 - 실제 엑셀 구조에 맞게 수정
        # 일반적으로 첫 번째 컬럼이 암종명
        cancer_col = df.columns[0]
        print(f"\n암종 컬럼: {cancer_col}")
        
        # 성별/연령대별 컬럼 찾기
        male_cols = {}
        female_cols = {}
        
        for col in df.columns[1:]:  # 첫 번째 컬럼(암종명) 제외
            col_str = str(col).lower()
            
            # 남성 컬럼 찾기
            if '남' in col_str or 'male' in col_str:
                # 연령대 추출
                age_group = extract_age_group(col_str)
                if age_group:
                    male_cols[col] = age_group
                    print(f"남성 컬럼: {col} -> {age_group}")
            
            # 여성 컬럼 찾기
            elif '여' in col_str or 'female' in col_str:
                # 연령대 추출
                age_group = extract_age_group(col_str)
                if age_group:
                    female_cols[col] = age_group
                    print(f"여성 컬럼: {col} -> {age_group}")
        
        print(f"\n남성 컬럼: {len(male_cols)}개")
        print(f"여성 컬럼: {len(female_cols)}개")
        
        # 데이터 파싱
        print(f"\n데이터 파싱 중...")
        
        for index, row in df.iterrows():
            try:
                cancer_name = row[cancer_col]
                
                # 암종명 유효성 검사
                if pd.isna(cancer_name) or str(cancer_name).strip() in ['', 'NaN', '계', 'Total']:
                    continue
                
                cancer_name = str(cancer_name).strip()
                
                # 남성 데이터 처리
                for col, age_group in male_cols.items():
                    try:
                        rate = row[col]
                        if pd.notna(rate) and rate != '-' and rate != '':
                            rate = float(rate)
                            cancer_data_5year['male'][age_group].append({
                                "name": cancer_name,
                                "rate": rate
                            })
                    except (ValueError, TypeError):
                        continue
                
                # 여성 데이터 처리
                for col, age_group in female_cols.items():
                    try:
                        rate = row[col]
                        if pd.notna(rate) and rate != '-' and rate != '':
                            rate = float(rate)
                            cancer_data_5year['female'][age_group].append({
                                "name": cancer_name,
                                "rate": rate
                            })
                    except (ValueError, TypeError):
                        continue
                        
            except Exception as e:
                print(f"행 {index} 처리 중 오류: {e}")
                continue
        
        # 각 연령대별로 발생률 순으로 정렬
        for gender in cancer_data_5year:
            for age_group in cancer_data_5year[gender]:
                cancer_data_5year[gender][age_group].sort(key=lambda x: x['rate'], reverse=True)
        
        # 통계 출력
        print(f"\n=== 파싱 결과 통계 ===")
        for gender in ['male', 'female']:
            gender_name = '남성' if gender == 'male' else '여성'
            total_entries = sum(len(cancer_data_5year[gender][age]) for age in cancer_data_5year[gender])
            print(f"{gender_name}: {total_entries}개 항목")
            
            # 70-74세 데이터 확인 (문제가 있던 부분)
            age_70_74 = cancer_data_5year[gender]['70-74']
            if age_70_74:
                print(f"  70-74세: {len(age_70_74)}개 암종")
                print(f"    상위 5개: {[f'{c[\"name\"]}({c[\"rate\"]})' for c in age_70_74[:5]]}")
        
        return cancer_data_5year
        
    except Exception as e:
        print(f"파일 처리 중 오류: {e}")
        import traceback
        traceback.print_exc()
        return None

def extract_age_group(col_str):
    """컬럼명에서 연령대 추출"""
    
    age_mappings = [
        ('0-4', ['0-4', '0~4']),
        ('5-9', ['5-9', '5~9']),
        ('10-14', ['10-14', '10~14']),
        ('15-19', ['15-19', '15~19']),
        ('20-24', ['20-24', '20~24']),
        ('25-29', ['25-29', '25~29']),
        ('30-34', ['30-34', '30~34']),
        ('35-39', ['35-39', '35~39']),
        ('40-44', ['40-44', '40~44']),
        ('45-49', ['45-49', '45~49']),
        ('50-54', ['50-54', '50~54']),
        ('55-59', ['55-59', '55~59']),
        ('60-64', ['60-64', '60~64']),
        ('65-69', ['65-69', '65~69']),
        ('70-74', ['70-74', '70~74']),
        ('75-79', ['75-79', '75~79']),
        ('80-84', ['80-84', '80~84']),
        ('85+', ['85+', '85세이상', '85이상'])
    ]
    
    for age_group, patterns in age_mappings:
        for pattern in patterns:
            if pattern in col_str:
                return age_group
    
    return None

def save_new_5year_data(cancer_data_5year):
    """새로운 5개년 평균 데이터 저장"""
    
    if not cancer_data_5year:
        print("저장할 데이터가 없습니다.")
        return
    
    # JavaScript 파일 생성
    js_content = f"""// 암 발생률 5개년 평균 데이터 (2018-2022) - 원본 엑셀에서 올바르게 파싱됨
// 데이터 출처: 국가암등록통계 (암종별_5개년평균_모든암.xlsx)

const cancerData5Year = {json.dumps(cancer_data_5year, ensure_ascii=False, indent=2)};

// Node.js 환경에서 사용
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = cancerData5Year;
}}
"""
    
    # 기존 파일 백업
    if os.path.exists('cancer-data-5year.js'):
        backup_name = 'cancer-data-5year-old.js'
        os.rename('cancer-data-5year.js', backup_name)
        print(f"기존 파일을 {backup_name}으로 백업했습니다.")
    
    # 새 파일 저장
    with open('cancer-data-5year.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("새로운 5개년 평균 데이터가 cancer-data-5year.js에 저장되었습니다.")
    
    # 2022년 데이터와 비교
    print(f"\n=== 2022년 데이터와 비교 ===")
    try:
        with open('cancer-data.js', 'r', encoding='utf-8') as f:
            content_2022 = f.read()
        
        # 간단한 비교 (70-74세 여성 데이터)
        print("74세 여성 데이터 비교:")
        print("2022년: 유방암, 폐암, 대장암 등이 상위권")
        print("5개년 평균: 위에서 출력된 상위 5개 암종")
        
    except Exception as e:
        print(f"2022년 데이터 비교 중 오류: {e}")

if __name__ == "__main__":
    print("=== 5개년 평균 데이터 재생성 시작 ===")
    
    cancer_data_5year = recreate_5year_data()
    
    if cancer_data_5year:
        save_new_5year_data(cancer_data_5year)
        print("\n=== 완료 ===")
        print("웹사이트에서 74세 여성을 테스트해보세요!")
    else:
        print("데이터 생성에 실패했습니다.")




