const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 데이터 파일 로드
let cancerData, deathData, lifeTableData, completeLifeTableData;

try {
  // JavaScript 데이터 파일들을 eval로 로드
  const loadJSData = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // document 객체를 모킹 (일부 파일에서 사용)
    global.document = {
      addEventListener: () => {},
      getElementById: () => {},
      querySelector: () => {},
      querySelectorAll: () => []
    };
    
    // JavaScript 코드를 실행하여 변수 추출
    eval(content);
    
    // 파일명에 따라 적절한 변수 반환
    if (filePath.includes('cancer-data')) {
      return typeof cancerData !== 'undefined' ? cancerData : null;
    } else if (filePath.includes('death-data')) {
      return typeof deathData !== 'undefined' ? deathData : null;
    } else if (filePath.includes('life-table-data')) {
      return typeof lifeTableData !== 'undefined' ? lifeTableData : null;
    } else if (filePath.includes('complete-life-table-data')) {
      return typeof completeLifeTableData !== 'undefined' ? completeLifeTableData : null;
    }
    
    return null;
  };

  cancerData = loadJSData('./cancer-data.js');
  deathData = loadJSData('./death-data.js');
  lifeTableData = loadJSData('./life-table-data.js');
  completeLifeTableData = loadJSData('./complete-life-table-data.js');

  console.log('✅ 모든 데이터 파일이 성공적으로 로드되었습니다.');
  console.log('📊 데이터 상태:');
  console.log(`   - 암 데이터: ${cancerData ? '로드됨' : '로드 실패'}`);
  console.log(`   - 사망원인 데이터: ${deathData ? '로드됨' : '로드 실패'}`);
  console.log(`   - 간이생명표 데이터: ${lifeTableData ? '로드됨' : '로드 실패'}`);
  console.log(`   - 완전생명표 데이터: ${completeLifeTableData ? '로드됨' : '로드 실패'}`);
} catch (error) {
  console.error('❌ 데이터 파일 로드 중 오류 발생:', error.message);
  console.error('오류 상세:', error);
  process.exit(1);
}

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

const calculateThreeMajorCauses = (data) => {
  let cancer = 0, pneumonia = 0, cardiovascular = 0;
  
  data.forEach(item => {
    const name = item.name;
    if (name.includes('악성 신생물') || name.includes('악성신생물')) {
      cancer += item.rate;
    } else if (name.includes('폐렴')) {
      pneumonia += item.rate;
    } else if (name.includes('심장') || name.includes('뇌혈관') || name.includes('고혈압')) {
      cardiovascular += item.rate;
    }
  });
  
  return {
    cancer: convertToPercentage(cancer),
    pneumonia: convertToPercentage(pneumonia),
    cardiovascular: convertToPercentage(cardiovascular),
    total: convertToPercentage(cancer + pneumonia + cardiovascular)
  };
};

// API 라우트들
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 암 발생률 데이터 조회 API
app.get('/api/cancer-data/:age/:gender', (req, res) => {
  try {
    const { age, gender } = req.params;
    const ageNum = parseInt(age);
    const ageGroup = getAgeGroup(ageNum);
    
    if (!cancerData[gender] || !cancerData[gender][ageGroup]) {
      return res.json({ data: [], message: '해당 연령대와 성별에 대한 데이터가 없습니다.' });
    }
    
    const data = cancerData[gender][ageGroup].map(item => ({
      name: item.name,
      rate: item.rate,
      average5Year: item.average5Year || 0,
      percentage: convertToPercentage(item.rate),
      average5YearPercentage: convertToPercentage(item.average5Year || 0)
    }));
    
    res.json({ data, ageGroup, gender });
  } catch (error) {
    res.status(500).json({ error: '서버 오류가 발생했습니다.', details: error.message });
  }
});

