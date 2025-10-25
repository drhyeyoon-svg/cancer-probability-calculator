// 위험인자 데이터 (엑셀 파일에서 자동 생성)
// 출처: 암종별_주요위험인자_OR정리_DOWNLOAD.xlsx

// 위험인자 카테고리 분류
const riskFactorCategories = {
    general: [
        "흡연", "음주", "비만", "담석증", "H. pylori", "HPV", "HBV", "HCV", 
        "EBV", "석면", "방사선", "자외선", "호르몬치료", "경구피임약", 
        "만성염증", "식이요인", "운동부족", "스트레스"
    ],
    familyHistory: [
        "가족력/유전"
    ]
};

const riskFactorData = {
    "흡연": [
        { cancer: "폐암", effect: 6.0 },
        { cancer: "위암", effect: 1.5 },
        { cancer: "방광암", effect: 3.0 },
        { cancer: "신장암", effect: 1.5 },
        { cancer: "자궁경부암", effect: 1.5 },
        { cancer: "구강·인두암", effect: 10.0 },
        { cancer: "후두암", effect: 5.0 },
        { cancer: "췌장암", effect: 1.7 }
    ],
    "음주": [
        { cancer: "대장암", effect: 1.5 },
        { cancer: "간암", effect: 3.0 },
        { cancer: "유방암", effect: 1.3 },
        { cancer: "췌장암", effect: 1.5 },
        { cancer: "구강·인두암", effect: 10.0 },
        { cancer: "후두암", effect: 15.0 }
    ],
    "비만": [
        { cancer: "대장암", effect: 1.3 },
        { cancer: "유방암(폐경후)", effect: 1.5 },
        { cancer: "자궁체부암", effect: 1.6 },
        { cancer: "신장암", effect: 1.4 },
        { cancer: "방광암", effect: 1.2 },
        { cancer: "췌장암", effect: 1.5 },
        { cancer: "다발성골수종", effect: 1.1 }
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
    ],
    "담석증": [
        { cancer: "담낭암", effect: 7.0 },
        { cancer: "담도암", effect: 4.0 }
    ],
    "H. pylori": [
        { cancer: "위암", effect: 2.0 },
        { cancer: "비호지킨림프종(MALT)", effect: 3.0 }
    ],
    "HPV": [
        { cancer: "자궁경부암", effect: 50.0 },
        { cancer: "구강·인두암(구인두)", effect: 5.0 }
    ],
    "HBV": [
        { cancer: "간암", effect: 30.0 }
    ],
    "HCV": [
        { cancer: "간암", effect: 20.0 }
    ],
    "방사선": [
        { cancer: "갑상선암(소아기 노출)", effect: 7.0 },
        { cancer: "백혈병", effect: 2.0 },
        { cancer: "뇌·CNS", effect: 2.0 }
    ],
    "고염식": [
        { cancer: "위암", effect: 1.7 }
    ],
    "붉은·가공육": [
        { cancer: "대장암", effect: 1.1 }
    ],
    "당뇨병": [
        { cancer: "췌장암", effect: 1.8 },
        { cancer: "자궁체부암", effect: 1.6 }
    ],
    "벤젠(직업)": [
        { cancer: "백혈병", effect: 2.0 }
    ],
    "방향족 아민(직업)": [
        { cancer: "방광암", effect: 3.0 }
    ]
};

// 위험인자 카테고리
const riskFactorCategories = {
    general: ["흡연", "음주", "비만", "담석증", "H. pylori", "HPV", "HBV", "HCV", "방사선", "고염식", "붉은·가공육", "당뇨병", "벤젠(직업)", "방향족 아민(직업)"],
    familyHistory: ["유방암 가족력", "난소암 가족력", "대장암 가족력", "전립선암 가족력", "췌장암 가족력"]
};




