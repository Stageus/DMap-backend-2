const adjectives = [
  "행복한",
  "화난",
  "귀여운",
  "용감한",
  "우아한",
  "따뜻한",
  "활기찬",
  "느긋한",
  "열정적인",
  "배고픈",
  "속상한",
  "친절한",
  "재미있는",
  "수줍은",
  "현명한",
  "성실한",
  "똑똑한",
  "호기심 많은",
  "단호한",
  "활달한",
  "깜찍한",
  "차가운",
  "따뜻한",
  "시원한",
  "냉정한",
  "독창적인",
  "엄격한",
  "사려 깊은",
  "지혜로운",
  "신속한",
  "느긋한",
  "자비로운",
  "용감한",
  "힘찬",
  "활동적인",
  "사랑스러운",
  "매력적인",
  "인내심 있는",
  "깨끗한",
  "강렬한",
  "깔끔한",
  "겸손한",
  "유쾌한",
  "명랑한",
  "상냥한",
  "예리한",
  "화려한",
  "달콤한",
  "차분한",
  "영리한",
  "독특한",
  "유머러스한",
  "느린",
  "빠른",
  "경쾌한",
  "중요한",
  "단순한",
  "엄청난",
  "멋진",
  "소중한",
  "화사한",
  "산뜻한",
  "귀여운",
  "아름다운",
  "현명한",
  "즐거운",
  "기쁜",
  "활기찬",
  "특이한",
  "우아한",
  "단단한",
  "약한",
  "용감한",
  "행복한",
  "자랑스러운",
  "슬픈",
  "기운찬",
  "명랑한",
  "온화한",
  "신중한",
  "사나운",
  "차분한",
  "잘생긴",
  "귀여운",
  "멍청한",
  "조용한",
  "활발한",
  "민첩한",
  "날카로운",
  "유연한",
  "부드러운",
  "짧은",
  "긴",
  "강렬한",
  "엉뚱한",
  "신비한",
  "귀여운",
  "달콤한",
  "성급한",
  "의욕적인",
  "활기찬",
  "정직한",
  "차가운",
  "매혹적인",
  "강인한",
  "단정한",
  "장난스러운",
  "정겨운",
  "소박한",
  "열심인",
  "애정어린",
  "깨끗한",
  "긍정적인",
  "미묘한",
  "열정적인",
  "강렬한",
  "친근한",
  "희망찬",
  "침착한",
  "이국적인",
  "순수한",
  "현대적인",
  "깔끔한",
  "고요한",
  "냉철한",
  "풍요로운",
  "화목한",
  "정교한",
  "담백한",
  "화사한",
  "신비로운",
  "활달한",
  "달콤한",
  "재치 있는",
  "정감 어린",
  "기분 좋은",
  "효율적인",
  "단아한",
  "세련된",
  "의욕적인",
  "참신한",
  "절제된",
  "평화로운",
  "선명한",
  "개성 있는",
  "균형 잡힌",
  "질서 있는",
  "낙천적인",
  "지적인",
  "창조적인",
  "배려 깊은",
  "열린",
  "편안한",
  "소중한",
  "진지한",
  "풍성한",
  "우호적인",
  "활발한",
  "강렬한",
  "매력적인",
  "대담한",
  "고급스러운",
  "자연스러운",
  "독창적인",
  "풍부한",
  "섬세한",
  "우수한",
  "사려 깊은",
  "따뜻한",
  "개방적인",
  "실용적인",
  "풍요로운",
  "다정한",
  "침착한",
  "단호한",
  "친절한",
  "명확한",
  "뛰어난",
  "사랑스러운",
  "깔끔한",
  "유연한",
  "정성스러운",
  "확고한",
  "다양한",
  "진솔한",
  "차분한",
  "희망적인",
  "열린 마음의",
  "명랑한",
  "사려 깊은",
  "냉정한",
  "우울한",
  "명민한",
  "지혜로운",
  "신속한",
  "사랑받는",
  "외로운",
  "적극적인",
  "단단한",
  "경쾌한",
  "거친",
  "은밀한",
  "사악한",
  "차분한",
  "따뜻한",
  "행운의",
  "정의로운",
  "무서운",
  "황홀한",
  "섹시한",
  "사려있는",
  "현명한",
  "자신감 있는",
  "감미로운",
  "어두운",
  "기묘한",
  "기쁜",
  "도전적인",
  "흔들리는",
  "미끄러운",
  "축축한",
  "힘찬",
  "변덕스러운",
  "강렬한",
  "슬픈",
  "빛나는",
  "유쾌한",
  "낯선",
  "지속적인",
  "놀라운",
  "정직한",
  "결정적인",
  "도발적인",
  "영광스러운",
  "무뚝뚝한",
  "속삭이는",
  "흥미로운",
  "절망적인",
  "고요한",
  "아름다운",
  "우아한",
  "창백한",
  "비통한",
  "찬란한",
  "눈부신",
  "섬뜩한",
  "은은한",
  "민첩한",
  "속도감 있는",
  "빛바랜",
  "가냘픈",
  "화려한",
  "애처로운",
  "조용한",
  "깨달은",
  "낙관적인",
  "과묵한",
  "천진난만한",
  "뭉클한",
  "강렬한",
  "사색적인",
  "성실한",
  "정열적인",
  "완벽한",
  "고결한",
  "비밀스러운",
  "황량한",
  "선량한",
  "친숙한",
  "불길한",
  "재미있는",
  "냉혹한",
  "사려깊은",
  "과감한",
  "다정한",
  "달성한",
  "엄격한",
  "도덕적인",
  "빛바랜",
  "무모한",
];

