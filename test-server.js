const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 서빙
app.use(express.static(path.join(__dirname)));

// 기본 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 헬스 체크
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: '테스트 서버가 정상 작동 중입니다.'
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 테스트 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`🌐 접속 URL: http://localhost:${PORT}`);
});

module.exports = app;










