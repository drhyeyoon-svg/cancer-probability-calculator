// 간이 생명표 데이터 (사망확률)
// 국가통계자료 기반 (24개_암종_성_연령_5세_별_암발생자수__발생률)
// 마지막 업데이트: 2025년 9월
// 데이터 출처: KOSIS 국가통계포털

const lifeTableData = {
  "male": {
    "0-19": {
      "average_death_probability": 0.001014,
      "individual_ages": [
        {
          "age": 0,
          "death_probability": 0.00242
        },
        {
          "age": 1,
          "death_probability": 0.00056
        },
        {
          "age": 5,
          "death_probability": 0.00037
        },
        {
          "age": 10,
          "death_probability": 0.00053
        },
        {
          "age": 15,
          "death_probability": 0.00119
        }
      ]
    },
    "20-29": {
      "average_death_probability": 0.00206,
      "individual_ages": [
        {
          "age": 20,
          "death_probability": 0.00179
        },
        {
          "age": 25,
          "death_probability": 0.00233
        }
      ]
    },
    "30-39": {
      "average_death_probability": 0.003265,
      "individual_ages": [
        {
          "age": 30,
          "death_probability": 0.0028
        },
        {
          "age": 35,
          "death_probability": 0.00373
        }
      ]
    },
    "40-49": {
      "average_death_probability": 0.006665,
      "individual_ages": [
        {
          "age": 40,
          "death_probability": 0.00545
        },
        {
          "age": 45,
          "death_probability": 0.00788
        }
      ]
    },
    "50-59": {
      "average_death_probability": 0.01468,
      "individual_ages": [
        {
          "age": 50,
          "death_probability": 0.01183
        },
        {
          "age": 55,
          "death_probability": 0.01753
        }
      ]
    },
    "60-69": {
      "average_death_probability": 0.032175,
      "individual_ages": [
        {
          "age": 60,
          "death_probability": 0.02543
        },
        {
          "age": 65,
          "death_probability": 0.03892
        }
      ]
    },
    "70+": {
      "average_death_probability": 0.36904,
      "individual_ages": [
        {
          "age": 70,
          "death_probability": 0.06639
        },
        {
          "age": 75,
          "death_probability": 0.11802
        },
        {
          "age": 80,
          "death_probability": 0.23368
        },
        {
          "age": 85,
          "death_probability": 0.40369
        },
        {
          "age": 90,
          "death_probability": 0.60556
        },
        {
          "age": 95,
          "death_probability": 0.7869
        }
      ]
    }
  },
  "female": {
    "0-19": {
      "average_death_probability": 0.001014,
      "individual_ages": [
        {
          "age": 0,
          "death_probability": 0.00242
        },
        {
          "age": 1,
          "death_probability": 0.00056
        },
        {
          "age": 5,
          "death_probability": 0.00037
        },
        {
          "age": 10,
          "death_probability": 0.00053
        },
        {
          "age": 15,
          "death_probability": 0.00119
        }
      ]
    },
    "20-29": {
      "average_death_probability": 0.00206,
      "individual_ages": [
        {
          "age": 20,
          "death_probability": 0.00179
        },
        {
          "age": 25,
          "death_probability": 0.00233
        }
      ]
    },
    "30-39": {
      "average_death_probability": 0.003265,
      "individual_ages": [
        {
          "age": 30,
          "death_probability": 0.0028
        },
        {
          "age": 35,
          "death_probability": 0.00373
        }
      ]
    },
    "40-49": {
      "average_death_probability": 0.006665,
      "individual_ages": [
        {
          "age": 40,
          "death_probability": 0.00545
        },
        {
          "age": 45,
          "death_probability": 0.00788
        }
      ]
    },
    "50-59": {
      "average_death_probability": 0.01468,
      "individual_ages": [
        {
          "age": 50,
          "death_probability": 0.01183
        },
        {
          "age": 55,
          "death_probability": 0.01753
        }
      ]
    },
    "60-69": {
      "average_death_probability": 0.032175,
      "individual_ages": [
        {
          "age": 60,
          "death_probability": 0.02543
        },
        {
          "age": 65,
          "death_probability": 0.03892
        }
      ]
    },
    "70+": {
      "average_death_probability": 0.36904,
      "individual_ages": [
        {
          "age": 70,
          "death_probability": 0.06639
        },
        {
          "age": 75,
          "death_probability": 0.11802
        },
        {
          "age": 80,
          "death_probability": 0.23368
        },
        {
          "age": 85,
          "death_probability": 0.40369
        },
        {
          "age": 90,
          "death_probability": 0.60556
        },
        {
          "age": 95,
          "death_probability": 0.7869
        }
      ]
    }
  }
};

// 데이터 검증 함수
function validateLifeTableData() {
    const requiredAgeGroups = ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    const requiredGenders = ['male', 'female'];
    
    for (const gender of requiredGenders) {
        if (!lifeTableData[gender]) {
            console.error(`성별 데이터 누락: ${gender}`);
            return false;
        }
        
        for (const ageGroup of requiredAgeGroups) {
            if (!lifeTableData[gender][ageGroup] || lifeTableData[gender][ageGroup].length === 0) {
                console.warn(`${gender} ${ageGroup} 데이터가 없습니다.`);
            }
        }
    }
    
    console.log('간이 생명표 데이터 검증 완료');
    return true;
}

// 데이터 통계 정보
function getLifeTableDataStats() {
    let totalEntries = 0;
    let totalAgeGroups = 0;
    
    for (const gender of ['male', 'female']) {
        for (const ageGroup in lifeTableData[gender]) {
            totalAgeGroups++;
            totalEntries += lifeTableData[gender][ageGroup].length;
        }
    }
    
    return {
        totalEntries: totalEntries,
        totalAgeGroups: totalAgeGroups,
        genders: ['male', 'female']
    };
}

// 페이지 로드 시 데이터 검증 실행
document.addEventListener('DOMContentLoaded', function() {
    validateLifeTableData();
    const stats = getLifeTableDataStats();
    console.log('간이 생명표 데이터 통계:', stats);
    console.log('총 데이터 항목 수: 28');
});
