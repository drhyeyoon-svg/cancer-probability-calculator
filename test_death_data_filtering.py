import json

def test_death_data_filtering():
    """사망원인 데이터 필터링 테스트"""
    
    try:
        # death-data.js 파일 읽기
        with open('death-data.js', 'r', encoding='utf-8') as f:
            content = f.read()
        
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
        
        # 필터링 함수 시뮬레이션
        def filterDeathDataForDisplay(data):
            return [item for item in data if item['name'] != '3대 사인']
        
        # 테스트: 남성 0-19세 데이터
        print("=== 남성 0-19세 사망원인 데이터 테스트 ===")
        male_0_19 = death_data['male']['0-19']
        print(f"원본 데이터 개수: {len(male_0_19)}")
        
        print("\n원본 데이터 (처음 10개):")
        for i, item in enumerate(male_0_19[:10]):
            print(f"{i+1}. {item['name']}: {item['rate']}%")
        
        # 필터링 적용
        filtered_data = filterDeathDataForDisplay(male_0_19)
        print(f"\n필터링 후 데이터 개수: {len(filtered_data)}")
        
        print("\n필터링 후 데이터 (처음 10개):")
        for i, item in enumerate(filtered_data[:10]):
            print(f"{i+1}. {item['name']}: {item['rate']}%")
        
        # 상위 5개 테스트
        top5 = filtered_data[:5]
        print(f"\n상위 5개 항목:")
        for i, item in enumerate(top5):
            print(f"{i+1}. {item['name']}: {item['rate']}%")
        
        # 상위 10개 테스트
        top10 = filtered_data[:10]
        print(f"\n상위 10개 항목:")
        for i, item in enumerate(top10):
            print(f"{i+1}. {item['name']}: {item['rate']}%")
        
    except Exception as e:
        print(f"테스트 오류: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_death_data_filtering()









