#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
엑셀 파일을 파싱하여 JavaScript 데이터 파일로 변환하는 스크립트
국가통계자료를 기반으로 한 암 발생률 및 사망원인별 발생률 데이터 생성
"""

import pandas as pd
import json
import os

def parse_cancer_data():
    """암종 발생률 엑셀 파일을 파싱"""
    try:
        # 엑셀 파일 읽기
        file_path = '24개_암종_성_연령_5세_별_암발생자수__발생률_20250921204341.xlsx'
        
        if not os.path.exists(file_path):
            print(f"파일을 찾을 수 없습니다: {file_path}")
            return None
            
        # 엑셀 파일의 모든 시트 확인
        excel_file = pd.ExcelFile(file_path)
        print(f"시트 목록: {excel_file.sheet_names}")
        
        # 첫 번째 시트 읽기
        df = pd.read_excel(file_path, sheet_name=0)
        print(f"데이터 크기: {df.shape}")
        print(f"컬럼 목록: {list(df.columns)}")
        print("\n첫 5행 데이터:")
        print(df.head())
        
        # 데이터 구조 생성
        cancer_data = {
            'male': {},
            'female': {}
        }
        
        # 나이대별 그룹핑
        age_groups = {
            '0-19': (0, 19),
            '20-29': (20, 29),
            '30-39': (30, 39),
            '40-49': (40, 49),
            '50-59': (50, 59),
            '60-69': (60, 69),
            '70+': (70, 120)
        }
        
        # 성별 매핑
        gender_mapping = {
            '남': 'male',
            '여': 'female',
            '남성': 'male',
            '여성': 'female',
            'Male': 'male',
            'Female': 'female'
        }
        
        # 데이터 처리
        for _, row in df.iterrows():
            try:
                # 필요한 컬럼 찾기
                age_col = None
                gender_col = None
                rate_col = None
                cancer_col = None
                
                for col in df.columns:
                    col_str = str(col).lower()
                    if '연령' in col_str or '나이' in col_str or 'age' in col_str:
                        age_col = col
                    elif '성' in col_str and '별' in col_str:
                        gender_col = col
                    elif '발생률' in col_str or 'rate' in col_str:
                        rate_col = col
                    elif '암종' in col_str or '암' in col_str:
                        cancer_col = col
                
                if not all([age_col, gender_col, rate_col, cancer_col]):
                    continue
                
                age = row[age_col]
                gender = row[gender_col]
                rate = row[rate_col]
                cancer_name = row[cancer_col]
                
                # 데이터 유효성 검사
                if pd.isna(age) or pd.isna(gender) or pd.isna(rate) or pd.isna(cancer_name):
                    continue
                
                # 나이대 계산
                age_num = int(age) if isinstance(age, (int, float)) else int(str(age).split('-')[0])
                age_group = None
                for group, (min_age, max_age) in age_groups.items():
                    if min_age <= age_num <= max_age:
                        age_group = group
                        break
                
                if not age_group:
                    continue
                
                # 성별 매핑
                gender_str = str(gender).strip()
                gender_key = gender_mapping.get(gender_str)
                if not gender_key:
                    continue
                
                # 데이터 저장
                if age_group not in cancer_data[gender_key]:
                    cancer_data[gender_key][age_group] = []
                
                cancer_data[gender_key][age_group].append({
                    'name': str(cancer_name).strip(),
                    'rate': float(rate)
                })
                
            except Exception as e:
                print(f"행 처리 오류: {e}")
                continue
        
        # 각 나이대별로 발생률 기준 내림차순 정렬
        for gender in cancer_data:
            for age_group in cancer_data[gender]:
                cancer_data[gender][age_group].sort(key=lambda x: x['rate'], reverse=True)
        
        return cancer_data
        
    except Exception as e:
        print(f"암종 데이터 파싱 오류: {e}")
        return None

def parse_death_data():
    """사망원인 엑셀 파일을 파싱"""
    try:
        # 엑셀 파일 읽기
        file_path = '사망원인생명표_5세별__20250921235108.xlsx'
        
        if not os.path.exists(file_path):
            print(f"파일을 찾을 수 없습니다: {file_path}")
            return None
            
        # 엑셀 파일의 모든 시트 확인
        excel_file = pd.ExcelFile(file_path)
        print(f"시트 목록: {excel_file.sheet_names}")
        
        # 첫 번째 시트 읽기
        df = pd.read_excel(file_path, sheet_name=0)
        print(f"데이터 크기: {df.shape}")
        print(f"컬럼 목록: {list(df.columns)}")
        print("\n첫 5행 데이터:")
        print(df.head())
        
        # 데이터 구조 생성
        death_data = {
            'male': {},
            'female': {}
        }
        
        # 나이대별 그룹핑
        age_groups = {
            '0-19': (0, 19),
            '20-29': (20, 29),
            '30-39': (30, 39),
            '40-49': (40, 49),
            '50-59': (50, 59),
            '60-69': (60, 69),
            '70+': (70, 120)
        }
        
        # 성별 매핑
        gender_mapping = {
            '남': 'male',
            '여': 'female',
            '남성': 'male',
            '여성': 'female',
            'Male': 'male',
            'Female': 'female'
        }
        
        # 데이터 처리
        for _, row in df.iterrows():
            try:
                # 필요한 컬럼 찾기
                age_col = None
                gender_col = None
                rate_col = None
                cause_col = None
                
                for col in df.columns:
                    col_str = str(col).lower()
                    if '연령' in col_str or '나이' in col_str or 'age' in col_str:
                        age_col = col
                    elif '성' in col_str and '별' in col_str:
                        gender_col = col
                    elif '사망률' in col_str or '발생률' in col_str or 'rate' in col_str:
                        rate_col = col
                    elif '사망원인' in col_str or '원인' in col_str:
                        cause_col = col
                
                if not all([age_col, gender_col, rate_col, cause_col]):
                    continue
                
                age = row[age_col]
                gender = row[gender_col]
                rate = row[rate_col]
                cause_name = row[cause_col]
                
                # 데이터 유효성 검사
                if pd.isna(age) or pd.isna(gender) or pd.isna(rate) or pd.isna(cause_name):
                    continue
                
                # 나이대 계산
                age_num = int(age) if isinstance(age, (int, float)) else int(str(age).split('-')[0])
                age_group = None
                for group, (min_age, max_age) in age_groups.items():
                    if min_age <= age_num <= max_age:
                        age_group = group
                        break
                
                if not age_group:
                    continue
                
                # 성별 매핑
                gender_str = str(gender).strip()
                gender_key = gender_mapping.get(gender_str)
                if not gender_key:
                    continue
                
                # 데이터 저장
                if age_group not in death_data[gender_key]:
                    death_data[gender_key][age_group] = []
                
                death_data[gender_key][age_group].append({
                    'name': str(cause_name).strip(),
                    'rate': float(rate)
                })
                
            except Exception as e:
                print(f"행 처리 오류: {e}")
                continue
        
        # 각 나이대별로 발생률 기준 내림차순 정렬
        for gender in death_data:
            for age_group in death_data[gender]:
                death_data[gender][age_group].sort(key=lambda x: x['rate'], reverse=True)
        
        return death_data
        
    except Exception as e:
        print(f"사망원인 데이터 파싱 오류: {e}")
        return None

def save_cancer_data(cancer_data):
    """암종 데이터를 JavaScript 파일로 저장"""
    if not cancer_data:
        print("암종 데이터가 없습니다.")
        return
    
    js_content = """// 암 발생률 데이터
