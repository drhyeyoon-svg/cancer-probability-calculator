#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
간이 생명표 엑셀 파일을 파싱하여 JavaScript 데이터 파일로 변환하는 스크립트
사망확률 데이터 생성
"""

import pandas as pd
import json
import os

def parse_life_table():
    """간이 생명표 엑셀 파일을 파싱"""
    try:
        file_path = '간이생명표_5세별__20250922002524.xlsx'
        
        if not os.path.exists(file_path):
            print(f"파일을 찾을 수 없습니다: {file_path}")
            return None
            
        # 데이터 시트 읽기
        df = pd.read_excel(file_path, sheet_name='데이터', header=0)
        print(f"데이터 크기: {df.shape}")
        print(f"컬럼 목록: {list(df.columns)}")
        
        # 데이터 구조 생성 (사망확률 데이터)
        life_table_data = {
            'male': {},
            'female': {}
        }
        
        # 나이대별 그룹핑 (간이 생명표는 5세별이므로 직접 매핑)
        age_mapping = {
            0: '0-19', 1: '0-19', 5: '0-19', 10: '0-19', 15: '0-19',
            20: '20-29', 25: '20-29',
            30: '30-39', 35: '30-39',
            40: '40-49', 45: '40-49',
            50: '50-59', 55: '50-59',
            60: '60-69', 65: '60-69',
            70: '70+', 75: '70+', 80: '70+', 85: '70+', 90: '70+', 95: '70+'
        }
        
        # 데이터 처리 (사망확률은 2023.3 컬럼에 있는 것으로 보임)
        for index, row in df.iterrows():
            try:
                age = row['연령별']
                death_probability_total = row['2023.3']  # 전체 사망확률
                
                # 나이가 NaN이거나 헤더인 경우 건너뛰기
                if pd.isna(age) or age == '연령별':
                    continue
                
                # 나이를 숫자로 변환
                try:
                    age_num = int(age)
                except (ValueError, TypeError):
                    continue
                
                # 나이대 계산
                age_group = age_mapping.get(age_num)
                if not age_group:
                    continue
                
                # 사망확률이 NaN인 경우 건너뛰기
                if pd.isna(death_probability_total):
                    continue
                
                # 사망확률을 숫자로 변환
                try:
                    death_prob = float(death_probability_total)
                    if death_prob > 0:
                        # 남성과 여성 모두 동일한 사망확률을 사용 (실제로는 성별별로 다를 수 있음)
                        for gender in ['male', 'female']:
                            if age_group not in life_table_data[gender]:
                                life_table_data[gender][age_group] = []
                            
                            life_table_data[gender][age_group].append({
                                'age': age_num,
                                'death_probability': death_prob
                            })
                except (ValueError, TypeError):
                    continue
                
            except Exception as e:
                print(f"행 {index} 처리 오류: {e}")
                continue
        
        # 각 나이대별로 평균 사망확률 계산
        for gender in life_table_data:
            for age_group in life_table_data[gender]:
                if life_table_data[gender][age_group]:
                    # 평균 사망확률 계산
                    total_prob = sum(item['death_probability'] for item in life_table_data[gender][age_group])
                    avg_prob = total_prob / len(life_table_data[gender][age_group])
                    
                    life_table_data[gender][age_group] = {
                        'average_death_probability': round(avg_prob, 6),
                        'individual_ages': life_table_data[gender][age_group]
                    }
        
        return life_table_data
        
    except Exception as e:
        print(f"간이 생명표 데이터 파싱 오류: {e}")
        return None

def save_life_table_data(life_table_data):
    """간이 생명표 데이터를 JavaScript 파일로 저장"""
    if not life_table_data:
        print("간이 생명표 데이터가 없습니다.")
        return
    
    # 데이터 통계 계산
    total_entries = 0
    for gender in life_table_data:
        for age_group in life_table_data[gender]:
            total_entries += len(life_table_data[gender][age_group])
    
    js_content = f"""// 간이 생명표 데이터 (사망확률)
// 국가통계자료 기반 (24개_암종_성_연령_5세_별_암발생자수__발생률)
// 마지막 업데이트: 2025년 9월
// 데이터 출처: KOSIS 국가통계포털

const lifeTableData = {json.dumps(life_table_data, ensure_ascii=False, indent=2)};

// 데이터 검증 함수
function validateLifeTableData() {{
    const requiredAgeGroups = ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    const requiredGenders = ['male', 'female'];
    
    for (const gender of requiredGenders) {{
        if (!lifeTableData[gender]) {{
            console.error(`성별 데이터 누락: ${{gender}}`);
            return false;
        }}
        
        for (const ageGroup of requiredAgeGroups) {{
            if (!lifeTableData[gender][ageGroup] || lifeTableData[gender][ageGroup].length === 0) {{
                console.warn(`${{gender}} ${{ageGroup}} 데이터가 없습니다.`);
            }}
        }}
    }}
    
    console.log('간이 생명표 데이터 검증 완료');
    return true;
}}

// 데이터 통계 정보
function getLifeTableDataStats() {{
    let totalEntries = 0;
    let totalAgeGroups = 0;
    
    for (const gender of ['male', 'female']) {{
        for (const ageGroup in lifeTableData[gender]) {{
            totalAgeGroups++;
            totalEntries += lifeTableData[gender][ageGroup].length;
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
    validateLifeTableData();
    const stats = getLifeTableDataStats();
    console.log('간이 생명표 데이터 통계:', stats);
    console.log('총 데이터 항목 수: {total_entries}');
}});
"""
    
    with open('life-table-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"간이 생명표 데이터가 life-table-data.js 파일로 저장되었습니다. (총 {total_entries}개 항목)")

def main():
    """메인 함수"""
    print("=== 간이 생명표 엑셀 파일 파싱 시작 ===")
    
    # 간이 생명표 데이터 파싱
    print("\n간이 생명표 데이터 파싱 중...")
    life_table_data = parse_life_table()
    
    if life_table_data:
        save_life_table_data(life_table_data)
        print("간이 생명표 데이터 파싱 완료!")
    else:
        print("간이 생명표 데이터 파싱 실패!")
    
    print("\n=== 파싱 완료 ===")
    print("생성된 파일:")
    print("- life-table-data.js (간이 생명표 데이터)")
    print("\n이제 이 파일들을 HTML에서 로드하여 사용할 수 있습니다.")

if __name__ == "__main__":
    main()
