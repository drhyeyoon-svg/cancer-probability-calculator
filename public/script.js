/**
 * 건강계산기 - 암 발생률 및 사망원인별 발생률 계산기
 * 리팩토링된 버전 - 모듈화 및 가독성 개선
 */

// ============================================================================
// 0. 위험인자 데이터 (임베드)
// ============================================================================

// 위험인자 데이터가 외부 파일에서 로드되지 않은 경우를 대비한 폴백
if (typeof riskFactorData === 'undefined') {
    console.log('외부 riskFactorData 없음, 내장 데이터 사용');
    
    window.riskFactorData = {
        "흡연": [
            { cancer: "폐", effect: 6.0 },
            { cancer: "위", effect: 1.5 },
            { cancer: "방광", effect: 3.0 },
            { cancer: "신장", effect: 1.5 },
            { cancer: "췌장", effect: 1.7 }
        ],
        "음주": [
            { cancer: "대장", effect: 1.5 },
            { cancer: "간", effect: 3.0 },
            { cancer: "유방", effect: 1.3 },
            { cancer: "췌장", effect: 1.5 }
        ],
        "비만": [
            { cancer: "대장", effect: 1.3 },
            { cancer: "유방", effect: 1.5 },
            { cancer: "자궁체부", effect: 1.6 },
            { cancer: "신장", effect: 1.4 }
        ],
        "H. pylori 감염": [
            { cancer: "위", effect: 2.0 }
        ],
        "HPV 감염": [
            { cancer: "자궁경부", effect: 50.0 }
        ],
        "B형간염": [
            { cancer: "간", effect: 30.0 }
        ],
        "C형간염": [
            { cancer: "간", effect: 20.0 }
        ],
        "담석증": [
            { cancer: "담낭암", effect: 7.0 },
            { cancer: "담도암", effect: 4.0 }
        ],
        "유방암 가족력": [
            { cancer: "유방", effect: 5.0 }
        ],
        "난소암 가족력": [
            { cancer: "난소", effect: 6.0 }
        ],
        "대장암 가족력": [
            { cancer: "대장", effect: 2.0 }
        ],
        "전립선암 가족력": [
            { cancer: "전립선", effect: 2.6 }
        ],
        "췌장암 가족력": [
            { cancer: "췌장", effect: 2.0 }
        ]
    };
}

// ============================================================================
// 1. 전역 상수 및 설정
// ============================================================================

const CONFIG = {
    AGE_RANGE: { MIN: 0, MAX: 120 },
    RETRY_DELAY: 1000,
    INIT_DELAY: 500,
    PERCENTAGE_MULTIPLIER: 100000
};

// DOM 요소 접근을 위한 헬퍼
const ELEMENTS = {
    age: () => document.getElementById('age'),
    gender: () => document.getElementById('gender'),
    riskFactorChoice: () => document.getElementById('riskFactorChoice'),
    riskFactorYes: () => document.getElementById('riskFactorYes'),
    riskFactorNo: () => document.getElementById('riskFactorNo'),
    riskFactorsSection: () => document.getElementById('riskFactorsSection'),
    riskFactorsContent: () => document.getElementById('riskFactorsContent'),
    completeRiskFactorBtn: () => document.getElementById('completeRiskFactorBtn'),
    healthSearchBtn: () => document.getElementById('healthSearchBtn'),
    resetBtn: () => document.getElementById('resetBtn'),
    resultsSection: () => document.getElementById('resultsSection'),
    cancerResultsColumn: () => document.getElementById('cancerResultsColumn'),
    deathResultsColumn: () => document.getElementById('deathResultsColumn'),
    cancerResults: () => document.getElementById('cancerResults'),
    deathResults: () => document.getElementById('deathResults'),
    lifeTableInfo: () => document.getElementById('lifeTableInfo')
};

// ============================================================================
// 2. 전역 상태 관리
// ============================================================================

let currentMainTab = 'cancer'; // 메인 탭 상태 (cancer 또는 death)
let currentTab = 'current';
let currentLifeTab = 'life-current';

const appState = {
    riskFactorSelection: {
        choiceMade: false,
        useRiskFactors: false,
        selectionComplete: false
    },
    
    reset() {
        this.riskFactorSelection = {
            choiceMade: false,
            useRiskFactors: false,
            selectionComplete: false
        };
    }
};

// ============================================================================
// 3. 사용자 암 확률 관리 클래스
// ============================================================================

class UserCancerRiskCalculator {
    constructor() {
        this.reset();
    }
    
    setUserInfo(age, gender) {
        this.age = age;
        this.gender = gender;
        console.log(`사용자 정보 설정: ${age}세 ${gender === 'male' ? '남성' : '여성'}`);
    }
    
    setBaseCancerRates(cancerData) {
        this.baseCancerRates = {};
        this.adjustedCancerRates = {};
        this.oddsRatios = {};
        
        if (cancerData && Array.isArray(cancerData)) {
            cancerData.forEach(cancer => {
                // 5개년 평균 탭일 때는 이미 올바른 5개년 평균 데이터가 전달되므로
                // cancer.rate 값을 그대로 사용 (cancerData5Year에서 온 데이터)
                const rate = cancer.rate || 0;
                
                this.baseCancerRates[cancer.name] = rate;
                this.adjustedCancerRates[cancer.name] = rate;
                this.oddsRatios[cancer.name] = 1.0;
            });
        }
        
        console.log('기본 암 발생률 저장 완료:', Object.keys(this.baseCancerRates).length, '개 암종');
    }
    
    updateRiskFactors(riskFactors, familyHistory) {
        this.selectedRiskFactors = [...riskFactors, ...familyHistory];
        console.log('선택된 위험인자:', this.selectedRiskFactors);
        this.calculateAdjustedRates();
    }
    
    calculateAdjustedRates() {
        console.log('=== calculateAdjustedRates 시작 (시너지 보간 방식) ===');
        console.log('선택된 위험인자 수:', this.selectedRiskFactors.length);
        console.log('기본 암 발생률 수:', Object.keys(this.baseCancerRates).length);
        
        // 초기화
        Object.keys(this.baseCancerRates).forEach(cancerName => {
            this.adjustedCancerRates[cancerName] = this.baseCancerRates[cancerName];
            this.oddsRatios[cancerName] = 1.0;
        });
        
        if (this.selectedRiskFactors.length === 0) {
            console.log('선택된 위험인자가 없어 계산 종료');
            return;
        }
        
        console.log('riskFactorData 존재:', typeof riskFactorData !== 'undefined');
        
        // 각 암종별로 해당하는 위험인자 OR들을 수집
        const cancerORs = {}; // { "암종명": [OR1, OR2, ...] }
        
        this.selectedRiskFactors.forEach(riskFactor => {
            console.log(`위험인자 처리 중: ${riskFactor}`);
            
            if (typeof riskFactorData !== 'undefined' && riskFactorData[riskFactor]) {
                const riskData = riskFactorData[riskFactor];
                console.log(`  ${riskFactor} 데이터:`, riskData);
                
                riskData.forEach(risk => {
                    const targetCancer = this.findMatchingCancer(risk.cancer);
                    console.log(`  매칭 시도: ${risk.cancer} → ${targetCancer || '매칭 실패'}`);
                    
                    if (targetCancer && this.baseCancerRates[targetCancer]) {
                        // 해당 암종의 OR 목록에 추가
                        if (!cancerORs[targetCancer]) {
                            cancerORs[targetCancer] = [];
                        }
                        cancerORs[targetCancer].push(risk.effect);
                        console.log(`  ✅ ${targetCancer}에 OR ${risk.effect} 추가됨`);
                    } else {
                        console.log(`  ❌ 매칭 실패 또는 기본률 없음: ${targetCancer}`);
                    }
                });
            } else {
                console.log(`  ❌ ${riskFactor} 데이터 없음`);
            }
        });
        
        // 각 암종별로 최종 OR 계산 (시너지 보간 방식)
        const SYNERGY_FACTOR = 0.2; // 추가 위험인자 시너지 강도
        
        Object.keys(cancerORs).forEach(cancerName => {
            const ors = cancerORs[cancerName];
            
            if (ors.length === 1) {
                // 위험인자가 1개만 있는 경우: 그대로 사용
                this.oddsRatios[cancerName] = ors[0];
            } else {
                // 위험인자가 2개 이상인 경우: 최대 OR + 추가 OR들의 시너지
                ors.sort((a, b) => b - a); // 내림차순 정렬
                const maxOR = ors[0];
                let finalOR = maxOR;
                
                // 추가 위험인자들에 대해 시너지 보간 적용
                for (let i = 1; i < ors.length; i++) {
                    const additionalOR = ors[i];
                    const synergy = (additionalOR - 1) * SYNERGY_FACTOR;
                    finalOR += synergy;
                    console.log(`  추가 위험인자 ${i}: OR ${additionalOR} → 시너지 +${synergy.toFixed(2)}`);
                }
                
                this.oddsRatios[cancerName] = finalOR;
                console.log(`  ${cancerName}: ${ors.length}개 위험인자 (${ors.join(', ')}) → 최종 OR: ${finalOR.toFixed(2)}`);
            }
            
            // 보정된 발생률 계산
            this.adjustedCancerRates[cancerName] = 
                this.baseCancerRates[cancerName] * this.oddsRatios[cancerName];
            
            console.log(`  ${cancerName}: 기본 ${this.baseCancerRates[cancerName]} → 보정 ${this.adjustedCancerRates[cancerName]} (OR: ${this.oddsRatios[cancerName].toFixed(2)})`);
        });
        
        console.log('=== calculateAdjustedRates 완료 ===');
    }
        
    findMatchingCancer(riskCancerName) {
        const cancerNames = Object.keys(this.baseCancerRates);
        
        // 정확한 매칭
        let match = cancerNames.find(name => 
            name.toLowerCase().includes(riskCancerName.toLowerCase()) ||
            riskCancerName.toLowerCase().includes(name.toLowerCase())
        );
        
        if (match) return match;
        
        // 키워드 매칭
        const keywords = {
            '폐': ['폐', 'lung'], '위': ['위', 'stomach'], '간': ['간', 'liver'],
            '대장': ['대장', '결장', 'colon', 'colorectal'], '유방': ['유방', 'breast'],
            '전립선': ['전립선', 'prostate'], '췌장': ['췌장', 'pancreas'],
            '방광': ['방광', 'bladder'], '신장': ['신장', 'kidney'],
            '자궁경부': ['자궁경부', 'cervix'], '자궁체부': ['자궁체부', 'uterus'],
            '구강': ['구강', 'oral'], '후두': ['후두', 'larynx'],
            '담낭': ['담낭', 'gallbladder'], '담도': ['담도', 'bile'],
            '비호지킨': ['비호지킨', 'lymphoma'], '다발성': ['다발성', 'multiple'],
            '백혈병': ['백혈병', 'leukemia']
        };
        
        for (const [key, synonyms] of Object.entries(keywords)) {
            if (synonyms.some(syn => riskCancerName.toLowerCase().includes(syn))) {
                match = cancerNames.find(name => 
                    synonyms.some(syn => name.toLowerCase().includes(syn))
                );
                if (match) return match;
            }
        }
        
        return null;
    }
    
