import pandas as pd
import json
import os

def extract_all_cancer_properly():
    """Excel 파일에서 '모든 암' 데이터를 올바르게 추출"""
    
    excel_file = "excel_backup_20250923_003020/24개_암종_성_연령_5세_별_암발생자수__발생률_20250922224443.xlsx"
    
    try:
        # Excel 파일 읽기
        df = pd.read_excel(excel_file, sheet_name=0)
        
        # 헤더 설정 (첫 번째 행이 헤더)
        df.columns = df.iloc[0]
        df = df.drop(df.index[0])
        df = df.reset_index(drop=True)
        
        print("=== 모든 암 데이터 추출 (올바른 방법) ===")
        
        # '모든 암' 데이터만 추출
        all_cancer_mask = df['24개 암종별'].fillna('').str.contains('모든 암', na=False)
        all_cancer_data = df[all_cancer_mask].copy()
        
        print(f"모든 암 데이터 행 수: {len(all_cancer_data)}")
        
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
        
        # 성별 매핑
        gender_mapping = {
            '남자': 'male',
            '여자': 'female'
        }
        
        # 모든 암 데이터 구성
        all_cancer_by_group = {}
        
        for _, row in all_cancer_data.iterrows():
            age_detail = row['연령별']
            gender = row['성별']
            
            # 연령이 '계'가 아니고, 성별이 '계'가 아닌 데이터만 처리
            if age_detail == '계' or gender == '계':
                continue
            
            # 성별 영어 변환
            gender_en = gender_mapping.get(gender)
            if not gender_en:
                continue
            
            # 연령 그룹 변환
            age_group = age_group_mapping.get(age_detail)
            if not age_group:
                print(f"알 수 없는 연령: {age_detail}")
                continue
            
            # 2022년 발생률 (조발생률)
            rate_2022 = row.get('2022.1', 0)
            if pd.isna(rate_2022):
                rate_2022 = 0
            
            # 5개년 평균 계산 (2018-2022)
            years = ['2018.1', '2019.1', '2020.1', '2021.1', '2022.1']
            rates = []
            for year in years:
                rate = row.get(year, 0)
                if pd.notna(rate) and rate != 0:
                    rates.append(rate)
            
            average_5year = sum(rates) / len(rates) if rates else 0
            
            # 데이터 저장
            key = f"{gender_en}_{age_group}"
            all_cancer_by_group[key] = {
                "rate_2022": rate_2022,
                "average_5year": average_5year,
                "gender": gender_en,
                "age_group": age_group,
                "age_detail": age_detail
            }
            
            print(f"추출됨: {gender_en} {age_group} ({age_detail}) - 2022: {rate_2022:.2f}, 5년평균: {average_5year:.2f}")
        
        print(f"\n총 {len(all_cancer_by_group)}개의 모든 암 데이터가 추출되었습니다.")
        
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
        
        for key, all_cancer_info in all_cancer_by_group.items():
            gender = all_cancer_info['gender']
            age_group = all_cancer_info['age_group']
            rate_2022 = all_cancer_info['rate_2022']
            average_5year = all_cancer_info['average_5year']
            
            # 기존 데이터 구조 확인
            if gender not in existing_data:
                existing_data[gender] = {}
            if age_group not in existing_data[gender]:
                existing_data[gender][age_group] = []
            
            # '모든 암' 항목이 이미 있는지 확인
            has_all_cancer = any(item['name'] == '모든 암(C00-C96)' for item in existing_data[gender][age_group])
            
            if not has_all_cancer:
                # '모든 암' 항목을 맨 앞에 추가
                all_cancer_item = {
                    "name": "모든 암(C00-C96)",
                    "rate": rate_2022,
                    "average5Year": average_5year
                }
                existing_data[gender][age_group].insert(0, all_cancer_item)
                print(f"추가됨: {gender} {age_group} - 모든 암 ({rate_2022:.2f}, {average_5year:.2f})")
            else:
                print(f"이미 존재: {gender} {age_group} - 모든 암")
        
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
    extract_all_cancer_properly()







