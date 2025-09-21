// 암 발생률 및 사망원인별 발생률 데이터
// 실제 국가통계자료를 기반으로 한 데이터 (cancer-data.js에서 로드됨)
// 기본 샘플 데이터 (실제 데이터가 로드되지 않을 경우를 위한 fallback)
let fallbackCancerData = {
    male: {
        '0-19': [
            { name: '혈액암', rate: 12.3 },
            { name: '뇌종양', rate: 8.7 },
            { name: '갑상선암', rate: 5.2 },
            { name: '골육종', rate: 4.1 },
            { name: '신장암', rate: 3.8 }
        ],
        '20-29': [
            { name: '고환암', rate: 15.2 },
            { name: '갑상선암', rate: 12.8 },
            { name: '혈액암', rate: 9.4 },
            { name: '뇌종양', rate: 6.7 },
            { name: '위암', rate: 5.3 }
        ],
        '30-39': [
            { name: '고환암', rate: 18.5 },
            { name: '갑상선암', rate: 16.2 },
            { name: '위암', rate: 12.7 },
            { name: '혈액암', rate: 11.3 },
            { name: '대장암', rate: 9.8 }
        ],
        '40-49': [
            { name: '위암', rate: 45.6 },
            { name: '대장암', rate: 38.9 },
            { name: '갑상선암', rate: 32.1 },
            { name: '간암', rate: 28.4 },
            { name: '폐암', rate: 25.7 }
        ],
        '50-59': [
            { name: '위암', rate: 89.2 },
            { name: '대장암', rate: 76.8 },
            { name: '폐암', rate: 68.4 },
            { name: '간암', rate: 54.7 },
            { name: '전립선암', rate: 42.3 }
        ],
        '60-69': [
            { name: '위암', rate: 156.8 },
            { name: '폐암', rate: 142.5 },
            { name: '대장암', rate: 138.9 },
            { name: '간암', rate: 98.7 },
            { name: '전립선암', rate: 85.4 }
        ],
        '70+': [
            { name: '폐암', rate: 234.6 },
            { name: '위암', rate: 198.7 },
            { name: '대장암', rate: 187.3 },
            { name: '전립선암', rate: 156.8 },
            { name: '간암', rate: 134.2 }
        ]
    },
    female: {
        '0-19': [
            { name: '혈액암', rate: 10.8 },
            { name: '뇌종양', rate: 7.9 },
            { name: '갑상선암', rate: 6.1 },
            { name: '골육종', rate: 3.7 },
            { name: '신장암', rate: 3.2 }
        ],
        '20-29': [
            { name: '갑상선암', rate: 28.4 },
            { name: '자궁경부암', rate: 12.6 },
            { name: '유방암', rate: 8.9 },
            { name: '혈액암', rate: 7.3 },
            { name: '위암', rate: 4.7 }
        ],
        '30-39': [
            { name: '갑상선암', rate: 45.2 },
            { name: '유방암', rate: 23.8 },
            { name: '자궁경부암', rate: 18.4 },
            { name: '위암', rate: 9.6 },
            { name: '대장암', rate: 8.2 }
        ],
        '40-49': [
            { name: '유방암', rate: 78.9 },
            { name: '갑상선암', rate: 65.4 },
            { name: '대장암', rate: 32.7 },
            { name: '위암', rate: 28.3 },
            { name: '자궁경부암', rate: 25.8 }
        ],
        '50-59': [
            { name: '유방암', rate: 142.6 },
            { name: '대장암', rate: 58.4 },
            { name: '갑상선암', rate: 52.1 },
            { name: '위암', rate: 48.7 },
            { name: '폐암', rate: 35.2 }
        ],
        '60-69': [
            { name: '유방암', rate: 187.4 },
            { name: '대장암', rate: 98.7 },
            { name: '위암', rate: 76.8 },
            { name: '폐암', rate: 68.9 },
            { name: '간암', rate: 45.6 }
        ],
        '70+': [
            { name: '유방암', rate: 234.8 },
            { name: '대장암', rate: 156.7 },
            { name: '위암', rate: 134.2 },
            { name: '폐암', rate: 98.4 },
            { name: '간암', rate: 67.8 }
        ]
    }
};

