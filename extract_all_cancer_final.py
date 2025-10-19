import pandas as pd
import json
import os

def extract_all_cancer_final():
    """Excel 파일에서 성별/연령별 '모든 암' 데이터를 최종 추출"""
    
    excel_file = "excel_backup_20250923_003020/24개_암종_성_연령_5세_별_암발생자수__발생률_20250922224443.xlsx"
    
    try:
        # Excel 파일 읽기
        df = pd.read_excel(excel_file, sheet_name=0)
        
        print("=== 모든 암 데이터 최종 추출 ===")
        
        # 연령 그룹 매핑
        age_group_mapping = {
            '0-4세': '0-19', '5-9세': '0-19', '10-14세': '0-19', '15-19세': '0-19',
            '20-24세': '20-29', '25-29세': '20-29',
            '30-34세': '30-39', '35-39세': '30-39',
            '40-44세': '40-49', '45-49세': '40-49',
            '50-54세': '50-59', '55-59세': '50-59',
            '60-64세': '60-69', '65-69세': '60-69',
            '70-74세': '70+', '75-79세': '70+', '80-84세': '70+', '85세이상': '70+'
        }
        
        # 모든 암 데이터 수집
        all_cancer_data = {
            "male": {},
            "female": {}
        }
        
        current_gender = None
        current_cancer_type = None
        
        for idx, row in df.iterrows():
            # 암종 컬럼 확인
            if pd.notna(row.iloc[0]) and row.iloc[0] != '24개 암종별':
                current_cancer_type = row.iloc[0]
            
            # 성별 컬럼 확인
            if pd.notna(row.iloc[1]):
                if row.iloc[1] == '남자':
                    current_gender = 'male'
                elif row.iloc[1] == '여자':
                    current_gender = 'female'
                elif row.iloc[1] == '계':
                    current_gender = None
            
            # '모든 암' 데이터이고 성별이 설정된 경우
            if (current_cancer_type and '모든 암' in str(current_cancer_type) and 
                current_gender and pd.notna(row.iloc[2]) and row.iloc[2] != '계'):
                
                age_detail = row.iloc[2]
                age_group = age_group_mapping.get(age_detail)
                
                if age_group:
                    # 2022년 발생률 (조발생률)
                    rate_2022 = row.iloc[12] if len(row) > 12 else 0
                    if pd.isna(rate_2022):
                        rate_2022 = 0
                    
                    # 5개년 평균 계산 (2018-2022)
                    years = [4, 6, 8, 10, 12]  # 2018.1, 2019.1, 2020.1, 2021.1, 2022.1 컬럼 인덱스
                    rates = []
                    for year_idx in years:
                        if year_idx < len(row):
                            rate = row.iloc[year_idx]
                            if pd.notna(rate) and rate != 0:
                                rates.append(rate)
                    
                    average_5year = sum(rates) / len(rates) if rates else 0
                    
                    # 데이터 저장
                    if age_group not in all_cancer_data[current_gender]:
                        all_cancer_data[current_gender][age_group] = []
                    
                    all_cancer_item = {
                        "name": "모든 암(C00-C96)",
                        "rate": rate_2022,
                        "average5Year": average_5year
                    }
                    
                    # 중복 확인
                    if not any(item['name'] == '모든 암(C00-C96)' for item in all_cancer_data[current_gender][age_group]):
                        all_cancer_data[current_gender][age_group].append(all_cancer_item)
                        print(f"추출됨: {current_gender} {age_group} ({age_detail}) - 2022: {rate_2022:.2f}, 5년평균: {average_5year:.2f}")
        
        print(f"\n총 추출된 데이터:")
        total_count = 0
        for gender in ['male', 'female']:
            count = sum(len(age_group_data) for age_group_data in all_cancer_data[gender].values())
            total_count += count
            print(f"  {gender}: {count}개")
        print(f"  전체: {total_count}개")
        
        # 기존 cancer-data.js 파일 읽기
        with open('cancer-data.js', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # JavaScript 객체 부분만 추출
        start_marker = 'const cancerData = {'
        end_marker = '};'
        
        start_idx = content.find(start_marker)
        end_idx = content.find(end_marker, start_idx) + len(end_marker)
        
        if start_idx == -1 or end_idx == -1:
            print("cancer-data.js 파일 구조를 찾을 수 없습니다.")
            return
        
        # 기존 데이터 로드
        existing_js_part = content[start_idx:end_idx]
        existing_data_str = existing_js_part.replace('const cancerData = ', '')
        existing_data_str = existing_data_str.replace('};', '}')
        
        try:
            existing_data = eval(existing_data_str)
        except:
            print("기존 데이터 파싱 실패.")
            return
        
        # 모든 암 데이터를 기존 데이터에 추가
        print("\n=== 기존 데이터에 모든 암 데이터 추가 ===")
        
        for gender in ['male', 'female']:
            for age_group, all_cancer_items in all_cancer_data[gender].items():
                if age_group not in existing_data[gender]:
                    existing_data[gender][age_group] = []
                
                # '모든 암' 항목이 이미 있는지 확인
                has_all_cancer = any(item['name'] == '모든 암(C00-C96)' for item in existing_data[gender][age_group])
                
                if not has_all_cancer and all_cancer_items:
                    # '모든 암' 항목을 맨 앞에 추가
                    all_cancer_item = all_cancer_items[0]
                    existing_data[gender][age_group].insert(0, all_cancer_item)
                    print(f"추가됨: {gender} {age_group} - 모든 암 ({all_cancer_item['rate']:.2f}, {all_cancer_item['average5Year']:.2f})")
        
        # 새로운 JavaScript 파일 생성
        js_content = f"""// 암 발생률 데이터 (2022년 + 5개년 평균)
// 국가통계자료 기반
// 마지막 업데이트: 2025년 9월
// 데이터 출처: KOSIS 국가통계포털
// 모든 암(C00-C96) 데이터 포함

const cancerData = {json.dumps(existing_data, ensure_ascii=False, indent=2)};

// 데이터 검증 함수
function validateCancerData() {{
    const requiredAgeGroups = ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    const requiredGenders = ['male', 'female'];
    
    for (const gender of requiredGenders) {{
        if (!cancerData[gender]) {{
            console.error(`성별 데이터 누락: ${{gender}}`);
            return false;
        }}
        
        for (const ageGroup of requiredAgeGroups) {{
            if (!cancerData[gender][ageGroup] || cancerData[gender][ageGroup].length === 0) {{
                console.warn(`${{gender}} ${{ageGroup}} 데이터가 없습니다.`);
            }}
        }}
    }}
    
    console.log('암종 데이터 검증 완료');
    return true;
}}

// 데이터 통계 정보
function getCancerDataStats() {{
    let totalEntries = 0;
    let totalAgeGroups = 0;
    
    for (const gender of ['male', 'female']) {{
        for (const ageGroup in cancerData[gender]) {{
            totalAgeGroups++;
            totalEntries += cancerData[gender][ageGroup].length;
        }}
    }}
    
    return {{
        totalEntries: totalEntries,
        totalAgeGroups: totalAgeGroups,
        genders: ['male', 'female']
    }};
}}

// 페이지 로드 시 데이터 검증 실행
document.addEventListener('DOMContentLoaded', function() {{
    validateCancerData();
    console.log('암 데이터 통계:', getCancerDataStats());
}});"""
        
        # 파일 저장
        with open('cancer-data.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print("\n✅ cancer-data.js 파일이 업데이트되었습니다.")
        print("✅ '모든 암(C00-C96)' 데이터가 모든 연령/성별 그룹에 추가되었습니다.")
        
        # 통계 출력
        total_all_cancer_entries = 0
        for gender in ['male', 'female']:
            for age_group in existing_data[gender]:
                for item in existing_data[gender][age_group]:
                    if item['name'] == '모든 암(C00-C96)':
                        total_all_cancer_entries += 1
                        break
        
        print(f"\n총 {total_all_cancer_entries}개의 연령/성별 그룹에 '모든 암' 데이터가 추가되었습니다.")
        
    except Exception as e:
        print(f"데이터 처리 오류: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    extract_all_cancer_final()









