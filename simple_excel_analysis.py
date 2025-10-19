#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import os

# 파일 경로 설정
base_dir = r"C:\Users\drhye\OneDrive\바탕 화면\암확률계산기"
file_path = os.path.join(base_dir, "24개암종 5년 발생률 raw data.xlsx")

print("파일 경로:", file_path)
print("파일 존재 여부:", os.path.exists(file_path))

if os.path.exists(file_path):
    try:
        # Excel 파일 열기
        xl_file = pd.ExcelFile(file_path)
        print("시트 목록:", xl_file.sheet_names)
        
        # 첫 번째 시트 읽기
        df = pd.read_excel(file_path, sheet_name=0, header=None)
        print("데이터 형태:", df.shape)
        print("첫 5행:")
        print(df.head())
        
    except Exception as e:
        print("오류:", e)
else:
    print("파일을 찾을 수 없습니다.")