let fallbackDeathData = {
    male: {
        '0-19': [
            { name: '교통사고', rate: 8.2 },
            { name: '자살', rate: 5.7 },
            { name: '추락사', rate: 3.4 },
            { name: '익사', rate: 2.8 },
            { name: '화재', rate: 1.9 }
        ],
        '20-29': [
            { name: '자살', rate: 25.4 },
            { name: '교통사고', rate: 18.7 },
            { name: '추락사', rate: 8.9 },
            { name: '익사', rate: 6.2 },
            { name: '화재', rate: 4.1 }
        ],
        '30-39': [
            { name: '자살', rate: 35.8 },
            { name: '교통사고', rate: 22.3 },
            { name: '추락사', rate: 12.7 },
            { name: '심장질환', rate: 8.4 },
            { name: '뇌혈관질환', rate: 6.9 }
        ],
        '40-49': [
            { name: '자살', rate: 42.6 },
            { name: '교통사고', rate: 28.9 },
            { name: '심장질환', rate: 18.7 },
            { name: '뇌혈관질환', rate: 15.4 },
            { name: '간질환', rate: 12.8 }
        ],
        '50-59': [
            { name: '자살', rate: 38.7 },
            { name: '심장질환', rate: 32.4 },
            { name: '뇌혈관질환', rate: 28.6 },
            { name: '간질환', rate: 22.8 },
            { name: '교통사고', rate: 18.9 }
        ],
        '60-69': [
            { name: '심장질환', rate: 68.4 },
            { name: '뇌혈관질환', rate: 52.7 },
            { name: '간질환', rate: 42.8 },
            { name: '자살', rate: 38.9 },
            { name: '당뇨병', rate: 28.6 }
        ],
        '70+': [
            { name: '심장질환', rate: 156.8 },
            { name: '뇌혈관질환', rate: 134.2 },
            { name: '간질환', rate: 89.7 },
            { name: '당뇨병', rate: 67.4 },
            { name: '폐렴', rate: 54.8 }
        ]
    },
    female: {
        '0-19': [
            { name: '교통사고', rate: 6.8 },
            { name: '자살', rate: 4.2 },
            { name: '추락사', rate: 2.7 },
            { name: '익사', rate: 2.1 },
            { name: '화재', rate: 1.4 }
        ],
        '20-29': [
            { name: '자살', rate: 18.7 },
            { name: '교통사고', rate: 12.4 },
            { name: '추락사', rate: 6.8 },
            { name: '익사', rate: 4.9 },
            { name: '화재', rate: 3.2 }
        ],
        '30-39': [
            { name: '자살', rate: 22.4 },
            { name: '교통사고', rate: 15.8 },
            { name: '추락사', rate: 8.7 },
            { name: '심장질환', rate: 5.9 },
            { name: '뇌혈관질환', rate: 4.8 }
        ],
        '40-49': [
            { name: '자살', rate: 28.6 },
            { name: '교통사고', rate: 18.9 },
            { name: '심장질환', rate: 12.4 },
            { name: '뇌혈관질환', rate: 9.8 },
            { name: '간질환', rate: 8.7 }
        ],
        '50-59': [
            { name: '자살', rate: 24.8 },
            { name: '심장질환', rate: 18.7 },
            { name: '뇌혈관질환', rate: 16.9 },
            { name: '간질환', rate: 14.2 },
            { name: '교통사고', rate: 12.6 }
        ],
        '60-69': [
            { name: '심장질환', rate: 42.8 },
            { name: '뇌혈관질환', rate: 38.7 },
            { name: '간질환', rate: 28.9 },
            { name: '자살', rate: 22.4 },
            { name: '당뇨병', rate: 18.6 }
        ],
        '70+': [
            { name: '심장질환', rate: 98.7 },
            { name: '뇌혈관질환', rate: 87.4 },
            { name: '간질환', rate: 56.8 },
            { name: '당뇨병', rate: 42.7 },
            { name: '폐렴', rate: 38.9 }
        ]
    }
};

