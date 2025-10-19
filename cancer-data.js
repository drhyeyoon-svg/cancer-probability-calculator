// 암 발생률 데이터 (5세 단위, 정확한 Excel 셀 값 사용)
// 2022년 기준 데이터 (average5Year 필드 제거)

const cancerData = {
  "male": {
    "0-4": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 19.9
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 6.9
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 5.4
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 2.6
      },
      {
        "name": "간(C22)",
        "rate": 1.8
      },
      {
        "name": "신장(C64)",
        "rate": 1.1
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 0.9
      },
      {
        "name": "고환(C62)",
        "rate": 0.8
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 0.3
      },
      {
        "name": "췌장(C25)",
        "rate": 0.1
      }
    ],
    "5-9": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 11.4      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 5.0      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 2.3      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 2.0      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 1.4      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 0.2      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.2      },
      {
        "name": "고환(C62)",
        "rate": 0.1      },
      {
        "name": "신장(C64)",
        "rate": 0.1      }
    ],
    "10-14": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 15.1      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 4.9      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 4.0      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 2.1      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 1.8
      },
      {
        "name": "갑상선(C73)",
        "rate": 0.9
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.4      },
      {
        "name": "췌장(C25)",
        "rate": 0.3      },
      {
        "name": "대장(C18-C20)",
        "rate": 0.2      },
      {
        "name": "폐(C33-C34)",
        "rate": 0.2      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 0.1      },
      {
        "name": "고환(C62)",
        "rate": 0.1      }
    ],
    "15-19": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 22.2      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 5.2,
        "average5Year": 5.2
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 4.9      },
      {
        "name": "갑상선(C73)",
        "rate": 3.7,
        "average5Year": 3.7
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 2.2,
        "average5Year": 2.2
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 2.1      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 1.3,
        "average5Year": 1.3
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.0,
        "average5Year": 1.0
      },
      {
        "name": "대장(C18-C20)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "고환(C62)",
        "rate": 0.4      },
      {
        "name": "간(C22)",
        "rate": 0.2      },
      {
        "name": "신장(C64)",
        "rate": 0.2      },
      {
        "name": "위(C16)",
        "rate": 0.1      },
      {
        "name": "췌장(C25)",
        "rate": 0.1      },
      {
        "name": "후두(C32)",
        "rate": 0.1      },
      {
        "name": "전립선(C61)",
        "rate": 0.1      },
      {
        "name": "방광(C67)",
        "rate": 0.1      }
    ],
    "20-24": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 30.2,
        "average5Year": 43.80666666666667
      },
      {
        "name": "갑상선(C73)",
        "rate": 9.4,
        "average5Year": 9.4
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 4.9      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 2.9,
        "average5Year": 2.9
      },
      {
        "name": "대장(C18-C20)",
        "rate": 2.4,
        "average5Year": 2.4
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 2.4,
        "average5Year": 2.4
      },
      {
        "name": "고환(C62)",
        "rate": 1.7,
        "average5Year": 1.7
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 1.7,
        "average5Year": 1.7
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 1.3,
        "average5Year": 1.3
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.0,
        "average5Year": 1.0
      },
      {
        "name": "신장(C64)",
        "rate": 0.9
      },
      {
        "name": "위(C16)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "췌장(C25)",
        "rate": 0.4      },
      {
        "name": "폐(C33-C34)",
        "rate": 0.4      },
      {
        "name": "식도(C15)",
        "rate": 0.1      },
      {
        "name": "간(C22)",
        "rate": 0.1      },
      {
        "name": "방광(C67)",
        "rate": 0.1      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 0.1      }
    ],
    "25-29": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 67.5,
        "average5Year": 94.96666666666665
      },
      {
        "name": "갑상선(C73)",
        "rate": 29.9,
        "average5Year": 29.9
      },
      {
        "name": "대장(C18-C20)",
        "rate": 7.9,
        "average5Year": 7.9
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 5.9,
        "average5Year": 5.9
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 4.0      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 3.9,
        "average5Year": 3.9
      },
      {
        "name": "고환(C62)",
        "rate": 3.5,
        "average5Year": 3.5
      },
      {
        "name": "신장(C64)",
        "rate": 3.3,
        "average5Year": 3.3
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 2.2,
        "average5Year": 2.2
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 1.5,
        "average5Year": 1.5
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.4      },
      {
        "name": "위(C16)",
        "rate": 1.3,
        "average5Year": 1.3
      },
      {
        "name": "췌장(C25)",
        "rate": 1.0,
        "average5Year": 1.0
      },
      {
        "name": "폐(C33-C34)",
        "rate": 0.9
      },
      {
        "name": "간(C22)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "방광(C67)",
        "rate": 0.3      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 0.1      },
      {
        "name": "전립선(C61)",
        "rate": 0.1      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 0.1      }
    ],
    "30-34": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 112.4,
        "average5Year": 164.93333333333334
      },
      {
        "name": "갑상선(C73)",
        "rate": 51.7
      },
      {
        "name": "대장(C18-C20)",
        "rate": 19.0
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 9.3,
        "average5Year": 9.3
      },
      {
        "name": "신장(C64)",
        "rate": 5.7,
        "average5Year": 5.7
      },
      {
        "name": "고환(C62)",
        "rate": 4.9      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 4.5,
        "average5Year": 4.5
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 3.5,
        "average5Year": 3.5
      },
      {
        "name": "위(C16)",
        "rate": 2.9,
        "average5Year": 2.9
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 2.7,
        "average5Year": 2.7
      },
      {
        "name": "폐(C33-C34)",
        "rate": 2.2,
        "average5Year": 2.2
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 2.1      },
      {
        "name": "간(C22)",
        "rate": 1.1
      },
      {
        "name": "췌장(C25)",
        "rate": 1.1
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.8
      },
      {
        "name": "방광(C67)",
        "rate": 0.4      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 0.3      },
      {
        "name": "식도(C15)",
        "rate": 0.1      },
      {
        "name": "전립선(C61)",
        "rate": 0.1      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 0.1      }
    ],
    "35-39": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 157.2,
        "average5Year": 239.0
      },
      {
        "name": "갑상선(C73)",
        "rate": 58.0
      },
      {
        "name": "대장(C18-C20)",
        "rate": 31.3
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 13.5
      },
      {
        "name": "신장(C64)",
        "rate": 10.2,
        "average5Year": 10.2
      },
      {
        "name": "위(C16)",
        "rate": 8.1,
        "average5Year": 8.1
      },
      {
        "name": "간(C22)",
        "rate": 6.3,
        "average5Year": 6.3
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 5.4,
        "average5Year": 5.4
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 5.1,
        "average5Year": 5.1
      },
      {
        "name": "폐(C33-C34)",
        "rate": 4.7,
        "average5Year": 4.7
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 3.8,
        "average5Year": 3.8
      },
      {
        "name": "고환(C62)",
        "rate": 3.1,
        "average5Year": 3.1
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 2.5,
        "average5Year": 2.5
      },
      {
        "name": "췌장(C25)",
        "rate": 2.2,
        "average5Year": 2.2
      },
      {
        "name": "방광(C67)",
        "rate": 1.0,
        "average5Year": 1.0
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 0.6,
        "average5Year": 0.6
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.6,
        "average5Year": 0.6
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "식도(C15)",
        "rate": 0.2      },
      {
        "name": "후두(C32)",
        "rate": 0.1      },
      {
        "name": "유방(C50)",
        "rate": 0.1      },
      {
        "name": "전립선(C61)",
        "rate": 0.1      }
    ],
    "40-44": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 217.2,
        "average5Year": 345.35999999999996
      },
      {
        "name": "갑상선(C73)",
        "rate": 64.3,
        "average5Year": 64.3
      },
      {
        "name": "대장(C18-C20)",
        "rate": 42.2,
        "average5Year": 42.2
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 20.5,
        "average5Year": 20.5
      },
      {
        "name": "위(C16)",
        "rate": 19.6,
        "average5Year": 19.6
      },
      {
        "name": "신장(C64)",
        "rate": 16.0,
        "average5Year": 16.0
      },
      {
        "name": "간(C22)",
        "rate": 12.5,
        "average5Year": 12.5
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 7.6,
        "average5Year": 7.6
      },
      {
        "name": "폐(C33-C34)",
        "rate": 7.3,
        "average5Year": 7.3
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 6.1,
        "average5Year": 6.1
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 5.9,
        "average5Year": 5.9
      },
      {
        "name": "췌장(C25)",
        "rate": 4.1,
        "average5Year": 4.1
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 3.2,
        "average5Year": 3.2
      },
      {
        "name": "고환(C62)",
        "rate": 2.0      },
      {
        "name": "전립선(C61)",
        "rate": 1.2,
        "average5Year": 1.2
      },
      {
        "name": "방광(C67)",
        "rate": 1.2,
        "average5Year": 1.2
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 1.0,
        "average5Year": 1.0
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.7,
        "average5Year": 0.7
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 0.7,
        "average5Year": 0.7
      },
      {
        "name": "식도(C15)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "후두(C32)",
        "rate": 0.2      },
      {
        "name": "유방(C50)",
        "rate": 0.2      }
    ],
    "45-49": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 271.2,
        "average5Year": 416.1866666666667
      },
      {
        "name": "갑상선(C73)",
        "rate": 50.7,
        "average5Year": 50.7
      },
      {
        "name": "대장(C18-C20)",
        "rate": 47.3,
        "average5Year": 47.3
      },
      {
        "name": "위(C16)",
        "rate": 35.4,
        "average5Year": 35.4
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 26.7,
        "average5Year": 26.7
      },
      {
        "name": "간(C22)",
        "rate": 24.6,
        "average5Year": 24.6
      },
      {
        "name": "신장(C64)",
        "rate": 18.1,
        "average5Year": 18.1
      },
      {
        "name": "폐(C33-C34)",
        "rate": 13.8,
        "average5Year": 13.8
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 9.5,
        "average5Year": 9.5
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 9.4,
        "average5Year": 9.4
      },
      {
        "name": "췌장(C25)",
        "rate": 7.2,
        "average5Year": 7.2
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 6.6,
        "average5Year": 6.6
      },
      {
        "name": "방광(C67)",
        "rate": 4.8,
        "average5Year": 4.8
      },
      {
        "name": "전립선(C61)",
        "rate": 3.7,
        "average5Year": 3.7
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 3.3,
        "average5Year": 3.3
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 2.9,
        "average5Year": 2.9
      },
      {
        "name": "식도(C15)",
        "rate": 2.0      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 1.8
      },
      {
        "name": "고환(C62)",
        "rate": 1.3,
        "average5Year": 1.3
      },
      {
        "name": "후두(C32)",
        "rate": 1.1
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "유방(C50)",
        "rate": 0.3      }
    ],
    "50-54": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 409.7,
        "average5Year": 525.36
      },
      {
        "name": "대장(C18-C20)",
        "rate": 77.2,
        "average5Year": 77.2
      },
      {
        "name": "위(C16)",
        "rate": 61.5,
        "average5Year": 61.5
      },
      {
        "name": "갑상선(C73)",
        "rate": 44.5,
        "average5Year": 44.5
      },
      {
        "name": "간(C22)",
        "rate": 43.3,
        "average5Year": 43.3
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 34.5,
        "average5Year": 34.5
      },
      {
        "name": "폐(C33-C34)",
        "rate": 29.9,
        "average5Year": 29.9
      },
      {
        "name": "신장(C64)",
        "rate": 25.1,
        "average5Year": 25.1
      },
      {
        "name": "전립선(C61)",
        "rate": 15.6,
        "average5Year": 15.6
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 14.3,
        "average5Year": 14.3
      },
      {
        "name": "췌장(C25)",
        "rate": 13.5,
        "average5Year": 13.5
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 13.1,
        "average5Year": 13.1
      },
      {
        "name": "방광(C67)",
        "rate": 8.1,
        "average5Year": 8.1
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 7.2,
        "average5Year": 7.2
      },
      {
        "name": "식도(C15)",
        "rate": 5.8,
        "average5Year": 5.8
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 5.4,
        "average5Year": 5.4
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 4.2,
        "average5Year": 4.2
      },
      {
        "name": "후두(C32)",
        "rate": 2.3      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 2.3      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.8
      },
      {
        "name": "유방(C50)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "고환(C62)",
        "rate": 0.5,
        "average5Year": 0.5
      }
    ],
    "55-59": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 653.3,
        "average5Year": 666.84
      },
      {
        "name": "대장(C18-C20)",
        "rate": 109.6,
        "average5Year": 109.6
      },
      {
        "name": "위(C16)",
        "rate": 108.7,
        "average5Year": 108.7
      },
      {
        "name": "간(C22)",
        "rate": 67.6,
        "average5Year": 67.6
      },
      {
        "name": "폐(C33-C34)",
        "rate": 62.1,
        "average5Year": 62.1
      },
      {
        "name": "전립선(C61)",
        "rate": 52.7,
        "average5Year": 52.7
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 52.6,
        "average5Year": 52.6
      },
      {
        "name": "갑상선(C73)",
        "rate": 41.8,
        "average5Year": 41.8
      },
      {
        "name": "신장(C64)",
        "rate": 28.7,
        "average5Year": 28.7
      },
      {
        "name": "췌장(C25)",
        "rate": 25.0,
        "average5Year": 25.0
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 21.2,
        "average5Year": 21.2
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 16.4,
        "average5Year": 16.4
      },
      {
        "name": "식도(C15)",
        "rate": 14.2,
        "average5Year": 14.2
      },
      {
        "name": "방광(C67)",
        "rate": 13.6,
        "average5Year": 13.6
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 11.6,
        "average5Year": 11.6
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 8.9,
        "average5Year": 8.9
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 5.7,
        "average5Year": 5.7
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 5.6,
        "average5Year": 5.6
      },
      {
        "name": "후두(C32)",
        "rate": 5.1,
        "average5Year": 5.1
      },
      {
        "name": "유방(C50)",
        "rate": 1.1
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.7,
        "average5Year": 0.7
      },
      {
        "name": "고환(C62)",
        "rate": 0.4      }
    ],
    "60-64": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 1031.2,
        "average5Year": 905.2199999999999
      },
      {
        "name": "위(C16)",
        "rate": 173.2,
        "average5Year": 173.2
      },
      {
        "name": "대장(C18-C20)",
        "rate": 145.7,
        "average5Year": 145.7
      },
      {
        "name": "전립선(C61)",
        "rate": 137.1,
        "average5Year": 137.1
      },
      {
        "name": "폐(C33-C34)",
        "rate": 134.9,
        "average5Year": 134.9
      },
      {
        "name": "간(C22)",
        "rate": 86.1,
        "average5Year": 86.1
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 76.5,
        "average5Year": 76.5
      },
      {
        "name": "신장(C64)",
        "rate": 37.6,
        "average5Year": 37.6
      },
      {
        "name": "갑상선(C73)",
        "rate": 37.6,
        "average5Year": 37.6
      },
      {
        "name": "췌장(C25)",
        "rate": 37.3,
        "average5Year": 37.3
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 27.8,
        "average5Year": 27.8
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 26.5,
        "average5Year": 26.5
      },
      {
        "name": "방광(C67)",
        "rate": 26.0,
        "average5Year": 26.0
      },
      {
        "name": "식도(C15)",
        "rate": 23.7,
        "average5Year": 23.7
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 21.3,
        "average5Year": 21.3
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 12.0,
        "average5Year": 12.0
      },
      {
        "name": "후두(C32)",
        "rate": 10.6,
        "average5Year": 10.6
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 7.8,
        "average5Year": 7.8
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 7.0,
        "average5Year": 7.0
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.4      },
      {
        "name": "유방(C50)",
        "rate": 0.7,
        "average5Year": 0.7
      },
      {
        "name": "고환(C62)",
        "rate": 0.3      }
    ],
    "65-69": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 1543.7,
        "average5Year": 1200.6733333333334
      },
      {
        "name": "전립선(C61)",
        "rate": 266.3,
        "average5Year": 266.3
      },
      {
        "name": "폐(C33-C34)",
        "rate": 260.0,
        "average5Year": 260.0
      },
      {
        "name": "위(C16)",
        "rate": 220.4,
        "average5Year": 220.4
      },
      {
        "name": "대장(C18-C20)",
        "rate": 193.3,
        "average5Year": 193.3
      },
      {
        "name": "간(C22)",
        "rate": 114.1,
        "average5Year": 114.1
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 108.6,
        "average5Year": 108.6
      },
      {
        "name": "췌장(C25)",
        "rate": 54.9,
        "average5Year": 54.9
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 45.4,
        "average5Year": 45.4
      },
      {
        "name": "신장(C64)",
        "rate": 44.5,
        "average5Year": 44.5
      },
      {
        "name": "방광(C67)",
        "rate": 42.6,
        "average5Year": 42.6
      },
      {
        "name": "식도(C15)",
        "rate": 37.7,
        "average5Year": 37.7
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 35.3,
        "average5Year": 35.3
      },
      {
        "name": "갑상선(C73)",
        "rate": 32.0,
        "average5Year": 32.0
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 31.5,
        "average5Year": 31.5
      },
      {
        "name": "후두(C32)",
        "rate": 16.5,
        "average5Year": 16.5
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 15.7,
        "average5Year": 15.7
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 12.9,
        "average5Year": 12.9
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 9.2,
        "average5Year": 9.2
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.5,
        "average5Year": 1.5
      },
      {
        "name": "유방(C50)",
        "rate": 0.9
      },
      {
        "name": "고환(C62)",
        "rate": 0.5,
        "average5Year": 0.5
      }
    ],
    "70-74": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 2235.7,
        "average5Year": 1594.5
      },
      {
        "name": "전립선(C61)",
        "rate": 458.6,
        "average5Year": 458.6
      },
      {
        "name": "폐(C33-C34)",
        "rate": 426.9,
        "average5Year": 426.9
      },
      {
        "name": "위(C16)",
        "rate": 293.5,
        "average5Year": 293.5
      },
      {
        "name": "대장(C18-C20)",
        "rate": 242.0,
        "average5Year": 242.0
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 160.1,
        "average5Year": 160.1
      },
      {
        "name": "간(C22)",
        "rate": 149.6,
        "average5Year": 149.6
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 83.2,
        "average5Year": 83.2
      },
      {
        "name": "췌장(C25)",
        "rate": 76.7,
        "average5Year": 76.7
      },
      {
        "name": "방광(C67)",
        "rate": 71.8,
        "average5Year": 71.8
      },
      {
        "name": "신장(C64)",
        "rate": 48.8,
        "average5Year": 48.8
      },
      {
        "name": "식도(C15)",
        "rate": 45.7,
        "average5Year": 45.7
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 42.0,
        "average5Year": 42.0
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 40.5,
        "average5Year": 40.5
      },
      {
        "name": "갑상선(C73)",
        "rate": 24.6,
        "average5Year": 24.6
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 21.4,
        "average5Year": 21.4
      },
      {
        "name": "후두(C32)",
        "rate": 19.6,
        "average5Year": 19.6
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 16.7,
        "average5Year": 16.7
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 10.6,
        "average5Year": 10.6
      },
      {
        "name": "유방(C50)",
        "rate": 1.9,
        "average5Year": 1.9
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.9
      },
      {
        "name": "고환(C62)",
        "rate": 0.5,
        "average5Year": 0.5
      }
    ],
    "75-79": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 2712.5,
        "average5Year": 1906.6133333333335
      },
      {
        "name": "전립선(C61)",
        "rate": 575.8,
        "average5Year": 575.8
      },
      {
        "name": "폐(C33-C34)",
        "rate": 529.8,
        "average5Year": 529.8
      },
      {
        "name": "위(C16)",
        "rate": 331.9,
        "average5Year": 331.9
      },
      {
        "name": "대장(C18-C20)",
        "rate": 271.8,
        "average5Year": 271.8
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 219.5,
        "average5Year": 219.5
      },
      {
        "name": "간(C22)",
        "rate": 173.8,
        "average5Year": 173.8
      },
      {
        "name": "췌장(C25)",
        "rate": 105.0,
        "average5Year": 105.0
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 102.8,
        "average5Year": 102.8
      },
      {
        "name": "방광(C67)",
        "rate": 96.0,
        "average5Year": 96.0
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 53.1,
        "average5Year": 53.1
      },
      {
        "name": "신장(C64)",
        "rate": 52.4,
        "average5Year": 52.4
      },
      {
        "name": "식도(C15)",
        "rate": 45.3,
        "average5Year": 45.3
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 37.7,
        "average5Year": 37.7
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 30.7,
        "average5Year": 30.7
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 24.3,
        "average5Year": 24.3
      },
      {
        "name": "후두(C32)",
        "rate": 23.3,
        "average5Year": 23.3
      },
      {
        "name": "갑상선(C73)",
        "rate": 20.3,
        "average5Year": 20.3
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 13.6,
        "average5Year": 13.6
      },
      {
        "name": "유방(C50)",
        "rate": 2.7,
        "average5Year": 2.7
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 2.6
      },
      {
        "name": "고환(C62)",
        "rate": 0.4      }
    ],
    "80-84": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 3023.8,
        "average5Year": 2109.273333333333
      },
      {
        "name": "폐(C33-C34)",
        "rate": 614.3,
        "average5Year": 614.3
      },
      {
        "name": "전립선(C61)",
        "rate": 561.1,
        "average5Year": 561.1
      },
      {
        "name": "위(C16)",
        "rate": 339.1,
        "average5Year": 339.1
      },
      {
        "name": "대장(C18-C20)",
        "rate": 333.5,
        "average5Year": 333.5
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 276.7,
        "average5Year": 276.7
      },
      {
        "name": "간(C22)",
        "rate": 205.0,
        "average5Year": 205.0
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 138.7,
        "average5Year": 138.7
      },
      {
        "name": "방광(C67)",
        "rate": 125.8,
        "average5Year": 125.8
      },
      {
        "name": "췌장(C25)",
        "rate": 116.8,
        "average5Year": 116.8
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 61.2,
        "average5Year": 61.2
      },
      {
        "name": "식도(C15)",
        "rate": 50.6,
        "average5Year": 50.6
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 45.8,
        "average5Year": 45.8
      },
      {
        "name": "신장(C64)",
        "rate": 45.6,
        "average5Year": 45.6
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 33.0,
        "average5Year": 33.0
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 23.8,
        "average5Year": 23.8
      },
      {
        "name": "후두(C32)",
        "rate": 21.7,
        "average5Year": 21.7
      },
      {
        "name": "갑상선(C73)",
        "rate": 14.0,
        "average5Year": 14.0
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 13.0,
        "average5Year": 13.0
      },
      {
        "name": "유방(C50)",
        "rate": 2.3      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.0,
        "average5Year": 1.0
      },
      {
        "name": "고환(C62)",
        "rate": 0.8
      }
    ],
    "85+": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 2867.4,
        "average5Year": 2067.9133333333334
      },
      {
        "name": "폐(C33-C34)",
        "rate": 579.8,
        "average5Year": 579.8
      },
      {
        "name": "전립선(C61)",
        "rate": 416.1,
        "average5Year": 416.1
      },
      {
        "name": "대장(C18-C20)",
        "rate": 357.9,
        "average5Year": 357.9
      },
      {
        "name": "위(C16)",
        "rate": 321.7,
        "average5Year": 321.7
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 306.5,
        "average5Year": 306.5
      },
      {
        "name": "간(C22)",
        "rate": 196.8,
        "average5Year": 196.8
      },
      {
        "name": "방광(C67)",
        "rate": 156.8,
        "average5Year": 156.8
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 146.2,
        "average5Year": 146.2
      },
      {
        "name": "췌장(C25)",
        "rate": 112.3,
        "average5Year": 112.3
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 57.9,
        "average5Year": 57.9
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 41.9,
        "average5Year": 41.9
      },
      {
        "name": "식도(C15)",
        "rate": 41.9,
        "average5Year": 41.9
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 36.9,
        "average5Year": 36.9
      },
      {
        "name": "신장(C64)",
        "rate": 34.3,
        "average5Year": 34.3
      },
      {
        "name": "후두(C32)",
        "rate": 17.1,
        "average5Year": 17.1
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 14.8,
        "average5Year": 14.8
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 14.1,
        "average5Year": 14.1
      },
      {
        "name": "갑상선(C73)",
        "rate": 7.2,
        "average5Year": 7.2
      },
      {
        "name": "유방(C50)",
        "rate": 4.2,
        "average5Year": 4.2
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.9,
        "average5Year": 1.9
      },
      {
        "name": "고환(C62)",
        "rate": 1.1
      }
    ]
  },
  "female": {
    "0-4": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 19.3
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 7.5
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 7.1
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 1.9,
        "average5Year": 1.9
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 1.5,
        "average5Year": 1.5
      },
      {
        "name": "간(C22)",
        "rate": 0.6,
        "average5Year": 0.6
      },
      {
        "name": "폐(C33-C34)",
        "rate": 0.4      },
      {
        "name": "고환(C62)",
        "rate": 0.4      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 0.1      },
      {
        "name": "췌장(C25)",
        "rate": 0.1      },
      {
        "name": "신장(C64)",
        "rate": 0.1      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.1      }
    ],
    "5-9": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 9.8      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 3.1,
        "average5Year": 3.1
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 2.8,
        "average5Year": 2.8
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 1.5,
        "average5Year": 1.5
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 1.0,
        "average5Year": 1.0
      },
      {
        "name": "난소(C56)",
        "rate": 0.4      },
      {
        "name": "췌장(C25)",
        "rate": 0.3      },
      {
        "name": "간(C22)",
        "rate": 0.2      },
      {
        "name": "갑상선(C73)",
        "rate": 0.2      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 0.1      },
      {
        "name": "신장(C64)",
        "rate": 0.1      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.1      }
    ],
    "10-14": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 12.0      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 3.1,
        "average5Year": 3.1
      },
      {
        "name": "갑상선(C73)",
        "rate": 2.1      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 1.9,
        "average5Year": 1.9
      },
      {
        "name": "난소(C56)",
        "rate": 1.7,
        "average5Year": 1.7
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 1.6,
        "average5Year": 1.6
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 0.8
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 0.3      },
      {
        "name": "췌장(C25)",
        "rate": 0.2      },
      {
        "name": "대장(C18-C20)",
        "rate": 0.1      },
      {
        "name": "간(C22)",
        "rate": 0.1      },
      {
        "name": "폐(C33-C34)",
        "rate": 0.1      },
      {
        "name": "자궁경부(C53)",
        "rate": 0.1      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.1      }
    ],
    "15-19": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 26.8      },
      {
        "name": "갑상선(C73)",
        "rate": 11.1,
        "average5Year": 11.1
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 3.5,
        "average5Year": 3.5
      },
      {
        "name": "난소(C56)",
        "rate": 2.6
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 1.9,
        "average5Year": 1.9
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 1.5,
        "average5Year": 1.5
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 1.2,
        "average5Year": 1.2
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 1.2,
        "average5Year": 1.2
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.2,
        "average5Year": 1.2
      },
      {
        "name": "췌장(C25)",
        "rate": 1.1
      },
      {
        "name": "대장(C18-C20)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "간(C22)",
        "rate": 0.3      },
      {
        "name": "자궁체부(C54)",
        "rate": 0.2      },
      {
        "name": "고환(C62)",
        "rate": 0.2      },
      {
        "name": "신장(C64)",
        "rate": 0.2      },
      {
        "name": "위(C16)",
        "rate": 0.1      },
      {
        "name": "폐(C33-C34)",
        "rate": 0.1      },
      {
        "name": "유방(C50)",
        "rate": 0.1      },
      {
        "name": "자궁경부(C53)",
        "rate": 0.1      }
    ],
    "20-24": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 66.9,
        "average5Year": 43.80666666666667
      },
      {
        "name": "갑상선(C73)",
        "rate": 41.5,
        "average5Year": 41.5
      },
      {
        "name": "난소(C56)",
        "rate": 4.1,
        "average5Year": 4.1
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 3.7,
        "average5Year": 3.7
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 2.6
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 2.3      },
      {
        "name": "대장(C18-C20)",
        "rate": 2.2,
        "average5Year": 2.2
      },
      {
        "name": "유방(C50)",
        "rate": 1.9,
        "average5Year": 1.9
      },
      {
        "name": "자궁체부(C54)",
        "rate": 1.9,
        "average5Year": 1.9
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 1.2,
        "average5Year": 1.2
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.2,
        "average5Year": 1.2
      },
      {
        "name": "췌장(C25)",
        "rate": 1.1
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 1.0,
        "average5Year": 1.0
      },
      {
        "name": "자궁경부(C53)",
        "rate": 0.9
      },
      {
        "name": "고환(C62)",
        "rate": 0.9
      },
      {
        "name": "위(C16)",
        "rate": 0.6,
        "average5Year": 0.6
      },
      {
        "name": "폐(C33-C34)",
        "rate": 0.4      },
      {
        "name": "신장(C64)",
        "rate": 0.3      },
      {
        "name": "식도(C15)",
        "rate": 0.1      },
      {
        "name": "간(C22)",
        "rate": 0.1      }
    ],
    "25-29": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 148.7,
        "average5Year": 94.96666666666665
      },
      {
        "name": "갑상선(C73)",
        "rate": 98.3,
        "average5Year": 98.3
      },
      {
        "name": "유방(C50)",
        "rate": 9.3,
        "average5Year": 9.3
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 7.7,
        "average5Year": 7.7
      },
      {
        "name": "대장(C18-C20)",
        "rate": 6.6,
        "average5Year": 6.6
      },
      {
        "name": "자궁경부(C53)",
        "rate": 4.1,
        "average5Year": 4.1
      },
      {
        "name": "자궁체부(C54)",
        "rate": 3.6,
        "average5Year": 3.6
      },
      {
        "name": "난소(C56)",
        "rate": 3.5,
        "average5Year": 3.5
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 2.7,
        "average5Year": 2.7
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 2.2,
        "average5Year": 2.2
      },
      {
        "name": "췌장(C25)",
        "rate": 2.1      },
      {
        "name": "위(C16)",
        "rate": 1.8
      },
      {
        "name": "고환(C62)",
        "rate": 1.8
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 1.7,
        "average5Year": 1.7
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 1.6,
        "average5Year": 1.6
      },
      {
        "name": "폐(C33-C34)",
        "rate": 1.2,
        "average5Year": 1.2
      },
      {
        "name": "신장(C64)",
        "rate": 1.2,
        "average5Year": 1.2
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.1
      },
      {
        "name": "간(C22)",
        "rate": 0.2      },
      {
        "name": "방광(C67)",
        "rate": 0.2      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 0.1      }
    ],
    "30-34": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 250.7,
        "average5Year": 164.93333333333334
      },
      {
        "name": "갑상선(C73)",
        "rate": 142.0,
        "average5Year": 95.8
      },
      {
        "name": "유방(C50)",
        "rate": 35.3,
        "average5Year": 125.7
      },
      {
        "name": "자궁경부(C53)",
        "rate": 13.6,
        "average5Year": 13.6
      },
      {
        "name": "대장(C18-C20)",
        "rate": 13.1,
        "average5Year": 13.1
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 9.6,
        "average5Year": 9.6
      },
      {
        "name": "자궁체부(C54)",
        "rate": 8.4,
        "average5Year": 8.4
      },
      {
        "name": "난소(C56)",
        "rate": 5.5,
        "average5Year": 5.5
      },
      {
        "name": "위(C16)",
        "rate": 3.9,
        "average5Year": 3.9
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 3.6,
        "average5Year": 3.6
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 3.5,
        "average5Year": 3.5
      },
      {
        "name": "폐(C33-C34)",
        "rate": 3.0,
        "average5Year": 3.0
      },
      {
        "name": "고환(C62)",
        "rate": 2.6
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 2.4,
        "average5Year": 2.4
      },
      {
        "name": "신장(C64)",
        "rate": 1.9,
        "average5Year": 1.9
      },
      {
        "name": "췌장(C25)",
        "rate": 1.6,
        "average5Year": 1.6
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 1.4      },
      {
        "name": "간(C22)",
        "rate": 0.8
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.7,
        "average5Year": 0.7
      },
      {
        "name": "방광(C67)",
        "rate": 0.2      },
      {
        "name": "식도(C15)",
        "rate": 0.1      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 0.1      }
    ],
    "35-39": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 357.6,
        "average5Year": 239.0
      },
      {
        "name": "갑상선(C73)",
        "rate": 164.8,
        "average5Year": 164.8
      },
      {
        "name": "유방(C50)",
        "rate": 84.6,
        "average5Year": 84.6
      },
      {
        "name": "대장(C18-C20)",
        "rate": 22.5,
        "average5Year": 22.5
      },
      {
        "name": "자궁경부(C53)",
        "rate": 15.2,
        "average5Year": 15.2
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 13.5,
        "average5Year": 13.5
      },
      {
        "name": "자궁체부(C54)",
        "rate": 11.3,
        "average5Year": 11.3
      },
      {
        "name": "위(C16)",
        "rate": 10.1,
        "average5Year": 10.1
      },
      {
        "name": "난소(C56)",
        "rate": 7.2,
        "average5Year": 7.2
      },
      {
        "name": "폐(C33-C34)",
        "rate": 4.9      },
      {
        "name": "신장(C64)",
        "rate": 4.8,
        "average5Year": 4.8
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 4.4,
        "average5Year": 4.4
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 3.1,
        "average5Year": 3.1
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 2.8,
        "average5Year": 2.8
      },
      {
        "name": "간(C22)",
        "rate": 2.5,
        "average5Year": 2.5
      },
      {
        "name": "췌장(C25)",
        "rate": 2.4,
        "average5Year": 2.4
      },
      {
        "name": "고환(C62)",
        "rate": 1.6,
        "average5Year": 1.6
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 1.5,
        "average5Year": 1.5
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 0.6,
        "average5Year": 0.6
      },
      {
        "name": "방광(C67)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "식도(C15)",
        "rate": 0.1      },
      {
        "name": "후두(C32)",
        "rate": 0.1      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 0.1      }
    ],
    "40-44": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 531.8,
        "average5Year": 345.35999999999996
      },
      {
        "name": "갑상선(C73)",
        "rate": 186.3,
        "average5Year": 186.3
      },
      {
        "name": "유방(C50)",
        "rate": 175.8,
        "average5Year": 175.8
      },
      {
        "name": "대장(C18-C20)",
        "rate": 34.5,
        "average5Year": 34.5
      },
      {
        "name": "위(C16)",
        "rate": 23.4,
        "average5Year": 23.4
      },
      {
        "name": "자궁경부(C53)",
        "rate": 20.9,
        "average5Year": 20.9
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 19.3,
        "average5Year": 19.3
      },
      {
        "name": "자궁체부(C54)",
        "rate": 14.9,
        "average5Year": 14.9
      },
      {
        "name": "난소(C56)",
        "rate": 11.9,
        "average5Year": 11.9
      },
      {
        "name": "폐(C33-C34)",
        "rate": 10.3,
        "average5Year": 10.3
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 6.6,
        "average5Year": 6.6
      },
      {
        "name": "신장(C64)",
        "rate": 5.8,
        "average5Year": 5.8
      },
      {
        "name": "췌장(C25)",
        "rate": 4.7,
        "average5Year": 4.7
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 4.2,
        "average5Year": 4.2
      },
      {
        "name": "간(C22)",
        "rate": 3.8,
        "average5Year": 3.8
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 3.7,
        "average5Year": 3.7
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 2.4,
        "average5Year": 2.4
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 1.2,
        "average5Year": 1.2
      },
      {
        "name": "고환(C62)",
        "rate": 1.0,
        "average5Year": 1.0
      },
      {
        "name": "방광(C67)",
        "rate": 0.8
      },
      {
        "name": "식도(C15)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.4      },
      {
        "name": "후두(C32)",
        "rate": 0.2      }
    ],
    "45-49": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 624.8,
        "average5Year": 416.1866666666667
      },
      {
        "name": "유방(C50)",
        "rate": 252.9,
        "average5Year": 252.9
      },
      {
        "name": "갑상선(C73)",
        "rate": 161.3,
        "average5Year": 161.3
      },
      {
        "name": "대장(C18-C20)",
        "rate": 38.3,
        "average5Year": 38.3
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 25.7,
        "average5Year": 25.7
      },
      {
        "name": "위(C16)",
        "rate": 25.1,
        "average5Year": 25.1
      },
      {
        "name": "자궁체부(C54)",
        "rate": 23.4,
        "average5Year": 23.4
      },
      {
        "name": "자궁경부(C53)",
        "rate": 19.4,
        "average5Year": 19.4
      },
      {
        "name": "난소(C56)",
        "rate": 18.5,
        "average5Year": 18.5
      },
      {
        "name": "폐(C33-C34)",
        "rate": 17.4,
        "average5Year": 17.4
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 7.8,
        "average5Year": 7.8
      },
      {
        "name": "신장(C64)",
        "rate": 7.7,
        "average5Year": 7.7
      },
      {
        "name": "간(C22)",
        "rate": 5.0      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 4.7,
        "average5Year": 4.7
      },
      {
        "name": "췌장(C25)",
        "rate": 4.7,
        "average5Year": 4.7
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 3.9,
        "average5Year": 3.9
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 2.6
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 2.3      },
      {
        "name": "방광(C67)",
        "rate": 1.2,
        "average5Year": 1.2
      },
      {
        "name": "식도(C15)",
        "rate": 1.1
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 1.0,
        "average5Year": 1.0
      },
      {
        "name": "고환(C62)",
        "rate": 0.7,
        "average5Year": 0.7
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.4      },
      {
        "name": "후두(C32)",
        "rate": 0.1      }
    ],
    "50-54": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 663.7,
        "average5Year": 525.36
      },
      {
        "name": "유방(C50)",
        "rate": 220.6,
        "average5Year": 220.6
      },
      {
        "name": "갑상선(C73)",
        "rate": 151.4,
        "average5Year": 151.4
      },
      {
        "name": "대장(C18-C20)",
        "rate": 58.0,
        "average5Year": 58.0
      },
      {
        "name": "위(C16)",
        "rate": 36.2,
        "average5Year": 36.2
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 36.1,
        "average5Year": 36.1
      },
      {
        "name": "자궁체부(C54)",
        "rate": 30.2,
        "average5Year": 30.2
      },
      {
        "name": "폐(C33-C34)",
        "rate": 28.2,
        "average5Year": 28.2
      },
      {
        "name": "난소(C56)",
        "rate": 22.2,
        "average5Year": 22.2
      },
      {
        "name": "자궁경부(C53)",
        "rate": 17.9,
        "average5Year": 17.9
      },
      {
        "name": "신장(C64)",
        "rate": 9.9,
        "average5Year": 9.9
      },
      {
        "name": "췌장(C25)",
        "rate": 9.5,
        "average5Year": 9.5
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 9.5,
        "average5Year": 9.5
      },
      {
        "name": "간(C22)",
        "rate": 8.0,
        "average5Year": 8.0
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 6.6,
        "average5Year": 6.6
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 5.2,
        "average5Year": 5.2
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 5.0      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 3.1,
        "average5Year": 3.1
      },
      {
        "name": "식도(C15)",
        "rate": 1.9,
        "average5Year": 1.9
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 1.9,
        "average5Year": 1.9
      },
      {
        "name": "방광(C67)",
        "rate": 1.7,
        "average5Year": 1.7
      },
      {
        "name": "후두(C32)",
        "rate": 0.4      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.4      },
      {
        "name": "고환(C62)",
        "rate": 0.2      }
    ],
    "55-59": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 682.9,
        "average5Year": 666.84
      },
      {
        "name": "유방(C50)",
        "rate": 191.5,
        "average5Year": 191.5
      },
      {
        "name": "갑상선(C73)",
        "rate": 131.0,
        "average5Year": 131.0
      },
      {
        "name": "대장(C18-C20)",
        "rate": 59.8,
        "average5Year": 59.8
      },
      {
        "name": "폐(C33-C34)",
        "rate": 49.9,
        "average5Year": 49.9
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 45.8,
        "average5Year": 45.8
      },
      {
        "name": "위(C16)",
        "rate": 44.9,
        "average5Year": 44.9
      },
      {
        "name": "자궁체부(C54)",
        "rate": 32.9,
        "average5Year": 32.9
      },
      {
        "name": "전립선(C61)",
        "rate": 26.6,
        "average5Year": 26.6
      },
      {
        "name": "난소(C56)",
        "rate": 21.0,
        "average5Year": 21.0
      },
      {
        "name": "췌장(C25)",
        "rate": 16.2,
        "average5Year": 16.2
      },
      {
        "name": "자궁경부(C53)",
        "rate": 16.1,
        "average5Year": 16.1
      },
      {
        "name": "간(C22)",
        "rate": 14.3,
        "average5Year": 14.3
      },
      {
        "name": "신장(C64)",
        "rate": 12.6,
        "average5Year": 12.6
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 11.6,
        "average5Year": 11.6
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 7.7,
        "average5Year": 7.7
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 7.0,
        "average5Year": 7.0
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 6.4,
        "average5Year": 6.4
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 4.4,
        "average5Year": 4.4
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 4.0      },
      {
        "name": "식도(C15)",
        "rate": 2.7,
        "average5Year": 2.7
      },
      {
        "name": "방광(C67)",
        "rate": 2.6
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.4      },
      {
        "name": "고환(C62)",
        "rate": 0.2      },
      {
        "name": "후두(C32)",
        "rate": 0.1      }
    ],
    "60-64": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 761.6,
        "average5Year": 905.2199999999999
      },
      {
        "name": "유방(C50)",
        "rate": 182.8,
        "average5Year": 182.8
      },
      {
        "name": "갑상선(C73)",
        "rate": 115.1,
        "average5Year": 115.1
      },
      {
        "name": "폐(C33-C34)",
        "rate": 76.7,
        "average5Year": 76.7
      },
      {
        "name": "대장(C18-C20)",
        "rate": 70.3,
        "average5Year": 70.3
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 64.2,
        "average5Year": 64.2
      },
      {
        "name": "위(C16)",
        "rate": 60.4,
        "average5Year": 60.4
      },
      {
        "name": "자궁체부(C54)",
        "rate": 27.4,
        "average5Year": 27.4
      },
      {
        "name": "췌장(C25)",
        "rate": 26.5,
        "average5Year": 26.5
      },
      {
        "name": "간(C22)",
        "rate": 20.3,
        "average5Year": 20.3
      },
      {
        "name": "난소(C56)",
        "rate": 19.8,
        "average5Year": 19.8
      },
      {
        "name": "신장(C64)",
        "rate": 16.1,
        "average5Year": 16.1
      },
      {
        "name": "자궁경부(C53)",
        "rate": 15.7,
        "average5Year": 15.7
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 15.0,
        "average5Year": 15.0
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 14.3,
        "average5Year": 14.3
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 9.4,
        "average5Year": 9.4
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 6.9,
        "average5Year": 6.9
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 6.1,
        "average5Year": 6.1
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 5.6,
        "average5Year": 5.6
      },
      {
        "name": "방광(C67)",
        "rate": 4.7,
        "average5Year": 4.7
      },
      {
        "name": "식도(C15)",
        "rate": 3.2,
        "average5Year": 3.2
      },
      {
        "name": "후두(C32)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "고환(C62)",
        "rate": 0.2      }
    ],
    "65-69": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 829.0,
        "average5Year": 1200.6733333333334
      },
      {
        "name": "유방(C50)",
        "rate": 157.9,
        "average5Year": 157.9
      },
      {
        "name": "폐(C33-C34)",
        "rate": 98.1,
        "average5Year": 98.1
      },
      {
        "name": "대장(C18-C20)",
        "rate": 86.5,
        "average5Year": 86.5
      },
      {
        "name": "갑상선(C73)",
        "rate": 86.3,
        "average5Year": 86.3
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 82.0,
        "average5Year": 82.0
      },
      {
        "name": "위(C16)",
        "rate": 74.6,
        "average5Year": 74.6
      },
      {
        "name": "췌장(C25)",
        "rate": 40.2,
        "average5Year": 40.2
      },
      {
        "name": "간(C22)",
        "rate": 33.5,
        "average5Year": 33.5
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 29.8,
        "average5Year": 29.8
      },
      {
        "name": "자궁체부(C54)",
        "rate": 25.7,
        "average5Year": 25.7
      },
      {
        "name": "신장(C64)",
        "rate": 18.5,
        "average5Year": 18.5
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 17.8,
        "average5Year": 17.8
      },
      {
        "name": "난소(C56)",
        "rate": 17.0,
        "average5Year": 17.0
      },
      {
        "name": "자궁경부(C53)",
        "rate": 14.6,
        "average5Year": 14.6
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 10.9,
        "average5Year": 10.9
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 9.5,
        "average5Year": 9.5
      },
      {
        "name": "방광(C67)",
        "rate": 8.0,
        "average5Year": 8.0
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 7.6,
        "average5Year": 7.6
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 6.8,
        "average5Year": 6.8
      },
      {
        "name": "식도(C15)",
        "rate": 2.6
      },
      {
        "name": "후두(C32)",
        "rate": 0.8
      },
      {
        "name": "고환(C62)",
        "rate": 0.3      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.1      }
    ],
    "70-74": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 990.1,
        "average5Year": 1594.5
      },
      {
        "name": "유방(C50)",
        "rate": 144.9,
        "average5Year": 144.9
      },
      {
        "name": "폐(C33-C34)",
        "rate": 132.9,
        "average5Year": 132.9
      },
      {
        "name": "대장(C18-C20)",
        "rate": 117.9,
        "average5Year": 117.9
      },
      {
        "name": "위(C16)",
        "rate": 112.6,
        "average5Year": 112.6
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 111.0,
        "average5Year": 111.0
      },
      {
        "name": "갑상선(C73)",
        "rate": 62.0,
        "average5Year": 62.0
      },
      {
        "name": "췌장(C25)",
        "rate": 55.1,
        "average5Year": 55.1
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 47.3,
        "average5Year": 47.3
      },
      {
        "name": "간(C22)",
        "rate": 47.1,
        "average5Year": 47.1
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 26.3,
        "average5Year": 26.3
      },
      {
        "name": "자궁체부(C54)",
        "rate": 20.5,
        "average5Year": 20.5
      },
      {
        "name": "난소(C56)",
        "rate": 20.5,
        "average5Year": 20.5
      },
      {
        "name": "신장(C64)",
        "rate": 20.0,
        "average5Year": 20.0
      },
      {
        "name": "자궁경부(C53)",
        "rate": 13.0,
        "average5Year": 13.0
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 13.0,
        "average5Year": 13.0
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 12.9,
        "average5Year": 12.9
      },
      {
        "name": "방광(C67)",
        "rate": 11.5,
        "average5Year": 11.5
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 9.9,
        "average5Year": 9.9
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 7.3,
        "average5Year": 7.3
      },
      {
        "name": "식도(C15)",
        "rate": 2.9,
        "average5Year": 2.9
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.9
      },
      {
        "name": "후두(C32)",
        "rate": 0.7,
        "average5Year": 0.7
      },
      {
        "name": "고환(C62)",
        "rate": 0.2      }
    ],
    "75-79": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 1148.0,
        "average5Year": 1906.6133333333335
      },
      {
        "name": "대장(C18-C20)",
        "rate": 166.3,
        "average5Year": 166.3
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 158.6,
        "average5Year": 158.6
      },
      {
        "name": "폐(C33-C34)",
        "rate": 150.4,
        "average5Year": 150.4
      },
      {
        "name": "위(C16)",
        "rate": 131.3,
        "average5Year": 131.3
      },
      {
        "name": "유방(C50)",
        "rate": 109.0,
        "average5Year": 109.0
      },
      {
        "name": "췌장(C25)",
        "rate": 76.5,
        "average5Year": 76.5
      },
      {
        "name": "간(C22)",
        "rate": 64.8,
        "average5Year": 64.8
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 63.4,
        "average5Year": 63.4
      },
      {
        "name": "갑상선(C73)",
        "rate": 42.4,
        "average5Year": 42.4
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 30.1,
        "average5Year": 30.1
      },
      {
        "name": "신장(C64)",
        "rate": 22.0,
        "average5Year": 22.0
      },
      {
        "name": "난소(C56)",
        "rate": 21.8,
        "average5Year": 21.8
      },
      {
        "name": "방광(C67)",
        "rate": 21.3,
        "average5Year": 21.3
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 16.8,
        "average5Year": 16.8
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 16.4,
        "average5Year": 16.4
      },
      {
        "name": "자궁경부(C53)",
        "rate": 16.3,
        "average5Year": 16.3
      },
      {
        "name": "자궁체부(C54)",
        "rate": 13.9,
        "average5Year": 13.9
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 10.6,
        "average5Year": 10.6
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 10.4,
        "average5Year": 10.4
      },
      {
        "name": "식도(C15)",
        "rate": 4.1,
        "average5Year": 4.1
      },
      {
        "name": "후두(C32)",
        "rate": 0.8
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.8
      },
      {
        "name": "고환(C62)",
        "rate": 0.2      }
    ],
    "80-84": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 1267.7,
        "average5Year": 2109.273333333333
      },
      {
        "name": "대장(C18-C20)",
        "rate": 208.0,
        "average5Year": 208.0
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 198.6,
        "average5Year": 198.6
      },
      {
        "name": "폐(C33-C34)",
        "rate": 161.2,
        "average5Year": 161.2
      },
      {
        "name": "위(C16)",
        "rate": 145.1,
        "average5Year": 145.1
      },
      {
        "name": "췌장(C25)",
        "rate": 88.5,
        "average5Year": 88.5
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 85.4,
        "average5Year": 85.4
      },
      {
        "name": "유방(C50)",
        "rate": 84.6,
        "average5Year": 84.6
      },
      {
        "name": "간(C22)",
        "rate": 78.3,
        "average5Year": 78.3
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 34.2,
        "average5Year": 34.2
      },
      {
        "name": "방광(C67)",
        "rate": 25.6,
        "average5Year": 25.6
      },
      {
        "name": "갑상선(C73)",
        "rate": 25.0,
        "average5Year": 25.0
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 18.5,
        "average5Year": 18.5
      },
      {
        "name": "자궁경부(C53)",
        "rate": 18.3,
        "average5Year": 18.3
      },
      {
        "name": "난소(C56)",
        "rate": 18.3,
        "average5Year": 18.3
      },
      {
        "name": "신장(C64)",
        "rate": 16.9,
        "average5Year": 16.9
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 16.6,
        "average5Year": 16.6
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 15.5,
        "average5Year": 15.5
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 12.9,
        "average5Year": 12.9
      },
      {
        "name": "자궁체부(C54)",
        "rate": 10.4,
        "average5Year": 10.4
      },
      {
        "name": "식도(C15)",
        "rate": 4.3,
        "average5Year": 4.3
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.9
      },
      {
        "name": "후두(C32)",
        "rate": 0.6,
        "average5Year": 0.6
      },
      {
        "name": "고환(C62)",
        "rate": 0.3      }
    ],
    "85+": [
      {
        "name": "모든 암(C00-C96)",
        "rate": 1308.0,
        "average5Year": 2067.9133333333334
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 259.8,
        "average5Year": 259.8
      },
      {
        "name": "대장(C18-C20)",
        "rate": 237.4,
        "average5Year": 237.4
      },
      {
        "name": "폐(C33-C34)",
        "rate": 158.0,
        "average5Year": 158.0
      },
      {
        "name": "위(C16)",
        "rate": 143.8,
        "average5Year": 143.8
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 102.0,
        "average5Year": 102.0
      },
      {
        "name": "췌장(C25)",
        "rate": 97.6,
        "average5Year": 97.6
      },
      {
        "name": "간(C22)",
        "rate": 82.9,
        "average5Year": 82.9
      },
      {
        "name": "유방(C50)",
        "rate": 52.4,
        "average5Year": 52.4
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 30.6,
        "average5Year": 30.6
      },
      {
        "name": "방광(C67)",
        "rate": 26.5,
        "average5Year": 26.5
      },
      {
        "name": "자궁경부(C53)",
        "rate": 17.6,
        "average5Year": 17.6
      },
      {
        "name": "난소(C56)",
        "rate": 16.8,
        "average5Year": 16.8
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 15.9,
        "average5Year": 15.9
      },
      {
        "name": "신장(C64)",
        "rate": 12.1,
        "average5Year": 12.1
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 12.0,
        "average5Year": 12.0
      },
      {
        "name": "갑상선(C73)",
        "rate": 11.8,
        "average5Year": 11.8
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 8.9,
        "average5Year": 8.9
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 8.8,
        "average5Year": 8.8
      },
      {
        "name": "식도(C15)",
        "rate": 5.6,
        "average5Year": 5.6
      },
      {
        "name": "자궁체부(C54)",
        "rate": 5.6,
        "average5Year": 5.6
      },
      {
        "name": "후두(C32)",
        "rate": 1.4      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.5,
        "average5Year": 0.5
      },
      {
        "name": "고환(C62)",
        "rate": 0.3      }
    ]
  }
};

// 데이터 로드 확인 함수
function checkDataLoaded() {
    console.log('cancerData 로드 상태:', !!cancerData);
    console.log('남성 데이터:', !!cancerData.male);
    console.log('여성 데이터:', !!cancerData.female);
    
    if (cancerData.male) {
        console.log('남성 연령대:', Object.keys(cancerData.male));
    }
    if (cancerData.female) {
        console.log('여성 연령대:', Object.keys(cancerData.female));
    }
    
    return !!(cancerData && cancerData.male && cancerData.female);
}

console.log('암 발생률 데이터 로드 완료');
checkDataLoaded();
