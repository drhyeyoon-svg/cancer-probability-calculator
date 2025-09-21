// 암 발생률 데이터
// 국가통계자료 기반 (24개_암종_성_연령_5세_별_암발생자수__발생률)
// 마지막 업데이트: 2025년 9월
// 데이터 출처: KOSIS 국가통계포털

const cancerData = {
  "male": {
    "0-19": [
      {
        "name": "백혈병(C91-C95)",
        "rate": 4.8
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 4.8
      },
      {
        "name": "갑상선(C73)",
        "rate": 2.3
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 2.1
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 1.6
      },
      {
        "name": "간(C22)",
        "rate": 1.0
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 0.5
      },
      {
        "name": "신장(C64)",
        "rate": 0.5
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.5
      },
      {
        "name": "고환(C62)",
        "rate": 0.4
      },
      {
        "name": "대장(C18-C20)",
        "rate": 0.3
      },
      {
        "name": "췌장(C25)",
        "rate": 0.2
      },
      {
        "name": "폐(C33-C34)",
        "rate": 0.2
      },
      {
        "name": "위(C16)",
        "rate": 0.1
      },
      {
        "name": "후두(C32)",
        "rate": 0.1
      },
      {
        "name": "전립선(C61)",
        "rate": 0.1
      },
      {
        "name": "방광(C67)",
        "rate": 0.1
      }
    ],
    "20-29": [
      {
        "name": "갑상선(C73)",
        "rate": 19.6
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 5.4
      },
      {
        "name": "대장(C18-C20)",
        "rate": 5.2
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 3.4
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 3.2
      },
      {
        "name": "고환(C62)",
        "rate": 2.6
      },
      {
        "name": "신장(C64)",
        "rate": 2.1
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 2.0
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 1.4
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.2
      },
      {
        "name": "위(C16)",
        "rate": 0.9
      },
      {
        "name": "췌장(C25)",
        "rate": 0.7
      },
      {
        "name": "폐(C33-C34)",
        "rate": 0.7
      },
      {
        "name": "간(C22)",
        "rate": 0.3
      },
      {
        "name": "방광(C67)",
        "rate": 0.2
      },
      {
        "name": "식도(C15)",
        "rate": 0.1
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 0.1
      },
      {
        "name": "전립선(C61)",
        "rate": 0.1
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 0.1
      }
    ],
    "30-39": [
      {
        "name": "갑상선(C73)",
        "rate": 54.9
      },
      {
        "name": "대장(C18-C20)",
        "rate": 25.1
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 11.4
      },
      {
        "name": "신장(C64)",
        "rate": 7.9
      },
      {
        "name": "위(C16)",
        "rate": 5.5
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 4.8
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 4.5
      },
      {
        "name": "고환(C62)",
        "rate": 4.0
      },
      {
        "name": "간(C22)",
        "rate": 3.7
      },
      {
        "name": "폐(C33-C34)",
        "rate": 3.5
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 3.0
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 2.6
      },
      {
        "name": "췌장(C25)",
        "rate": 1.7
      },
      {
        "name": "방광(C67)",
        "rate": 0.7
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.7
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 0.4
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 0.3
      },
      {
        "name": "식도(C15)",
        "rate": 0.2
      },
      {
        "name": "후두(C32)",
        "rate": 0.1
      },
      {
        "name": "유방(C50)",
        "rate": 0.1
      },
      {
        "name": "전립선(C61)",
        "rate": 0.1
      }
    ],
    "40-49": [
      {
        "name": "갑상선(C73)",
        "rate": 57.5
      },
      {
        "name": "대장(C18-C20)",
        "rate": 44.8
      },
      {
        "name": "위(C16)",
        "rate": 27.5
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 23.6
      },
      {
        "name": "간(C22)",
        "rate": 18.6
      },
      {
        "name": "신장(C64)",
        "rate": 17.1
      },
      {
        "name": "폐(C33-C34)",
        "rate": 10.6
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 8.6
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 7.7
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 6.3
      },
      {
        "name": "췌장(C25)",
        "rate": 5.7
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 3.2
      },
      {
        "name": "방광(C67)",
        "rate": 3.0
      },
      {
        "name": "전립선(C61)",
        "rate": 2.5
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 1.9
      },
      {
        "name": "고환(C62)",
        "rate": 1.6
      },
      {
        "name": "식도(C15)",
        "rate": 1.2
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 1.2
      },
      {
        "name": "후두(C32)",
        "rate": 0.7
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.6
      },
      {
        "name": "유방(C50)",
        "rate": 0.2
      }
    ],
    "50-59": [
      {
        "name": "대장(C18-C20)",
        "rate": 93.4
      },
      {
        "name": "위(C16)",
        "rate": 85.1
      },
      {
        "name": "간(C22)",
        "rate": 55.4
      },
      {
        "name": "폐(C33-C34)",
        "rate": 46.0
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 43.5
      },
      {
        "name": "갑상선(C73)",
        "rate": 43.1
      },
      {
        "name": "전립선(C61)",
        "rate": 34.1
      },
      {
        "name": "신장(C64)",
        "rate": 26.9
      },
      {
        "name": "췌장(C25)",
        "rate": 19.2
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 17.8
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 14.8
      },
      {
        "name": "방광(C67)",
        "rate": 10.8
      },
      {
        "name": "식도(C15)",
        "rate": 10.0
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 8.5
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 8.1
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 4.9
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 4.0
      },
      {
        "name": "후두(C32)",
        "rate": 3.7
      },
      {
        "name": "유방(C50)",
        "rate": 0.8
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.8
      },
      {
        "name": "고환(C62)",
        "rate": 0.5
      }
    ],
    "60-69": [
      {
        "name": "전립선(C61)",
        "rate": 201.7
      },
      {
        "name": "폐(C33-C34)",
        "rate": 197.4
      },
      {
        "name": "위(C16)",
        "rate": 196.8
      },
      {
        "name": "대장(C18-C20)",
        "rate": 169.5
      },
      {
        "name": "간(C22)",
        "rate": 100.1
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 92.5
      },
      {
        "name": "췌장(C25)",
        "rate": 46.1
      },
      {
        "name": "신장(C64)",
        "rate": 41.0
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 36.0
      },
      {
        "name": "갑상선(C73)",
        "rate": 34.8
      },
      {
        "name": "방광(C67)",
        "rate": 34.3
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 31.5
      },
      {
        "name": "식도(C15)",
        "rate": 30.7
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 26.4
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 13.8
      },
      {
        "name": "후두(C32)",
        "rate": 13.6
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 10.3
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 8.1
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.4
      },
      {
        "name": "유방(C50)",
        "rate": 0.8
      },
      {
        "name": "고환(C62)",
        "rate": 0.4
      }
    ],
    "70+": [
      {
        "name": "폐(C33-C34)",
        "rate": 537.7
      },
      {
        "name": "전립선(C61)",
        "rate": 502.9
      },
      {
        "name": "위(C16)",
        "rate": 321.6
      },
      {
        "name": "대장(C18-C20)",
        "rate": 301.3
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 240.7
      },
      {
        "name": "간(C22)",
        "rate": 181.3
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 117.7
      },
      {
        "name": "방광(C67)",
        "rate": 112.6
      },
      {
        "name": "췌장(C25)",
        "rate": 102.7
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 53.2
      },
      {
        "name": "식도(C15)",
        "rate": 45.9
      },
      {
        "name": "신장(C64)",
        "rate": 45.3
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 41.9
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 30.5
      },
      {
        "name": "후두(C32)",
        "rate": 20.4
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 19.9
      },
      {
        "name": "갑상선(C73)",
        "rate": 16.5
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 12.8
      },
      {
        "name": "유방(C50)",
        "rate": 2.8
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.6
      },
      {
        "name": "고환(C62)",
        "rate": 0.7
      }
    ]
  },
  "female": {
    "0-19": [
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 4.1
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 3.8
      },
      {
        "name": "갑상선(C73)",
        "rate": 3.7
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 2.0
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 1.3
      },
      {
        "name": "난소(C56)",
        "rate": 1.2
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 0.5
      },
      {
        "name": "간(C22)",
        "rate": 0.4
      },
      {
        "name": "췌장(C25)",
        "rate": 0.4
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.4
      },
      {
        "name": "대장(C18-C20)",
        "rate": 0.3
      },
      {
        "name": "고환(C62)",
        "rate": 0.3
      },
      {
        "name": "폐(C33-C34)",
        "rate": 0.2
      },
      {
        "name": "자궁체부(C54)",
        "rate": 0.2
      },
      {
        "name": "신장(C64)",
        "rate": 0.2
      },
      {
        "name": "위(C16)",
        "rate": 0.1
      },
      {
        "name": "유방(C50)",
        "rate": 0.1
      },
      {
        "name": "자궁경부(C53)",
        "rate": 0.1
      }
    ],
    "20-29": [
      {
        "name": "갑상선(C73)",
        "rate": 56.7
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 5.6
      },
      {
        "name": "대장(C18-C20)",
        "rate": 4.6
      },
      {
        "name": "유방(C50)",
        "rate": 4.1
      },
      {
        "name": "난소(C56)",
        "rate": 2.8
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 2.8
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 2.5
      },
      {
        "name": "자궁체부(C54)",
        "rate": 2.0
      },
      {
        "name": "자궁경부(C53)",
        "rate": 1.8
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 1.5
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 1.4
      },
      {
        "name": "췌장(C25)",
        "rate": 1.4
      },
      {
        "name": "고환(C62)",
        "rate": 1.4
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 1.2
      },
      {
        "name": "위(C16)",
        "rate": 1.1
      },
      {
        "name": "신장(C64)",
        "rate": 1.1
      },
      {
        "name": "폐(C33-C34)",
        "rate": 0.8
      },
      {
        "name": "간(C22)",
        "rate": 0.2
      },
      {
        "name": "방광(C67)",
        "rate": 0.2
      },
      {
        "name": "식도(C15)",
        "rate": 0.1
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 0.1
      }
    ],
    "30-39": [
      {
        "name": "갑상선(C73)",
        "rate": 127.9
      },
      {
        "name": "유방(C50)",
        "rate": 44.5
      },
      {
        "name": "대장(C18-C20)",
        "rate": 19.7
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 11.5
      },
      {
        "name": "자궁경부(C53)",
        "rate": 10.7
      },
      {
        "name": "자궁체부(C54)",
        "rate": 7.3
      },
      {
        "name": "위(C16)",
        "rate": 6.6
      },
      {
        "name": "난소(C56)",
        "rate": 4.7
      },
      {
        "name": "신장(C64)",
        "rate": 4.5
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 4.1
      },
      {
        "name": "폐(C33-C34)",
        "rate": 3.8
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 3.7
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 2.7
      },
      {
        "name": "간(C22)",
        "rate": 2.2
      },
      {
        "name": "고환(C62)",
        "rate": 2.1
      },
      {
        "name": "췌장(C25)",
        "rate": 1.9
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 1.8
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.7
      },
      {
        "name": "방광(C67)",
        "rate": 0.5
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 0.4
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 0.2
      },
      {
        "name": "식도(C15)",
        "rate": 0.1
      },
      {
        "name": "후두(C32)",
        "rate": 0.1
      }
    ],
    "40-49": [
      {
        "name": "유방(C50)",
        "rate": 160.1
      },
      {
        "name": "갑상선(C73)",
        "rate": 144.3
      },
      {
        "name": "대장(C18-C20)",
        "rate": 38.5
      },
      {
        "name": "위(C16)",
        "rate": 25.1
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 22.8
      },
      {
        "name": "자궁경부(C53)",
        "rate": 15.0
      },
      {
        "name": "자궁체부(C54)",
        "rate": 14.3
      },
      {
        "name": "폐(C33-C34)",
        "rate": 13.0
      },
      {
        "name": "난소(C56)",
        "rate": 11.3
      },
      {
        "name": "신장(C64)",
        "rate": 9.4
      },
      {
        "name": "간(C22)",
        "rate": 8.0
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 7.5
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 5.1
      },
      {
        "name": "췌장(C25)",
        "rate": 4.9
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 4.7
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 2.7
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 1.8
      },
      {
        "name": "방광(C67)",
        "rate": 1.5
      },
      {
        "name": "전립선(C61)",
        "rate": 1.2
      },
      {
        "name": "식도(C15)",
        "rate": 0.9
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 0.9
      },
      {
        "name": "고환(C62)",
        "rate": 0.8
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.5
      },
      {
        "name": "후두(C32)",
        "rate": 0.3
      }
    ],
    "50-59": [
      {
        "name": "유방(C50)",
        "rate": 154.2
      },
      {
        "name": "갑상선(C73)",
        "rate": 116.5
      },
      {
        "name": "대장(C18-C20)",
        "rate": 67.6
      },
      {
        "name": "위(C16)",
        "rate": 51.8
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 41.6
      },
      {
        "name": "폐(C33-C34)",
        "rate": 40.8
      },
      {
        "name": "자궁체부(C54)",
        "rate": 23.6
      },
      {
        "name": "간(C22)",
        "rate": 22.3
      },
      {
        "name": "전립선(C61)",
        "rate": 17.2
      },
      {
        "name": "난소(C56)",
        "rate": 16.1
      },
      {
        "name": "신장(C64)",
        "rate": 15.2
      },
      {
        "name": "췌장(C25)",
        "rate": 14.4
      },
      {
        "name": "자궁경부(C53)",
        "rate": 12.7
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 11.6
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 9.6
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 6.9
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 6.3
      },
      {
        "name": "방광(C67)",
        "rate": 4.3
      },
      {
        "name": "식도(C15)",
        "rate": 4.2
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 4.0
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 3.2
      },
      {
        "name": "후두(C32)",
        "rate": 1.1
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.5
      },
      {
        "name": "고환(C62)",
        "rate": 0.2
      }
    ],
    "60-69": [
      {
        "name": "유방(C50)",
        "rate": 128.8
      },
      {
        "name": "폐(C33-C34)",
        "rate": 114.2
      },
      {
        "name": "대장(C18-C20)",
        "rate": 100.6
      },
      {
        "name": "위(C16)",
        "rate": 99.1
      },
      {
        "name": "전립선(C61)",
        "rate": 98.3
      },
      {
        "name": "갑상선(C73)",
        "rate": 84.5
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 77.8
      },
      {
        "name": "간(C22)",
        "rate": 44.8
      },
      {
        "name": "췌장(C25)",
        "rate": 36.5
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 25.4
      },
      {
        "name": "신장(C64)",
        "rate": 23.1
      },
      {
        "name": "자궁체부(C54)",
        "rate": 20.0
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 18.9
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 13.9
      },
      {
        "name": "난소(C56)",
        "rate": 13.9
      },
      {
        "name": "방광(C67)",
        "rate": 13.2
      },
      {
        "name": "자궁경부(C53)",
        "rate": 11.4
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 11.1
      },
      {
        "name": "식도(C15)",
        "rate": 9.7
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 7.7
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 6.7
      },
      {
        "name": "후두(C32)",
        "rate": 3.8
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.6
      },
      {
        "name": "고환(C62)",
        "rate": 0.2
      }
    ],
    "70+": [
      {
        "name": "폐(C33-C34)",
        "rate": 225.3
      },
      {
        "name": "대장(C18-C20)",
        "rate": 205.7
      },
      {
        "name": "전립선(C61)",
        "rate": 199.9
      },
      {
        "name": "기타 암(Re. C00-C96)",
        "rate": 193.6
      },
      {
        "name": "위(C16)",
        "rate": 170.4
      },
      {
        "name": "간(C22)",
        "rate": 90.3
      },
      {
        "name": "췌장(C25)",
        "rate": 84.1
      },
      {
        "name": "담낭 및 기타 담도(C23-C24)",
        "rate": 82.9
      },
      {
        "name": "유방(C50)",
        "rate": 77.9
      },
      {
        "name": "방광(C67)",
        "rate": 38.3
      },
      {
        "name": "비호지킨 림프종(C82-C86,C96)",
        "rate": 34.7
      },
      {
        "name": "갑상선(C73)",
        "rate": 31.2
      },
      {
        "name": "신장(C64)",
        "rate": 23.3
      },
      {
        "name": "입술, 구강 및 인두(C00-C14)",
        "rate": 18.7
      },
      {
        "name": "백혈병(C91-C95)",
        "rate": 17.9
      },
      {
        "name": "난소(C56)",
        "rate": 15.5
      },
      {
        "name": "다발성 골수종(C90)",
        "rate": 14.9
      },
      {
        "name": "자궁경부(C53)",
        "rate": 13.2
      },
      {
        "name": "식도(C15)",
        "rate": 12.5
      },
      {
        "name": "뇌 및 중추신경계(C70-C72)",
        "rate": 10.5
      },
      {
        "name": "자궁체부(C54)",
        "rate": 9.9
      },
      {
        "name": "후두(C32)",
        "rate": 4.8
      },
      {
        "name": "호지킨 림프종(C81)",
        "rate": 0.9
      },
      {
        "name": "고환(C62)",
        "rate": 0.2
      }
    ]
  }
};

// 데이터 검증 함수
function validateCancerData() {
    const requiredAgeGroups = ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    const requiredGenders = ['male', 'female'];
    
    for (const gender of requiredGenders) {
        if (!cancerData[gender]) {
            console.error(`성별 데이터 누락: ${gender}`);
            return false;
        }
        
        for (const ageGroup of requiredAgeGroups) {
            if (!cancerData[gender][ageGroup] || cancerData[gender][ageGroup].length === 0) {
                console.warn(`${gender} ${ageGroup} 데이터가 없습니다.`);
            }
        }
    }
    
    console.log('암종 데이터 검증 완료');
    return true;
}

// 데이터 통계 정보
function getCancerDataStats() {
    let totalEntries = 0;
    let totalAgeGroups = 0;
    
    for (const gender of ['male', 'female']) {
        for (const ageGroup in cancerData[gender]) {
            totalAgeGroups++;
            totalEntries += cancerData[gender][ageGroup].length;
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
    validateCancerData();
    const stats = getCancerDataStats();
    console.log('암종 데이터 통계:', stats);
    console.log('총 데이터 항목 수: 299');
});