const nouns = [
  "코끼리",
  "앵무새",
  "호랑이",
  "사자",
  "토끼",
  "고양이",
  "개",
  "너구리",
  "곰",
  "여우",
  "늑대",
  "거북이",
  "돼지",
  "병아리",
  "닭",
  "말",
  "소",
  "양",
  "염소",
  "코알라",
  "펭귄",
  "햄스터",
  "고슴도치",
  "쥐",
  "오리",
  "비둘기",
  "참새",
  "수달",
  "다람쥐",
  "알파카",
  "도마뱀",
  "악어",
  "낙타",
  "공작",
  "부엉이",
  "까마귀",
  "갈매기",
  "바다사자",
  "돌고래",
  "고래",
  "해마",
  "문어",
  "오징어",
  "새우",
  "개구리",
  "독수리",
  "황새",
  "나비",
  "벌",
  "잠자리",
  "사마귀",
  "거미",
  "파리",
  "메뚜기",
  "개미",
  "지네",
  "지렁이",
  "두더지",
  "까치",
  "공룡",
  "말미잘",
  "불가사리",
  "해파리",
  "바다거북",
  "망둥어",
  "게",
  "가재",
  "박쥐",
  "참치",
  "청어",
  "멸치",
  "고등어",
  "황새치",
  "상어",
  "참돔",
  "붕어",
  "잉어",
  "금붕어",
  "망아지",
  "송아지",
  "새끼곰",
  "다람쥐",
  "바다표범",
  "두루미",
  "뱀",
  "코뿔소",
  "바다뱀",
  "가마우지",
  "올빼미",
  "직박구리",
  "호박벌",
  "사슴",
  "미어캣",
  "스컹크",
  "판다",
  "살모사",
  "가오리",
  "말벌",
  "하이에나",
  "치타",
  "두더지",
  "고래",
  "멸치",
  "불가사리",
  "돌고래",
  "황새",
  "문어",
  "거북이",
  "올빼미",
  "가재",
  "말미잘",
  "비둘기",
  "소금쟁이",
  "참새",
  "까마귀",
  "고슴도치",
  "햄스터",
  "사막여우",
  "레서판다",
  "가오리",
  "물고기",
  "송아지",
  "참치",
  "타조",
  "코뿔소",
  "수달",
  "알파카",
  "고양이",
  "너구리",
  "족제비",
  "판다",
  "치타",
  "스컹크",
  "까치",
  "독수리",
  "앵무새",
  "도마뱀",
  "미어캣",
  "바다사자",
  "개구리",
  "악어",
  "코알라",
  "캥거루",
  "사자",
  "호랑이",
  "고라니",
  "바다뱀",
  "바다거북",
  "갈매기",
  "수리부엉이",
  "모기",
  "파리",
  "메뚜기",
  "벌",
  "나비",
  "잠자리",
  "해파리",
  "상어",
  "불개미",
  "가마우지",
  "말벌",
  "벌새",
  "흰수염고래",
  "망아지",
  "개미핥기",
  "사마귀",
  "왕새우",
  "청새치",
  "문어",
  "참돔",
  "개미",
  "바다표범",
  "복어",
  "오리너구리",
  "꿀벌",
  "독개구리",
  "달팽이",
  "대왕오징어",
  "삵",
  "염소",
  "소",
  "말",
  "병아리",
  "두루미",
  "여우",
  "늑대",
  "돼지",
  "말벌",
  "하이에나",
  "족제비",
  "도롱뇽",
  "장수풍뎅이",
  "제비",
  "늑대거북",
  "숭어",
  "꿀꺽새",
  "참새우",
  "호박벌",
  "도마뱀붙이",
  "전갈",
  "코요테",
  "퓨마",
  "아르마딜로",
  "침팬지",
  "고릴라",
  "족제비",
  "바다소",
  "산양",
  "자이언트판다",
  "큰곰",
  "꼬마새",
  "킹크랩",
  "장어",
  "알바트로스",
  "사슴벌레",
  "까마귀",
  "말벌",
  "철새",
  "바다거북",
  "검은곰",
  "흑표범",
  "수리",
  "황소",
  "낙타",
  "마카로니펭귄",
  "아나콘다",
  "카멜레온",
  "바다거북이",
  "물소",
  "저빌",
  "개코원숭이",
  "큰고래",
  "황제펭귄",
  "수달",
  "레몬상어",
  "나무늘보",
  "여우원숭이",
  "소",
  "붉은여우",
  "모피",
  "해마",
  "붉은매",
  "거미원숭이",
  "비단구렁이",
  "독수리",
  "푸른비둘기",
  "바다독수리",
  "돌고래",
  "독도새",
  "자라",
  "산토끼",
  "줄무늬다람쥐",
  "부엉이",
  "큰까마귀",
  "기러기",
  "철새",
  "물새",
  "참치",
  "미꾸라지",
  "독거미",
  "큰멸치",
  "잉어",
  "노랑딱새",
  "파랑새",
  "갈색여우",
  "흰머리수리",
  "토끼",
  "큰곰",
  "흰꼬리수리",
  "코브라",
  "검독수리",
  "황새",
  "큰까치",
  "흰눈썹박새",
  "갈매기",
  "바다거북",
  "바다사자",
  "푸른앵무새",
  "바다독수리",
  "대왕문어",
];

module.exports = { nouns, adjectives };
