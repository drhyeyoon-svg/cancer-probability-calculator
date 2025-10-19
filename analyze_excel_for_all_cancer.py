import pandas as pd
import os

def analyze_excel_for_all_cancer():
    """Excel 파일에서 '모든 암' 항목을 찾아보는 함수"""
    
    excel_file = "excel_backup_20250923_003020/24개_암종_성_연령_5세_별_암발생자수__발생률_20250922224443.xlsx"
    
    if not os.path.exists(excel_file):
        print(f"파일이 존재하지 않습니다: {excel_file}")
        return
    
    try:
        # Excel 파일 읽기
        df = pd.read_excel(excel_file, sheet_name=0)
        
        print("=== Excel 파일 구조 분석 ===")
        print(f"행 수: {len(df)}")
        print(f"열 수: {len(df.columns)}")
        print("\n열 이름들:")
        for i, col in enumerate(df.columns):
            print(f"{i}: {col}")
        
        print("\n=== 첫 10행 데이터 ===")
        print(df.head(10).to_string())
        
        # '모든 암' 관련 항목 찾기
        print("\n=== '모든 암' 관련 항목 검색 ===")
        
        # 모든 셀에서 '모든' 또는 '암' 포함 항목 찾기
        for col in df.columns:
            if df[col].dtype == 'object':  # 문자열 열만 검색
                for idx, value in df[col].items():
                    if pd.notna(value) and isinstance(value, str):
                        if '모든' in str(value) or '전체' in str(value):
                            print(f"행 {idx}, 열 '{col}': {value}")
        
        # 첫 번째 열에서 암종 이름들 확인
        if len(df.columns) > 0:
            first_col = df.columns[0]
            print(f"\n=== 첫 번째 열 '{first_col}'의 고유값들 ===")
            unique_values = df[first_col].dropna().unique()
            for value in unique_values[:20]:  # 처음 20개만 출력
                print(f"- {value}")
                
            if len(unique_values) > 20:
                print(f"... 총 {len(unique_values)}개 항목")
                
        # '모든 암' 또는 'C00-C96' 포함 항목 찾기
        print("\n=== 특정 패턴 검색 ===")
        for col in df.columns:
            if df[col].dtype == 'object':
                mask = df[col].astype(str).str.contains('모든|전체|C00-C96|Re\.', na=False)
                if mask.any():
                    matching_rows = df[mask]
                    for idx, row in matching_rows.iterrows():
                        print(f"행 {idx}: {row[col]}")
                        
    except Exception as e:
        print(f"Excel 파일 분석 오류: {e}")

if __name__ == "__main__":
    analyze_excel_for_all_cancer()







