const fs = require('fs');
const path = require('path');

// JavaScript 파일을 JSON으로 변환하는 함수
function convertJSToJSON(jsFilePath, jsonFilePath) {
  try {
    const content = fs.readFileSync(jsFilePath, 'utf8');
    
    // 주석 제거
    let cleanContent = content
      .replace(/\/\/.*$/gm, '') // 한 줄 주석 제거
      .replace(/\/\*[\s\S]*?\*\//g, '') // 블록 주석 제거
      .replace(/^\s*const\s+\w+\s*=\s*/, '') // const 변수 선언 제거
      .replace(/;?\s*$/, '') // 끝의 세미콜론 제거
      .trim();
    
    // JSON 파싱 시도
    const data = JSON.parse(cleanContent);
    
    // JSON 파일로 저장
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
    
    console.log(`✅ ${jsFilePath} → ${jsonFilePath} 변환 완료`);
    return true;
  } catch (error) {
    console.error(`❌ ${jsFilePath} 변환 실패:`, error.message);
    return false;
  }
}

// 변환할 파일들
const files = [
  { js: 'cancer-data.js', json: 'data/cancer-data.json' },
  { js: 'death-data.js', json: 'data/death-data.json' },
  { js: 'life-table-data.js', json: 'data/life-table-data.json' },
  { js: 'complete-life-table-data.js', json: 'data/complete-life-table-data.json' }
];

// data 디렉토리 생성
if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}

// 모든 파일 변환
let successCount = 0;
files.forEach(file => {
  if (convertJSToJSON(file.js, file.json)) {
    successCount++;
  }
});

console.log(`\n📊 변환 결과: ${successCount}/${files.length} 파일 성공`);










