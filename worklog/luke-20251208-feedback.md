1. http://localhost:3000/ko/caret-exclusive/dual-prompt-modes
 아래의 기능은 처음 듣는데, 정말 되는 기능이야 ? 요구사항에 없었고, 구현 테스트 한적 없음
 -- 
 모드 전환 방법
모드 간 전환은 매우 간단합니다.

설정에서 전환하기:

Caret 설정 창을 엽니다 (⚙️ 아이콘)
일반 탭으로 이동합니다
AI 모드 섹션에서 원하는 모드를 선택합니다:
Cline 모드 (Plan/Act)
Caret Agent 모드
Caret Chatbot 모드
변경 사항은 즉시 적용됩니다
프로젝트별 설정도 가능합니다. 프로젝트 루트에 .vscode/settings.json 파일을 만들고:

{
  "caret.aiMode": "agent"  // 또는 "chatbot", "cline"
}

이렇게 설정하면 해당 프로젝트를 열 때마다 자동으로 지정한 모드로 작동합니다.

2. http://localhost:3000/ko/caret-exclusive/enhanced-provider-setup
   - LiteLLM  개선 사항
   - BizRouter  설명 추가 
   - 국내 다양한 프로바이더 추가 예정 (Naver, upstage 예정)    

3. http://localhost:3000/ko/caret-exclusive/caret-provider
 디스코드 Url 수정 : https://discord.com/invite/K3mU3EEvWm
  ChatGPT, Claude, Naver, upstage  추가 예정

4. http://localhost:3000/ko/caret-exclusive/multilingual-ui

혼합언어 프로젝트, 언어전환 시나리오는 너무 많이 나갔어. 모든 UI 텍스트는 전문 번역가가 검수했습니다: 삭제
AI가 했어. 
 그냥 네이티브 언어 지원으로 각 국가사용자가 쉽게 접근이야. 우선 한국에서 하다보니 동아시아중심으로 시작한거고, 점차 늘려나갈 예정

5. http://localhost:3000/ko/features/focus-chain
 미번역 번역해

6. http://localhost:3000/ko/features/auto-approve
 왜 여기 메뉴는 자동 승인이 아니고 auto-approve로 그대로 썼어. 번역해

7. http://localhost:3000/ko/features/commands-and-shortcuts/keyboard-shortcuts
 Cline에 추가 를 Caret으로 바꾸기

8. http://localhost:3000/ko/features/commands-and-shortcuts/terminal-integration
 Cline 을 Caret으로 바꾸기

9. http://localhost:3000/ko/prompting/prompt-engineering-guide
 .clineignore를  .caretignore 로 변경

 
11. http://localhost:3000/ko/troubleshooting/terminal-integration-guide
 Cline 을 Caret으로 바꾸기