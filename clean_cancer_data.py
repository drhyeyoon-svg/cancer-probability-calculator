#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

def clean_cancer_data():
    """cancer-data.js에서 모든 average5Year 필드를 제거합니다."""
    
    print("=== cancer-data.js 정리 시작 ===")
    
    try:
        # 파일 읽기
        with open('cancer-data.js', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 백업 생성
        with open('cancer-data-backup-before-cleanup.js', 'w', encoding='utf-8') as f:
            f.write(content)
        print("백업 파일 생성: cancer-data-backup-before-cleanup.js")
        
        # average5Year 필드 제거 패턴
        # 패턴 1: ,\s*"average5Year":\s*[\d.]+
        pattern1 = r',\s*"average5Year":\s*[\d.]+'
        
        # 패턴 적용
        cleaned_content = re.sub(pattern1, '', content)
        
        # 정리된 파일 저장
        with open('cancer-data.js', 'w', encoding='utf-8') as f:
            f.write(cleaned_content)
        
        print("cancer-data.js 정리 완료!")
        
        # 제거된 항목 수 계산
        removed_count = len(re.findall(pattern1, content))
        print(f"제거된 average5Year 필드 수: {removed_count}")
        
        return True
        
    except Exception as e:
        print(f"오류 발생: {e}")
        return False

if __name__ == "__main__":
    clean_cancer_data()






