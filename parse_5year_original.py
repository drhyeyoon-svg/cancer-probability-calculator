#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
암종별_5개년평균_모든암.xlsx 파일을 올바르게 파싱하여 
성별/연령대별로 정확한 5개년 평균 데이터를 생성하는 스크립트
"""

import pandas as pd
import json
import os
import numpy as np

def analyze_excel_structure():
    """엑셀 파일 구조 분석"""
    
    file_path = "암종별_5개년평균_모든암.xlsx"
    
    if not os.path.exists(file_path):
        print(f"파일을 찾을 수 없습니다: {file_path}")
        return None
    
    try:
        # 엑셀 파일의 모든 시트 확인
        xl_file = pd.ExcelFile(file_path)
        print(f"사용 가능한 시트: {xl_file.sheet_names}")
        
        # 각 시트별로 데이터 구조 확인
        for sheet_name in xl_file.sheet_names:
            print(f"\n=== {sheet_name} 시트 분석 ===")
            
            try:
                df = pd.read_excel(file_path, sheet_name=sheet_name)
                print(f"데이터 형태: {df.shape}")
                print("컬럼명들:")
                for i, col in enumerate(df.columns):
                    print(f"  {i}: {col}")
                
                print("\n첫 10행 데이터:")
                print(df.head(10))
                
                # 성별/연령대 관련 컬럼 찾기
                gender_cols = []
                age_cols = []
                cancer_cols = []
                
                for col in df.columns:
                    col_str = str(col).lower()
                    if '남' in col_str or '여' in col_str or 'male' in col_str or 'female' in col_str:
                        gender_cols.append(col)
                    elif any(age in col_str for age in ['0-', '5-', '10-', '15-', '20-', '25-', '30-', '35-', '40-', '45-', '50-', '55-', '60-', '65-', '70-', '75-', '80-', '85']):
                        age_cols.append(col)
                    elif '암' in col_str or 'cancer' in col_str or '종' in col_str:
                        cancer_cols.append(col)
                
                print(f"\n성별 관련 컬럼: {gender_cols}")
                print(f"연령대 관련 컬럼: {age_cols}")
                print(f"암종 관련 컬럼: {cancer_cols}")
                
                # 데이터 값 범위 확인
                numeric_cols = df.select_dtypes(include=[np.number]).columns
                if len(numeric_cols) > 0:
                    print(f"\n숫자 컬럼들의 값 범위:")
                    for col in numeric_cols[:5]:  # 처음 5개만
                        min_val = df[col].min()
                        max_val = df[col].max()
                        print(f"  {col}: {min_val} ~ {max_val}")
                
            except Exception as e:
                print(f"시트 {sheet_name} 읽기 오류: {e}")
                
        return xl_file
        
    except Exception as e:
        print(f"파일 읽기 오류: {e}")
        return None

def parse_5year_data_properly():
    """5개년 평균 데이터를 올바르게 파싱"""
    
    file_path = "암종별_5개년평균_모든암.xlsx"
    
    if not os.path.exists(file_path):
        print(f"파일을 찾을 수 없습니다: {file_path}")
        return None
    
    try:
        # 첫 번째 시트 읽기 (보통 데이터가 있는 시트)
        df = pd.read_excel(file_path, sheet_name=0)
        print(f"데이터 형태: {df.shape}")
        
        # 기본 데이터 구조 생성 (2022년 데이터와 동일한 구조)
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
        
        # 컬럼명 분석
        print("\n컬럼명 분석:")
        for i, col in enumerate(df.columns):
            print(f"{i}: {col}")
        
        # 암종명 컬럼 찾기
        cancer_name_col = None
        for col in df.columns:
            if '암종' in str(col) or '질병' in str(col) or 'ICD' in str(col):
                cancer_name_col = col
                break
        
        if not cancer_name_col:
            # 첫 번째 컬럼이 암종명일 가능성
            cancer_name_col = df.columns[0]
        
        print(f"암종명 컬럼: {cancer_name_col}")
        
        # 성별/연령대별 컬럼 매핑
        gender_age_cols = {}
        
        for col in df.columns:
            col_str = str(col)
            
            # 남성 데이터 컬럼 찾기
            if '남' in col_str:
                # 연령대 추출
                for age in ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39',
                           '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85+']:
                    if age in col_str or age.replace('-', '~') in col_str:
                        gender_age_cols[col] = ('male', age)
                        break
            
            # 여성 데이터 컬럼 찾기
            elif '여' in col_str:
                # 연령대 추출
                for age in ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39',
                           '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85+']:
                    if age in col_str or age.replace('-', '~') in col_str:
                        gender_age_cols[col] = ('female', age)
                        break
        
        print(f"\n성별/연령대 매핑: {len(gender_age_cols)}개 컬럼")
        for col, (gender, age) in list(gender_age_cols.items())[:10]:  # 처음 10개만 출력
            print(f"  {col} -> {gender} {age}")
        
        # 데이터 파싱
        print(f"\n데이터 파싱 시작...")
        
        for index, row in df.iterrows():
            try:
                cancer_name = row[cancer_name_col]
                
                # 암종명이 유효한지 확인
                if pd.isna(cancer_name) or cancer_name in ['', 'NaN', '계']:
                    continue
                
                cancer_name = str(cancer_name).strip()
                
                # 각 성별/연령대별 데이터 처리
                for col, (gender, age_group) in gender_age_cols.items():
                    try:
                        rate = row[col]
                        
                        # 발생률이 유효한지 확인
                        if pd.isna(rate) or rate == '-' or rate == '':
                            continue
                        
                        rate = float(rate)
                        
                        # 데이터 추가
                        cancer_data_5year[gender][age_group].append({
                            "name": cancer_name,
                            "rate": rate
                        })
                        
                    except (ValueError, TypeError) as e:
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
            
            # 각 연령대별 항목 수
            for age_group in cancer_data_5year[gender]:
                count = len(cancer_data_5year[gender][age_group])
                if count > 0:
                    print(f"  {age_group}: {count}개")
        
        return cancer_data_5year
        
    except Exception as e:
        print(f"파싱 중 오류: {e}")
        return None

def save_corrected_5year_data(cancer_data_5year):
    """수정된 5개년 평균 데이터를 파일로 저장"""
    
    if not cancer_data_5year:
        print("저장할 데이터가 없습니다.")
        return
    
    # JavaScript 파일로 저장
    js_content = f"""// 암 발생률 5개년 평균 데이터 (2018-2022) - 올바르게 파싱됨
