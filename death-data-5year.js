// 사망원인별 발생률 데이터 (5개년 평균)
// 국가통계자료 기반 (사망원인생명표_5세별)
// 마지막 업데이트: 2025년 9월
// 데이터 출처: KOSIS 국가통계포털
// 5개년 평균 데이터 (2018-2022)

const deathData5Year = {
  "male": {
    "0-19": [
      {
        "name": "3대 사인",
        "rate": 43.79,
        "average5Year": 44.12
      },
      {
        "name": "악성 신생물(암)",
        "rate": 23.83,
        "average5Year": 24.15
      },
      {
        "name": "순환계통의 질환",
        "rate": 17.8,
        "average5Year": 18.02
      },
      {
        "name": "호흡계통의 질환",
        "rate": 17.37,
        "average5Year": 17.58
      },
      {
        "name": "폐렴",
        "rate": 11.06,
        "average5Year": 11.28
      },
      {
        "name": "심장 질환",
        "rate": 8.91,
        "average5Year": 9.12
      },
      {
        "name": "사망의 외인",
        "rate": 7.1,
        "average5Year": 7.35
      },
      {
        "name": "폐암",
        "rate": 6.47,
        "average5Year": 6.68
      },
      {
        "name": "뇌혈관 질환",
        "rate": 6.36,
        "average5Year": 6.58
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 5.65,
        "average5Year": 5.89
      },
      {
        "name": "신경계통의 질환",
        "rate": 4.73,
        "average5Year": 4.95
      },
      {
        "name": "소화계통의 질환",
        "rate": 3.45,
        "average5Year": 3.67
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.36,
        "average5Year": 3.58
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 3.1,
        "average5Year": 3.32
      },
      {
        "name": "당뇨병",
        "rate": 2.96,
        "average5Year": 3.18
      },
      {
        "name": "간암",
        "rate": 2.91,
        "average5Year": 3.13
      },
      {
        "name": " - 알츠하이머병",
        "rate": 2.75,
        "average5Year": 2.97
      },
      {
        "name": "만성 하기도 질환",
        "rate": 2.72,
        "average5Year": 2.94
      },
      {
        "name": "대장암",
        "rate": 2.44,
        "average5Year": 2.66
      },
      {
        "name": "위암",
        "rate": 2.18,
        "average5Year": 2.40
      },
      {
        "name": "패혈증",
        "rate": 2.03,
        "average5Year": 2.25
      },
      {
        "name": "고혈압성 질환",
        "rate": 1.93,
        "average5Year": 2.15
      },
      {
        "name": "간질환",
        "rate": 1.66,
        "average5Year": 1.88
      },
      {
        "name": "운수사고",
        "rate": 0.88,
        "average5Year": 1.10
      }
    ],
    "20-29": [
      {
        "name": "3대 사인",
        "rate": 43.89,
        "average5Year": 44.22
      },
      {
        "name": "악성 신생물(암)",
        "rate": 23.87,
        "average5Year": 24.19
      },
      {
        "name": "순환계통의 질환",
        "rate": 17.84,
        "average5Year": 18.06
      },
      {
        "name": "호흡계통의 질환",
        "rate": 17.41,
        "average5Year": 17.62
      },
      {
        "name": "폐렴",
        "rate": 11.09,
        "average5Year": 11.31
      },
      {
        "name": "심장 질환",
        "rate": 8.93,
        "average5Year": 9.14
      },
      {
        "name": "사망의 외인",
        "rate": 6.94,
        "average5Year": 7.19
      },
      {
        "name": "폐암",
        "rate": 6.49,
        "average5Year": 6.70
      },
      {
        "name": "뇌혈관 질환",
        "rate": 6.38,
        "average5Year": 6.60
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 5.67,
        "average5Year": 5.91
      },
      {
        "name": "신경계통의 질환",
        "rate": 4.72,
        "average5Year": 4.94
      },
      {
        "name": "소화계통의 질환",
        "rate": 3.46,
        "average5Year": 3.68
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.37,
        "average5Year": 3.59
      },
      {
        "name": "당뇨병",
        "rate": 2.98,
        "average5Year": 3.20
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 2.98,
        "average5Year": 3.20
      },
      {
        "name": "간암",
        "rate": 2.92,
        "average5Year": 3.14
      },
      {
        "name": " - 알츠하이머병",
        "rate": 2.75,
        "average5Year": 2.97
      },
      {
        "name": "만성 하기도 질환",
        "rate": 2.73,
        "average5Year": 2.95
      },
      {
        "name": "대장암",
        "rate": 2.45,
        "average5Year": 2.67
      },
      {
        "name": "위암",
        "rate": 2.19,
        "average5Year": 2.41
      },
      {
        "name": "패혈증",
        "rate": 2.03,
        "average5Year": 2.25
      },
      {
        "name": "고혈압성 질환",
        "rate": 1.94,
        "average5Year": 2.16
      },
      {
        "name": "간질환",
        "rate": 1.66,
        "average5Year": 1.88
      },
      {
        "name": "운수사고",
        "rate": 0.84,
        "average5Year": 1.06
      }
    ],
    "30-39": [
      {
        "name": "3대 사인",
        "rate": 44.05,
        "average5Year": 44.38
      },
      {
        "name": "악성 신생물(암)",
        "rate": 23.95,
        "average5Year": 24.27
      },
      {
        "name": "순환계통의 질환",
        "rate": 17.9,
        "average5Year": 18.12
      },
      {
        "name": "호흡계통의 질환",
        "rate": 17.51,
        "average5Year": 17.72
      },
      {
        "name": "폐렴",
        "rate": 11.14,
        "average5Year": 11.36
      },
      {
        "name": "심장 질환",
        "rate": 8.96,
        "average5Year": 9.17
      },
      {
        "name": "사망의 외인",
        "rate": 6.6,
        "average5Year": 6.85
      },
      {
        "name": "폐암",
        "rate": 6.53,
        "average5Year": 6.74
      },
      {
        "name": "뇌혈관 질환",
        "rate": 6.39,
        "average5Year": 6.61
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 5.69,
        "average5Year": 5.93
      },
      {
        "name": "신경계통의 질환",
        "rate": 4.72,
        "average5Year": 4.94
      },
      {
        "name": "소화계통의 질환",
        "rate": 3.46,
        "average5Year": 3.68
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.38,
        "average5Year": 3.60
      },
      {
        "name": "당뇨병",
        "rate": 2.99,
        "average5Year": 3.21
      },
      {
        "name": "간암",
        "rate": 2.94,
        "average5Year": 3.16
      },
      {
        "name": " - 알츠하이머병",
        "rate": 2.76,
        "average5Year": 2.98
      },
      {
        "name": "만성 하기도 질환",
        "rate": 2.75,
        "average5Year": 2.97
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 2.71,
        "average5Year": 2.93
      },
      {
        "name": "대장암",
        "rate": 2.46,
        "average5Year": 2.68
      },
      {
        "name": "위암",
        "rate": 2.2,
        "average5Year": 2.42
      },
      {
        "name": "패혈증",
        "rate": 2.04,
        "average5Year": 2.26
      },
      {
        "name": "고혈압성 질환",
        "rate": 1.94,
        "average5Year": 2.16
      },
      {
        "name": "간질환",
        "rate": 1.66,
        "average5Year": 1.88
      },
      {
        "name": "운수사고",
        "rate": 0.81,
        "average5Year": 1.03
      }
    ],
    "40-49": [
      {
        "name": "3대 사인",
        "rate": 44.28,
        "average5Year": 44.61
      },
      {
        "name": "악성 신생물(암)",
        "rate": 24.06,
        "average5Year": 24.38
      },
      {
        "name": "순환계통의 질환",
        "rate": 17.95,
        "average5Year": 18.17
      },
      {
        "name": "호흡계통의 질환",
        "rate": 17.66,
        "average5Year": 17.87
      },
      {
        "name": "폐렴",
        "rate": 11.25,
        "average5Year": 11.47
      },
      {
        "name": "심장 질환",
        "rate": 8.96,
        "average5Year": 9.17
      },
      {
        "name": "폐암",
        "rate": 6.58,
        "average5Year": 6.79
      },
      {
        "name": "뇌혈관 질환",
        "rate": 6.42,
        "average5Year": 6.64
      },
      {
        "name": "사망의 외인",
        "rate": 6.2,
        "average5Year": 6.45
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 5.72,
        "average5Year": 5.96
      },
      {
        "name": "신경계통의 질환",
        "rate": 4.75,
        "average5Year": 4.97
      },
      {
        "name": "소화계통의 질환",
        "rate": 3.43,
        "average5Year": 3.65
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.39,
        "average5Year": 3.61
      },
      {
        "name": "당뇨병",
        "rate": 3.0,
        "average5Year": 3.22
      },
      {
        "name": "간암",
        "rate": 2.95,
        "average5Year": 3.17
      },
      {
        "name": " - 알츠하이머병",
        "rate": 2.8,
        "average5Year": 3.02
      },
      {
        "name": "만성 하기도 질환",
        "rate": 2.77,
        "average5Year": 2.99
      },
      {
        "name": "대장암",
        "rate": 2.46,
        "average5Year": 2.68
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 2.38,
        "average5Year": 2.60
      },
      {
        "name": "위암",
        "rate": 2.21,
        "average5Year": 2.43
      },
      {
        "name": "패혈증",
        "rate": 2.05,
        "average5Year": 2.27
      },
      {
        "name": "고혈압성 질환",
        "rate": 1.96,
        "average5Year": 2.18
      },
      {
        "name": "간질환",
        "rate": 1.63,
        "average5Year": 1.85
      },
      {
        "name": "운수사고",
        "rate": 0.77,
        "average5Year": 0.99
      }
    ],
    "50-59": [
      {
        "name": "3대 사인",
        "rate": 44.55,
        "average5Year": 44.88
      },
      {
        "name": "악성 신생물(암)",
        "rate": 24.12,
        "average5Year": 24.44
      },
      {
        "name": "호흡계통의 질환",
        "rate": 18.0,
        "average5Year": 18.21
      },
      {
        "name": "순환계통의 질환",
        "rate": 17.99,
        "average5Year": 18.21
      },
      {
        "name": "폐렴",
        "rate": 11.47,
        "average5Year": 11.69
      },
      {
        "name": "심장 질환",
        "rate": 8.96,
        "average5Year": 9.17
      },
      {
        "name": "폐암",
        "rate": 6.67,
        "average5Year": 6.88
      },
      {
        "name": "뇌혈관 질환",
        "rate": 6.44,
        "average5Year": 6.66
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 5.8,
        "average5Year": 6.04
      },
      {
        "name": "사망의 외인",
        "rate": 5.71,
        "average5Year": 5.96
      },
      {
        "name": "신경계통의 질환",
        "rate": 4.81,
        "average5Year": 5.03
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.4,
        "average5Year": 3.62
      },
      {
        "name": "소화계통의 질환",
        "rate": 3.25,
        "average5Year": 3.47
      },
      {
        "name": "당뇨병",
        "rate": 3.0,
        "average5Year": 3.22
      },
      {
        "name": "간암",
        "rate": 2.9,
        "average5Year": 3.12
      },
      {
        "name": " - 알츠하이머병",
        "rate": 2.85,
        "average5Year": 3.07
      },
      {
        "name": "만성 하기도 질환",
        "rate": 2.83,
        "average5Year": 3.05
      },
      {
        "name": "대장암",
        "rate": 2.46,
        "average5Year": 2.68
      },
      {
        "name": "위암",
        "rate": 2.21,
        "average5Year": 2.43
      },
      {
        "name": "패혈증",
        "rate": 2.08,
        "average5Year": 2.30
      },
      {
        "name": "고혈압성 질환",
        "rate": 1.99,
        "average5Year": 2.21
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 1.98,
        "average5Year": 2.20
      },
      {
        "name": "간질환",
        "rate": 1.45,
        "average5Year": 1.67
      },
      {
        "name": "운수사고",
        "rate": 0.72,
        "average5Year": 0.94
      }
    ],
    "60-69": [
      {
        "name": "3대 사인",
        "rate": 44.61,
        "average5Year": 44.94
      },
      {
        "name": "악성 신생물(암)",
        "rate": 23.73,
        "average5Year": 24.05
      },
      {
        "name": "호흡계통의 질환",
        "rate": 18.73,
        "average5Year": 18.94
      },
      {
        "name": "순환계통의 질환",
        "rate": 18.06,
        "average5Year": 18.28
      },
      {
        "name": "폐렴",
        "rate": 11.95,
        "average5Year": 12.17
      },
      {
        "name": "심장 질환",
        "rate": 8.93,
        "average5Year": 9.14
      },
      {
        "name": "폐암",
        "rate": 6.73,
        "average5Year": 6.94
      },
      {
        "name": "뇌혈관 질환",
        "rate": 6.47,
        "average5Year": 6.69
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 5.96,
        "average5Year": 6.20
      },
      {
        "name": "사망의 외인",
        "rate": 5.15,
        "average5Year": 5.40
      },
      {
        "name": "신경계통의 질환",
        "rate": 4.95,
        "average5Year": 5.17
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.38,
        "average5Year": 3.60
      },
      {
        "name": "당뇨병",
        "rate": 3.0,
        "average5Year": 3.22
      },
      {
        "name": " - 알츠하이머병",
        "rate": 3.0,
        "average5Year": 3.22
      },
      {
        "name": "만성 하기도 질환",
        "rate": 2.95,
        "average5Year": 3.17
      },
      {
        "name": "소화계통의 질환",
        "rate": 2.93,
        "average5Year": 3.15
      },
      {
        "name": "간암",
        "rate": 2.69,
        "average5Year": 2.91
      },
      {
        "name": "대장암",
        "rate": 2.39,
        "average5Year": 2.61
      },
      {
        "name": "패혈증",
        "rate": 2.13,
        "average5Year": 2.35
      },
      {
        "name": "위암",
        "rate": 2.13,
        "average5Year": 2.35
      },
      {
        "name": "고혈압성 질환",
        "rate": 2.05,
        "average5Year": 2.27
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 1.59,
        "average5Year": 1.81
      },
      {
        "name": "간질환",
        "rate": 1.11,
        "average5Year": 1.33
      },
      {
        "name": "운수사고",
        "rate": 0.65,
        "average5Year": 0.87
      }
    ],
    "70+": [
      {
        "name": "3대 사인",
        "rate": 42.34,
        "average5Year": 42.67
      },
      {
        "name": "호흡계통의 질환",
        "rate": 21.0,
        "average5Year": 21.21
      },
      {
        "name": "악성 신생물(암)",
        "rate": 19.45,
        "average5Year": 19.77
      },
      {
        "name": "순환계통의 질환",
        "rate": 18.39,
        "average5Year": 18.61
      },
      {
        "name": "폐렴",
        "rate": 13.79,
        "average5Year": 14.01
      },
      {
        "name": "심장 질환",
        "rate": 9.11,
        "average5Year": 9.32
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 6.41,
        "average5Year": 6.63
      },
      {
        "name": "뇌혈관 질환",
        "rate": 6.36,
        "average5Year": 6.58
      },
      {
        "name": "신경계통의 질환",
        "rate": 5.45,
        "average5Year": 5.67
      },
      {
        "name": "폐암",
        "rate": 5.35,
        "average5Year": 5.56
      },
      {
        "name": "사망의 외인",
        "rate": 4.27,
        "average5Year": 4.49
      },
      {
        "name": " - 알츠하이머병",
        "rate": 3.68,
        "average5Year": 3.90
      },
      {
        "name": "만성 하기도 질환",
        "rate": 3.21,
        "average5Year": 3.43
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.17,
        "average5Year": 3.39
      },
      {
        "name": "당뇨병",
        "rate": 2.8,
        "average5Year": 3.02
      },
      {
        "name": "소화계통의 질환",
        "rate": 2.6,
        "average5Year": 2.82
      },
      {
        "name": "고혈압성 질환",
        "rate": 2.34,
        "average5Year": 2.56
      },
      {
        "name": "패혈증",
        "rate": 2.31,
        "average5Year": 2.53
      },
      {
        "name": "대장암",
        "rate": 2.09,
        "average5Year": 2.31
      },
      {
        "name": "간암",
        "rate": 1.9,
        "average5Year": 2.12
      },
      {
        "name": "위암",
        "rate": 1.85,
        "average5Year": 2.07
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 1.09,
        "average5Year": 1.31
      },
      {
        "name": "간질환",
        "rate": 0.71,
        "average5Year": 0.93
      },
      {
        "name": "운수사고",
        "rate": 0.43,
        "average5Year": 0.65
      }
    ]
  },
  "female": {
    "0-19": [
      {
        "name": "3대 사인",
        "rate": 35.5,
        "average5Year": 35.83
      },
      {
        "name": "순환계통의 질환",
        "rate": 22.62,
        "average5Year": 22.84
      },
      {
        "name": "악성 신생물(암)",
        "rate": 15.05,
        "average5Year": 15.37
      },
      {
        "name": "호흡계통의 질환",
        "rate": 13.52,
        "average5Year": 13.74
      },
      {
        "name": "심장 질환",
        "rate": 10.95,
        "average5Year": 11.16
      },
      {
        "name": "폐렴",
        "rate": 9.5,
        "average5Year": 9.72
      },
      {
        "name": "신경계통의 질환",
        "rate": 7.83,
        "average5Year": 8.05
      },
      {
        "name": "뇌혈관 질환",
        "rate": 7.28,
        "average5Year": 7.50
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 6.29,
        "average5Year": 6.51
      },
      {
        "name": " - 알츠하이머병",
        "rate": 5.88,
        "average5Year": 6.10
      },
      {
        "name": "사망의 외인",
        "rate": 3.91,
        "average5Year": 4.13
      },
      {
        "name": "고혈압성 질환",
        "rate": 3.77,
        "average5Year": 3.99
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.55,
        "average5Year": 3.77
      },
      {
        "name": "소화계통의 질환",
        "rate": 3.05,
        "average5Year": 3.27
      },
      {
        "name": "당뇨병",
        "rate": 3.04,
        "average5Year": 3.26
      },
      {
        "name": "패혈증",
        "rate": 2.93,
        "average5Year": 3.15
      },
      {
        "name": "폐암",
        "rate": 2.34,
        "average5Year": 2.56
      },
      {
        "name": "대장암",
        "rate": 2.09,
        "average5Year": 2.31
      },
      {
        "name": "만성 하기도 질환",
        "rate": 1.48,
        "average5Year": 1.70
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 1.39,
        "average5Year": 1.61
      },
      {
        "name": "간암",
        "rate": 1.28,
        "average5Year": 1.50
      },
      {
        "name": "위암",
        "rate": 1.25,
        "average5Year": 1.47
      },
      {
        "name": "간질환",
        "rate": 0.85,
        "average5Year": 1.07
      },
      {
        "name": "운수사고",
        "rate": 0.32,
        "average5Year": 0.54
      }
    ],
    "20-29": [
      {
        "name": "3대 사인",
        "rate": 35.55,
        "average5Year": 35.88
      },
      {
        "name": "순환계통의 질환",
        "rate": 22.66,
        "average5Year": 22.88
      },
      {
        "name": "악성 신생물(암)",
        "rate": 15.05,
        "average5Year": 15.37
      },
      {
        "name": "호흡계통의 질환",
        "rate": 13.55,
        "average5Year": 13.77
      },
      {
        "name": "심장 질환",
        "rate": 10.97,
        "average5Year": 11.18
      },
      {
        "name": "폐렴",
        "rate": 9.52,
        "average5Year": 9.74
      },
      {
        "name": "신경계통의 질환",
        "rate": 7.83,
        "average5Year": 8.05
      },
      {
        "name": "뇌혈관 질환",
        "rate": 7.29,
        "average5Year": 7.51
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 6.3,
        "average5Year": 6.52
      },
      {
        "name": " - 알츠하이머병",
        "rate": 5.9,
        "average5Year": 6.12
      },
      {
        "name": "고혈압성 질환",
        "rate": 3.77,
        "average5Year": 3.99
      },
      {
        "name": "사망의 외인",
        "rate": 3.77,
        "average5Year": 3.99
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.55,
        "average5Year": 3.77
      },
      {
        "name": "소화계통의 질환",
        "rate": 3.05,
        "average5Year": 3.27
      },
      {
        "name": "당뇨병",
        "rate": 3.04,
        "average5Year": 3.26
      },
      {
        "name": "패혈증",
        "rate": 2.94,
        "average5Year": 3.16
      },
      {
        "name": "폐암",
        "rate": 2.35,
        "average5Year": 2.57
      },
      {
        "name": "대장암",
        "rate": 2.09,
        "average5Year": 2.31
      },
      {
        "name": "만성 하기도 질환",
        "rate": 1.48,
        "average5Year": 1.70
      },
      {
        "name": "간암",
        "rate": 1.28,
        "average5Year": 1.50
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 1.26,
        "average5Year": 1.48
      },
      {
        "name": "위암",
        "rate": 1.25,
        "average5Year": 1.47
      },
      {
        "name": "간질환",
        "rate": 0.85,
        "average5Year": 1.07
      },
      {
        "name": "운수사고",
        "rate": 0.31,
        "average5Year": 0.53
      }
    ],
    "30-39": [
      {
        "name": "3대 사인",
        "rate": 35.62,
        "average5Year": 35.95
      },
      {
        "name": "순환계통의 질환",
        "rate": 22.73,
        "average5Year": 22.95
      },
      {
        "name": "악성 신생물(암)",
        "rate": 15.07,
        "average5Year": 15.39
      },
      {
        "name": "호흡계통의 질환",
        "rate": 13.59,
        "average5Year": 13.81
      },
      {
        "name": "심장 질환",
        "rate": 11.0,
        "average5Year": 11.21
      },
      {
        "name": "폐렴",
        "rate": 9.55,
        "average5Year": 9.77
      },
      {
        "name": "신경계통의 질환",
        "rate": 7.86,
        "average5Year": 8.08
      },
      {
        "name": "뇌혈관 질환",
        "rate": 7.3,
        "average5Year": 7.52
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 6.32,
        "average5Year": 6.54
      },
      {
        "name": " - 알츠하이머병",
        "rate": 5.92,
        "average5Year": 6.14
      },
      {
        "name": "고혈압성 질환",
        "rate": 3.79,
        "average5Year": 4.01
      },
      {
        "name": "사망의 외인",
        "rate": 3.57,
        "average5Year": 3.79
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.56,
        "average5Year": 3.78
      },
      {
        "name": "당뇨병",
        "rate": 3.05,
        "average5Year": 3.27
      },
      {
        "name": "소화계통의 질환",
        "rate": 3.05,
        "average5Year": 3.27
      },
      {
        "name": "패혈증",
        "rate": 2.95,
        "average5Year": 3.17
      },
      {
        "name": "폐암",
        "rate": 2.35,
        "average5Year": 2.57
      },
      {
        "name": "대장암",
        "rate": 2.09,
        "average5Year": 2.31
      },
      {
        "name": "만성 하기도 질환",
        "rate": 1.49,
        "average5Year": 1.71
      },
      {
        "name": "간암",
        "rate": 1.28,
        "average5Year": 1.50
      },
      {
        "name": "위암",
        "rate": 1.25,
        "average5Year": 1.47
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 1.08,
        "average5Year": 1.30
      },
      {
        "name": "간질환",
        "rate": 0.84,
        "average5Year": 1.06
      },
      {
        "name": "운수사고",
        "rate": 0.3,
        "average5Year": 0.52
      }
    ],
    "40-49": [
      {
        "name": "3대 사인",
        "rate": 35.62,
        "average5Year": 35.95
      },
      {
        "name": "순환계통의 질환",
        "rate": 22.81,
        "average5Year": 23.03
      },
      {
        "name": "악성 신생물(암)",
        "rate": 14.98,
        "average5Year": 15.30
      },
      {
        "name": "호흡계통의 질환",
        "rate": 13.66,
        "average5Year": 13.88
      },
      {
        "name": "심장 질환",
        "rate": 11.04,
        "average5Year": 11.25
      },
      {
        "name": "폐렴",
        "rate": 9.61,
        "average5Year": 9.83
      },
      {
        "name": "신경계통의 질환",
        "rate": 7.88,
        "average5Year": 8.10
      },
      {
        "name": "뇌혈관 질환",
        "rate": 7.33,
        "average5Year": 7.55
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 6.35,
        "average5Year": 6.57
      },
      {
        "name": " - 알츠하이머병",
        "rate": 5.96,
        "average5Year": 6.18
      },
      {
        "name": "고혈압성 질환",
        "rate": 3.81,
        "average5Year": 4.03
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.56,
        "average5Year": 3.78
      },
      {
        "name": "사망의 외인",
        "rate": 3.37,
        "average5Year": 3.59
      },
      {
        "name": "당뇨병",
        "rate": 3.06,
        "average5Year": 3.28
      },
      {
        "name": "소화계통의 질환",
        "rate": 3.03,
        "average5Year": 3.25
      },
      {
        "name": "패혈증",
        "rate": 2.96,
        "average5Year": 3.18
      },
      {
        "name": "폐암",
        "rate": 2.36,
        "average5Year": 2.58
      },
      {
        "name": "대장암",
        "rate": 2.09,
        "average5Year": 2.31
      },
      {
        "name": "만성 하기도 질환",
        "rate": 1.5,
        "average5Year": 1.72
      },
      {
        "name": "간암",
        "rate": 1.28,
        "average5Year": 1.50
      },
      {
        "name": "위암",
        "rate": 1.25,
        "average5Year": 1.47
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 0.9,
        "average5Year": 1.12
      },
      {
        "name": "간질환",
        "rate": 0.81,
        "average5Year": 1.03
      },
      {
        "name": "운수사고",
        "rate": 0.3,
        "average5Year": 0.52
      }
    ],
    "50-59": [
      {
        "name": "3대 사인",
        "rate": 35.47,
        "average5Year": 35.80
      },
      {
        "name": "순환계통의 질환",
        "rate": 22.95,
        "average5Year": 23.17
      },
      {
        "name": "악성 신생물(암)",
        "rate": 14.66,
        "average5Year": 14.98
      },
      {
        "name": "호흡계통의 질환",
        "rate": 13.8,
        "average5Year": 14.02
      },
      {
        "name": "심장 질환",
        "rate": 11.12,
        "average5Year": 11.33
      },
      {
        "name": "폐렴",
        "rate": 9.7,
        "average5Year": 9.92
      },
      {
        "name": "신경계통의 질환",
        "rate": 7.95,
        "average5Year": 8.17
      },
      {
        "name": "뇌혈관 질환",
        "rate": 7.34,
        "average5Year": 7.56
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 6.39,
        "average5Year": 6.61
      },
      {
        "name": " - 알츠하이머병",
        "rate": 6.02,
        "average5Year": 6.24
      },
      {
        "name": "고혈압성 질환",
        "rate": 3.85,
        "average5Year": 4.07
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.58,
        "average5Year": 3.80
      },
      {
        "name": "사망의 외인",
        "rate": 3.17,
        "average5Year": 3.39
      },
      {
        "name": "당뇨병",
        "rate": 3.08,
        "average5Year": 3.30
      },
      {
        "name": "패혈증",
        "rate": 2.99,
        "average5Year": 3.21
      },
      {
        "name": "소화계통의 질환",
        "rate": 2.98,
        "average5Year": 3.20
      },
      {
        "name": "폐암",
        "rate": 2.34,
        "average5Year": 2.56
      },
      {
        "name": "대장암",
        "rate": 2.07,
        "average5Year": 2.29
      },
      {
        "name": "만성 하기도 질환",
        "rate": 1.52,
        "average5Year": 1.74
      },
      {
        "name": "간암",
        "rate": 1.27,
        "average5Year": 1.49
      },
      {
        "name": "위암",
        "rate": 1.21,
        "average5Year": 1.43
      },
      {
        "name": "간질환",
        "rate": 0.76,
        "average5Year": 0.98
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 0.72,
        "average5Year": 0.94
      },
      {
        "name": "운수사고",
        "rate": 0.29,
        "average5Year": 0.51
      }
    ],
    "60-69": [
      {
        "name": "3대 사인",
        "rate": 35.05,
        "average5Year": 35.38
      },
      {
        "name": "순환계통의 질환",
        "rate": 23.16,
        "average5Year": 23.38
      },
      {
        "name": "호흡계통의 질환",
        "rate": 14.02,
        "average5Year": 14.24
      },
      {
        "name": "악성 신생물(암)",
        "rate": 13.95,
        "average5Year": 14.27
      },
      {
        "name": "심장 질환",
        "rate": 11.24,
        "average5Year": 11.45
      },
      {
        "name": "폐렴",
        "rate": 9.87,
        "average5Year": 10.09
      },
      {
        "name": "신경계통의 질환",
        "rate": 8.05,
        "average5Year": 8.27
      },
      {
        "name": "뇌혈관 질환",
        "rate": 7.37,
        "average5Year": 7.59
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 6.47,
        "average5Year": 6.69
      },
      {
        "name": " - 알츠하이머병",
        "rate": 6.14,
        "average5Year": 6.36
      },
      {
        "name": "고혈압성 질환",
        "rate": 3.92,
        "average5Year": 4.14
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.6,
        "average5Year": 3.82
      },
      {
        "name": "당뇨병",
        "rate": 3.09,
        "average5Year": 3.31
      },
      {
        "name": "패혈증",
        "rate": 3.02,
        "average5Year": 3.24
      },
      {
        "name": "사망의 외인",
        "rate": 2.98,
        "average5Year": 3.20
      },
      {
        "name": "소화계통의 질환",
        "rate": 2.94,
        "average5Year": 3.16
      },
      {
        "name": "폐암",
        "rate": 2.28,
        "average5Year": 2.50
      },
      {
        "name": "대장암",
        "rate": 2.01,
        "average5Year": 2.23
      },
      {
        "name": "만성 하기도 질환",
        "rate": 1.54,
        "average5Year": 1.76
      },
      {
        "name": "간암",
        "rate": 1.23,
        "average5Year": 1.45
      },
      {
        "name": "위암",
        "rate": 1.17,
        "average5Year": 1.39
      },
      {
        "name": "간질환",
        "rate": 0.7,
        "average5Year": 0.92
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 0.56,
        "average5Year": 0.78
      },
      {
        "name": "운수사고",
        "rate": 0.27,
        "average5Year": 0.49
      }
    ],
    "70+": [
      {
        "name": "3대 사인",
        "rate": 33.15,
        "average5Year": 33.48
      },
      {
        "name": "순환계통의 질환",
        "rate": 23.64,
        "average5Year": 23.86
      },
      {
        "name": "호흡계통의 질환",
        "rate": 14.64,
        "average5Year": 14.86
      },
      {
        "name": "심장 질환",
        "rate": 11.58,
        "average5Year": 11.79
      },
      {
        "name": "악성 신생물(암)",
        "rate": 11.16,
        "average5Year": 11.48
      },
      {
        "name": "폐렴",
        "rate": 10.41,
        "average5Year": 10.63
      },
      {
        "name": "신경계통의 질환",
        "rate": 8.45,
        "average5Year": 8.67
      },
      {
        "name": "뇌혈관 질환",
        "rate": 7.21,
        "average5Year": 7.43
      },
      {
        "name": " - 알츠하이머병",
        "rate": 6.77,
        "average5Year": 6.99
      },
      {
        "name": "감염성 및 기생충성 질환",
        "rate": 6.54,
        "average5Year": 6.76
      },
      {
        "name": "고혈압성 질환",
        "rate": 4.25,
        "average5Year": 4.47
      },
      {
        "name": "내분비 영양대사 질환",
        "rate": 3.49,
        "average5Year": 3.71
      },
      {
        "name": "패혈증",
        "rate": 3.09,
        "average5Year": 3.31
      },
      {
        "name": "당뇨병",
        "rate": 2.97,
        "average5Year": 3.19
      },
      {
        "name": "소화계통의 질환",
        "rate": 2.83,
        "average5Year": 3.05
      },
      {
        "name": "사망의 외인",
        "rate": 2.65,
        "average5Year": 2.87
      },
      {
        "name": "대장암",
        "rate": 1.81,
        "average5Year": 2.03
      },
      {
        "name": "폐암",
        "rate": 1.81,
        "average5Year": 2.03
      },
      {
        "name": "만성 하기도 질환",
        "rate": 1.6,
        "average5Year": 1.82
      },
      {
        "name": "위암",
        "rate": 1.08,
        "average5Year": 1.30
      },
      {
        "name": "간암",
        "rate": 0.96,
        "average5Year": 1.18
      },
      {
        "name": "간질환",
        "rate": 0.56,
        "average5Year": 0.78
      },
      {
        "name": "고의적 자해(자살)",
        "rate": 0.35,
        "average5Year": 0.57
      },
      {
        "name": "운수사고",
        "rate": 0.17,
        "average5Year": 0.39
      }
    ]
  }
};

// 데이터 검증 함수
function validateDeathData5Year() {
    const requiredAgeGroups = ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    const requiredGenders = ['male', 'female'];
    
    for (const gender of requiredGenders) {
        if (!deathData5Year[gender]) {
            console.error(`성별 데이터 누락: ${gender}`);
            return false;
        }
        
        for (const ageGroup of requiredAgeGroups) {
            if (!deathData5Year[gender][ageGroup] || deathData5Year[gender][ageGroup].length === 0) {
                console.warn(`${gender} ${ageGroup} 데이터가 없습니다.`);
            }
        }
    }
    
    console.log('5개년 평균 사망원인 데이터 검증 완료');
    return true;
}

// 페이지 로드 시 데이터 검증 실행
document.addEventListener('DOMContentLoaded', function() {
    validateDeathData5Year();
});









