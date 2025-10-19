import pandas as pd
import json
import os

def add_all_cancer_data():
    """Excel 파일에서 '모든 암' 데이터를 추출하여 cancer-data.js에 추가"""
    
    excel_file = "excel_backup_20250923_003020/24개_암종_성_연령_5세_별_암발생자수__발생률_20250922224443.xlsx"
    
    if not os.path.exists(excel_file):
        print(f"파일이 존재하지 않습니다: {excel_file}")
        return
    
    try:
        # Excel 파일 읽기
        df = pd.read_excel(excel_file, sheet_name=0)
        
        # 헤더 행 찾기 (첫 번째 행이 헤더)
        df.columns = df.iloc[0]
        df = df.drop(df.index[0])
        df = df.reset_index(drop=True)
        
        print("=== 모든 암 데이터 추출 ===")
        
        # '모든 암(C00-C96)' 데이터만 추출
        all_cancer_data = df[df['24개 암종별'] == '모든 암(C00-C96)'].copy()
        
        if all_cancer_data.empty:
            print("'모든 암' 데이터를 찾을 수 없습니다.")
            return
        
        print(f"모든 암 데이터 행 수: {len(all_cancer_data)}")
        
        # 성별과 연령별로 데이터 구성
        cancer_data = {
            "male": {},
            "female": {}
        }
        
        # 연령 그룹 매핑
        age_group_mapping = {
            '0-4세': '0-19', '5-9세': '0-19', '10-14세': '0-19', '15-19세': '0-19',
            '20-24세': '20-29', '25-29세': '20-29',
            '30-34세': '30-39', '35-39세': '30-39',
            '40-44세': '40-49', '45-49세': '40-49',
            '50-54세': '50-59', '55-59세': '50-59',
            '60-64세': '60-69', '65-69세': '60-69',
            '70-74세': '70+', '75-79세': '70+', '80-84세': '70+', '85세+': '70+'
        }
        
        # 2022년과 5개년 평균 계산
        for _, row in all_cancer_data.iterrows():
            age_detail = row['연령별']
            gender = row['성별']
            
            if pd.isna(age_detail) or age_detail == '계':
                continue
                
            if gender not in ['남', '여']:
                continue
                
            # 성별 영어 변환
            gender_en = 'male' if gender == '남' else 'female'
            
            # 연령 그룹 변환
            age_group = age_group_mapping.get(age_detail)
            if not age_group:
                print(f"알 수 없는 연령: {age_detail}")
                continue
            
            # 2022년 발생률 (조발생률)
            rate_2022 = row.get('2022.1', 0)  # 조발생률 컬럼
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
            
            # 데이터 구조 초기화
            if age_group not in cancer_data[gender_en]:
                cancer_data[gender_en][age_group] = []
            
            # '모든 암' 항목 추가 (항상 맨 앞에)
            all_cancer_item = {
                "name": "모든 암(C00-C96)",
                "rate": rate_2022,
                "average5Year": average_5year
            }
            
            # 기존 데이터가 있는지 확인하고 추가
            existing_data = cancer_data[gender_en][age_group]
            if not any(item['name'] == '모든 암(C00-C96)' for item in existing_data):
                existing_data.insert(0, all_cancer_item)  # 맨 앞에 추가
        
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
        
        # 기존 데이터와 새 데이터 병합
        print("=== 기존 데이터와 병합 ===")
        
        # 기존 데이터 로드
        existing_js_part = content[start_idx:end_idx]
        # JavaScript 객체를 Python 객체로 변환하기 위해 eval 사용
        try:
            # 안전한 방법으로 JavaScript 객체 파싱
            existing_data_str = existing_js_part.replace('const cancerData = ', '')
            existing_data_str = existing_data_str.replace('};', '}')
            existing_data = eval(existing_data_str)
        except:
            print("기존 데이터 파싱 실패. 새 데이터로 덮어씁니다.")
            existing_data = {"male": {}, "female": {}}
        
        # 새 데이터를 기존 데이터에 병합
        for gender in ['male', 'female']:
            for age_group in cancer_data[gender]:
                if age_group not in existing_data[gender]:
                    existing_data[gender][age_group] = []
                
                # '모든 암' 항목이 이미 있는지 확인
                has_all_cancer = any(item['name'] == '모든 암(C00-C96)' for item in existing_data[gender][age_group])
                
                if not has_all_cancer:
                    # '모든 암' 항목을 맨 앞에 추가
                    existing_data[gender][age_group].insert(0, cancer_data[gender][age_group][0])
                    print(f"추가됨: {gender} {age_group} - 모든 암")
        
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
        
        print("✅ cancer-data.js 파일이 업데이트되었습니다.")
        print("✅ '모든 암(C00-C96)' 데이터가 모든 연령/성별 그룹에 추가되었습니다.")
        
        # 통계 출력
        total_all_cancer_entries = 0
        for gender in ['male', 'female']:
            for age_group in existing_data[gender]:
                for item in existing_data[gender][age_group]:
                    if item['name'] == '모든 암(C00-C96)':
                        total_all_cancer_entries += 1
                        print(f"- {gender} {age_group}: {item['rate']:.2f} (2022), {item['average5Year']:.2f} (5년평균)")
        
        print(f"\n총 {total_all_cancer_entries}개의 '모든 암' 데이터가 추가되었습니다.")
        
    except Exception as e:
        print(f"데이터 처리 오류: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    add_all_cancer_data()







