const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname))); // 루트 디렉토리도 서빙

// 유틸리티 함수들
const getAgeGroup = (age) => {
  if (age >= 0 && age <= 19) return '0-19';
  if (age >= 20 && age <= 29) return '20-29';
  if (age >= 30 && age <= 39) return '30-39';
  if (age >= 40 && age <= 49) return '40-49';
  if (age >= 50 && age <= 59) return '50-59';
  if (age >= 60 && age <= 69) return '60-69';
  if (age >= 70 && age <= 79) return '70-79';
  return '80+';
};

const convertToPercentage = (rate) => {
  return (rate / 100000) * 100;
};

// API 라우트들
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 헬스 체크 API
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: '암 확률 계산기 서버가 정상 작동 중입니다.'
  });
});

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({ error: '요청한 리소스를 찾을 수 없습니다.' });
});

// 에러 핸들러
app.use((error, req, res, next) => {
  console.error('서버 오류:', error);
  res.status(500).json({ 
    error: '내부 서버 오류가 발생했습니다.',
    message: process.env.NODE_ENV === 'development' ? error.message : '서버 오류'
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 암 확률 계산기 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`🌐 접속 URL: http://localhost:${PORT}`);
  console.log(`📁 정적 파일 서빙: ${path.join(__dirname)}`);
});

module.exports = app;
