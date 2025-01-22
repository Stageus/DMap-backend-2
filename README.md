# 🗺️ D-Map Backend

## 📌 프로젝트 개요

**D-Map 프로젝트**는 사용자 위치 기반의 **Playground 서비스**로, 사용자가 자신의 이동 경로를 지도 위에 그림으로 표현하고 이를 공유할 수 있는 기능을 제공합니다.

**주요 목표:**

- 지도 기반 트래킹을 활용한 창의적인 콘텐츠 생성
- 공유 및 좋아요 기능을 통한 사용자 간 인터랙션
- 인기 데이터를 실시간으로 반영하여 사용자에게 노출

---
## ✨ 주요 기능 소개

1. **트래킹 기능:**  
   - 사용자의 이동 경로를 이미지의 형태로 저장하여 창의적인 콘텐츠 제작 가능.
   - 트래킹 이미지를 공유하여 피드처럼 노출 가능.

2. **SNS 페이지:**  
   - 사용자가 공유한 트래킹 이미지를 조회하고 좋아요를 통해 반응할 수 있는 SNS형 피드 제공.
   - 인기 데이터를 실시간으로 반영하여 노출.

3. **그림 꾸미기 기능:**  
   - 사용자가 트래킹한 경로를 색상, 굵기 등의 옵션으로 꾸밀 수 있음.

---
## 🛠️ 기술 스택

- **백엔드:** Express.js (Node.js 기반 프레임워크)
- **데이터베이스:** PostgreSQL + PostGIS (공간 데이터 처리 지원)
- **배포 환경:** PM2
- **인증 방식:** OAuth 2.0 (네이버, 카카오, 구글)
- **스토리지:** AWS S3 (이미지 저장)

---
## 🏗 프로젝트 구조
```bash
DMap-backend/
├── src/                   
│   ├── constant/           # 상수 및 정규 표현식 관련 파일
│   ├── database/           # 데이터베이스 연결 설정
│   ├── middleware/         # 미들웨어 함수
│   ├── module/             # 공통 모듈
│   ├── router/             # API 라우트 정의
│   │   ├── account/        # 계정 관련 기능
│   │   │   ├── router.js   # 계정 API 라우트
│   │   │   ├── service.js  # 계정 서비스 로직
│   │   │   └── sql.js      # 계정 SQL 쿼리 정의
│   │   ├── tracking/       # 트래킹 관련 기능
│   │   ├── sns/            # SNS 관련 기능
│   │   └── search/         # 검색 관련 기능
│   └── util/               # 유틸리티 함수
├── .gitignore              # Git 무시할 파일 목록
├── package.json            # 프로젝트 종속성 및 스크립트 정의
├── package-lock.json       # 종속성 버전 잠금
├── README.md               # 프로젝트 설명 문서
└── index.js                # 서버 엔트리 포인트
```
---

## 📖 API 개요

### **1. 트래킹 API**

| 메서드 | 엔드포인트 | 설명 |
| --- | --- | --- |
| POST | `/tracking` | 트래킹 이미지 생성 |
| GET | `/tracking/account/:user_idx/?page=1&category=1` | 나/다른 사용자 트래킹 이미지 가져오기 |
| DELETE | `/tracking` | 나의 트래킹 이미지 삭제 |
| GET | `/tracking/:tracking_idx` | 트래킹 라인 가져오기 |
| PUT | `/tracking/:tracking_idx` | 트래킹 이미지 수정 |
| PUT | `/tracking/toSharing` | 트래킹 이미지 공유 상태 변경 |
| PUT | `/tracking/toNotShaing` | 트래킹 이미지 비공유 상태 변경 |

---

### **2. SNS API**

| 메서드 | 엔드포인트 | 설명 |
| --- | --- | --- |
| GET | `/sns/?category=default&page=1` | SNS 페이지 기본 트래킹 이미지 가져오기 |
| GET | `/sns/tracking-image/:tracking_idx` | 특정 트래킹 이미지 가져오기 |
| POST | `/sns/like` | 트래킹 이미지 좋아요 |
| DELETE | `/sns/like` | 트래킹 이미지 좋아요 삭제 |

---

### **3. 계정(Account) API**

| 메서드 | 엔드포인트 | 설명 |
| --- | --- | --- |
| GET | `/account/login/naver` | 네이버 로그인 |
| GET | `/account/login/kakao` | 카카오 로그인 |
| GET | `/account/login/google` | 구글 로그인 |
| GET | `/account/accesstoken` | Access Token 재발급 |
| DELETE | `/account/user` | 회원 탈퇴하기 |
| GET | `/account/me` | 내 정보 가져오기 |
| GET | `/account/info/:idx` | 회원 정보 가져오기 |
| GET | `/account/nickname` | 닉네임 랜덤 값 제공 |
| PUT | `/account/nickname` | 닉네임 수정하기 |
| PUT | `/account/image` | 프로필 이미지 수정하기 |
| DELETE | `/account/image` | 프로필 이미지 삭제하기 |

---

### **4. 검색(Search) API**

| 메서드 | 엔드포인트 | 설명 |
| --- | --- | --- |
| GET | `/search/nickname/:text/:page` | 닉네임 검색 |
| GET | `/search/searchpoint/:text/:page` | 트래킹 이미지 검색 |

---

## 📜 프로젝트 문서

- [요구사항 명세서](#)
- [와이어프레임](#)
- [페이지 명세서](#)
- [DB 테이블 명세서](#)
- [API 명세서](#)
- [협업 노션 페이지](#)

(문서 링크는 추후 업데이트 예정)

---
