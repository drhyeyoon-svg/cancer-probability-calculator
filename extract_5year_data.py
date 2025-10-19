#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import json

def extract_5year_data():
    """cancer-data.js에서 5개년 평균 데이터만 추출하여 별도 파일로 생성합니다."""
    
    print("=== 5개년 평균 데이터 추출 시작 ===")
    
    try:
        # cancer-data.js 파일 읽기
        with open('cancer-data.js', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # JavaScript 객체에서 데이터 추출
        # cancerData 객체 찾기
        match = re.search(r'const cancerData = (\{.*?\});', content, re.DOTALL)
        if not match:
            print("cancerData 객체를 찾을 수 없습니다.")
            return False
        
        js_data = match.group(1)
        
        # 5개년 평균 데이터만 추출하여 새로운 구조 생성
        # rate 필드를 average5Year로 대체
        
        # average5Year 값을 rate로 변경하는 패턴
        pattern = r'("name":\s*"[^"]+",\s*)"rate":\s*[\d.]+,\s*"average5Year":\s*([\d.]+)'
        
        def replace_with_average(match):
            name_part = match.group(1)
            avg_value = match.group(2)
            return f'{name_part}"rate": {avg_value}'
        
        # 5개년 평균 데이터로 변환
        five_year_data = re.sub(pattern, replace_with_average, js_data)
        
        # 새로운 JavaScript 파일 생성
        new_content = f"""// 암 발생률 5개년 평균 데이터 (2018-2022)
// cancer-data.js에서 추출된 5개년 평균 데이터

const cancerData5Year = {five_year_data};"""
        
        # 파일 저장
        with open('cancer-data-5year.js', 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print("cancer-data-5year.js 파일 생성 완료!")
        
        # 기존 cancer-data.js에서 average5Year 필드 제거
        print("기존 cancer-data.js에서 average5Year 필드 제거...")
        
        # average5Year 필드 제거 패턴
        clean_pattern = r',\s*"average5Year":\s*[\d.]+'
        cleaned_content = re.sub(clean_pattern, '', content)
        
        # 주석 업데이트
        cleaned_content = cleaned_content.replace(
            '// 2022년 기준 + 5개년 평균',
            '// 2022년 기준 데이터'
        )
        
        # 백업 생성
        with open('cancer-data-backup-original.js', 'w', encoding='utf-8') as f:
            f.write(content)
        print("기존 파일 백업: cancer-data-backup-original.js")
        
        # 정리된 파일 저장
        with open('cancer-data.js', 'w', encoding='utf-8') as f:
            f.write(cleaned_content)
        
        print("cancer-data.js 정리 완료!")
        
        return True
        
    except Exception as e:
        print(f"오류 발생: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    extract_5year_data()






