#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
2022년과 5개년 평균의 순위 차이를 확인하는 스크립트
"""

import pandas as pd

def check_ranking_differences():
    """2022년과 5개년 평균의 순위 차이 확인"""
    print("=== 2022년 vs 5개년 평균 순위 차이 확인 ===")
    
    try:
        # 5개년 평균 데이터 로드
        df = pd.read_excel('24개_암종_성_연령_5세_별_5개년평균_암발생률.xlsx')
        print(f"데이터 로드: {df.shape}")
        
        # 성별 매핑
        gender_mapping = {'남자': 'male', '여자': 'female'}
        
        # 연령대 매핑
        age_mapping = {
            '0-4세': '0-19', '5-9세': '0-19', '10-14세': '0-19', '15-19세': '0-19',
            '20-24세': '20-29', '25-29세': '20-29',
            '30-34세': '30-39', '35-39세': '30-39',
            '40-44세': '40-49', '45-49세': '40-49',
            '50-54세': '50-59', '55-59세': '50-59',
            '60-64세': '60-69', '65-69세': '60-69',
            '70-74세': '70+', '75-79세': '70+', '80-84세': '70+', '85세이상': '70+'
        }
        
        # 테스트할 연령대와 성별
        test_cases = [
            ('남자', '30-34세'),
            ('여자', '40-44세'),
            ('남자', '50-54세')
        ]
        
        for gender_kr, age_5year in test_cases:
            print(f"\n--- {gender_kr} {age_5year} ---")
            
            # 해당 연령대 데이터 필터링
            age_data = df[
                (df['성별'] == gender_kr) & 
                (df['연령별'] == age_5year)
            ].copy()
            
            if age_data.empty:
                print("데이터 없음")
                continue
            
            # 데이터 타입 변환
            age_data['2022년'] = pd.to_numeric(age_data['2022년'], errors='coerce')
            age_data['5개년 평균'] = pd.to_numeric(age_data['5개년 평균'], errors='coerce')
            
            # NaN 값 제거
            age_data = age_data.dropna(subset=['2022년', '5개년 평균'])
            
            if age_data.empty:
                print("유효한 데이터 없음")
                continue
            
            # 2022년 기준 정렬
            data_2022 = age_data.sort_values('2022년', ascending=False).reset_index(drop=True)
            data_2022['rank_2022'] = range(1, len(data_2022) + 1)
            
            # 5개년 평균 기준 정렬
            data_5year = age_data.sort_values('5개년 평균', ascending=False).reset_index(drop=True)
            data_5year['rank_5year'] = range(1, len(data_5year) + 1)
            
            # 순위 비교
            comparison = pd.merge(
                data_2022[['24개 암종별', '2022년', 'rank_2022']], 
                data_5year[['24개 암종별', '5개년 평균', 'rank_5year']], 
                on='24개 암종별'
            )
            
            # 순위 차이 계산
            comparison['rank_diff'] = abs(comparison['rank_2022'] - comparison['rank_5year'])
            
            print(f"총 {len(comparison)}개 암종")
            print(f"순위 차이 평균: {comparison['rank_diff'].mean():.2f}")
            print(f"순위 차이 최대: {comparison['rank_diff'].max()}")
            
            # 순위 차이가 큰 항목들 표시
            large_diff = comparison[comparison['rank_diff'] >= 3].sort_values('rank_diff', ascending=False)
            if not large_diff.empty:
                print("\n순위 차이가 큰 항목들:")
                for _, row in large_diff.head(5).iterrows():
                    print(f"  {row['24개 암종별']}: 2022년 {row['rank_2022']}위, 5개년평균 {row['rank_5year']}위 (차이: {row['rank_diff']})")
            
            # 상위 5개 비교
            print("\n상위 5개 비교:")
            top5_2022 = comparison.head(5)
            for _, row in top5_2022.iterrows():
                print(f"  {row['24개 암종별']}: 2022년 {row['rank_2022']}위, 5개년평균 {row['rank_5year']}위")
        
    except Exception as e:
        print(f"오류: {e}")

if __name__ == "__main__":
    check_ranking_differences()