// 국가통계자료 기반 (24개_암종_성_연령_5세_별_암발생자수__발생률)
// 마지막 업데이트: 2025년

const cancerData = """ + json.dumps(cancer_data, ensure_ascii=False, indent=2) + """;

// 데이터 검증 함수
function validateCancerData() {
    const requiredAgeGroups = ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    const requiredGenders = ['male', 'female'];
    
    for (const gender of requiredGenders) {
        if (!cancerData[gender]) {
            console.error(`성별 데이터 누락: ${gender}`);
            return false;
        }
        
        for (const ageGroup of requiredAgeGroups) {
            if (!cancerData[gender][ageGroup] || cancerData[gender][ageGroup].length === 0) {
                console.warn(`${gender} ${ageGroup} 데이터가 없습니다.`);
            }
        }
    }
    
    console.log('암종 데이터 검증 완료');
    return true;
}

// 데이터 통계 정보
function getCancerDataStats() {
    let totalEntries = 0;
    let totalAgeGroups = 0;
    
    for (const gender of ['male', 'female']) {
        for (const ageGroup in cancerData[gender]) {
            totalAgeGroups++;
            totalEntries += cancerData[gender][ageGroup].length;
        }
    }
    
    return {
        totalEntries: totalEntries,
        totalAgeGroups: totalAgeGroups,
        genders: ['male', 'female']
    };
}