    reset() {
        this.age = null;
        this.gender = null;
        this.baseCancerRates = {};
        this.adjustedCancerRates = {};
        this.selectedRiskFactors = [];
        this.oddsRatios = {};
        console.log('사용자 암 확률 계산기 초기화됨');
    }
}

// 전역 인스턴스
const userRiskCalculator = new UserCancerRiskCalculator();

// ============================================================================
// 4. 유틸리티 함수들
// ============================================================================

const Utils = {
    getAgeGroup(age) {
        console.log('getAgeGroup 호출됨, 나이:', age, '타입:', typeof age);
        
        let result;
        if (age >= 0 && age <= 4) result = '0-4';
        else if (age >= 5 && age <= 9) result = '5-9';
        else if (age >= 10 && age <= 14) result = '10-14';
        else if (age >= 15 && age <= 19) result = '15-19';
        else if (age >= 20 && age <= 24) result = '20-24';
        else if (age >= 25 && age <= 29) result = '25-29';
        else if (age >= 30 && age <= 34) result = '30-34';
        else if (age >= 35 && age <= 39) result = '35-39';
        else if (age >= 40 && age <= 44) result = '40-44';
        else if (age >= 45 && age <= 49) result = '45-49';
        else if (age >= 50 && age <= 54) result = '50-54';
        else if (age >= 55 && age <= 59) result = '55-59';
        else if (age >= 60 && age <= 64) result = '60-64';
        else if (age >= 65 && age <= 69) result = '65-69';
        else if (age >= 70 && age <= 74) result = '70-74';
        else if (age >= 75 && age <= 79) result = '75-79';
        else if (age >= 80 && age <= 84) result = '80-84';
        else if (age >= 85) result = '85+';
        else {
            console.error('지원하지 않는 나이입니다:', age);
            result = '85+';
        }
        
        console.log(`연령대 매핑 결과: ${age}세 → ${result}`);
        return result;
    },
    
    getDeathAgeGroup(age) {
        console.log('getDeathAgeGroup 호출됨, 나이:', age);
        
        // 사망 데이터는 10세 단위 그룹 사용
        if (age >= 0 && age <= 19) return '0-19';
        if (age >= 20 && age <= 29) return '20-29';
        if (age >= 30 && age <= 39) return '30-39';
        if (age >= 40 && age <= 49) return '40-49';
        if (age >= 50 && age <= 59) return '50-59';
        if (age >= 60 && age <= 69) return '60-69';
        if (age >= 70 && age <= 79) return '70-79';
        if (age >= 80) return '80+';
        
        console.error('사망 데이터 연령대를 찾을 수 없습니다:', age);
        return '80+';
    },
    
    convertToPercentage(rate) {
        return (rate / CONFIG.PERCENTAGE_MULTIPLIER) * 100;
    },
    
    isValidAge(age) {
        return age && age >= CONFIG.AGE_RANGE.MIN && age <= CONFIG.AGE_RANGE.MAX;
    },
    
    isValidGender(gender) {
        return gender && (gender === 'male' || gender === 'female');
    }
};

// ============================================================================
// 5. 데이터 검증 및 로딩
// ============================================================================

const DataManager = {
    checkDataLoaded() {
        console.log('데이터 로드 상태 확인 중...');
        
        const requiredData = [
            { name: 'cancerData', data: typeof cancerData !== 'undefined' },
            { name: 'cancerData5Year', data: typeof cancerData5Year !== 'undefined' },
            { name: 'deathData', data: typeof deathData !== 'undefined' },
            { name: 'deathData2022', data: typeof deathData2022 !== 'undefined' },
            { name: 'deathData5Year', data: typeof deathData5Year !== 'undefined' },
            { name: 'lifeTableData', data: typeof lifeTableData !== 'undefined' },
            { name: 'completeLifeTable2023', data: typeof completeLifeTable2023 !== 'undefined' }
        ];
        
        console.log('=== 데이터 로드 상태 상세 확인 ===');
        for (const item of requiredData) {
            console.log(`${item.name}: ${item.data ? '✅ 로드됨' : '❌ 로드 실패'}`);
            if (item.data) {
                // 데이터 구조 간단 확인
                const dataObj = eval(item.name);
                if (dataObj && typeof dataObj === 'object') {
                    console.log(`  ${item.name} 키들:`, Object.keys(dataObj));
                    if (dataObj.male || dataObj.female) {
                        console.log(`  성별 데이터:`, {
                            male: !!dataObj.male,
                            female: !!dataObj.female
                        });
                    }
                }
            }
        }
        
        for (const item of requiredData) {
            if (!item.data) {
                console.error(`${item.name}가 로드되지 않았습니다.`);
                return false;
            }
            console.log(`${item.name} 로드됨`);
        }
        
        return true;
    },
    
    checkRiskFactorDataLoaded() {
        console.log('위험인자 데이터 로드 상태 확인 중...');
        
        if (typeof riskFactorData === 'undefined') {
            console.error('riskFactorData가 로드되지 않았습니다.');
            return false;
        }
        
        console.log('riskFactorData 로드됨, 키:', Object.keys(riskFactorData));
        
        if (typeof riskFactorCategories !== 'undefined') {
            console.log('riskFactorCategories 로드됨');
    } else {
            console.warn('riskFactorCategories가 로드되지 않았습니다. (선택사항)');
        }
        
        return true;
    }
};

// ============================================================================
// 6. UI 상태 관리
// ============================================================================

