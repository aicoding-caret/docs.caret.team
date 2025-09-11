import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'category',
      label: '시작하기',
      items: [
        'getting-started/what-is-caret',
        'getting-started/installing-cline',
        'getting-started/model-selection-guide',
        'getting-started/understanding-context-management',
        'getting-started/for-new-coders',
        'getting-started/task-management',
        'getting-started/installing-dev-essentials',
      ],
    },
    {
      type: 'category',
      label: '기능',
      items: [
        'features/drag-and-drop',
        'features/focus-chain',
        'features/plan-and-act',
        'features/auto-compact',
        'features/auto-approve',
        'features/checkpoints',
        'features/cline-rules',
        'features/editing-messages',
        {
          type: 'category',
          label: '@ 멘션',
          items: [
            'features/at-mentions/overview',
            'features/at-mentions/file-mentions',
            'features/at-mentions/folder-mentions',
            'features/at-mentions/git-mentions',
            'features/at-mentions/problem-mentions',
            'features/at-mentions/terminal-mentions',
            'features/at-mentions/url-mentions',
          ],
        },
        {
          type: 'category',
          label: '슬래시 명령어',
          items: [
            'features/slash-commands/slash-commands',
            'features/slash-commands/deep-planning',
            'features/slash-commands/new-rule',
            'features/slash-commands/new-task',
            'features/slash-commands/report-bug',
            'features/slash-commands/smol',
            'features/slash-commands/workflows',
          ],
        },
        {
          type: 'category',
          label: '명령어 및 단축키',
          items: [
            'features/commands-and-shortcuts/overview',
            'features/commands-and-shortcuts/code-commands',
            'features/commands-and-shortcuts/git-integration',
            'features/commands-and-shortcuts/keyboard-shortcuts',
            'features/commands-and-shortcuts/terminal-integration',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '프롬프팅',
      items: [
        'prompting/prompt-engineering-guide',
        'prompting/cline-memory-bank',
      ],
    },
    {
      type: 'category',
      label: '공급자 설정',
      items: [
        'provider-config/anthropic',
        'provider-config/openai',
        'provider-config/claude-code',
        'provider-config/ollama',
        'provider-config/openai-compatible',
        'provider-config/openrouter',
        'provider-config/deepseek',
        'provider-config/groq',
        'provider-config/cerebras',
        'provider-config/xai-grok',
        'provider-config/mistral-ai',
        'provider-config/fireworks-ai',
        'provider-config/gcp-vertex-ai',
        'provider-config/vercel-ai-gateway',
        'provider-config/doubao',
        'provider-config/fireworks',
        'provider-config/zai',
        'provider-config/requesty',
        'provider-config/sap-aicore',
        'provider-config/vscode-language-model-api',
        'provider-config/litellm-and-cline-using-codestral',
        {
          type: 'category',
          label: 'AWS Bedrock',
          items: [
            'provider-config/aws-bedrock/api-key',
            'provider-config/aws-bedrock/cli-profile',
            'provider-config/aws-bedrock/iam-credentials',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'MCP',
      items: [
        'mcp/mcp-overview',
        'mcp/configuring-mcp-servers',
        'mcp/mcp-marketplace',
        'mcp/adding-mcp-servers-from-github',
        'mcp/connecting-to-a-remote-server',
        'mcp/mcp-server-development-protocol',
        'mcp/mcp-transport-mechanisms',
      ],
    },
    {
      type: 'category',
      label: '로컬 모델 실행',
      items: [
        'running-models-locally/read-me-first',
        'running-models-locally/ollama',
        'running-models-locally/lm-studio',
      ],
    },
    {
      type: 'category',
      label: '문제 해결',
      items: [
        'troubleshooting/terminal-integration-guide',
      ],
    },
    {
      type: 'category',
      label: 'Cline 도구 탐색',
      items: [
        'exploring-clines-tools/cline-tools-guide',
        'exploring-clines-tools/new-task-tool',
        'exploring-clines-tools/remote-browser-support',
      ],
    },
    {
      type: 'category',
      label: '기업 솔루션',
      items: [
        'enterprise-solutions/cloud-provider-integration',
        'enterprise-solutions/custom-instructions',
        'enterprise-solutions/mcp-servers',
        'enterprise-solutions/security-concerns',
      ],
    },
    {
      type: 'category',
      label: '기타 정보',
      items: [
        'more-info/telemetry',
      ],
    },
  ],
};

export default sidebars;