#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JavaScript 파일의 문법을 검증하는 스크립트
"""

def validate_js_syntax():
    """JavaScript 파일 문법 검증"""
    try:
        with open('cancer-data-5year.js', 'r', encoding='utf-8') as f:
            content = f.read()
        
        print("=== JavaScript 파일 문법 검증 ===")
        
        # 기본적인 문법 검사
        issues = []
        
        # 1. 괄호 균형 확인
        open_braces = content.count('{')
        close_braces = content.count('}')
        if open_braces != close_braces:
            issues.append(f"중괄호 불균형: 열림 {open_braces}, 닫힘 {close_braces}")
        
        open_brackets = content.count('[')
        close_brackets = content.count(']')
        if open_brackets != close_brackets:
            issues.append(f"대괄호 불균형: 열림 {open_brackets}, 닫힘 {close_brackets}")
        
        open_parens = content.count('(')
        close_parens = content.count(')')
        if open_parens != close_parens:
            issues.append(f"소괄호 불균형: 열림 {open_parens}, 닫힘 {close_parens}")
        
        # 2. 따옴표 균형 확인
        single_quotes = content.count("'")
        if single_quotes % 2 != 0:
            issues.append(f"홀수 개의 작은따옴표: {single_quotes}개")
        
        # 3. 콤마 문제 확인
        lines = content.split('\n')
        for i, line in enumerate(lines):
            stripped = line.strip()
            # 객체나 배열의 마지막 요소에 콤마가 있는지 확인
            if stripped.endswith(',') and (stripped.endswith('},') or stripped.endswith('],')):
                # 이는 정상적인 경우일 수 있음
                pass
            elif stripped.endswith(',') and not stripped.endswith('},') and not stripped.endswith('],'):
                # 의심스러운 콤마
                if i < len(lines) - 1:  # 마지막 줄이 아닌 경우
                    next_line = lines[i + 1].strip()
                    if next_line.startswith('}') or next_line.startswith(']'):
                        issues.append(f"라인 {i+1}: 불필요한 콤마 가능성")
        
        # 4. 결과 출력
        if issues:
            print("❌ 발견된 문제:")
            for issue in issues:
                print(f"  - {issue}")
        else:
            print("✅ 기본적인 문법 검사 통과")
        
        # 5. 파일 구조 확인
        print(f"\n파일 구조:")
        print(f"- 총 라인 수: {len(lines)}")
        print(f"- 총 문자 수: {len(content)}")
        print(f"- 중괄호 쌍: {open_braces}")
        print(f"- 대괄호 쌍: {open_brackets}")
        print(f"- 소괄호 쌍: {open_parens}")
        
        # 6. 마지막 몇 줄 확인
        print(f"\n마지막 5줄:")
        for i, line in enumerate(lines[-5:], len(lines)-4):
            print(f"{i}: {line}")
            
    except Exception as e:
        print(f"검증 오류: {e}")

if __name__ == "__main__":
    validate_js_syntax()





