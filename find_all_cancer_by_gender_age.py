import pandas as pd
import json
import os

def find_all_cancer_by_gender_age():
    """Excel 파일에서 성별/연령별 '모든 암' 데이터를 찾기"""
    
    excel_file = "excel_backup_20250923_003020/24개_암종_성_연령_5세_별_암발생자수__발생률_20250922224443.xlsx"
    
    try:
        # Excel 파일 읽기
        df = pd.read_excel(excel_file, sheet_name=0)
        
        print("=== Excel 파일 전체 분석 ===")
        print(f"행 수: {len(df)}")
        print(f"열 수: {len(df.columns)}")
        
        # '모든 암' 관련 모든 행 찾기
        print("\n=== '모든 암' 관련 모든 행 ===")
        for idx, row in df.iterrows():
            # 첫 번째 열에서 '모든 암' 검색
            if pd.notna(row.iloc[0]) and '모든 암' in str(row.iloc[0]):
                print(f"\n행 {idx}:")
                print(f"  암종: {row.iloc[0]}")
                print(f"  성별: {row.iloc[1]}")
                print(f"  연령: {row.iloc[2]}")
                print(f"  2022년 발생률: {row.iloc[12] if len(row) > 12 else 'N/A'}")
        
        # 성별별 데이터 패턴 분석
        print("\n=== 성별별 데이터 패턴 분석 ===")
        
        # '모든 암' 다음에 나오는 데이터들 확인
        all_cancer_row_idx = None
        for idx, row in df.iterrows():
            if pd.notna(row.iloc[0]) and '모든 암' in str(row.iloc[0]):
                all_cancer_row_idx = idx
                break
        
        if all_cancer_row_idx is not None:
            print(f"모든 암 행 다음 20행 확인:")
            for i in range(all_cancer_row_idx + 1, min(all_cancer_row_idx + 21, len(df))):
                row = df.iloc[i]
                print(f"  행 {i}: {row.iloc[0]} | {row.iloc[1]} | {row.iloc[2]} | {row.iloc[12] if len(row) > 12 else 'N/A'}")
        
        # 실제 암종별 데이터가 시작하는 지점 찾기
        print("\n=== 암종별 데이터 시작점 찾기 ===")
        for idx, row in df.iterrows():
            if pd.notna(row.iloc[0]) and '입술' in str(row.iloc[0]):
                print(f"첫 번째 개별 암종 행: {idx}")
                print(f"  암종: {row.iloc[0]}")
                print(f"  성별: {row.iloc[1]}")
                print(f"  연령: {row.iloc[2]}")
                break
        
        # 성별이 '남자', '여자'로 시작하는 행들 찾기
        print("\n=== 성별별 '모든 암' 데이터 찾기 ===")
        current_cancer_type = None
        for idx, row in df.iterrows():
            # 암종이 설정되어 있는 경우
            if pd.notna(row.iloc[0]) and row.iloc[0] != '24개 암종별':
                current_cancer_type = row.iloc[0]
            
            # 성별이 '남자' 또는 '여자'인 경우
            if pd.notna(row.iloc[1]) and row.iloc[1] in ['남자', '여자']:
                if current_cancer_type and '모든 암' in str(current_cancer_type):
                    print(f"행 {idx}: {current_cancer_type} | {row.iloc[1]} | {row.iloc[2]} | {row.iloc[12] if len(row) > 12 else 'N/A'}")
        
        # 다른 방법: 모든 행에서 '모든 암' 패턴 검색
        print("\n=== 모든 행에서 '모든 암' 패턴 검색 ===")
        all_cancer_patterns = []
        for idx, row in df.iterrows():
            for col_idx, value in enumerate(row):
                if pd.notna(value) and isinstance(value, str) and '모든 암' in value:
                    all_cancer_patterns.append({
                        'row': idx,
                        'col': col_idx,
                        'value': value,
                        'gender': row.iloc[1] if len(row) > 1 else None,
                        'age': row.iloc[2] if len(row) > 2 else None
                    })
        
        for pattern in all_cancer_patterns:
            print(f"행 {pattern['row']}: {pattern['value']} | 성별: {pattern['gender']} | 연령: {pattern['age']}")
        
    except Exception as e:
        print(f"분석 오류: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    find_all_cancer_by_gender_age()







