import pandas as pd
import json
import os

def debug_all_cancer_extraction():
    """Excel 파일에서 '모든 암' 데이터 추출 과정을 디버깅"""
    
    excel_file = "excel_backup_20250923_003020/24개_암종_성_연령_5세_별_암발생자수__발생률_20250922224443.xlsx"
    
    try:
        # Excel 파일 읽기
        df = pd.read_excel(excel_file, sheet_name=0)
        
        print("=== 원본 데이터 구조 ===")
        print(f"행 수: {len(df)}")
        print(f"열 수: {len(df.columns)}")
        print("\n첫 5행:")
        print(df.head().to_string())
        
        # '모든 암' 행 찾기
        print("\n=== '모든 암' 행 찾기 ===")
        for idx, row in df.iterrows():
            if pd.notna(row.iloc[0]) and '모든 암' in str(row.iloc[0]):
                print(f"행 {idx}: {row.iloc[0]}")
                print(f"전체 행 데이터:")
                for i, value in enumerate(row):
                    print(f"  열 {i}: {value}")
                break
        
        # 헤더 행 찾기 (두 번째 행이 실제 헤더인 것 같음)
        print("\n=== 헤더 분석 ===")
        print("첫 번째 행 (헤더 후보):")
        for i, col in enumerate(df.iloc[0]):
            print(f"  열 {i}: {col}")
        
        print("\n두 번째 행 (헤더 후보):")
        for i, col in enumerate(df.iloc[1]):
            print(f"  열 {i}: {col}")
        
        # 실제 데이터가 시작하는 행 찾기
        print("\n=== 데이터 시작점 찾기 ===")
        for idx in range(min(10, len(df))):
            row = df.iloc[idx]
            print(f"행 {idx}: {row.iloc[0]} | {row.iloc[1]} | {row.iloc[2]}")
        
        # '모든 암' 데이터의 세부 정보
        print("\n=== '모든 암' 데이터 세부 분석 ===")
        all_cancer_rows = df[df.iloc[:, 0].astype(str).str.contains('모든 암', na=False)]
        print(f"찾은 '모든 암' 행 수: {len(all_cancer_rows)}")
        
        for idx, row in all_cancer_rows.iterrows():
            print(f"\n행 {idx} 데이터:")
            print(f"  암종: {row.iloc[0]}")
            print(f"  성별: {row.iloc[1]}")
            print(f"  연령: {row.iloc[2]}")
            print(f"  2022년 발생률: {row.iloc[12] if len(row) > 12 else 'N/A'}")
        
        # 성별별, 연령별 데이터 확인
        print("\n=== 성별별 데이터 확인 ===")
        unique_genders = df.iloc[:, 1].dropna().unique()
        print(f"고유 성별: {unique_genders}")
        
        print("\n=== 연령별 데이터 확인 ===")
        unique_ages = df.iloc[:, 2].dropna().unique()
        print(f"고유 연령 (처음 20개): {unique_ages[:20]}")
        
    except Exception as e:
        print(f"디버깅 오류: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    debug_all_cancer_extraction()







