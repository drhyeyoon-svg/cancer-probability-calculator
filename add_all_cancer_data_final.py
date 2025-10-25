import pandas as pd
import json

def add_all_cancer_data_final():
    print("2022년 데이터에서 '모든 암' 데이터 추출 중...")
    
    # 2022년 데이터 읽기
    df_2022 = pd.read_excel("excel_backup_20250923_003020/24개_암종_성_연령_5세_별_암발생자수__발생률_20250922224443.xlsx", sheet_name="데이터")
    
    # "모든 암" 데이터만 필터링
    all_cancer_data = df_2022[df_2022['24개 암종별'] == '모든 암(C00-C96)'].copy()
    
    print("'모든 암' 데이터 행 수:", len(all_cancer_data))
    print("성별 고유값:", all_cancer_data['성별'].unique())
    print("연령별 고유값:", sorted(all_cancer_data['연령별'].unique()))
    
    # 연령별 매핑
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
    
    # 기존 cancer-data.js 읽기
    with open('cancer-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # JavaScript 객체 부분만 추출
    start_idx = content.find('const cancerData = {')
    end_idx = content.rfind('};') + 2
    js_object = content[start_idx:end_idx]
    
    # JavaScript 객체를 Python 딕셔너리로 변환 (eval 사용)
    cancer_data = eval(js_object.replace('const cancerData = ', ''))
    
    # "모든 암" 데이터 추가
    for _, row in all_cancer_data.iterrows():
        gender_kr = row['성별']
        age_kr = row['연령별']
        
        if gender_kr in gender_mapping and age_kr in age_mapping:
            gender = gender_mapping[gender_kr]
            age_group = age_mapping[age_kr]
            
            # 해당 연령대에 "모든 암" 항목 추가
            if gender in cancer_data and age_group in cancer_data[gender]:
                # 기존 "모든 암" 항목이 있는지 확인
                existing_all_cancer = None
                for item in cancer_data[gender][age_group]:
                    if '모든 암' in item['name']:
                        existing_all_cancer = item
                        break
                
                if existing_all_cancer:
                    # 기존 항목 업데이트
                    existing_all_cancer['rate'] = float(row['발생률'])
                    existing_all_cancer['average5Year'] = float(row['발생률'])  # 2022년 데이터를 5년 평균으로도 사용
                    print(f"업데이트: {gender} {age_group} - 모든 암")
                else:
                    # 새 항목 추가 (맨 앞에)
                    new_item = {
                        "name": "모든 암(C00-C96)",
                        "rate": float(row['발생률']),
                        "average5Year": float(row['발생률'])  # 2022년 데이터를 5년 평균으로도 사용
                    }
                    cancer_data[gender][age_group].insert(0, new_item)
                    print(f"추가: {gender} {age_group} - 모든 암")
    
    # 수정된 데이터를 JavaScript 파일로 저장
    with open('cancer-data.js', 'w', encoding='utf-8') as f:
        f.write("// 암 발생률 데이터 (2022년 + 5개년 평균)\n")
        f.write("// 국가통계자료 기반\n")
        f.write("// 마지막 업데이트: 2025년 9월\n")
        f.write("// 데이터 출처: KOSIS 국가통계포털\n")
        f.write("// 모든 암(C00-C96) 데이터 포함\n\n")
        f.write("const cancerData = ")
        f.write(json.dumps(cancer_data, ensure_ascii=False, indent=2))
        f.write(";\n")
    
    print("'모든 암' 데이터가 cancer-data.js에 추가되었습니다.")

if __name__ == "__main__":
    add_all_cancer_data_final()