const UIManager = {
    validateInputsAndEnableButtons() {
        const age = ELEMENTS.age().value;
        const gender = ELEMENTS.gender().value;
        const isValid = Utils.isValidAge(age) && Utils.isValidGender(gender);
        
        const riskFactorChoice = ELEMENTS.riskFactorChoice();
        const healthBtn = ELEMENTS.healthSearchBtn();
        
        if (isValid) {
            // 나이와 성별이 유효하면 통합 버튼을 활성화
            healthBtn.disabled = false;
            
            console.log('나이와 성별 입력 완료: 조회 버튼 활성화됨');
        } else {
            riskFactorChoice.style.display = 'none';
            healthBtn.disabled = true;
            ELEMENTS.riskFactorsSection().style.display = 'none';
            UIManager.resetRiskFactorState();
            console.log('입력 불완전: 버튼 비활성화됨');
        }
        
        return isValid;
    },
    
    resetRiskFactorState() {
        appState.reset();
        
        const yesBtn = ELEMENTS.riskFactorYes();
        const noBtn = ELEMENTS.riskFactorNo();
        if (yesBtn) yesBtn.classList.remove('selected');
        if (noBtn) noBtn.classList.remove('selected');
    },
    
    disableInputs() {
        ELEMENTS.age().disabled = true;
        ELEMENTS.gender().disabled = true;
        ELEMENTS.resetBtn().style.display = 'inline-block';
        
        const completeBtn = ELEMENTS.completeRiskFactorBtn();
        if (completeBtn) completeBtn.disabled = true;
    },
    
    enableInputs() {
        ELEMENTS.age().disabled = false;
        ELEMENTS.gender().disabled = false;
        ELEMENTS.healthSearchBtn().style.display = 'inline-block';
        ELEMENTS.resetBtn().style.display = 'none';
        
        // 위험인자 버튼들 활성화
        ELEMENTS.riskFactorYes().disabled = false;
        ELEMENTS.riskFactorNo().disabled = false;
        
        const completeBtn = ELEMENTS.completeRiskFactorBtn();
        if (completeBtn && appState.riskFactorSelection.useRiskFactors && 
            !appState.riskFactorSelection.selectionComplete) {
            completeBtn.disabled = false;
            completeBtn.textContent = '위험인자 선택 완료';
        }
    },
    
    resetToInitialState() {
        console.log('=== 다시해보기 시작 ===');
        
        try {
            // 1. 입력 필드 활성화 및 초기화
            console.log('1. 입력 필드 초기화');
            this.enableInputs();
            ELEMENTS.age().value = '';
            ELEMENTS.gender().value = '';
            
            // 2. 결과 섹션 완전 숨기기
            console.log('2. 결과 섹션 숨기기');
            ELEMENTS.resultsSection().style.display = 'none';
            ELEMENTS.cancerResultsColumn().style.display = 'none';
            ELEMENTS.deathResultsColumn().style.display = 'none';
            
            // 3. 결과 내용 완전 초기화
            console.log('3. 결과 내용 초기화');
            ELEMENTS.cancerResults().innerHTML = '';
            ELEMENTS.deathResults().innerHTML = '';
            ELEMENTS.lifeTableInfo().innerHTML = '';
            
            // 4. 위험인자 관련 모든 상태 완전 초기화
            console.log('4. 위험인자 상태 초기화');
            this.resetRiskFactorState();
            ELEMENTS.riskFactorChoice().style.display = 'none';
            ELEMENTS.riskFactorsSection().style.display = 'none';
            ELEMENTS.riskFactorsContent().innerHTML = '';
            
            // 5. 위험인자 체크박스들 완전 초기화
            console.log('5. 위험인자 체크박스 초기화');
            document.querySelectorAll('input[name="riskFactor"], input[name="familyHistory"]').forEach(checkbox => {
                checkbox.checked = false;
                checkbox.disabled = false;
            });
            
            // 6. 완료 버튼 초기화
            console.log('6. 완료 버튼 초기화');
            const completeBtn = ELEMENTS.completeRiskFactorBtn();
            if (completeBtn) {
                completeBtn.disabled = false;
                completeBtn.textContent = '위험인자 선택 완료';
            }
            
            // 7. 탭 상태 완전 초기화
            console.log('7. 탭 상태 초기화');
            document.querySelectorAll('.main-tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector('.main-tab-btn[data-main-tab="cancer"]')?.classList.add('active');
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector('.tab-btn[data-tab="current"]')?.classList.add('active');
            document.querySelector('.tab-btn[data-tab="life-current"]')?.classList.add('active');
            currentMainTab = 'cancer';
            currentTab = 'current';
            currentLifeTab = 'life-current';
            
            // 8. 뷰 컨트롤 버튼 초기화
            console.log('8. 뷰 컨트롤 버튼 초기화');
            document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector('.view-btn[data-type="cancer"][data-limit="5"]')?.classList.add('active');
            document.querySelector('.view-btn[data-type="death"][data-limit="5"]')?.classList.add('active');
            
            // 9. 사용자 계산기 초기화
            console.log('9. 사용자 계산기 초기화');
            userRiskCalculator.reset();
            
            // 10. 버튼 상태 재검증
            console.log('10. 버튼 상태 재검증');
            this.validateInputsAndEnableButtons();
            
            console.log('=== 다시해보기 완료 - 모든 상태 초기화됨 ===');
            
        } catch (error) {
            console.error('resetToInitialState 중 오류 발생:', error);
            
            // 오류 발생 시 페이지 새로고침으로 강제 초기화
            console.log('오류로 인한 페이지 새로고침 실행');
            setTimeout(() => {
                location.reload();
            }, 100);
        }
    }
};

// ============================================================================
// 7. 위험인자 관리
// ============================================================================

const RiskFactorManager = {
    applyGenderSpecificRestrictions() {
        // 성별에 따라 관련 없는 위험인자 비활성화
        const gender = ELEMENTS.gender().value;
        
        if (!gender) return;
        
        console.log('성별에 따른 위험인자 제한 적용:', gender);
        
        // 모든 체크박스 찾기
        const allCheckboxes = document.querySelectorAll('input[name="riskFactor"], input[name="familyHistory"]');
        
        allCheckboxes.forEach(checkbox => {
            const value = checkbox.value;
            let shouldDisable = false;
            let reason = '';
            
            if (gender === 'male') {
                // 남성: HPV 감염, 난소암 가족력 비활성화
                if (value.includes('HPV') || value.includes('난소')) {
                    shouldDisable = true;
                    reason = '(남성 해당 없음)';
                }
            } else if (gender === 'female') {
                // 여성: 전립선암 가족력 비활성화
                if (value.includes('전립선')) {
                    shouldDisable = true;
                    reason = '(여성 해당 없음)';
                }
            }
            
            if (shouldDisable) {
                checkbox.disabled = true;
                checkbox.checked = false;
                
                // 라벨에 비활성화 표시 추가
                const label = checkbox.closest('label');
                if (label && !label.textContent.includes('해당 없음')) {
                    const originalText = label.textContent;
                    label.innerHTML = `<input type="checkbox" name="${checkbox.name}" value="${value}" disabled>${originalText} <span style="color: #999; font-size: 0.9em;">${reason}</span>`;
                }
                
                console.log(`  비활성화: ${value} ${reason}`);
            } else {
                checkbox.disabled = false;
            }
        });
    },
    
    generateRiskFactorsSection() {
        console.log('generateRiskFactorsSection 시작');
        try {
            const container = ELEMENTS.riskFactorsContent();
            if (!container) {
                console.error('riskFactorsContent 컨테이너를 찾을 수 없습니다.');
                return;
            }
            
            console.log('컨테이너 찾음:', container);
            
            // 위험인자 데이터 상태 확인
            console.log('riskFactorData 타입:', typeof riskFactorData);
            console.log('riskFactorData 존재:', typeof riskFactorData !== 'undefined');
            
            // 위험인자 데이터 확인 및 기본 데이터 사용
            console.log('위험인자 데이터 확인 중...');
            
            if (typeof riskFactorData === 'undefined' || !riskFactorData || Object.keys(riskFactorData).length === 0) {
                console.warn('riskFactorData가 로드되지 않았거나 비어있습니다. 기본 데이터를 사용합니다.');
                this.createBasicRiskFactorsSection(container);
                return;
            }
            
            // 데이터가 있어도 일단 기본 섹션으로 테스트 (임시)
            console.log('임시로 기본 섹션 생성 (테스트용)');
            this.createBasicRiskFactorsSection(container);
            return;
            
            console.log('riskFactorData 키들:', Object.keys(riskFactorData));
            
            let html = '';
            
            // 일반 위험인자 섹션
            console.log('일반 위험인자 섹션 생성 시작');
            html += this.createRiskFactorCategory('일반 위험인자', 'general', 'riskFactor');
            
            // 가족력 섹션  
            console.log('가족력 섹션 생성 시작');
            html += this.createRiskFactorCategory('가족력', 'familyHistory', 'familyHistory');
            
            console.log('생성된 HTML 길이:', html.length);
            console.log('생성된 HTML 미리보기:', html.substring(0, 200));
            
            if (html.trim()) {
                container.innerHTML = html;
                console.log('위험인자 섹션이 성공적으로 생성되었습니다.');
                
                // 위험인자 섹션 생성 완료 시 조회 버튼과 완료 버튼 활성화
                const healthBtn = ELEMENTS.healthSearchBtn();
                if (healthBtn) {
                    healthBtn.disabled = false;
                    console.log('위험인자 섹션 생성됨 - 조회 버튼 활성화');
                }
                
                // 완료 버튼도 활성화
                const completeBtn = ELEMENTS.completeRiskFactorBtn();
                if (completeBtn) {
                    completeBtn.disabled = false;
                    completeBtn.textContent = '위험인자 선택 완료';
                    console.log('완료 버튼 활성화됨');
                }
                
                // 성별에 따른 제한 적용
                setTimeout(() => {
                    this.applyGenderSpecificRestrictions();
                }, 100);
            } else {
                console.warn('생성된 HTML이 비어있습니다. 기본 섹션을 사용합니다.');
                this.createBasicRiskFactorsSection(container);
            }
        
    } catch (error) {
            console.error('위험인자 섹션 생성 중 오류 발생:', error);
            const container = ELEMENTS.riskFactorsContent();
            if (container) {
                console.log('오류 발생으로 기본 섹션 생성');
                this.createBasicRiskFactorsSection(container);
            }
        }
    },
    
    createRiskFactorCategory(title, categoryType, inputName) {
        console.log(`createRiskFactorCategory 호출: ${title}, ${categoryType}, ${inputName}`);
        
        let html = `<div class="risk-category">
            <h3>${title}</h3>
            <div class="${categoryType === 'general' ? 'risk-factors-grid' : 'family-history-grid'}">`;
        
        let factors = [];
        
        // 위험인자 데이터에서 직접 키를 가져와서 분류
        if (typeof riskFactorData !== 'undefined') {
            const allFactors = Object.keys(riskFactorData);
            console.log('모든 위험인자 키들:', allFactors);
            
            if (categoryType === 'general') {
                factors = allFactors.filter(factor => 
                    !factor.includes('가족력') && !factor.includes('유전')
                );
            } else if (categoryType === 'familyHistory') {
                factors = allFactors.filter(factor => 
                    factor.includes('가족력') || factor.includes('유전')
                );
            }
            
            console.log(`${categoryType} 카테고리 위험인자들:`, factors);
        }
        
        if (factors && factors.length > 0) {
            factors.forEach(factor => {
                const cancers = riskFactorData[factor];
                if (cancers && Array.isArray(cancers) && cancers.length > 0) {
                    const maxEffect = Math.max(...cancers.map(c => c.effect));
                    const mainCancer = cancers.find(c => c.effect === maxEffect)?.cancer || cancers[0].cancer;
                    
                    html += `<div class="${categoryType === 'general' ? 'risk-factor-item' : 'family-history-item'}">
                        <label>
                            <input type="checkbox" name="${inputName}" value="${factor}">
                            ${factor} (${mainCancer} 위험 ${maxEffect}배 증가)
                        </label>
                    </div>`;
                    
                    console.log(`위험인자 추가됨: ${factor} (${mainCancer} ${maxEffect}배)`);
                }
            });
        } else {
            console.warn(`${categoryType} 카테고리에 위험인자가 없습니다.`);
        }
        
        html += '</div></div>';
        console.log(`${title} 섹션 HTML 생성 완료`);
        return html;
    },
    
    createBasicRiskFactorsSection(container) {
        console.log('createBasicRiskFactorsSection 시작');
        console.log('컨테이너:', container);
        
        if (!container) {
            console.error('컨테이너가 null입니다!');
            return;
        }
        
        const basicRiskFactors = {
            general: [
                { name: "흡연", description: "폐암, 방광암 등 위험 증가" },
                { name: "음주", description: "간암, 대장암 등 위험 증가" },
                { name: "비만", description: "유방암, 대장암 등 위험 증가" },
                { name: "H. pylori 감염", description: "위암 위험 증가" },
                { name: "HPV 감염", description: "자궁경부암 위험 증가" },
                { name: "B형간염", description: "간암 위험 증가" },
                { name: "C형간염", description: "간암 위험 증가" },
                { name: "담석증", description: "담낭암 위험 7배, 담도암 위험 4배 증가" }
            ],
            family: [
                { name: "유방암 가족력", description: "유방암 위험 5배 증가" },
                { name: "난소암 가족력", description: "난소암 위험 6배 증가" },
                { name: "대장암 가족력", description: "대장암 위험 2배 증가" },
                { name: "전립선암 가족력", description: "전립선암 위험 2.6배 증가" },
                { name: "췌장암 가족력", description: "췌장암 위험 2배 증가" }
            ]
        };
        
        console.log('기본 위험인자 데이터:', basicRiskFactors);
        
        let html = '';
        
        // 일반 위험인자
        html += '<div class="risk-category"><h3>일반 위험인자</h3><div class="risk-factors-grid">';
        console.log('일반 위험인자 생성 시작, 개수:', basicRiskFactors.general.length);
        
        basicRiskFactors.general.forEach((factor, index) => {
            const itemHtml = `<div class="risk-factor-item">
                <label>
                    <input type="checkbox" name="riskFactor" value="${factor.name}">
                    ${factor.name} (${factor.description})
                </label>
            </div>`;
            html += itemHtml;
            console.log(`일반 위험인자 ${index + 1} 추가됨:`, factor.name);
        });
        html += '</div></div>';
        
        // 가족력
        html += '<div class="risk-category"><h3>가족력</h3><div class="family-history-grid">';
        console.log('가족력 생성 시작, 개수:', basicRiskFactors.family.length);
        
        basicRiskFactors.family.forEach((factor, index) => {
            const itemHtml = `<div class="family-history-item">
                <label>
                    <input type="checkbox" name="familyHistory" value="${factor.name}">
                    ${factor.name} (${factor.description})
                </label>
            </div>`;
            html += itemHtml;
            console.log(`가족력 ${index + 1} 추가됨:`, factor.name);
        });
        html += '</div></div>';
        
        console.log('최종 HTML 길이:', html.length);
        console.log('최종 HTML 미리보기:', html.substring(0, 300));
        
        try {
            container.innerHTML = html;
            console.log('기본 위험인자 섹션이 성공적으로 생성되었습니다.');
            
            // 위험인자 섹션 생성 완료 시 조회 버튼과 완료 버튼 활성화
            const healthBtn = ELEMENTS.healthSearchBtn();
            if (healthBtn) {
                healthBtn.disabled = false;
                console.log('기본 위험인자 섹션 생성됨 - 조회 버튼 활성화');
            }
            
            // 완료 버튼도 활성화
            const completeBtn = ELEMENTS.completeRiskFactorBtn();
            if (completeBtn) {
                completeBtn.disabled = false;
                completeBtn.textContent = '위험인자 선택 완료';
                console.log('완료 버튼 활성화됨');
            }
            
            // 생성 후 확인
            const checkboxes = container.querySelectorAll('input[type="checkbox"]');
            console.log('생성된 체크박스 개수:', checkboxes.length);
            
            // 성별에 따른 제한 적용
            setTimeout(() => {
                RiskFactorManager.applyGenderSpecificRestrictions();
            }, 100);
    } catch (error) {
            console.error('HTML 삽입 중 오류:', error);
    }
    },

    getSelectedRiskFactors() {
    const selectedRiskFactors = [];
    const selectedFamilyHistory = [];
    
    document.querySelectorAll('input[name="riskFactor"]:checked').forEach(checkbox => {
        selectedRiskFactors.push(checkbox.value);
    });
    
    document.querySelectorAll('input[name="familyHistory"]:checked').forEach(checkbox => {
        selectedFamilyHistory.push(checkbox.value);
    });
    
    console.log('선택된 위험인자:', selectedRiskFactors);
    console.log('선택된 가족력:', selectedFamilyHistory);
    
    return { riskFactors: selectedRiskFactors, familyHistory: selectedFamilyHistory };
}
};

// ============================================================================
// 8. 데이터 검색 및 처리 (간소화)
// ============================================================================

const DataProcessor = {
    searchCancerData(age, gender) {
        console.log('🔍 searchCancerData 호출:', { age, gender });
        
        if (!DataManager.checkDataLoaded() || !Utils.isValidAge(age) || !Utils.isValidGender(gender)) {
            return [];
        }
        
        const ageGroup = Utils.getAgeGroup(age);
        console.log('📊 연령대:', ageGroup);
        
        // currentTab에 따라 다른 데이터 소스 사용
        let data;
        if (currentTab === 'average') {
            // 5개년 평균 데이터 사용
            console.log('=== 5개년 평균 데이터 사용 ===');
            console.log('cancerData5Year 존재:', typeof cancerData5Year !== 'undefined');
            console.log('요청 데이터:', { gender, ageGroup });
            
            if (typeof cancerData5Year !== 'undefined' && cancerData5Year[gender]?.[ageGroup]) {
                data = cancerData5Year[gender][ageGroup];
                console.log('5개년 평균 데이터 사용됨, 항목 수:', data.length);
            } else {
                data = cancerData[gender]?.[ageGroup] || [];
                console.log('⚠️ 5개년 평균 데이터 없음, 2022년 데이터 사용됨');
            }
        } else {
            // 2022년 현재 데이터 사용
            console.log('=== 2022년 데이터 사용 ===');
            data = cancerData[gender]?.[ageGroup] || [];
            console.log('2022년 데이터 사용됨, 항목 수:', data.length);
            console.log('첫 3개 항목:', data.slice(0, 3).map(d => d.name));
        }
        
        console.log('⚠️ 필터링 전 데이터:', data.length, '개');
        
        // 성별에 맞지 않는 암 필터링
        const filteredData = data.filter(item => {
            const name = item.name.toLowerCase();
            
            // 여성인 경우 남성 전용 암 제외
            if (gender === 'female') {
                if (name.includes('전립선') || name.includes('prostate')) {
                    return false;
                }
            }
            
            // 남성인 경우 여성 전용 암 제외
            if (gender === 'male') {
                if (name.includes('자궁') || name.includes('cervix') || 
                    name.includes('난소') || name.includes('ovary') ||
                    name.includes('유방') || name.includes('breast')) {
                    return false;
                }
            }
            
            return true;
        });
        
        console.log('✅ 필터링 후 데이터:', filteredData.length, '개');
        console.log('필터링된 첫 3개:', filteredData.slice(0, 3).map(d => d.name));
        
        return filteredData.sort((a, b) => {
            const rateA = a.rate || 0;
            const rateB = b.rate || 0;
            return rateB - rateA;
        });
    },
    
    searchDeathData(age, gender) {
        console.log('=== searchDeathData 호출됨 ===');
        console.log('age:', age, 'gender:', gender);
        
        if (!DataManager.checkDataLoaded() || !Utils.isValidAge(age) || !Utils.isValidGender(gender)) {
            console.log('데이터 로드 실패 또는 유효하지 않은 입력');
            return [];
        }
        
        const ageGroup = Utils.getDeathAgeGroup(age);
        console.log('사망 데이터 연령대:', ageGroup);
        
        // 현재 탭에 따라 적절한 데이터 소스 선택
        const dataSource = (currentLifeTab === 'life-current') 
            ? (typeof deathData2022 !== 'undefined' ? deathData2022 : deathData) 
            : (typeof deathData5Year !== 'undefined' ? deathData5Year : deathData);
        
        const data = dataSource[gender]?.[ageGroup] || [];
        console.log('원본 사망 데이터 길이:', data.length);
        console.log('원본 사망 데이터 샘플:', data.slice(0, 3));
        
        const filteredData = data.filter(item => item.name !== '3대 사인');
        console.log('필터링된 사망 데이터 길이:', filteredData.length);
        console.log('필터링된 사망 데이터 샘플:', filteredData.slice(0, 3));
        
        return filteredData;
    },
    
    getLifeTableData(age, gender) {
        console.log('=== getLifeTableData 호출됨 ===');
        console.log('age:', age, 'gender:', gender);
        
        if (!DataManager.checkDataLoaded() || !Utils.isValidAge(age) || !Utils.isValidGender(gender)) {
            console.log('데이터 로드 실패 또는 유효하지 않은 입력');
            return { current: null, average: null };
        }
        
        // getLifeTableDataByAge 함수를 사용하여 가장 가까운 나이대 데이터 조회
        console.log('getLifeTableDataByAge 함수 존재 여부:', typeof getLifeTableDataByAge);
        console.log('completeLifeTable2023 존재 여부:', typeof completeLifeTable2023);
        
        const data = typeof getLifeTableDataByAge === 'function' 
            ? getLifeTableDataByAge(age) 
            : completeLifeTable2023?.[age.toString()];
        
        console.log('조회된 원본 데이터:', data);
        
        if (!data) {
            console.warn(`${age}세에 대한 생명표 데이터를 찾을 수 없습니다.`);
            return { current: null, average: null };
        }
        
        const genderKey = gender === 'male' ? '남자' : '여자';
        console.log('성별 키:', genderKey);
        
        const formatData = (data) => {
            if (!data) return null;
            const result = {
                lifeExpectancy: data[`기대여명(${genderKey}) (년)`] || 0,
                deathProbability: data[`사망확률(${genderKey})`] || 0,
                survivalCount: data[`생존자(${genderKey})`] || 0
            };
            console.log('포맷된 데이터:', result);
            return result;
        };
        
        const result = {
            current: formatData(data),
            average: null // 5개년 평균 데이터는 별도 파일로 분리 예정
        };
        
        console.log('최종 반환 데이터:', result);
        return result;
    }
};

// ============================================================================
// 9. 결과 표시 관리 (간소화)
// ============================================================================

const DisplayManager = {
    displayResults(data, containerId, type) {
        console.log('=== displayResults 호출됨 ===');
        console.log('type:', type);
        console.log('containerId:', containerId);
        console.log('data 길이:', data?.length);
        console.log('data 샘플:', data?.slice(0, 3));
        console.log('현재 탭:', currentTab);
        
        // 5개년 평균 탭일 때 실제 데이터 확인
        if (currentTab === 'average' && data?.length > 0) {
            console.log('=== 5개년 평균 탭 데이터 상세 확인 ===');
            console.log('상위 5개 암종:');
            data.slice(0, 5).forEach((cancer, idx) => {
                console.log(`  ${idx + 1}. ${cancer.name}: ${cancer.rate}`);
            });
        }
        
        const container = document.getElementById(containerId);
        if (!data?.length) {
            container.innerHTML = '<p class="no-data">데이터가 없습니다.</p>';
            return;
        }
        
        const activeButton = container.parentElement.querySelector('.view-btn.active');
        const limit = activeButton?.dataset.limit || '5';
        console.log('활성 버튼 limit:', limit);
        
        // 사망 데이터와 암 데이터를 다르게 처리
        if (type === 'death') {
            console.log('=== 사망 데이터 처리 시작 ===');
            console.log('현재 생명표 탭:', currentLifeTab);
            
            // 5개년 평균 탭인지 확인
            const is5YearAverage = currentLifeTab === 'life-average';
            console.log('5개년 평균 탭:', is5YearAverage);
            
            // 사망 데이터는 모든암 분리 없이 바로 순위 표시
            // 5개년 평균일 때는 average5Year 필드 사용
            const sortedData = [...data].sort((a, b) => {
                const rateA = is5YearAverage ? (a.average5Year || a.rate || 0) : (a.rate || 0);
                const rateB = is5YearAverage ? (b.average5Year || b.rate || 0) : (b.rate || 0);
                return rateB - rateA;
            });
            
            console.log('정렬된 사망 데이터 상위 5개:', sortedData.slice(0, 5).map(item => ({
                name: item.name,
                rate: is5YearAverage ? (item.average5Year || item.rate) : item.rate
            })));
            
            const limitedData = limit === 'all' ? sortedData : sortedData.slice(0, parseInt(limit));
            console.log('제한된 데이터 길이:', limitedData.length);
            
            let html = '<table><thead><tr><th>순위</th><th>항목</th><th>확률</th></tr></thead><tbody>';
            
            limitedData.forEach((item, index) => {
                // 5개년 평균일 때는 average5Year 필드 사용
                const rateValue = is5YearAverage ? (item.average5Year || item.rate) : item.rate;
                const displayRate = `${rateValue.toFixed(4)}%`;
                
                html += `<tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${displayRate}</td>
                </tr>`;
            });
            
            html += '</tbody></table>';
            console.log('사망 데이터 HTML 생성 완료');
            container.innerHTML = html;
            console.log('=== 사망 데이터 처리 완료 ===');
            return;
        }
        
        // 암 데이터는 기존 로직 사용 (모든암과 개별암 분리)
        let allCancerItem = null;
        let individualCancers = [];
        
        data.forEach(item => {
            if (item.name === '모든암' || item.name === '전체암' || item.name.includes('모든암') || 
                item.name === '모든 암(C00-C96)' || item.name.includes('모든 암')) {
                allCancerItem = item;
            } else {
                individualCancers.push(item);
            }
        });
        
        // 개별암들을 rate 기준으로 정렬 (이미 올바른 데이터 소스에서 가져왔으므로)
        individualCancers.sort((a, b) => {
            const rateA = a.rate || 0;
            const rateB = b.rate || 0;
            return rateB - rateA;
        });
        
        // 개별암 데이터 제한 적용 (모든암 제외하고 계산)
        const limitedIndividualCancers = limit === 'all' ? individualCancers : individualCancers.slice(0, parseInt(limit));
        
        let html = '<table><thead><tr><th>순위</th><th>항목</th><th>확률</th></tr></thead><tbody>';
        
        // 모든암을 먼저 특별하게 표시
        if (allCancerItem) {
            const rate = type === 'cancer' ? 
                Utils.convertToPercentage(allCancerItem.rate) :
                allCancerItem.rate;
            
            let displayRate = `${rate.toFixed(4)}%`;
            let riskInfo = '';
            
            // 위험인자 보정 표시
            if (type === 'cancer' && appState.riskFactorSelection.useRiskFactors) {
                // 모든암의 경우, 개별 암종들의 보정된 발생률을 현재 탭 데이터로 재계산
                let totalBaseRate = 0;
                let totalAdjustedRate = 0;
                let hasAnyRiskFactor = false;
                
                individualCancers.forEach(cancer => {
                    const baseRate = cancer.rate;
                    totalBaseRate += baseRate;
                    
                    // 이 암종에 OR이 적용되었는지 확인
                    const currentOR = userRiskCalculator.oddsRatios[cancer.name] || 1.0;
                    totalAdjustedRate += baseRate * currentOR;
                    
                    if (currentOR > 1.0) {
                        hasAnyRiskFactor = true;
                    }
                });
                
                if (hasAnyRiskFactor && totalAdjustedRate > 0) {
                    const adjustedAllCancerRate = Utils.convertToPercentage(totalAdjustedRate);
                    const overallOR = (totalAdjustedRate / totalBaseRate).toFixed(2);
                    
                    displayRate = `<span class="adjusted-rate">${adjustedAllCancerRate.toFixed(4)}%</span> <span class="base-rate">(기본: ${rate.toFixed(4)}%)</span>`;
                    riskInfo = `<span class="odds-ratio">평균 OR: ${overallOR}</span>`;
                }
            }
            
            // 모든암 이름을 간단하게 표시
            const displayName = allCancerItem.name.includes('모든 암') ? '모든암' : allCancerItem.name;
            
            html += `<tr class="all-cancer-row ${riskInfo ? 'has-risk-factor' : ''}">
                <td class="no-rank"></td>
                <td class="all-cancer-name">${displayName} 확률 ${riskInfo}</td>
                <td class="all-cancer-rate">${displayRate}</td>
            </tr>`;
        }
        
        // 개별암들을 순위와 함께 표시
        limitedIndividualCancers.forEach((item, index) => {
            const rate = type === 'cancer' ? 
                Utils.convertToPercentage(item.rate) :
                item.rate;
            
            let displayRate = `${rate.toFixed(4)}%`;
            let riskInfo = '';
            
            // 위험인자 보정 표시
            if (type === 'cancer' && appState.riskFactorSelection.useRiskFactors && 
                userRiskCalculator.oddsRatios[item.name] > 1.0) {
                console.log(`위험인자 적용: ${item.name}, OR: ${userRiskCalculator.oddsRatios[item.name]}`);
                const adjustedRate = Utils.convertToPercentage(userRiskCalculator.adjustedCancerRates[item.name]);
                displayRate = `<span class="adjusted-rate">${adjustedRate.toFixed(4)}%</span> <span class="base-rate">(기본: ${rate.toFixed(4)}%)</span>`;
                riskInfo = `<span class="odds-ratio">OR: ${userRiskCalculator.oddsRatios[item.name].toFixed(2)}</span>`;
            } else if (type === 'cancer') {
                // 위험인자가 적용되지 않은 이유 로그
                if (!appState.riskFactorSelection.useRiskFactors) {
                    console.log(`위험인자 미적용 - useRiskFactors: false`);
                } else if (!userRiskCalculator.oddsRatios[item.name] || userRiskCalculator.oddsRatios[item.name] <= 1.0) {
                    console.log(`${item.name}: OR 없음 또는 1.0 (${userRiskCalculator.oddsRatios[item.name] || 'undefined'})`);
                }
            }
            
            html += `<tr ${riskInfo ? 'class="has-risk-factor"' : ''}>
                <td>${index + 1}</td>
                <td>${item.name} ${riskInfo}</td>
                <td>${displayRate}</td>
            </tr>`;
        });
        
        html += '</tbody></table>';
        
        console.log(`=== displayResults HTML 설정 직전 ===`);
        console.log(`컨테이너 ID: ${containerId}`);
        console.log(`현재 컨테이너 내용 길이: ${container.innerHTML.length}`);
        console.log(`새로운 HTML 길이: ${html.length}`);
        
        container.innerHTML = html;
        
        console.log(`HTML 설정 완료, 새로운 내용 길이: ${container.innerHTML.length}`);
    },
    
    displayLifeTableInfo(age, gender, lifeData) {
        console.log('=== displayLifeTableInfo 호출됨 ===');
        console.log('age:', age, 'gender:', gender, 'lifeData:', lifeData);
        console.log('currentLifeTab:', currentLifeTab);
        
        const container = ELEMENTS.lifeTableInfo();
        if (!container) {
            console.error('lifeTableInfo 컨테이너를 찾을 수 없습니다.');
            return;
        }
        
        if (!lifeData?.current) {
            console.warn('생명표 데이터가 없습니다.');
            container.innerHTML = '<p class="no-data">생명표 데이터가 없습니다.</p>';
            return;
        }
        
        // 항상 2023년 생명표 데이터만 표시 (탭과 무관)
        const data = lifeData.current;
        console.log('2023년 생명표 데이터 사용 (탭 무관):', data);
        
        if (!data) {
            console.warn('2023년 생명표 데이터가 없습니다.');
            container.innerHTML = '<p class="no-data">생명표 데이터가 없습니다.</p>';
            return;
        }
        
        const genderLabel = gender === 'male' ? '남성' : '여성';
        
        container.innerHTML = `
            <h4>${age}세 ${genderLabel} 2023년 생명표</h4>
            <div class="life-table-grid">
                <div class="life-table-item">
                    <div class="label">기대여명</div>
                    <div class="value">${(data.lifeExpectancy || 0).toFixed(1)}년</div>
                </div>
                <div class="life-table-item">
                    <div class="label">연간 사망확률</div>
                    <div class="value">${((data.deathProbability || 0) * 100).toFixed(4)}%</div>
                </div>
                <div class="life-table-item">
                    <div class="label">동갑중 생존자 비율</div>
                    <div class="value">${((data.survivalCount || 0) / 100000 * 100).toFixed(2)}%</div>
                </div>
            </div>
        `;
    }
};

// ============================================================================
// 10. 검색 실행 및 이벤트 핸들러 (간소화)
// ============================================================================

const SearchManager = {
    async performHealthSearch() {
        const age = parseInt(ELEMENTS.age().value);
        const gender = ELEMENTS.gender().value;
        
        if (!Utils.isValidAge(age) || !Utils.isValidGender(gender)) {
            alert('나이와 성별을 모두 입력해주세요.');
            return;
        }
        
        console.log('=== 통합 건강 검색 시작 ===');
        console.log('위험인자 상태:', appState.riskFactorSelection);
        
        UIManager.disableInputs();
        userRiskCalculator.setUserInfo(age, gender);
        
        // 암 데이터 조회
        const cancerResults = DataProcessor.searchCancerData(age, gender);
        if (cancerResults.length > 0) {
            userRiskCalculator.setBaseCancerRates(cancerResults);
        }
        
        // 사망 데이터 조회
        const lifeData = DataProcessor.getLifeTableData(age, gender);
        const deathResults = DataProcessor.searchDeathData(age, gender);
        
        // 위험인자 선택이 완료되지 않은 경우 선택 창 표시
        if (!appState.riskFactorSelection.choiceMade) {
            console.log('위험인자 선택 창 표시');
            ELEMENTS.riskFactorChoice().style.display = 'block';
            
            // 위험인자 버튼들 활성화 (선택할 수 있도록)
            ELEMENTS.riskFactorYes().disabled = false;
            ELEMENTS.riskFactorNo().disabled = false;
            
            // 조회 버튼 비활성화
            ELEMENTS.healthSearchBtn().disabled = true;
            
            console.log('위험인자 선택 대기 중 - 조회 버튼 비활성화');
            return; // 위험인자 선택 완료까지 대기
        }
        
        // 위험인자 선택이 완료된 경우 결과 표시
        if (appState.riskFactorSelection.useRiskFactors) {
            const selected = RiskFactorManager.getSelectedRiskFactors();
            userRiskCalculator.updateRiskFactors(selected.riskFactors, selected.familyHistory);
        }
        
        // 결과 섹션 표시
        ELEMENTS.resultsSection().style.display = 'block';
        
        // 현재 메인 탭에 따라 적절한 컬럼 표시
        if (currentMainTab === 'cancer') {
            ELEMENTS.cancerResultsColumn().style.display = 'block';
            ELEMENTS.deathResultsColumn().style.display = 'none';
            if (cancerResults.length > 0) {
                DisplayManager.displayResults(cancerResults, 'cancerResults', 'cancer');
            }
        } else {
            ELEMENTS.cancerResultsColumn().style.display = 'none';
            ELEMENTS.deathResultsColumn().style.display = 'block';
            DisplayManager.displayLifeTableInfo(age, gender, lifeData);
            if (deathResults.length > 0) {
                DisplayManager.displayResults(deathResults, 'deathResults', 'death');
            }
        }
        
        console.log('=== 통합 건강 검색 완료 ===');
    },
    
    // 메인 탭 전환 함수
    switchMainTab(tabType) {
        console.log('메인 탭 전환:', tabType);
        currentMainTab = tabType;
        
        // 탭 버튼 active 상태 업데이트
        document.querySelectorAll('.main-tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mainTab === tabType) {
                btn.classList.add('active');
            }
        });
        
        // 적절한 결과 컬럼 표시
        if (tabType === 'cancer') {
            ELEMENTS.cancerResultsColumn().style.display = 'block';
            ELEMENTS.deathResultsColumn().style.display = 'none';
        } else {
            ELEMENTS.cancerResultsColumn().style.display = 'none';
            ELEMENTS.deathResultsColumn().style.display = 'block';
        }
        
        // 현재 입력된 나이/성별로 데이터 재조회
        const age = parseInt(ELEMENTS.age().value);
        const gender = ELEMENTS.gender().value;
        
        if (Utils.isValidAge(age) && Utils.isValidGender(gender)) {
            console.log('메인 탭 전환 - 데이터 재조회:', { age, gender, tabType });
            
            if (tabType === 'cancer') {
                // 암 데이터 조회 및 표시
                const cancerResults = DataProcessor.searchCancerData(age, gender);
                if (cancerResults.length > 0) {
                    // 위험인자가 적용되어 있다면 재적용
                    if (appState.riskFactorSelection.useRiskFactors && appState.riskFactorSelection.selectionComplete) {
                        userRiskCalculator.setBaseCancerRates(cancerResults);
                        const selected = RiskFactorManager.getSelectedRiskFactors();
                        userRiskCalculator.updateRiskFactors(selected.riskFactors, selected.familyHistory);
                    }
                    DisplayManager.displayResults(cancerResults, 'cancerResults', 'cancer');
                    console.log('암 데이터 재조회 완료');
                }
            } else {
                // 사망 데이터 조회 및 표시
                const lifeData = DataProcessor.getLifeTableData(age, gender);
                DisplayManager.displayLifeTableInfo(age, gender, lifeData);
                
                const deathResults = DataProcessor.searchDeathData(age, gender);
                if (deathResults.length > 0) {
                    DisplayManager.displayResults(deathResults, 'deathResults', 'death');
                    console.log('사망 데이터 재조회 완료');
                }
            }
        } else {
            console.warn('메인 탭 전환 - 유효하지 않은 나이/성별:', { age, gender });
        }
    }
};

