import pandas as pd
import os

# 원본 엑셀 파일 분석
def analyze_excel_file(file_path):
    print(f"\n=== {file_path} 분석 ===")
    
    try:
        # 엑셀 파일 읽기
        df = pd.read_excel(file_path, sheet_name=None)  # 모든 시트 읽기
        
        print(f"시트 개수: {len(df.keys())}")
        for sheet_name in df.keys():
            print(f"시트명: {sheet_name}")
            
            # 각 시트의 데이터 분석
            sheet_data = df[sheet_name]
            print(f"  - 행 개수: {len(sheet_data)}")
            print(f"  - 열 개수: {len(sheet_data.columns)}")
            print(f"  - 열 이름들: {list(sheet_data.columns)}")
            
            # 첫 5행 출력
            print("  - 첫 5행:")
            print(sheet_data.head())
            
            # 연령 관련 컬럼 찾기
            age_columns = [col for col in sheet_data.columns if '연령' in str(col) or '나이' in str(col) or 'age' in str(col).lower()]
            if age_columns:
                print(f"  - 연령 관련 컬럼: {age_columns}")
                
                # 연령별 고유값 확인
                for age_col in age_columns:
                    unique_ages = sheet_data[age_col].dropna().unique()
                    print(f"    - {age_col} 고유값: {sorted(unique_ages)}")
            
            print("-" * 50)
            
    except Exception as e:
        print(f"오류 발생: {e}")

# 백업 폴더의 엑셀 파일들 분석
excel_files = [
    "excel_backup_20250923_003020/24개_암종_성_연령_5세_별_암발생자수__발생률_20250922224443.xlsx",
    "excel_backup_20250923_003020/24개_암종_성_연령_5세_별_5개년평균_암발생률.xlsx",
    "excel_backup_20250923_003020/2018_2022_5개년_암환자발생률_평균_완성.xlsx"
]

for file_path in excel_files:
    if os.path.exists(file_path):
        analyze_excel_file(file_path)
    else:
        print(f"파일이 존재하지 않습니다: {file_path}")

print("\n=== 현재 cancer-data.js 구조 분석 ===")
try:
    with open("cancer-data.js", "r", encoding="utf-8") as f:
        content = f.read()
        
    # 나이 그룹 찾기
    import re
    age_groups = re.findall(r'"(\d+-\d+)"', content)
    print(f"현재 cancer-data.js의 나이 그룹들: {sorted(set(age_groups))}")
    
    # 성별 그룹 찾기
    gender_groups = re.findall(r'"(\w+)"\s*:\s*{', content)
    print(f"현재 cancer-data.js의 성별 그룹들: {gender_groups}")
    
except Exception as e:
    print(f"cancer-data.js 분석 오류: {e}")