// 사망원인 데이터 조회 API
app.get('/api/death-data/:age/:gender', (req, res) => {
  try {
    const { age, gender } = req.params;
    const ageNum = parseInt(age);
    const ageGroup = getAgeGroup(ageNum);
    
    if (!deathData[gender] || !deathData[gender][ageGroup]) {
      return res.json({ data: [], threeMajor: null, message: '해당 연령대와 성별에 대한 데이터가 없습니다.' });
    }
    
    const rawData = deathData[gender][ageGroup];
    const threeMajor = calculateThreeMajorCauses(rawData);
    
    // 3대 사인 관련 항목들과 악성 신생물 제거
    const filteredData = rawData.filter(item => {
      const name = item.name;
      return !name.includes('3대 사인') && 
             !name.includes('순환계통의 질환') && 
             !name.includes('호흡계통의 질환') &&
             name !== '악성 신생물(암)' &&
             name !== '악성신생물(암)' &&
             name !== '악성 신생물' &&
             name !== '악성신생물';
    }).map(item => ({
      name: item.name,
      rate: item.rate,
      percentage: item.rate // 사망원인은 이미 퍼센트
    }));
    
    res.json({ 
      data: filteredData, 
      threeMajor, 
      ageGroup, 
      gender 
    });
  } catch (error) {
    res.status(500).json({ error: '서버 오류가 발생했습니다.', details: error.message });
  }
});

// 생명표 데이터 조회 API
app.get('/api/life-table/:age/:gender', (req, res) => {
  try {
    const { age, gender } = req.params;
    const ageNum = parseInt(age);
    
    const genderKey = gender === 'male' ? '남자' : '여자';
    
    // 2023년 데이터
    const currentData = completeLifeTableData['2023'] && completeLifeTableData['2023'][ageNum] ? {
      lifeExpectancy: completeLifeTableData['2023'][ageNum][`기대여명(${genderKey}) (년)`] || 0,
      deathProbability: completeLifeTableData['2023'][ageNum][`사망확률(${genderKey})`] || 0,
      survivalCount: completeLifeTableData['2023'][ageNum][`생존자(${genderKey})`] || 0
    } : null;
    
    // 5개년 평균 데이터
    const averageData = completeLifeTableData['average5Year'] && completeLifeTableData['average5Year'][ageNum] ? {
      lifeExpectancy: completeLifeTableData['average5Year'][ageNum][`기대여명(${genderKey}) (년)`] || 0,
      deathProbability: completeLifeTableData['average5Year'][ageNum][`사망확률(${genderKey})`] || 0,
      survivalCount: completeLifeTableData['average5Year'][ageNum][`생존자(${genderKey})`] || 0
    } : null;
    
    if (!currentData && !averageData) {
      return res.json({ 
        current: null, 
        average: null, 
        message: '해당 연령대와 성별에 대한 생명표 데이터가 없습니다.' 
      });
    }
    
    res.json({ 
      current: currentData,
      average: averageData,
      age: ageNum,
      gender 
    });
  } catch (error) {
    res.status(500).json({ error: '서버 오류가 발생했습니다.', details: error.message });
  }
});

// 간이생명표 데이터 조회 API (기존 호환성)
app.get('/api/simple-life-table/:age/:gender', (req, res) => {
  try {
    const { age, gender } = req.params;
    const ageNum = parseInt(age);
    const ageGroup = getAgeGroup(ageNum);
    
    if (!lifeTableData[gender] || !lifeTableData[gender][ageGroup]) {
      return res.json({ data: null, message: '해당 연령대와 성별에 대한 간이생명표 데이터가 없습니다.' });
    }
    
    const data = lifeTableData[gender][ageGroup];
    res.json({ data, ageGroup, gender });
  } catch (error) {
    res.status(500).json({ error: '서버 오류가 발생했습니다.', details: error.message });
  }
});

// 헬스 체크 API
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    dataLoaded: {
      cancer: !!cancerData,
      death: !!deathData,
      lifeTable: !!lifeTableData,
      completeLifeTable: !!completeLifeTableData
    }
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
  console.log(`📊 데이터 상태:`);
  console.log(`   - 암 발생률 데이터: ${cancerData ? '✅ 로드됨' : '❌ 로드 실패'}`);
  console.log(`   - 사망원인 데이터: ${deathData ? '✅ 로드됨' : '❌ 로드 실패'}`);
  console.log(`   - 간이생명표 데이터: ${lifeTableData ? '✅ 로드됨' : '❌ 로드 실패'}`);
  console.log(`   - 완전생명표 데이터: ${completeLifeTableData ? '✅ 로드됨' : '❌ 로드 실패'}`);
  console.log(`🌐 접속 URL: http://localhost:${PORT}`);
});

module.exports = app;
