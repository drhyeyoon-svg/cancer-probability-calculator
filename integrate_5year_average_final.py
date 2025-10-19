#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import re

def integrate_5year_average_final():
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
    
    # 2. 새로운 5년 raw 데이터 파일 읽기
    print("2. 새로운 5년 raw 데이터 파일 읽기...")
    
    # 먼저 파일 구조 분석
    raw_file_path = "24개암종 5년 발생률 raw data.xlsx"
    if not os.path.exists(raw_file_path):
        print(f"새로운 raw 데이터 파일을 찾을 수 없습니다: {raw_file_path}")
        return
    
    # Excel 파일 구조 분석
    xl_file = pd.ExcelFile(raw_file_path)
    print(f"   Raw 데이터 파일 시트 목록: {xl_file.sheet_names}")
    
    # 첫 번째 시트 읽기
    df_raw = pd.read_excel(raw_file_path, sheet_name=0, header=None)
    print(f"   Raw 데이터 형태: {df_raw.shape}")
    
    # 구조 분석을 위해 처음 20행 출력
    print("   Raw 데이터 구조 분석:")
    for i in range(min(20, len(df_raw))):
        row_data = []
        for j in range(min(8, len(df_raw.columns))):
            cell = df_raw.iloc[i, j]
            if pd.notna(cell):
                cell_str = str(cell).strip()
                if len(cell_str) > 15:
                    cell_str = cell_str[:15] + "..."
                row_data.append(cell_str)
            else:
                row_data.append("NaN")
        print(f"     행 {i:2d}: {row_data}")
    
    # 기존 방식으로 개별 암종 데이터 읽기 (임시)
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
    
    # 6. JavaScript 파일에서 각 항목에 average5Year 추가
    print("6. JavaScript 파일에 5개년 평균 데이터 추가...")
    
    lines = content.split('\n')
    new_lines = []
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # 암종 항목 찾기
        if '"name":' in line and '"rate":' in lines[i+1]:
            # 암종 이름 추출
            name_match = re.search(r'"name":\s*"([^"]+)"', line)
            if name_match:
                cancer_name = name_match.group(1)
                
                # 현재 성별과 연령대 찾기
                current_gender = None
                current_age = None
                
                # 위로 올라가면서 성별과 연령대 찾기
                for j in range(i, max(0, i-50), -1):
                    if '"male":' in lines[j] or '"female":' in lines[j]:
                        if '"male":' in lines[j]:
                            current_gender = 'male'
                        else:
                            current_gender = 'female'
                    if re.search(r'"[0-9]+-[0-9]+":|"[0-9]+\+":', lines[j]):
                        age_match = re.search(r'"([0-9]+-[0-9]+)":|"([0-9]+\+)":', lines[j])
                        if age_match:
                            current_age = age_match.group(1) or age_match.group(2)
                
                # 5개년 평균 데이터 찾기
                if current_gender and current_age:
                    # 모든 암 항목인 경우
                    if cancer_name == '모든 암(C00-C96)' and current_age in all_cancer_5year:
                        avg_rate = all_cancer_5year[current_age]
                        
                        # rate 다음에 average5Year 추가
                        if i+1 < len(lines) and '"rate":' in lines[i+1]:
                            new_lines.append(line)
                            new_lines.append(lines[i+1])
                            new_lines.append(f'        "average5Year": {avg_rate},')
                            i += 2
                            continue
                    
                    # 개별 암종인 경우
                    else:
                        key = f"{current_gender}_{current_age}_{cancer_name}"
                        if key in individual_5year:
                            avg_rate = individual_5year[key]
                            
                            # rate 다음에 average5Year 추가
                            if i+1 < len(lines) and '"rate":' in lines[i+1]:
                                new_lines.append(line)
                                new_lines.append(lines[i+1])
                                new_lines.append(f'        "average5Year": {avg_rate},')
                                i += 2
                                continue
        
        new_lines.append(line)
        i += 1
    
    # 7. 새로운 내용 생성
    new_content = '\n'.join(new_lines)
    
    # 파일 저장
    with open('cancer-data.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"   JavaScript 파일 업데이트 완료: cancer-data.js")
    
    # 8. 샘플 확인
    print("8. 샘플 확인...")
    sample_lines = new_content.split('\n')
    found_samples = 0
    for i, line in enumerate(sample_lines):
        if '모든 암' in line and 'average5Year' in sample_lines[i+2] if i+2 < len(sample_lines) else False:
            print(f"   {line.strip()}")
            if i+1 < len(sample_lines):
                print(f"   {sample_lines[i+1].strip()}")
            if i+2 < len(sample_lines):
                print(f"   {sample_lines[i+2].strip()}")
            found_samples += 1
            if found_samples >= 3:
                break
    
    print(f"\n   총 {found_samples}개 샘플 확인 완료")
    print("\n=== 5개년 평균 데이터 통합 완료 ===")

if __name__ == "__main__":
    integrate_5year_average_final()