// 페이지 로드 시 데이터 검증 실행
document.addEventListener('DOMContentLoaded', function() {
    validateCancerData();
    const stats = getCancerDataStats();
    console.log('암종 데이터 통계:', stats);
});
"""
    
    with open('cancer-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("암종 데이터가 cancer-data.js 파일로 저장되었습니다.")

def save_death_data(death_data):
    """사망원인 데이터를 JavaScript 파일로 저장"""
    if not death_data:
        print("사망원인 데이터가 없습니다.")
        return
    
    js_content = """// 사망원인별 발생률 데이터
// 국가통계자료 기반 (사망원인생명표_5세별)
// 마지막 업데이트: 2025년

const deathData = """ + json.dumps(death_data, ensure_ascii=False, indent=2) + """;

// 데이터 검증 함수
function validateDeathData() {
    const requiredAgeGroups = ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    const requiredGenders = ['male', 'female'];
    
    for (const gender of requiredGenders) {
        if (!deathData[gender]) {
            console.error(`성별 데이터 누락: ${gender}`);
            return false;
        }
        
        for (const ageGroup of requiredAgeGroups) {
            if (!deathData[gender][ageGroup] || deathData[gender][ageGroup].length === 0) {
                console.warn(`${gender} ${ageGroup} 데이터가 없습니다.`);
            }
        }
    }
    
    console.log('사망원인 데이터 검증 완료');
    return true;
}

// 데이터 통계 정보
function getDeathDataStats() {
    let totalEntries = 0;
    let totalAgeGroups = 0;
    
    for (const gender of ['male', 'female']) {
        for (const ageGroup in deathData[gender]) {
            totalAgeGroups++;
            totalEntries += deathData[gender][ageGroup].length;
        }
    }
    
    return {
        totalEntries: totalEntries,
        totalAgeGroups: totalAgeGroups,
        genders: ['male', 'female']
    };
}

// 페이지 로드 시 데이터 검증 실행
document.addEventListener('DOMContentLoaded', function() {
    validateDeathData();
    const stats = getDeathDataStats();
    console.log('사망원인 데이터 통계:', stats);
});
"""
    
    with open('death-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("사망원인 데이터가 death-data.js 파일로 저장되었습니다.")

def main():
    """메인 함수"""
    print("=== 국가통계자료 엑셀 파일 파싱 시작 ===")
    
    # 암종 데이터 파싱
    print("\n1. 암종 발생률 데이터 파싱 중...")
    cancer_data = parse_cancer_data()
    
    if cancer_data:
        save_cancer_data(cancer_data)
        print("암종 데이터 파싱 완료!")
    else:
        print("암종 데이터 파싱 실패!")
    
    # 사망원인 데이터 파싱
    print("\n2. 사망원인별 발생률 데이터 파싱 중...")
    death_data = parse_death_data()
    
    if death_data:
        save_death_data(death_data)
        print("사망원인 데이터 파싱 완료!")
    else:
        print("사망원인 데이터 파싱 실패!")
    
    print("\n=== 파싱 완료 ===")
    print("생성된 파일:")
    print("- cancer-data.js (암종 발생률 데이터)")
    print("- death-data.js (사망원인별 발생률 데이터)")
    print("\n이제 이 파일들을 HTML에서 로드하여 사용할 수 있습니다.")

if __name__ == "__main__":
    main()