// 나이대 계산 함수
function getAgeGroup(age) {
    if (age < 20) return '0-19';
    if (age < 30) return '20-29';
    if (age < 40) return '30-39';
    if (age < 50) return '40-49';
    if (age < 60) return '50-59';
    if (age < 70) return '60-69';
    return '70+';
}

// 데이터 검색 및 정렬 함수
function searchCancerData(age, gender) {
    const ageGroup = getAgeGroup(age);
    
    // 실제 데이터가 로드되었는지 확인
    const dataSource = (typeof cancerData !== 'undefined' && cancerData) ? cancerData : fallbackCancerData;
    const data = dataSource[gender] && dataSource[gender][ageGroup] ? dataSource[gender][ageGroup] : [];
    
    // 이미 정렬된 데이터이므로 그대로 반환
    return data;
}

function searchDeathData(age, gender) {
    const ageGroup = getAgeGroup(age);
    
    // 실제 데이터가 로드되었는지 확인
    const dataSource = (typeof deathData !== 'undefined' && deathData) ? deathData : fallbackDeathData;
    const data = dataSource[gender] && dataSource[gender][ageGroup] ? dataSource[gender][ageGroup] : [];
    
    // 이미 정렬된 데이터이므로 그대로 반환
    return data;
}

// 발생률을 퍼센트로 변환하는 함수 (암 발생률용)
function convertToPercentage(rate) {
    return (rate / 100000) * 100;
}

// 누적 퍼센트를 계산하는 함수
function calculateCumulativePercentage(data, limit, type) {
    const limitedData = limit === 'all' ? data : data.slice(0, parseInt(limit));
    let cumulative = 0;
    
    return limitedData.map(item => {
        // 사망원인은 이미 백분율이므로 그대로 사용, 암 발생률은 변환
        const percentage = type === 'death' ? item.rate : convertToPercentage(item.rate);
        cumulative += percentage;
        
        return {
            ...item,
            percentage: percentage
        };
    });
}

// 3대 사인 합계를 계산하는 함수
function calculateThreeMajorCauses(data) {
    let cancer = 0;
    let pneumonia = 0;
    let cardiovascular = 0;
    
    data.forEach(item => {
        const name = item.name.toLowerCase();
        const rate = item.rate;
        
        // 암 관련
        if (name.includes('악성 신생물') || name.includes('암')) {
            cancer += rate;
        }
        // 폐렴 관련
        else if (name.includes('폐렴')) {
            pneumonia += rate;
        }
        // 심혈관 질환 관련
        else if (name.includes('순환계통') || name.includes('심장') || name.includes('뇌혈관') || 
                 name.includes('심혈관') || name.includes('혈관')) {
            cardiovascular += rate;
        }
    });
    
    return {
        cancer: cancer,
        pneumonia: pneumonia,
        cardiovascular: cardiovascular,
        total: cancer + pneumonia + cardiovascular
    };
}

// 사망원인 데이터에서 3대 사인을 제거하는 함수
function removeThreeMajorCauses(data) {
    return data.filter(item => {
        const name = item.name;
        return !name.includes('3대 사인') && !name.includes('악성 신생물(암)') && 
               !name.includes('순환계통의 질환') && !name.includes('호흡계통의 질환');
    });
}

// 총 누적 퍼센트를 계산하는 함수
function calculateTotalCumulative(data, limit, type) {
    const limitedData = limit === 'all' ? data : data.slice(0, parseInt(limit));
    let total = 0;
    
    limitedData.forEach(item => {
        const percentage = type === 'death' ? item.rate : convertToPercentage(item.rate);
        total += percentage;
    });
    
    return total;
}