// ============================================================================
// 11. 이벤트 핸들러들
// ============================================================================

const EventHandlers = {
    handleRiskFactorYes() {
        console.log('handleRiskFactorYes 호출됨');
        try {
            appState.riskFactorSelection = { choiceMade: true, useRiskFactors: true, selectionComplete: false };
            console.log('상태 업데이트됨:', appState.riskFactorSelection);
            
            const yesBtn = ELEMENTS.riskFactorYes();
            const noBtn = ELEMENTS.riskFactorNo();
            
            if (yesBtn && noBtn) {
                yesBtn.classList.add('selected');
                noBtn.classList.remove('selected');
                console.log('버튼 스타일 업데이트됨');
    } else {
                console.error('버튼을 찾을 수 없습니다:', { yesBtn, noBtn });
            }
            
            // 위험인자 선택 창 숨기기 (예 선택 후)
            const choice = ELEMENTS.riskFactorChoice();
            if (choice) {
                choice.style.display = 'none';
                console.log('위험인자 선택 창 숨김');
            }
            
            const section = ELEMENTS.riskFactorsSection();
            if (section) {
                section.style.display = 'block';
                console.log('위험인자 섹션 표시됨');
            } else {
                console.error('위험인자 섹션을 찾을 수 없습니다');
            }
            
            const content = ELEMENTS.riskFactorsContent();
            if (content) {
                console.log('위험인자 콘텐츠 컨테이너 찾음');
                console.log('현재 콘텐츠:', content.innerHTML);
                
                // 무조건 새로 생성
                console.log('위험인자 섹션 강제 생성');
                RiskFactorManager.generateRiskFactorsSection();
                
                // 위험인자 섹션이 표시되면 조회 버튼과 완료 버튼 활성화
                ELEMENTS.healthSearchBtn().disabled = false;
                console.log('위험인자 섹션 표시됨 - 조회 버튼 활성화');
                
                // 완료 버튼도 확실히 활성화
                const completeBtn = ELEMENTS.completeRiskFactorBtn();
                if (completeBtn) {
                    completeBtn.disabled = false;
                    completeBtn.textContent = '위험인자 선택 완료';
                    console.log('완료 버튼 활성화됨');
                }
                
                // 생성 후 1초 뒤에 다시 확인
                setTimeout(() => {
                    const afterContent = content.innerHTML;
                    console.log('생성 후 콘텐츠:', afterContent);
                    const checkboxes = content.querySelectorAll('input[type="checkbox"]');
                    console.log('생성된 체크박스 개수:', checkboxes.length);
                    
                    if (checkboxes.length === 0) {
                        console.log('체크박스가 생성되지 않음. 간단한 버전으로 재시도');
                        window.createSimpleRiskFactors();
                    }
                    
                    // 완료 버튼 이벤트 리스너 재등록 (동적 생성된 경우를 위해)
                    const completeBtn = document.getElementById('completeRiskFactorBtn');
                    if (completeBtn && !completeBtn.hasAttribute('data-listener-added')) {
                        completeBtn.addEventListener('click', function(e) {
                            console.log('동적 완료 버튼 클릭됨');
                            if (!e.target.disabled) {
                                EventHandlers.handleCompleteRiskFactor();
                            }
                        });
                        completeBtn.setAttribute('data-listener-added', 'true');
                        console.log('동적 완료 버튼 이벤트 리스너 등록됨');
                    }
                    
                    // 성별에 따른 제한 적용
                    RiskFactorManager.applyGenderSpecificRestrictions();
                }, 1000);
        } else {
                console.error('위험인자 콘텐츠 컨테이너를 찾을 수 없습니다');
            }
            
            console.log('버튼 상태 재검증 시작');
            UIManager.validateInputsAndEnableButtons();
            console.log('handleRiskFactorYes 완료');
        } catch (error) {
            console.error('handleRiskFactorYes 오류:', error);
        }
    },
    
    handleRiskFactorNo() {
        console.log('handleRiskFactorNo 호출됨');
        try {
            appState.riskFactorSelection = { choiceMade: true, useRiskFactors: false, selectionComplete: true };
            console.log('상태 업데이트됨:', appState.riskFactorSelection);
            
            const yesBtn = ELEMENTS.riskFactorYes();
            const noBtn = ELEMENTS.riskFactorNo();
            
            if (yesBtn && noBtn) {
                yesBtn.classList.remove('selected');
                noBtn.classList.add('selected');
                console.log('버튼 스타일 업데이트됨');
        } else {
                console.error('버튼을 찾을 수 없습니다:', { yesBtn, noBtn });
            }
            
            // 위험인자 관련 섹션들 모두 숨기기
            const section = ELEMENTS.riskFactorsSection();
            const choice = ELEMENTS.riskFactorChoice();
            
            if (section) {
                section.style.display = 'none';
                console.log('위험인자 섹션 숨김');
            }
            
            if (choice) {
                choice.style.display = 'none';
                console.log('위험인자 선택 창 숨김');
            }
            
            document.querySelectorAll('input[name="riskFactor"], input[name="familyHistory"]').forEach(cb => {
                cb.checked = false;
            });
            
            userRiskCalculator.updateRiskFactors([], []);
            console.log('위험인자 초기화됨');
            
            // 위험인자 "아니오" 선택 시 조회 버튼 활성화
            ELEMENTS.healthSearchBtn().disabled = false;
            console.log('위험인자 아니오 선택 - 조회 버튼 활성화');
            
            // 결과 재표시 로직 추가
            const age = parseInt(ELEMENTS.age().value);
            const gender = ELEMENTS.gender().value;
            
            console.log('위험인자 아니오 후 재표시:', { age, gender });
            
            if (Utils.isValidAge(age) && Utils.isValidGender(gender)) {
                // 위험인자 "아니오" 선택 후 결과 표시
                console.log('위험인자 아니오 선택 - 결과 표시');
                
                // 결과창 다시 표시
                ELEMENTS.resultsSection().style.display = 'block';
                
                // 현재 메인 탭에 따라 적절한 결과 표시
                if (currentMainTab === 'cancer') {
                    ELEMENTS.cancerResultsColumn().style.display = 'block';
                    ELEMENTS.deathResultsColumn().style.display = 'none';
                    const results = DataProcessor.searchCancerData(age, gender);
                    if (results.length > 0) {
                        userRiskCalculator.setBaseCancerRates(results);
                        DisplayManager.displayResults(results, 'cancerResults', 'cancer');
                        console.log('기본 암확률 결과 표시 완료');
                    }
                } else {
                    ELEMENTS.cancerResultsColumn().style.display = 'none';
                    ELEMENTS.deathResultsColumn().style.display = 'block';
                    const lifeData = DataProcessor.getLifeTableData(age, gender);
                    DisplayManager.displayLifeTableInfo(age, gender, lifeData);
                    const deathResults = DataProcessor.searchDeathData(age, gender);
                    if (deathResults.length > 0) {
                        DisplayManager.displayResults(deathResults, 'deathResults', 'death');
                        console.log('사망확률 결과 표시 완료');
                    }
                }
            }
            
            console.log('버튼 상태 재검증 시작');
            UIManager.validateInputsAndEnableButtons();
            console.log('handleRiskFactorNo 완료');
        } catch (error) {
            console.error('handleRiskFactorNo 오류:', error);
        }
    },
    
    handleCompleteRiskFactor() {
        console.log('=== 위험인자 선택 완료 처리 시작 ===');
        
        appState.riskFactorSelection.selectionComplete = true;
        
        document.querySelectorAll('input[name="riskFactor"], input[name="familyHistory"]').forEach(cb => {
            cb.disabled = true;
        });
        
        const btn = ELEMENTS.completeRiskFactorBtn();
        btn.disabled = true;
        btn.textContent = '위험인자 선택 완료됨';
        
        // 결과 재표시 로직 추가
        const age = parseInt(ELEMENTS.age().value);
        const gender = ELEMENTS.gender().value;
        
        console.log('위험인자 완료 후 재표시:', { age, gender });
        
        if (Utils.isValidAge(age) && Utils.isValidGender(gender)) {
            // 위험인자 선택 완료 후 결과 표시
            console.log('위험인자 선택 완료 - 결과 표시');
            
            // 결과창 다시 표시
            ELEMENTS.resultsSection().style.display = 'block';
            
            // 현재 메인 탭에 따라 적절한 결과 표시
            if (currentMainTab === 'cancer') {
                ELEMENTS.cancerResultsColumn().style.display = 'block';
                ELEMENTS.deathResultsColumn().style.display = 'none';
                const results = DataProcessor.searchCancerData(age, gender);
                if (results.length > 0) {
                    // 올바른 순서: 1.기본률 저장 → 2.위험인자 적용 → 3.표시
                    userRiskCalculator.setBaseCancerRates(results);
                    const selected = RiskFactorManager.getSelectedRiskFactors();
                    userRiskCalculator.updateRiskFactors(selected.riskFactors, selected.familyHistory);
                    DisplayManager.displayResults(results, 'cancerResults', 'cancer');
                    console.log('위험인자 적용된 암 결과 표시 완료');
                }
            } else {
                ELEMENTS.cancerResultsColumn().style.display = 'none';
                ELEMENTS.deathResultsColumn().style.display = 'block';
                const lifeData = DataProcessor.getLifeTableData(age, gender);
                DisplayManager.displayLifeTableInfo(age, gender, lifeData);
                const deathResults = DataProcessor.searchDeathData(age, gender);
                if (deathResults.length > 0) {
                    DisplayManager.displayResults(deathResults, 'deathResults', 'death');
                    console.log('사망확률 결과 표시 완료');
                }
            }
        }
        
        UIManager.validateInputsAndEnableButtons();
        console.log('=== 위험인자 선택 완료 처리 끝 ===');
    }
};

