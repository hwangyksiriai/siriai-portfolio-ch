# SIRIAI × 小红书 시딩 포트폴리오 — PRD

## 1. 목적 / 타깃

- **타깃**: 중국 시장 진출(샤오홍수 시딩)을 검토 중인 한국 브랜드의 마케팅 의사결정자
- **목표**: "SIRIAI가 XHS 시딩을 실제로, 잘 해봤다"를 증거(발행 콘텐츠)로 증명해 문의 전환
- **핵심 차이**: 기존 siriai-portfolio가 *카테고리 전시*라면, 이 사이트는 *케이스 스터디 설득*

## 2. 정보 구조

```
/                       랜딩 (딥 스크롤 덱)
  00 HERO               SIRIAI × 小红书
  01 WHY XHS            왜 지금 샤오홍수인가 (숫자 3~4개)
  02 WHAT WE DO         숏폼 / 피드 / 오프라인 방문 / 브랜드 계정 운영
  03 PROCESS            섭외 → 가이드 → 촬영/발행 → 리포트
  04 CASES              브랜드 카드 그리드 → /case/[slug]
  05 CREATOR POOL       누적 크리에이터 수 · 팔로워 규모 분포 · 카테고리
  06 CONTACT

/case/[slug]            케이스 상세 (8division showcase 형식)
```

## 3. 케이스 상세 페이지 규격 (레퍼런스 구조 계승)

1. 헤더: `브랜드 × 小红书` + 캠페인 한 줄 요약 + 기간 · "실제 발행 콘텐츠 일부"
2. **숏폼** 섹션: 세로 영상 카드 (자동재생·무음·루프)
3. **피드** 섹션: 이미지 캐러셀 카드 (`1 / 9` 카운터 + ‹ › 화살표)
4. 카드 공통 메타:
   - 크리에이터 닉네임(중문) / 팔로워 수 / 발행일
   - 콘셉트 라벨 (예: "아이돌 옷장 콘셉트")
   - **중문 원문 후킹 카피**
   - 한국어 해설 2~3문장 (브랜드가 "이게 왜 좋은 콘텐츠인지" 알 수 있게)
   - `小红书에서 보기 ↗` 아웃링크
5. 하단: 캠페인 성과 요약 (선택) + 다른 케이스로 이동

## 4. 디자인 방향

기존 포트폴리오 톤(`포트폴리오/app/globals.css`)을 그대로 가져옵니다.

| 토큰 | 값 |
|---|---|
| `--bg` | `#0b0a08` |
| `--ink` | `#f3eee5` |
| `--muted` | `#96907f` |
| `--accent` | `#c9903f` |
| `--line` | `#2a2318` |
| 폰트 | Inter Tight + Noto Sans KR (+ **Noto Sans SC** 신규 — 중문 카피용) |

- 랜딩: 기존과 동일하게 `scroll-snap` 풀스크린 덱 + 상단 카테고리 내비 + 하단 `01 / 07` HUD + 우하단 Contact 플로팅
- 케이스 상세: 덱 대신 **일반 세로 스크롤** (레퍼런스처럼 콘텐츠 양이 유동적이라 스냅이 방해됨). 단 배경/타이포는 다크 톤 유지 → 레퍼런스의 라이트 톤과 달라지는 지점
- 중문 후킹 카피는 `--accent` 컬러 + Noto Sans SC로 시각적 구분

## 5. 데이터 모델

케이스당 JSON 하나. 이걸 채우면 페이지가 생성됩니다.

```jsonc
// content/cases/8division.json
{
  "slug": "8division",
  "brand": "8DIVISION",
  "category": "Fashion",
  "period": "2026.08.25 – 08.28",
  "summary": "명동 본점 오프라인 캠페인. 숏폼·피드 모두 진행...",
  "cover": "/cases/8division/cover.jpg",
  "items": [
    {
      "type": "video",              // "video" | "carousel"
      "creator": "阿玥的小日常",
      "followers": "1.1만",
      "date": "2026.08.25",
      "concept": "매장 방문 시착 OOTD",
      "hookCn": "平时不潮的人进了这家店也会变得潮潮的～",
      "noteKo": "친구들과 유럽·미국·일본·한국 스타일을 섞어 입는 콘셉트...",
      "media": ["/cases/8division/item-1/video.mp4"],
      "xhsUrl": "https://www.xiaohongshu.com/discovery/item/..."
    }
  ]
}
```

**미디어 경로**: `public/cases/{slug}/item-{n}/` 에 `video.mp4` 또는 `img-01.jpg`…
용량이 커지면(케이스 3개 이상, 영상 다수) Vercel Blob으로 이전 — 기존 포트폴리오가 이미 `@vercel/blob` + `scripts/migrate-to-blob.mjs`를 쓰고 있어 그대로 재사용 가능.

## 6. 기술 스택

기존 포트폴리오와 동일하게 맞춰 유지보수 부담 최소화:

- Next.js 15 App Router / React 19 (JS, TS 아님)
- 정적 JSON 기반 → `generateStaticParams`로 케이스 페이지 프리렌더
- `public/` 직접 호스팅 → 필요 시 `@vercel/blob`
- Vercel 배포, 새 프로젝트 (예: `siriai-xhs-portfolio`)

## 7. 제가 필요한 것 (링크만으로는 부족한 부분)

1. **XHS 게시물 링크** — 케이스별로
2. **미디어 파일** — 영상 `.mp4`, 피드 이미지들. XHS 봇 차단으로 링크에서 자동 수집이 막힐 가능성이 높음
3. 케이스별 **크리에이터 닉네임 / 팔로워 수 / 발행일**
4. 랜딩 `01 WHY XHS`, `05 CREATOR POOL`에 넣을 **실제 숫자** (누적 크리에이터 수, 진행 브랜드 수 등)

## 8. 확정된 결정 (2026-09-04)

- **톤**: 다크 — 기존 SIRIAI 포트폴리오 토큰 그대로 계승
- **범위**: 케이스 중심 얇은 사이트 — 히어로 + 캠페인 그리드 + 컨택트. WHY XHS / PROCESS / CREATOR POOL 섹션은 만들지 않음
- **배포**: 통합 포트폴리오 1개 (`siriai-xhs-portfolio`)

## 9. 실제 정보 구조 (구현됨)

```
/                  히어로 + 캠페인 그리드 + 컨택트 푸터
/case/[slug]       케이스 상세 — 숏폼 섹션 / 피드 섹션
```

랜딩은 위 결정에 따라 §2의 7섹션 덱 대신 얇은 1페이지로 구현되었습니다.

## 10. 콘텐츠 인테이크

수집 현황과 필요한 자료는 [content/INTAKE.md](content/INTAKE.md) 참조.