// 결과 표시 함수
function displayResults(data, containerId, type) {
    const container = document.getElementById(containerId);
    
    if (!data || data.length === 0) {
        container.innerHTML = '<p class="no-data">해당 연령대와 성별에 대한 데이터가 없습니다.</p>';
        return;
    }

    // 현재 선택된 제한 개수 확인
    const activeButton = container.parentElement.querySelector('.view-btn.active');
    const limit = activeButton ? activeButton.dataset.limit : '5';
    
    let html = '';
    
    // 사망원인의 경우 3대 사인 처리
    if (type === 'death') {
        // 3대 사인 합계 계산
        const threeMajor = calculateThreeMajorCauses(data);
        
        // 3대 사인 정보 표시
        html += `<div class="three-major-causes">
            <h4>3대 사인 (암, 폐렴, 심혈관질환) 확률: ${threeMajor.total.toFixed(4)}%</h4>
            <div class="three-major-breakdown">
                <span>암: ${threeMajor.cancer.toFixed(4)}%</span>
                <span>폐렴: ${threeMajor.pneumonia.toFixed(4)}%</span>
                <span>심혈관질환: ${threeMajor.cardiovascular.toFixed(4)}%</span>
            </div>
        </div>`;
        
        // 3대 사인 관련 항목들 제거
        const filteredData = removeThreeMajorCauses(data);
        
        // 필터링된 데이터로 퍼센트 계산
        const dataWithPercentage = calculateCumulativePercentage(filteredData, limit, type);
        const totalCumulative = calculateTotalCumulative(filteredData, limit, type);
        const limitText = limit === 'all' ? '전체' : `상위 ${limit}개`;
        
        html += `<div class="cumulative-info">
            <h4>${limitText} 누적 발생률: ${totalCumulative.toFixed(4)}%</h4>
        </div>`;
        
        html += '<table><thead><tr><th class="rank">순위</th><th class="disease-name">사망원인</th><th class="rate">발생률(%)</th></tr></thead><tbody>';
        
        dataWithPercentage.forEach((item, index) => {
            html += `<tr>
                <td class="rank">${index + 1}</td>
                <td class="disease-name">${item.name}</td>
                <td class="rate">${item.percentage.toFixed(4)}%</td>
            </tr>`;
        });
    } else {
        // 암 발생률의 경우 기존 로직
        const dataWithPercentage = calculateCumulativePercentage(data, limit, type);
        const totalCumulative = calculateTotalCumulative(data, limit, type);
        const limitText = limit === 'all' ? '전체' : `상위 ${limit}개`;
        
        html += `<div class="cumulative-info">
            <h4>${limitText} 누적 발생률: ${totalCumulative.toFixed(4)}%</h4>
        </div>`;
        
        html += '<table><thead><tr><th class="rank">순위</th><th class="disease-name">암 종류</th><th class="rate">발생률(%)</th></tr></thead><tbody>';
        
        dataWithPercentage.forEach((item, index) => {
            html += `<tr>
                <td class="rank">${index + 1}</td>
                <td class="disease-name">${item.name}</td>
                <td class="rate">${item.percentage.toFixed(4)}%</td>
            </tr>`;
        });
    }
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// 뷰 컨트롤 이벤트 핸들러
function handleViewControl(event) {
    const button = event.target;
    const type = button.dataset.type;
    const limit = button.dataset.limit;
    
    // 활성 버튼 변경
    document.querySelectorAll(`[data-type="${type}"]`).forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    // 결과 재표시
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    
    if (age && gender) {
        let data;
        let containerId;
        
        if (type === 'cancer') {
            data = searchCancerData(age, gender);
            containerId = 'cancerResults';
        } else {
            data = searchDeathData(age, gender);
            containerId = 'deathResults';
        }
        
        // 제한 적용
        if (limit !== 'all') {
            data = data.slice(0, parseInt(limit));
        }
        
        displayResults(data, containerId, type);
    }
}

// 메인 검색 함수
function performSearch() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    
    // 입력값 검증
    if (!age || !gender) {
        alert('나이와 성별을 모두 입력해주세요.');
        return;
    }
    
    if (age < 0 || age > 120) {
        alert('올바른 나이를 입력해주세요.');
        return;
    }
    
    // 로딩 표시
    document.getElementById('loadingSection').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
    
    // 검색 시뮬레이션 (실제 데이터 처리 시간을 고려)
    setTimeout(() => {
        // 암 발생률 데이터 검색
        const cancerResults = searchCancerData(age, gender);
        const cancerTop5 = cancerResults.slice(0, 5);
        
        // 사망원인별 발생률 데이터 검색
        const deathResults = searchDeathData(age, gender);
        const deathTop5 = deathResults.slice(0, 5);
        
        // 결과 표시
        displayResults(cancerTop5, 'cancerResults', 'cancer');
        displayDeathProbability(age, gender); // 사망확률 표시
        displayResults(deathTop5, 'deathResults', 'death');
        
        // 뷰 컨트롤 버튼 초기화
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('[data-limit="5"]').forEach(btn => {
            btn.classList.add('active');
        });
        
        // 결과 섹션 표시
        document.getElementById('loadingSection').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'block';
        
        // 결과 섹션으로 스크롤
        document.getElementById('resultsSection').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
    }, 1000); // 1초 로딩 시뮬레이션
}

