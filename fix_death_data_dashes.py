import json
import re

def fix_death_data_dashes():
    """death-data.js에서 질환명 앞의 '-' 표시를 제거"""
    
    try:
        # death-data.js 파일 읽기
        with open('death-data.js', 'r', encoding='utf-8') as f:
            content = f.read()
        
        print("=== 사망원인 데이터 '-' 표시 제거 ===")
        
        # JavaScript 객체 부분만 추출
        start_marker = 'const deathData = {'
        end_marker = '};'
        
        start_idx = content.find(start_marker)
        end_idx = content.find(end_marker, start_idx) + len(end_marker)
        
        if start_idx == -1 or end_idx == -1:
            print("death-data.js 파일 구조를 찾을 수 없습니다.")
            return
        
        # JavaScript 객체를 Python 객체로 변환
        js_part = content[start_idx:end_idx]
        data_str = js_part.replace('const deathData = ', '')
        data_str = data_str.replace('};', '}')
        
        try:
            death_data = eval(data_str)
        except:
            print("death-data.js 파싱 실패.")
            return
        
        # '-' 표시가 있는 질환명들을 수정
        fixed_count = 0
        
        for gender in ['male', 'female']:
            for age_group in death_data[gender]:
                for item in death_data[gender][age_group]:
                    original_name = item['name']
                    
                    # '-' 로 시작하는 질환명 수정
                    if original_name.startswith('- '):
                        new_name = original_name[2:]  # '- ' 제거
                        item['name'] = new_name
                        fixed_count += 1
                        print(f"수정됨: '{original_name}' → '{new_name}'")
                    elif original_name.startswith('-'):
                        new_name = original_name[1:].strip()  # '-' 제거 후 공백 정리
                        item['name'] = new_name
                        fixed_count += 1
                        print(f"수정됨: '{original_name}' → '{new_name}'")
        
        print(f"\n총 {fixed_count}개의 질환명이 수정되었습니다.")
        
        # 새로운 JavaScript 파일 생성
        js_content = f"""// 사망원인별 발생률 데이터
// 국가통계자료 기반 (사망원인생명표_5세별)
// 마지막 업데이트: 2025년 9월
// 데이터 출처: KOSIS 국가통계포털
// '-' 표시 제거됨

const deathData = {json.dumps(death_data, ensure_ascii=False, indent=2)};

// 데이터 검증 함수
function validateDeathData() {{
    const requiredAgeGroups = ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    const requiredGenders = ['male', 'female'];
    
    for (const gender of requiredGenders) {{
        if (!deathData[gender]) {{
            console.error(`성별 데이터 누락: ${{gender}}`);
            return false;
        }}
        
        for (const ageGroup of requiredAgeGroups) {{
            if (!deathData[gender][ageGroup] || deathData[gender][ageGroup].length === 0) {{
                console.warn(`${{gender}} ${{ageGroup}} 데이터가 없습니다.`);
            }}
        }}
    }}
    
    console.log('사망원인 데이터 검증 완료');
    return true;
}}

// 페이지 로드 시 데이터 검증 실행
document.addEventListener('DOMContentLoaded', function() {{
    validateDeathData();
}});"""
        
        # 파일 저장
        with open('death-data.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print("✅ death-data.js 파일이 업데이트되었습니다.")
        print("✅ 질환명에서 '-' 표시가 제거되었습니다.")
        
    except Exception as e:
        print(f"데이터 처리 오류: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    fix_death_data_dashes()









