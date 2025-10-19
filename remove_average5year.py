#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# cancer-data.js 파일 읽기
with open('cancer-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 백업 생성
with open('cancer-data-backup-original-with-average.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("백업 파일 생성: cancer-data-backup-original-with-average.js")

# average5Year 필드 제거 패턴
# 패턴: ,\s*"average5Year":\s*[\d.]+
pattern = r',\s*"average5Year":\s*[\d.]+'

# 제거 전 개수 확인
matches = re.findall(pattern, content)
print(f"제거할 average5Year 필드 수: {len(matches)}")

# 패턴 적용
cleaned_content = re.sub(pattern, '', content)

# 정리된 파일 저장
with open('cancer-data.js', 'w', encoding='utf-8') as f:
    f.write(cleaned_content)

print("cancer-data.js에서 모든 average5Year 필드 제거 완료!")

# 제거 후 확인
with open('cancer-data.js', 'r', encoding='utf-8') as f:
    final_content = f.read()

remaining_matches = re.findall(r'"average5Year"', final_content)
print(f"남은 average5Year 필드 수: {len(remaining_matches)}")

if len(remaining_matches) == 0:
    print("✅ 모든 average5Year 필드가 성공적으로 제거되었습니다!")
else:
    print("⚠️ 일부 average5Year 필드가 남아있습니다.")