// 사망확률을 가져오는 함수
function getDeathProbability(age, gender) {
    const ageGroup = getAgeGroup(age);
    
    // 실제 데이터가 로드되었는지 확인
    const dataSource = (typeof lifeTableData !== 'undefined' && lifeTableData) ? lifeTableData : null;
    
    if (!dataSource || !dataSource[gender] || !dataSource[gender][ageGroup]) {
        return null;
    }
    
    return dataSource[gender][ageGroup].average_death_probability;
}

// 사망확률 표시 함수
function displayDeathProbability(age, gender) {
    const container = document.getElementById('deathProbabilityInfo');
    
    const deathProb = getDeathProbability(age, gender);
    
    if (deathProb === null) {
        container.innerHTML = '<p class="no-data">해당 연령대와 성별에 대한 사망확률 데이터가 없습니다.</p>';
        return;
    }
    
    // 소수점을 퍼센트로 변환 (0.05 → 5%)
    const percentage = (deathProb * 100).toFixed(4);
    
    let html = `<h4>${age}세 ${gender === 'male' ? '남성' : '여성'} 사망확률</h4>`;
    html += `<div class="probability-value">${percentage}%</div>`;
    html += `<div class="probability-description">해당 연령대의 연간 사망확률</div>`;
    
    container.innerHTML = html;
}

// 데이터 로드 상태 확인 함수
function checkDataLoadStatus() {
    const cancerLoaded = typeof cancerData !== 'undefined' && cancerData;
    const deathLoaded = typeof deathData !== 'undefined' && deathData;
    const lifeTableLoaded = typeof lifeTableData !== 'undefined' && lifeTableData;
    
    console.log('데이터 로드 상태:');
    console.log('- 암종 데이터:', cancerLoaded ? '로드됨' : '로드되지 않음');
    console.log('- 사망원인 데이터:', deathLoaded ? '로드됨' : '로드되지 않음');
    console.log('- 간이 생명표 데이터:', lifeTableLoaded ? '로드됨' : '로드되지 않음');
    
    if (!cancerLoaded || !deathLoaded || !lifeTableLoaded) {
        console.warn('일부 데이터가 로드되지 않았습니다. fallback 데이터를 사용합니다.');
    }
}

// DOM 로드 완료 후 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    // 데이터 로드 상태 확인
    checkDataLoadStatus();
    
    // 검색 버튼 이벤트
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    
    // 엔터키 검색 지원
    document.getElementById('age').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    document.getElementById('gender').addEventListener('change', function(e) {
        if (e.target.value && document.getElementById('age').value) {
            performSearch();
        }
    });
    
    // 뷰 컨트롤 버튼 이벤트
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', handleViewControl);
    });
});


// 데이터 내보내기 함수 (향후 구현 예정)
function exportData() {
    // 현재 검색 결과를 엑셀 또는 CSV 형태로 내보내는 기능
    console.log('데이터 내보내기 기능은 향후 구현 예정입니다.');
}
