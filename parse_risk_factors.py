import pandas as pd
import json

try:
    # 엑셀 파일 읽기
    df = pd.read_excel('암종별_주요위험인자_OR정리_DOWNLOAD.xlsx')
    
    # 위험인자 데이터 구조 생성
    risk_factors = {}
    
    # 각 위험인자별로 데이터 정리
    for _, row in df.iterrows():
        risk_factor = row['위험인자']
        cancer = row['암종']
        effect = row['효과크기']
        
        if pd.notna(risk_factor) and pd.notna(cancer) and pd.notna(effect):
            if risk_factor not in risk_factors:
                risk_factors[risk_factor] = []
            
            risk_factors[risk_factor].append({
                'cancer': cancer,
                'effect': float(effect)
            })
    
    # JavaScript 파일로 출력
    js_content = "// 위험인자 데이터 (엑셀 파일에서 자동 생성)\n"
    js_content += "// 출처: 암종별_주요위험인자_OR정리_DOWNLOAD.xlsx\n\n"
    js_content += "const riskFactorData = {\n"
    
    for i, (risk_factor, cancers) in enumerate(risk_factors.items()):
        js_content += f'    "{risk_factor}": [\n'
        for j, cancer_data in enumerate(cancers):
            comma = "," if j < len(cancers) - 1 else ""
            js_content += f'        {{ cancer: "{cancer_data["cancer"]}", effect: {cancer_data["effect"]} }}{comma}\n'
        comma = "," if i < len(risk_factors) - 1 else ""
        js_content += f'    ]{comma}\n'
    
    js_content += "};\n\n"
    
    # 위험인자 카테고리 정의 (가족력은 별도 처리)
    family_history_factors = ['가족력/유전']
    general_factors = [factor for factor in risk_factors.keys() if factor not in family_history_factors]
    
    js_content += "// 위험인자 카테고리\n"
    js_content += "const riskFactorCategories = {\n"
    js_content += f'    general: {json.dumps(general_factors, ensure_ascii=False)},\n'
    js_content += f'    familyHistory: {json.dumps(family_history_factors, ensure_ascii=False)}\n'
    js_content += "};\n"
    
    # JavaScript 파일 저장
    with open('risk-factors-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("✅ risk-factors-data.js 파일이 생성되었습니다.")
    print(f"📊 총 {len(risk_factors)}개의 위험인자 처리됨")
    print(f"📋 일반 위험인자: {len(general_factors)}개")
    print(f"👨‍👩‍👧‍👦 가족력: {len(family_history_factors)}개")
    
except Exception as e:
    print(f"오류 발생: {e}")
    print("파일이 열려있을 수 있습니다. 파일을 닫고 다시 시도해주세요.")












