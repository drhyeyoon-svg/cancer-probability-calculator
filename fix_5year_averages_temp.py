#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import random

def fix_5year_averages_temp():
    """임시로 5개년 평균 값을 조정하여 순위 변화를 테스트할 수 있도록 합니다."""
    
    print("=== 임시 5개년 평균 수정 시작 ===")
    
    try:
        # cancer-data.js 파일 읽기
        with open('cancer-data.js', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 백업 생성
        with open('cancer-data-backup-temp.js', 'w', encoding='utf-8') as f:
            f.write(content)
        print("백업 파일 생성: cancer-data-backup-temp.js")
        
        # rate와 average5Year 패턴 찾기
        pattern = r'("rate":\s*)([\d.]+)(,\s*"average5Year":\s*)([\d.]+)'
        
        def adjust_average(match):
            rate_part = match.group(1)
            rate_value = float(match.group(2))
            avg_part = match.group(3)
            avg_value = float(match.group(4))
            
            # 모든 암이 아닌 경우에만 조정
            # 임시로 rate 값에 -10% ~ +15% 범위의 변화를 줌
            if rate_value > 0:
                # 랜덤 변화율 적용 (-10% ~ +15%)
                change_factor = random.uniform(0.9, 1.15)
                new_avg = round(rate_value * change_factor, 2)
                
                # 너무 작은 값은 최소 0.1로 설정
                if new_avg < 0.1:
                    new_avg = 0.1
                    
                return f'{rate_part}{rate_value}{avg_part}{new_avg}'
            else:
                return match.group(0)  # 원본 그대로 반환
        
        # 시드 설정으로 일관된 결과 보장
        random.seed(42)
        
        # 패턴 적용
        updated_content = re.sub(pattern, adjust_average, content)
        
        # 모든 암의 경우 별도 처리 (성별별로 다른 값 적용)
        # 남성 모든 암
        male_all_cancer_pattern = r'("male":\s*\{[^}]*?"0-4":\s*\[[^]]*?"name":\s*"모든 암\(C00-C96\)"[^}]*?"rate":\s*)([\d.]+)(,\s*"average5Year":\s*)([\d.]+)'
        
        def fix_male_all_cancer(match):
            rate_part = match.group(1)
            rate_value = float(match.group(2))
            avg_part = match.group(3)
            # 남성 모든 암은 rate * 1.1
            new_avg = round(rate_value * 1.1, 2)
            return f'{rate_part}{rate_value}{avg_part}{new_avg}'
        
        # 실제로는 더 복잡한 패턴 매칭이 필요하지만, 간단한 방법으로 처리
        # 모든 암의 average5Year를 rate와 다르게 설정
        all_cancer_pattern = r'("name":\s*"모든 암\(C00-C96\)"[^}]*?"rate":\s*)([\d.]+)(,\s*"average5Year":\s*)([\d.]+)'
        
        def fix_all_cancer(match):
            rate_part = match.group(1)
            rate_value = float(match.group(2))
            avg_part = match.group(3)
            # 모든 암은 rate * 0.95 (약간 낮게)
            new_avg = round(rate_value * 0.95, 2)
            return f'{rate_part}{rate_value}{avg_part}{new_avg}'
        
        updated_content = re.sub(all_cancer_pattern, fix_all_cancer, updated_content)
        
        # 수정된 내용 저장
        with open('cancer-data.js', 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print("cancer-data.js 임시 수정 완료!")
        print("주의: 이는 테스트용 임시 수정입니다.")
        print("실제 데이터는 원본 Excel 파일에서 계산해야 합니다.")
        
        return True
        
    except Exception as e:
        print(f"오류 발생: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    fix_5year_averages_temp()






