import pandas as pd
import json

def recreate_cancer_data():
    print("원본 엑셀 파일에서 암 데이터 재생성 중...")
    
    # 원본 엑셀 파일 읽기 (2022년 데이터)
    df_2022 = pd.read_excel("excel_backup_20250923_003020/24개_암종_성_연령_5세_별_암발생자수__발생률_20250922224443.xlsx", sheet_name="데이터")
    
    # 5개년 평균 데이터 읽기
    df_5year = pd.read_excel("excel_backup_20250923_003020/24개_암종_성_연령_5세_별_5개년평균_암발생률.xlsx", sheet_name="5개년 평균 데이터")
    
    print("2022년 데이터 컬럼:", df_2022.columns.tolist())
    print("5개년 데이터 컬럼:", df_5year.columns.tolist())
    
    # 2022년 데이터 정리
    df_2022_clean = df_2022.copy()
    
    # 헤더가 2행인 경우 첫 번째 행을 컬럼명으로 설정
    if '24개 암종별' in str(df_2022_clean.iloc[0, 0]):
        # 첫 번째 행을 컬럼명으로 사용
        df_2022_clean.columns = df_2022_clean.iloc[0]
        df_2022_clean = df_2022_clean.drop(0).reset_index(drop=True)
    
    # NaN 값 제거
    df_2022_clean = df_2022_clean.dropna(subset=['24개 암종별', '성별', '연령별'])
    
    print("2022년 데이터 정리 후:")
    print("암종별 고유값:", df_2022_clean['24개 암종별'].unique())
    print("성별 고유값:", df_2022_clean['성별'].unique())
    print("연령별 고유값:", sorted(df_2022_clean['연령별'].unique()))
    
    # 5개년 평균 데이터 정리
    df_5year_clean = df_5year.copy()
    df_5year_clean = df_5year_clean.dropna(subset=['24개 암종별', '성별', '연령별'])
    
    print("5개년 데이터 정리 후:")
    print("암종별 고유값:", df_5year_clean['24개 암종별'].unique())
    print("성별 고유값:", df_5year_clean['성별'].unique())
    print("연령별 고유값:", sorted(df_5year_clean['연령별'].unique()))
    
    # JavaScript 데이터 구조 생성
    cancer_data = {
        "male": {},
        "female": {}
    }
    
    # 연령별 매핑 (원본 5세 단위를 10세 단위로 그룹화)
    age_mapping = {
        '0-4세': '0-4', '5-9세': '5-9', '10-14세': '10-14', '15-19세': '15-19',
        '20-24세': '20-24', '25-29세': '25-29', '30-34세': '30-34', '35-39세': '35-39',
        '40-44세': '40-44', '45-49세': '45-49', '50-54세': '50-54', '55-59세': '55-59',
        '60-64세': '60-64', '65-69세': '65-69', '70-74세': '70-74', '75-79세': '75-79',
        '80-84세': '80-84', '85세이상': '85+'
    }
    
    # 성별 매핑
    gender_mapping = {
        '남자': 'male',
        '여자': 'female'
    }
    
    # 2022년 데이터 처리
    for _, row in df_2022_clean.iterrows():
        cancer_type = row['24개 암종별']
        gender_kr = row['성별']
        age_kr = row['연령별']
        
        # 성별과 연령 매핑
        if gender_kr in gender_mapping and age_kr in age_mapping:
            gender = gender_mapping[gender_kr]
            age_group = age_mapping[age_kr]
            
            # 2022년 발생률 (조발생률)
            rate_2022 = row['2022.1'] if pd.notna(row['2022.1']) else 0
            
            # 해당 연령 그룹이 없으면 생성
            if age_group not in cancer_data[gender]:
                cancer_data[gender][age_group] = []
            
            # 암종별 데이터 추가
            cancer_data[gender][age_group].append({
                "name": cancer_type,
                "rate": rate_2022,
                "average5Year": 0  # 나중에 업데이트
            })
    
    # 5개년 평균 데이터 처리
    for _, row in df_5year_clean.iterrows():
        cancer_type = row['24개 암종별']
        gender_kr = row['성별']
        age_kr = row['연령별']
        
        # 성별과 연령 매핑
        if gender_kr in gender_mapping and age_kr in age_mapping:
            gender = gender_mapping[gender_kr]
            age_group = age_mapping[age_kr]
            
            # 5개년 평균 발생률
            avg_5year = row['5개년 평균'] if pd.notna(row['5개년 평균']) else 0
            
            # 해당 암종 찾아서 5개년 평균 업데이트
            if age_group in cancer_data[gender]:
                for item in cancer_data[gender][age_group]:
                    if item["name"] == cancer_type:
                        item["average5Year"] = avg_5year
                        break
    
    # 데이터 정리 및 중복 제거
    for gender in cancer_data:
        for age_group in cancer_data[gender]:
            # 중복 제거 (이름으로)
            seen = set()
            unique_data = []
            for item in cancer_data[gender][age_group]:
                if item["name"] not in seen:
                    seen.add(item["name"])
                    unique_data.append(item)
            cancer_data[gender][age_group] = unique_data
            
            # 발생률 기준으로 정렬
            cancer_data[gender][age_group].sort(key=lambda x: x["rate"], reverse=True)
    
    # JavaScript 파일 생성
    js_content = "// 암 발생률 데이터 (2022년 + 5개년 평균)\n"
    js_content += "// 국가통계자료 기반\n"
    js_content += "// 마지막 업데이트: 2025년 9월\n"
    js_content += "// 데이터 출처: KOSIS 국가통계포털\n"
    js_content += "// 모든 암(C00-C96) 데이터 포함\n\n"
    
    js_content += "const cancerData = " + json.dumps(cancer_data, ensure_ascii=False, indent=2) + ";"
    
    # 파일 저장
    with open("cancer-data.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"\n새로운 cancer-data.js 생성 완료!")
    print(f"남성 나이 그룹: {sorted(cancer_data['male'].keys())}")
    print(f"여성 나이 그룹: {sorted(cancer_data['female'].keys())}")
    
    # 각 나이 그룹별 데이터 개수 확인
    for gender in ['male', 'female']:
        print(f"\n{gender} 데이터:")
        for age_group in sorted(cancer_data[gender].keys()):
            count = len(cancer_data[gender][age_group])
            print(f"  {age_group}: {count}개 암종")

if __name__ == "__main__":
    recreate_cancer_data()








