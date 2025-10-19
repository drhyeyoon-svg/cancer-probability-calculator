# 암 확률 계산기 - Node.js 버전

국가 통계자료를 기반으로 한 암 발생확률 및 사망원인별 발생확률 계산기입니다.

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. 서버 실행
```bash
# 개발 모드 (nodemon 사용)
npm run dev

# 또는 직접 실행
node server-simple.js
```

### 3. 웹 브라우저에서 접속
```
http://localhost:3000
```

## 📁 프로젝트 구조

```
암확률계산기/
├── public/                          # 프론트엔드 파일들
│   ├── index.html                   # 메인 HTML 파일
│   ├── styles.css                   # 스타일시트
│   └── script.js                    # 클라이언트 JavaScript
├── cancer-data.js                   # 암 발생률 데이터
├── death-data.js                    # 사망원인 데이터
├── life-table-data.js               # 간이생명표 데이터
├── complete-life-table-data.js      # 완전생명표 데이터
├── server-simple.js                 # Express.js 서버
├── package.json                     # Node.js 프로젝트 설정
└── README-NODEJS.md                 # 이 파일
```

## 🔧 주요 기능

### 1. 암 발생률 조회
- **2022년 발생률**: 최신 암 발생률 데이터
- **5개년 평균 (2018-2022)**: 5년간 평균 암 발생률
- **상위 5개/10개/전체**: 결과 개수 선택 가능
- **누적 발생률**: 선택된 항목들의 누적 퍼센트

### 2. 생명표 정보
- **2023년 생명표**: 최신 생명표 데이터
- **5개년 평균 (2019-2023)**: 5년간 평균 생명표
- **기대여명**: 현재 나이에서의 기대여명
- **예상수명**: 기대여명 + 현재나이
- **연간 사망확률**: 연간 사망할 확률
- **동갑중 생존자 비율**: 동갑 중 생존자 비율

### 3. 사망원인별 분석
- **3대 사인**: 암, 폐렴, 심혈관질환의 합계
- **상위 5개/10개/23개**: 주요 사망원인 순위
- **개별 사망원인**: 구체적인 사망원인별 확률

## 🛠️ 기술 스택

### 백엔드
- **Node.js**: JavaScript 런타임
- **Express.js**: 웹 프레임워크
- **Helmet**: 보안 미들웨어
- **CORS**: Cross-Origin Resource Sharing
- **Compression**: 응답 압축

### 프론트엔드
- **Vanilla JavaScript**: 순수 JavaScript
- **CSS3**: 스타일링
- **HTML5**: 마크업

### 데이터
- **JavaScript 데이터 파일**: 정적 데이터 저장
- **국가통계자료**: KOSIS 국가통계포털 기반

## 📊 API 엔드포인트

### 헬스 체크
```
GET /api/health
```
서버 상태 확인

### 정적 파일 서빙
```
GET /                    # 메인 페이지
GET /styles.css          # 스타일시트
GET /script.js           # 클라이언트 JavaScript
GET /cancer-data.js      # 암 데이터
GET /death-data.js       # 사망원인 데이터
GET /life-table-data.js  # 생명표 데이터
```

## 🔄 개발 워크플로우

### 1. 데이터 업데이트
1. 새로운 Excel 파일을 `excel_backup_*` 폴더에 추가
2. Python 파싱 스크립트 실행
3. JavaScript 데이터 파일 업데이트
4. 서버 재시작

### 2. 코드 수정
1. `public/` 폴더의 파일 수정
2. `npm run dev`로 개발 서버 실행
3. 브라우저에서 자동 새로고침 확인

### 3. 배포
1. `npm start`로 프로덕션 서버 실행
2. 환경변수 설정 (PORT, NODE_ENV 등)

## 🌐 환경 설정

### 환경변수
```bash
PORT=3000                    # 서버 포트 (기본값: 3000)
NODE_ENV=development         # 환경 모드
```

### 프로덕션 배포
```bash
# PM2 사용 예시
npm install -g pm2
pm2 start server-simple.js --name "cancer-calculator"
pm2 save
pm2 startup
```

## 📝 스크립트 명령어

```bash
npm start          # 프로덕션 서버 실행
npm run dev        # 개발 서버 실행 (nodemon)
npm test           # 테스트 실행 (현재 미구현)
```

## 🔒 보안 기능

- **Helmet**: 보안 헤더 설정
- **CORS**: Cross-Origin 요청 제어
- **Content Security Policy**: XSS 공격 방지
- **Compression**: 응답 압축으로 성능 향상

## 📈 성능 최적화

- **정적 파일 캐싱**: Express.js 내장 캐싱
- **응답 압축**: gzip 압축
- **보안 헤더**: 보안성 향상
- **에러 핸들링**: 안정적인 에러 처리

## 🐛 문제 해결

### 서버가 시작되지 않는 경우
1. 포트 3000이 사용 중인지 확인
2. Node.js 버전 확인 (16.0.0 이상 필요)
3. 의존성 설치 확인: `npm install`

### 데이터가 로드되지 않는 경우
1. JavaScript 데이터 파일 존재 확인
2. 파일 권한 확인
3. 서버 로그 확인

### 브라우저에서 접속이 안 되는 경우
1. 방화벽 설정 확인
2. 서버 실행 상태 확인
3. 포트 번호 확인

## 📞 지원

문제가 발생하거나 개선 사항이 있으면 이슈를 등록해주세요.

---

**© 2025 암 확률 계산기. 국가통계자료 기반 참고용 자료입니다.**










