# Caret Docs 머지 마스터 노트 - 2025-12-02

## 목적
- upstream(Cline)와 캐럿 문서를 비교·동기화하는 절차를 고정하고, Vertex 배포에 맞춰 안정성을 확보합니다.

## 소스 기준
- upstream: `caret/docs` (Cline 최신, `origin/main`)
- 캐럿 추가 기능: `caret/caret-docs/features` (F00~F12)
- 타깃: `docs-en`(Caret 브랜딩), 이후 `docs-ko` 번역

## 현황 (2025-12-02)
- `caret/docs` ↔ `docs-en`: 경로/파일 세트 일치(brand 치환 기준). `docs-en`에만 추가된 항목은 `getting-started/what-is-caret.mdx` 1건.
- 네비: `sidebars-en.ts` 하단에 "Improving Your Prompting Skills" 카테고리가 중복으로 남아 있음(제거 필요).
- 캐럿 전용 기능 문서: `caret/caret-docs/features`(F00~F12) 가 현재 `docs-en`에 편입되지 않음(예전 `docs-en/caret-exclusive/*` 제거 상태). 재통합 및 네비 추가 필요.
- Vertex 배포: 정적 Docusaurus 빌드 구조라 추가 제약 없음. 배포 시 `docusaurus.config.ts`의 `baseUrl`/자산 경로만 재확인하면 됨.

## 계획 (순서 제안)
1) 영어 정합성 마감: `sidebars-en.ts` 중복 제거, 빌드 체크.
2) 캐럿 추가 기능 반영: `caret/caret-docs/features` → `docs-en` 신규 섹션(예: `caret-exclusive/` 재활용)으로 MD→MDX 변환 후 네비 추가.
3) 번역: 위 변경분을 `docs-ko`에 동기화.
4) 자동화 초안:
   - 파일 세트 비교: `python3 - <<'PY' ...`로 `caret/docs` vs `docs-en` (cline→caret 치환) 비교
   - 캐럿 기능 검출: `caret/caret-docs/features` 리스트와 `docs-en` 대응 섹션 비교 스크립트
5) 검증: `npm run build` 또는 프리뷰로 링크/앵커/자산 확인 후 Vertex 배포 플로우 점검.

## 오픈 TODO
- F00~F12 문서 편입 대상/위치 확정, 내용 변환(MDX) 및 네비 추가
- 번역 스코프·용어집 확정

## 실행 순서 (현재 스코프)
1) 듀얼 모드/클라인 호환 문서에 프롬프트 시스템 요약 추가  
   - ko: `docs-ko/caret-exclusive/dual-prompt-modes.mdx`에 Chatbot/Agent + JSON 프롬프트/도구 제한/용어치환 요약 추가(개발자 세부는 생략)  
   - en: `docs-en/caret-exclusive/dual-prompt-modes.mdx` 복원 및 동일 내용 간략 버전 작성
2) 네비 연결  
   - en: `sidebars-en.ts`에 Caret Exclusive 카테고리 추가(우선 dual-prompt-modes 1건)
   - ko: 기존 사이드바 유지
3) 빌드 확인 (Vertex 배포 전 점검)  
4) 추가 캐럿 기능 문서 편입 범위 확정(F00/F01/F05/F07/F09 개발자용 여부 포함) 및 후속 번역

## 진행 업데이트 (2025-12-02)
- 듀얼 모드 문서: ko에 프롬프트/도구제한/용어치환 요약 추가, en 신규 작성
- 네비: en에 Caret Exclusive 카테고리 추가 및 항목 전체(overview/persona/dual/brand/enhanced/caret-provider/knowledge/multilingual/advanced)
- MDX 컴포넌트 확장: Frame/CardGroup/Warning/Callout/Check/Tab/TabItem 등을 글로벌 등록
- 빌드: `npm run build` 성공. 경고: 삭제된/미이관 문서 링크 다수(주로 `/features/*`, `/mcp/*`, `/caret-cli/*`, locale별 구 문서). 필요 시 링크 수정/리디렉션 추가.
- 피드백 반영(2025-12-08): ko 전용 문서 정리(duo prompt 과장 제거, 프로바이더/BizRouter/국내예정 추가, Discord 링크 교체, 다국어 과장 삭제, Focus Chain 번역, Auto Approve/키보드/터미널/Caret 표기, .caretignore로 정정). en/ko prompt guide 모두 `.caretignore`로 정비.
- 언어 정비: 홈 다국어 UI 텍스트/스위처 추가(리다이렉트 제거), 네비 언어 드롭다운 갱신, auto-approve en/ja/zh 베스트 프랙티스 정리(Caret 브랜딩 일관화)