// 데이터 출처: 국가암등록통계 (암종별_5개년평균_모든암.xlsx)

const cancerData5Year = {json.dumps(cancer_data_5year, ensure_ascii=False, indent=2)};

// Node.js 환경에서 사용
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = cancerData5Year;
}}
"""
    
    # 기존 파일 백업
    if os.path.exists('cancer-data-5year.js'):
        backup_name = 'cancer-data-5year-old-backup.js'
        os.rename('cancer-data-5year.js', backup_name)
        print(f"기존 파일을 {backup_name}으로 백업했습니다.")
    
    # 새 파일 저장
    with open('cancer-data-5year.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("새로운 5개년 평균 데이터가 cancer-data-5year.js에 저장되었습니다.")
    
    # 샘플 데이터 출력 (검증용)
    print(f"\n=== 샘플 데이터 (70-74세) ===")
    for gender in ['male', 'female']:
        gender_name = '남성' if gender == 'male' else '여성'
        age_70_74 = cancer_data_5year[gender]['70-74']
        print(f"{gender_name} 70-74세: {len(age_70_74)}개 암종")
        if age_70_74:
            print(f"  상위 5개: {[f'{c[\"name\"]}({c[\"rate\"]})' for c in age_70_74[:5]]}")

if __name__ == "__main__":
    print("=== 5개년 평균 데이터 올바른 파싱 시작 ===")
    
    # 1. 엑셀 파일 구조 분석
    print("1. 엑셀 파일 구조 분석...")
    xl_file = analyze_excel_structure()
    
    if xl_file:
        # 2. 데이터 파싱
        print("\n2. 데이터 파싱...")
        cancer_data_5year = parse_5year_data_properly()
        
        if cancer_data_5year:
            # 3. 파일 저장
            print("\n3. 파일 저장...")
            save_corrected_5year_data(cancer_data_5year)
            print("\n=== 완료 ===")
        else:
            print("데이터 파싱에 실패했습니다.")
    else:
        print("엑셀 파일을 읽을 수 없습니다.")