// ============================================================================
// 12. 디버깅 함수들
// ============================================================================

window.debugRiskFactors = function() {
    console.log('=== 디버깅 정보 ===');
    console.log('위험인자 데이터:', typeof riskFactorData !== 'undefined');
    console.log('앱 상태:', appState.riskFactorSelection);
    console.log('사용자 계산기:', {
        age: userRiskCalculator.age,
        gender: userRiskCalculator.gender,
        riskFactors: userRiskCalculator.selectedRiskFactors.length
    });
    
    // 버튼 상태 확인
    const yesBtn = ELEMENTS.riskFactorYes();
    const noBtn = ELEMENTS.riskFactorNo();
    console.log('예 버튼:', yesBtn, '비활성화:', yesBtn?.disabled);
    console.log('아니오 버튼:', noBtn, '비활성화:', noBtn?.disabled);
    
    // 입력 필드 상태 확인
    const age = ELEMENTS.age().value;
    const gender = ELEMENTS.gender().value;
    console.log('나이:', age, '성별:', gender);
    console.log('유효성:', Utils.isValidAge(age), Utils.isValidGender(gender));
};

window.testYesButton = function() {
    console.log('예 버튼 테스트 클릭');
    EventHandlers.handleRiskFactorYes();
};

window.testNoButton = function() {
    console.log('아니오 버튼 테스트 클릭');
    EventHandlers.handleRiskFactorNo();
};

