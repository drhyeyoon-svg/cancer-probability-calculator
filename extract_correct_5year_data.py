#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
2022년 데이터 파일의 average5Year 값을 추출하여 
올바른 5개년 평균 데이터를 생성하는 스크립트
"""

import json
import re

def extract_5year_from_2022_data():
    """2022년 데이터에서 average5Year 값을 추출하여 새로운 5개년 평균 데이터 생성"""
    
    try:
        # 2022년 데이터 파일 읽기
        with open('cancer-data.js', 'r', encoding='utf-8') as f:
            content = f.read()
        
        print("2022년 데이터 파일을 읽었습니다.")
        
        # cancerData 객체 추출
        start_marker = 'const cancerData = {'
        end_marker = '};'
        
        start_idx = content.find(start_marker)
        if start_idx == -1:
            print("cancerData 객체를 찾을 수 없습니다.")
            return None
        
        # 중괄호 매칭으로 객체 끝 찾기
        brace_count = 0
        current_idx = start_idx + len(start_marker) - 1  # '{' 포함
        
        for i in range(current_idx, len(content)):
            if content[i] == '{':
                brace_count += 1
            elif content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_idx = i + 1
                    break
        
        # JavaScript 객체 문자열 추출
        js_object_str = content[start_idx:end_idx]
        
        # 새로운 5개년 평균 데이터 구조 생성
        cancer_data_5year = {
            "male": {},
            "female": {}
        }
        
        # 정규식으로 데이터 파싱
        print("데이터 파싱 중...")
        
        # 성별 섹션 찾기
        male_match = re.search(r'"male":\s*{([^}]+(?:{[^}]*}[^}]*)*)}', js_object_str, re.DOTALL)
        female_match = re.search(r'"female":\s*{([^}]+(?:{[^}]*}[^}]*)*)}', js_object_str, re.DOTALL)
        
        if not male_match or not female_match:
            print("성별 데이터를 찾을 수 없습니다.")
            return None
        
        # 각 성별 데이터 처리
        for gender, match in [('male', male_match), ('female', female_match)]:
            gender_data = match.group(1)
            
            # 연령대별 섹션 찾기
            age_pattern = r'"([0-9]+-[0-9]+|\d+\+)":\s*\[([^\]]+(?:\[[^\]]*\][^\]]*)*)\]'
            age_matches = re.finditer(age_pattern, gender_data, re.DOTALL)
            
            for age_match in age_matches:
                age_group = age_match.group(1)
                age_data = age_match.group(2)
                
                # 개별 암종 데이터 추출
                cancer_pattern = r'{\s*"name":\s*"([^"]+)",\s*"rate":\s*([\d.]+),\s*"average5Year":\s*([\d.]+)\s*}'
                cancer_matches = re.finditer(cancer_pattern, age_data)
                
                cancer_list = []
                for cancer_match in cancer_matches:
                    name = cancer_match.group(1)
                    rate_2022 = float(cancer_match.group(2))
                    average_5year = float(cancer_match.group(3))
                    
                    cancer_list.append({
                        "name": name,
                        "rate": average_5year  # 5개년 평균값 사용
                    })
                
                # 발생률 순으로 정렬
                cancer_list.sort(key=lambda x: x['rate'], reverse=True)
                cancer_data_5year[gender][age_group] = cancer_list
        
        # 통계 출력
        print(f"\n=== 추출 결과 ===")
        for gender in ['male', 'female']:
            gender_name = '남성' if gender == 'male' else '여성'
            total_entries = sum(len(cancer_data_5year[gender][age]) for age in cancer_data_5year[gender])
            print(f"{gender_name}: {total_entries}개 항목")
            
            # 70-74세 데이터 확인
            if '70-74' in cancer_data_5year[gender]:
                age_70_74 = cancer_data_5year[gender]['70-74']
                print(f"  70-74세: {len(age_70_74)}개 암종")
                if age_70_74:
                    print(f"    상위 5개: {[f'{c[\"name\"]}({c[\"rate\"]})' for c in age_70_74[:5]]}")
        
        return cancer_data_5year
        
    except Exception as e:
        print(f"오류 발생: {e}")
        import traceback
        traceback.print_exc()
        return None

def save_corrected_5year_data(cancer_data_5year):
    """수정된 5개년 평균 데이터를 파일로 저장"""
    
    if not cancer_data_5year:
        print("저장할 데이터가 없습니다.")
        return False
    
    try:
        # JavaScript 파일 생성
        js_content = f"""// 암 발생률 5개년 평균 데이터 (2018-2022) - 2022년 데이터에서 추출한 올바른 평균값
// 데이터 출처: 국가암등록통계

const cancerData5Year = {json.dumps(cancer_data_5year, ensure_ascii=False, indent=2)};

// Node.js 환경에서 사용
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = cancerData5Year;
}}
"""
        
        # 기존 파일 백업
        try:
            with open('cancer-data-5year.js', 'r', encoding='utf-8') as f:
                old_content = f.read()
            with open('cancer-data-5year-broken.js', 'w', encoding='utf-8') as f:
                f.write(old_content)
            print("기존 파일을 cancer-data-5year-broken.js로 백업했습니다.")
        except:
            pass
        
        # 새 파일 저장
        with open('cancer-data-5year.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print("새로운 5개년 평균 데이터가 cancer-data-5year.js에 저장되었습니다.")
        
        # 검증: 74세 여성 데이터 확인
        print(f"\n=== 74세 여성 데이터 검증 ===")
        if 'female' in cancer_data_5year and '70-74' in cancer_data_5year['female']:
            female_70_74 = cancer_data_5year['female']['70-74']
            print("74세 여성 상위 10개 암종:")
            for i, cancer in enumerate(female_70_74[:10]):
                print(f"  {i+1}. {cancer['name']}: {cancer['rate']}")
            
            # 전립선암이 있는지 확인
            prostate_cancers = [c for c in female_70_74 if '전립선' in c['name']]
            if prostate_cancers:
                print(f"\n⚠️ 경고: 여성 데이터에 전립선암이 {len(prostate_cancers)}개 있습니다!")
                for cancer in prostate_cancers:
                    print(f"  - {cancer['name']}: {cancer['rate']}")
            else:
                print("\n✅ 확인: 여성 데이터에 전립선암이 없습니다.")
        
        return True
        
    except Exception as e:
        print(f"파일 저장 중 오류: {e}")
        return False

if __name__ == "__main__":
    print("=== 2022년 데이터에서 올바른 5개년 평균 추출 ===")
    
    cancer_data_5year = extract_5year_from_2022_data()
    
    if cancer_data_5year:
        success = save_corrected_5year_data(cancer_data_5year)
        if success:
            print("\n=== 완료 ===")
            print("이제 웹사이트에서 74세 여성을 테스트해보세요!")
            print("5개년 평균에서 올바른 여성 암종들이 표시될 것입니다.")
        else:
            print("파일 저장에 실패했습니다.")
    else:
        print("데이터 추출에 실패했습니다.")




