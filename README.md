# 국가 암 발생확률 계산기

국가통계자료를 기반으로 한 암 발생확률 및 사망확률 계산 웹 애플리케이션입니다.

## 주요 기능

### 🔍 암 발생확률 조회
- 나이와 성별을 입력하여 각종 암 발생확률 확인
- 24개 주요 암종의 연령대별, 성별 발생률 제공
- 상위 5개/10개/전체 보기 기능
- 발생률을 퍼센트로 표시 (10만명당 → %)
- 누적 발생률 표시

### 💀 사망확률 조회
- 나이에 맞는 전체 사망확률 표시 (간이 생명표 기반)
- 3대 사인(암, 폐렴, 심혈관질환) 합계 표시
- 상위 5개 사망원인 질환 표시
- 사망원인별 발생률을 백분율로 표시

### 📊 데이터 특징
- **정확성**: KOSIS 국가통계포털 공식 데이터
- **최신성**: 2022년 암 발생률, 2023년 사망원인 데이터
- **신뢰성**: 국가 통계청 및 보건복지부 공식 자료

## 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Data Processing**: Python, Pandas
- **Data Source**: KOSIS 국가통계포털 엑셀 파일

## 프로젝트 구조

```
암확률계산기/
├── index.html              # 메인 웹페이지
├── styles.css              # 스타일시트
├── script.js               # 메인 JavaScript 로직
├── cancer-data.js          # 암 발생률 데이터
├── death-data.js           # 사망원인별 발생률 데이터
├── life-table-data.js      # 간이 생명표 데이터 (사망확률)
├── parse_excel_data_final.py  # 암 데이터 파싱 스크립트
├── parse_life_table.py     # 간이 생명표 파싱 스크립트
├── DATA_UPDATE_GUIDE.md    # 데이터 업데이트 가이드
└── README.md              # 프로젝트 설명서
```

## 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/[사용자명]/암확률계산기.git
cd 암확률계산기
```

### 2. Python 의존성 설치
```bash
pip install pandas openpyxl
```

### 3. 웹서버 실행
```bash
python -m http.server 8000
```

### 4. 브라우저에서 접속
```
http://localhost:8000
```

## 데이터 업데이트

통계 자료는 4-5년 주기로 업데이트됩니다. 새로운 데이터로 업데이트하는 방법은 `DATA_UPDATE_GUIDE.md`를 참조하세요.

### 업데이트 절차
1. KOSIS에서 최신 엑셀 파일 다운로드
2. 파일명을 기존 파일명으로 변경
3. 파싱 스크립트 실행
4. 웹사이트 테스트

## 사용 방법

1. **나이와 성별 입력**
2. **"확률 조회하기" 클릭**
3. **결과 확인**:
   - 암 발생률 (상위 5개/10개/전체)
   - 사망확률 (해당 연령대 전체)
   - 3대 사인 합계
   - 상위 사망원인 질환

## 데이터 출처

- **암 발생률**: 24개 암종/성/연령(5세)별 암발생자수, 발생률 (보건복지부)
- **사망원인**: 사망원인생명표(5세별) (통계청)
- **사망확률**: 간이생명표(5세별) (통계청)

## 라이선스

이 프로젝트는 교육 및 연구 목적으로 제작되었습니다. 국가통계자료의 사용은 KOSIS 이용약관을 따릅니다.

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 문의

프로젝트에 대한 문의사항이 있으시면 Issues를 통해 연락해주세요.

---

**주의사항**: 본 데이터는 국가통계자료를 기반으로 한 참고용 자료입니다. 의료 진단이나 치료 목적으로는 사용하지 마세요.