window.testRiskFactorGeneration = function() {
    console.log('위험인자 섹션 강제 생성 테스트');
    console.log('riskFactorData 존재:', typeof riskFactorData !== 'undefined');
    if (typeof riskFactorData !== 'undefined') {
        console.log('riskFactorData 키들:', Object.keys(riskFactorData));
        console.log('첫 번째 위험인자 데이터:', riskFactorData[Object.keys(riskFactorData)[0]]);
    }
    RiskFactorManager.generateRiskFactorsSection();
};

// 기본 위험인자 섹션 강제 생성 테스트
window.testBasicRiskFactors = function() {
    console.log('기본 위험인자 섹션 강제 생성 테스트');
    const container = ELEMENTS.riskFactorsContent();
    if (container) {
        RiskFactorManager.createBasicRiskFactorsSection(container);
            } else {
        console.error('컨테이너를 찾을 수 없습니다');
    }
};

// 매우 간단한 위험인자 섹션 생성 (최후의 수단)
window.createSimpleRiskFactors = function() {
    console.log('매우 간단한 위험인자 섹션 생성');
    const container = document.getElementById('riskFactorsContent');
    
    if (!container) {
        console.error('riskFactorsContent 컨테이너를 찾을 수 없습니다!');
        return;
    }
    
    const simpleHtml = `
        <div class="risk-category">
            <h3>일반 위험인자</h3>
            <div class="risk-factors-grid">
                <div class="risk-factor-item">
                    <label><input type="checkbox" name="riskFactor" value="흡연">흡연 (폐암 위험 증가)</label>
                </div>
                <div class="risk-factor-item">
                    <label><input type="checkbox" name="riskFactor" value="음주">음주 (간암 위험 증가)</label>
                </div>
                <div class="risk-factor-item">
                    <label><input type="checkbox" name="riskFactor" value="비만">비만 (유방암 위험 증가)</label>
                </div>
            </div>
        </div>
        <div class="risk-category">
            <h3>가족력</h3>
            <div class="family-history-grid">
                <div class="family-history-item">
                    <label><input type="checkbox" name="familyHistory" value="유방암 가족력">유방암 가족력 (위험 5배 증가)</label>
                </div>
                <div class="family-history-item">
                    <label><input type="checkbox" name="familyHistory" value="난소암 가족력">난소암 가족력 (위험 6배 증가)</label>
                </div>
                <div class="family-history-item">
                    <label><input type="checkbox" name="familyHistory" value="대장암 가족력">대장암 가족력 (위험 2배 증가)</label>
                </div>
                <div class="family-history-item">
                    <label><input type="checkbox" name="familyHistory" value="전립선암 가족력">전립선암 가족력 (위험 2.6배 증가)</label>
                </div>
                <div class="family-history-item">
                    <label><input type="checkbox" name="familyHistory" value="췌장암 가족력">췌장암 가족력 (위험 2배 증가)</label>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = simpleHtml;
    console.log('간단한 위험인자 섹션 생성 완료');
    
    // 위험인자 섹션 생성 완료 시 조회 버튼과 완료 버튼 활성화
    const healthBtn = document.getElementById('healthSearchBtn');
    if (healthBtn) {
        healthBtn.disabled = false;
        console.log('간단한 위험인자 섹션 생성됨 - 조회 버튼 활성화');
    }
    
    // 완료 버튼도 활성화
    const completeBtn = document.getElementById('completeRiskFactorBtn');
    if (completeBtn) {
        completeBtn.disabled = false;
        completeBtn.textContent = '위험인자 선택 완료';
        console.log('완료 버튼 활성화됨');
    }
    
    // 생성 확인
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    console.log('생성된 체크박스 개수:', checkboxes.length);
    
    // 성별에 따른 제한 적용
    setTimeout(() => {
        RiskFactorManager.applyGenderSpecificRestrictions();
    }, 100);
};

// ============================================================================
// 13. 초기화 및 이벤트 리스너 등록
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('건강계산기 초기화 시작');
    
    // 데이터 로드 상태 즉시 확인
    console.log('=== 데이터 로드 상태 확인 ===');
    console.log('cancerData 존재:', typeof cancerData !== 'undefined');
    console.log('cancerData5Year 존재:', typeof cancerData5Year !== 'undefined');
    console.log('riskFactorData 존재:', typeof riskFactorData !== 'undefined');
    
    if (typeof riskFactorData !== 'undefined') {
        console.log('✅ riskFactorData 로드 성공');
        console.log('위험인자 종류:', Object.keys(riskFactorData).length, '개');
        console.log('위험인자 목록:', Object.keys(riskFactorData).slice(0, 10));
    } else {
        console.error('❌ riskFactorData 로드 실패!');
        console.error('파일 경로를 확인하세요: ../risk-factors-data.js');
    }
    
    if (typeof cancerData5Year !== 'undefined') {
        console.log('cancerData5Year 키들:', Object.keys(cancerData5Year));
        if (cancerData5Year.female && cancerData5Year.female['70-74']) {
            const female7074 = cancerData5Year.female['70-74'];
            console.log('5개년 평균 - 여성 70-74세 데이터:');
            female7074.slice(0, 5).forEach((cancer, idx) => {
                console.log(`  ${idx + 1}. ${cancer.name}: ${cancer.rate}`);
            });
        }
    } else {
        console.error('❌ cancerData5Year가 로드되지 않았습니다!');
    }
    
    if (typeof cancerData !== 'undefined') {
        if (cancerData.female && cancerData.female['70-74']) {
            const female7074 = cancerData.female['70-74'];
            console.log('2022년 - 여성 70-74세 데이터:');
            female7074.slice(0, 5).forEach((cancer, idx) => {
                console.log(`  ${idx + 1}. ${cancer.name}: ${cancer.rate}`);
            });
        }
    }
    
    // 기본 이벤트 리스너 등록
    ELEMENTS.healthSearchBtn().addEventListener('click', SearchManager.performHealthSearch);
    ELEMENTS.resetBtn().addEventListener('click', UIManager.resetToInitialState);
    
    // 메인 탭 버튼 이벤트 리스너
    document.querySelectorAll('.main-tab-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const tabType = e.target.dataset.mainTab;
            SearchManager.switchMainTab(tabType);
        });
    });
    
    ELEMENTS.age().addEventListener('input', UIManager.validateInputsAndEnableButtons);
    ELEMENTS.gender().addEventListener('change', UIManager.validateInputsAndEnableButtons);
    
    // 위험인자 버튼 이벤트 등록
    const yesBtn = ELEMENTS.riskFactorYes();
    const noBtn = ELEMENTS.riskFactorNo();
    const completeBtn = ELEMENTS.completeRiskFactorBtn();
    
    if (yesBtn) {
        yesBtn.addEventListener('click', function(e) {
            console.log('예 버튼 클릭됨 - 버튼 상태:', e.target.disabled);
            if (!e.target.disabled) {
                EventHandlers.handleRiskFactorYes();
            } else {
                console.warn('예 버튼이 비활성화되어 있습니다');
            }
        });
        console.log('예 버튼 이벤트 리스너 등록됨');
    } else {
        console.error('예 버튼을 찾을 수 없습니다!');
    }
    
    if (noBtn) {
        noBtn.addEventListener('click', function(e) {
            console.log('아니오 버튼 클릭됨 - 버튼 상태:', e.target.disabled);
            if (!e.target.disabled) {
                EventHandlers.handleRiskFactorNo();
            } else {
                console.warn('아니오 버튼이 비활성화되어 있습니다');
            }
        });
        console.log('아니오 버튼 이벤트 리스너 등록됨');
    } else {
        console.error('아니오 버튼을 찾을 수 없습니다!');
    }
    
    if (completeBtn) {
        completeBtn.addEventListener('click', function(e) {
            console.log('완료 버튼 클릭됨 - 버튼 상태:', e.target.disabled);
            console.log('버튼 텍스트:', e.target.textContent);
            
            if (!e.target.disabled) {
                console.log('완료 버튼 처리 시작');
                EventHandlers.handleCompleteRiskFactor();
            } else {
                console.warn('완료 버튼이 비활성화되어 있습니다');
            }
        });
        console.log('완료 버튼 이벤트 리스너 등록됨');
    } else {
        console.error('완료 버튼을 찾을 수 없습니다!');
    }
    
    // 뷰 컨트롤 및 탭 이벤트
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const type = e.target.dataset.type;
            const limit = e.target.dataset.limit;
            
            document.querySelectorAll(`[data-type="${type}"]`).forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // 결과 재표시 로직
            if (type === 'cancer') {
                const age = parseInt(ELEMENTS.age().value);
                const gender = ELEMENTS.gender().value;
                
                if (Utils.isValidAge(age) && Utils.isValidGender(gender)) {
                    const results = DataProcessor.searchCancerData(age, gender);
                    if (results.length > 0) {
                        DisplayManager.displayResults(results, 'cancerResults', 'cancer');
                    }
                }
            } else if (type === 'death') {
                const age = parseInt(ELEMENTS.age().value);
                const gender = ELEMENTS.gender().value;
                
                if (Utils.isValidAge(age) && Utils.isValidGender(gender)) {
                    const results = DataProcessor.searchDeathData(age, gender);
                    if (results.length > 0) {
                        DisplayManager.displayResults(results, 'deathResults', 'death');
                    }
                }
            }
        });
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const tabType = e.target.getAttribute('data-tab');
            
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            if (tabType === 'current' || tabType === 'average') {
                currentTab = tabType;
                
                // 데이터 안내 메시지 표시/숨김
                const dataNotice = document.getElementById('dataNotice');
                if (dataNotice) {
                    dataNotice.style.display = tabType === 'average' ? 'block' : 'none';
                }
                
                // 암 데이터 재표시
                const age = parseInt(ELEMENTS.age().value);
                const gender = ELEMENTS.gender().value;
                
                if (Utils.isValidAge(age) && Utils.isValidGender(gender)) {
                    const results = DataProcessor.searchCancerData(age, gender);
                    if (results.length > 0) {
                        // 탭 전환 시에도 기본 암 발생률 재설정 (위험인자 계산을 위해)
                        userRiskCalculator.setBaseCancerRates(results);
                        
                        // 위험인자가 적용되어 있다면 재적용
                        if (appState.riskFactorSelection.useRiskFactors && appState.riskFactorSelection.selectionComplete) {
                            const selected = RiskFactorManager.getSelectedRiskFactors();
                            userRiskCalculator.updateRiskFactors(selected.riskFactors, selected.familyHistory);
                        }
                        
                        DisplayManager.displayResults(results, 'cancerResults', 'cancer');
                    }
                }
            } else if (tabType === 'life-current' || tabType === 'life-average') {
                currentLifeTab = tabType;
                
                // 사망원인 데이터만 재표시 (생명표 정보는 탭과 무관하게 고정)
                const age = parseInt(ELEMENTS.age().value);
                const gender = ELEMENTS.gender().value;
                
                if (Utils.isValidAge(age) && Utils.isValidGender(gender)) {
                    const results = DataProcessor.searchDeathData(age, gender);
                    if (results.length > 0) {
                        DisplayManager.displayResults(results, 'deathResults', 'death');
                    }
                }
            }
        });
    });
    
    // 위험인자 섹션 초기화
    setTimeout(() => {
        if (DataManager.checkRiskFactorDataLoaded()) {
            RiskFactorManager.generateRiskFactorsSection();
        }
    }, CONFIG.INIT_DELAY);
    
    // 초기 검증
    UIManager.validateInputsAndEnableButtons();
    
    console.log('건강계산기 초기화 완료');
});

// 강제 완전 리셋 함수 (최후의 수단)
window.forceReset = function() {
    console.log('=== 강제 완전 리셋 시작 ===');
    
    try {
        // 모든 입력 필드 초기화
        const ageInput = document.getElementById('age');
        const genderSelect = document.getElementById('gender');
        if (ageInput) ageInput.value = '';
        if (genderSelect) genderSelect.value = '';
        
        // 모든 버튼 상태 초기화
        const buttons = [
            'healthSearchBtn', 'resetBtn',
            'riskFactorYes', 'riskFactorNo', 'completeRiskFactorBtn'
        ];
        
        buttons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.disabled = btnId === 'healthSearchBtn';
                btn.style.display = btnId === 'resetBtn' ? 'none' : 'inline-block';
                btn.classList.remove('selected');
                if (btnId === 'completeRiskFactorBtn') {
                    btn.textContent = '위험인자 선택 완료';
                }
            }
        });
        
        // 모든 섹션 숨기기
        const sections = [
            'resultsSection', 'cancerResultsColumn', 'deathResultsColumn',
            'riskFactorChoice', 'riskFactorsSection'
        ];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'none';
            }
        });
        
        // 모든 결과 내용 초기화
        const resultContainers = ['cancerResults', 'deathResults', 'lifeTableInfo', 'riskFactorsContent'];
        resultContainers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = '';
            }
        });
        
        // 모든 체크박스 초기화
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
            checkbox.disabled = false;
        });
        
        // 전역 상태 초기화
        currentMainTab = 'cancer';
        currentTab = 'current';
        currentLifeTab = 'life-current';
        appState.reset();
        userRiskCalculator.reset();
        
        // 탭 버튼 초기화
        document.querySelectorAll('.main-tab-btn, .tab-btn, .view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector('.main-tab-btn[data-main-tab="cancer"]')?.classList.add('active');
        document.querySelector('.tab-btn[data-tab="current"]')?.classList.add('active');
        document.querySelector('.tab-btn[data-tab="life-current"]')?.classList.add('active');
        document.querySelector('.view-btn[data-type="cancer"][data-limit="5"]')?.classList.add('active');
        document.querySelector('.view-btn[data-type="death"][data-limit="5"]')?.classList.add('active');
        
        console.log('=== 강제 완전 리셋 완료 ===');
        
        } catch (error) {
        console.error('강제 리셋 중 오류:', error);
        console.log('페이지 새로고침으로 최종 리셋');
        location.reload();
    }
};

// 위험인자 매칭 테스트 함수
window.testRiskFactorMatching = function() {
    console.log('=== 위험인자 매칭 테스트 ===');
    
    // riskFactorData 확인
    if (typeof riskFactorData === 'undefined') {
        console.error('❌ riskFactorData가 로드되지 않음');
        return;
    }
    
    console.log('✅ riskFactorData 로드됨');
    console.log('위험인자 종류:', Object.keys(riskFactorData));
    
    // 현재 사용자 계산기 상태 확인
    console.log('\n현재 사용자 계산기 상태:');
    console.log('기본 암종 수:', Object.keys(userRiskCalculator.baseCancerRates).length);
    console.log('기본 암종 목록:', Object.keys(userRiskCalculator.baseCancerRates).slice(0, 10));
    
    // 흡연 위험인자 매칭 테스트
    console.log('\n흡연 위험인자 매칭 테스트:');
    if (riskFactorData["흡연"]) {
        riskFactorData["흡연"].forEach(risk => {
            const matched = userRiskCalculator.findMatchingCancer(risk.cancer);
            console.log(`  ${risk.cancer} (효과: ${risk.effect}배) → ${matched || '매칭 실패'}`);
        });
    }
    
    // 음주 위험인자 매칭 테스트
    console.log('\n음주 위험인자 매칭 테스트:');
    if (riskFactorData["음주"]) {
        riskFactorData["음주"].forEach(risk => {
            const matched = userRiskCalculator.findMatchingCancer(risk.cancer);
            console.log(`  ${risk.cancer} (효과: ${risk.effect}배) → ${matched || '매칭 실패'}`);
        });
    }
};

// 완료 버튼 테스트 함수
window.testCompleteButton = function() {
    console.log('=== 완료 버튼 상태 테스트 ===');
    
    const completeBtn = document.getElementById('completeRiskFactorBtn');
    if (completeBtn) {
        console.log('완료 버튼 찾음:', completeBtn);
        console.log('비활성화 상태:', completeBtn.disabled);
        console.log('텍스트:', completeBtn.textContent);
        console.log('표시 여부:', completeBtn.style.display);
        console.log('클릭 가능:', !completeBtn.disabled);
        
        // 강제 클릭 테스트
        if (!completeBtn.disabled) {
            console.log('완료 버튼 강제 클릭 테스트');
            completeBtn.click();
        } else {
            console.log('완료 버튼이 비활성화되어 있어 클릭할 수 없음');
        }
    } else {
        console.error('완료 버튼을 찾을 수 없습니다!');
    }
    
    // 앱 상태 확인
    console.log('앱 상태:', appState.riskFactorSelection);
};

// 연령대 매핑 테스트 함수
window.testAgeMapping = function(age) {
    console.log(`=== 연령대 매핑 테스트: ${age}세 ===`);
    const ageGroup = Utils.getAgeGroup(age);
    console.log(`결과: ${age}세 → ${ageGroup}`);
    
    // 실제 데이터 확인
    if (typeof cancerData5Year !== 'undefined') {
        const femaleData = cancerData5Year.female[ageGroup];
        if (femaleData) {
            console.log(`5개년 평균 여성 ${ageGroup} 데이터:`);
            femaleData.slice(0, 3).forEach((cancer, idx) => {
                console.log(`  ${idx + 1}. ${cancer.name}: ${cancer.rate}`);
            });
        }
    }
    
    if (typeof cancerData !== 'undefined') {
        const femaleData = cancerData.female[ageGroup];
        if (femaleData) {
            console.log(`2022년 여성 ${ageGroup} 데이터:`);
            femaleData.slice(0, 3).forEach((cancer, idx) => {
                console.log(`  ${idx + 1}. ${cancer.name}: ${cancer.rate}`);
            });
        }
    }
};

// 추가 테스트 함수들
window.testRiskFactorGeneration = function() {
    console.log('위험인자 섹션 강제 생성 테스트');
    console.log('riskFactorData 존재:', typeof riskFactorData !== 'undefined');
    if (typeof riskFactorData !== 'undefined') {
        console.log('riskFactorData 키들:', Object.keys(riskFactorData));
        console.log('첫 번째 위험인자 데이터:', riskFactorData[Object.keys(riskFactorData)[0]]);
    }
    RiskFactorManager.generateRiskFactorsSection();
};

window.testBasicRiskFactors = function() {
    console.log('기본 위험인자 섹션 강제 생성 테스트');
    const container = ELEMENTS.riskFactorsContent();
    if (container) {
        RiskFactorManager.createBasicRiskFactorsSection(container);
    } else {
        console.error('컨테이너를 찾을 수 없습니다');
    }
};

// 매우 간단한 위험인자 섹션 생성 (최후의 수단)
window.createSimpleRiskFactors = function() {
    console.log('매우 간단한 위험인자 섹션 생성');
    const container = document.getElementById('riskFactorsContent');
    
    if (!container) {
        console.error('riskFactorsContent 컨테이너를 찾을 수 없습니다!');
        return;
    }
    
    const simpleHtml = `
        <div class="risk-category">
            <h3>일반 위험인자</h3>
            <div class="risk-factors-grid">
                <div class="risk-factor-item">
                    <label><input type="checkbox" name="riskFactor" value="흡연">흡연 (폐암 위험 증가)</label>
                </div>
                <div class="risk-factor-item">
                    <label><input type="checkbox" name="riskFactor" value="음주">음주 (간암 위험 증가)</label>
                </div>
                <div class="risk-factor-item">
                    <label><input type="checkbox" name="riskFactor" value="비만">비만 (유방암 위험 증가)</label>
                </div>
            </div>
        </div>
        <div class="risk-category">
            <h3>가족력</h3>
            <div class="family-history-grid">
                <div class="family-history-item">
                    <label><input type="checkbox" name="familyHistory" value="유방암 가족력">유방암 가족력 (위험 5배 증가)</label>
                </div>
                <div class="family-history-item">
                    <label><input type="checkbox" name="familyHistory" value="난소암 가족력">난소암 가족력 (위험 6배 증가)</label>
                </div>
                <div class="family-history-item">
                    <label><input type="checkbox" name="familyHistory" value="대장암 가족력">대장암 가족력 (위험 2배 증가)</label>
                </div>
                <div class="family-history-item">
                    <label><input type="checkbox" name="familyHistory" value="전립선암 가족력">전립선암 가족력 (위험 2.6배 증가)</label>
                </div>
                <div class="family-history-item">
                    <label><input type="checkbox" name="familyHistory" value="췌장암 가족력">췌장암 가족력 (위험 2배 증가)</label>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = simpleHtml;
    console.log('간단한 위험인자 섹션 생성 완료');
    
    // 위험인자 섹션 생성 완료 시 조회 버튼과 완료 버튼 활성화
    const healthBtn = document.getElementById('healthSearchBtn');
    if (healthBtn) {
        healthBtn.disabled = false;
        console.log('간단한 위험인자 섹션 생성됨 - 조회 버튼 활성화');
    }
    
    // 완료 버튼도 활성화
    const completeBtn = document.getElementById('completeRiskFactorBtn');
    if (completeBtn) {
        completeBtn.disabled = false;
        completeBtn.textContent = '위험인자 선택 완료';
        console.log('완료 버튼 활성화됨');
    }
    
    // 생성 확인
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    console.log('생성된 체크박스 개수:', checkboxes.length);
    
    // 성별에 따른 제한 적용
    setTimeout(() => {
        RiskFactorManager.applyGenderSpecificRestrictions();
    }, 100);
};
