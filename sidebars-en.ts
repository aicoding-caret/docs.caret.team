import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/what-is-caret',
        'getting-started/model-selection-guide',
        'getting-started/installing-cline',
        'getting-started/task-management',
        'getting-started/understanding-context-management',
        {
          type: 'category',
          label: 'For New Coders',
          items: [
            'getting-started/for-new-coders',
            'getting-started/installing-dev-essentials'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Improving Your Prompting Skills',
      items: [
        'prompting/prompt-engineering-guide',
        'prompting/cline-memory-bank'
      ]
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/auto-approve',
        'features/checkpoints',
        'features/cline-rules',
        'features/drag-and-drop',
        'features/plan-and-act',
        'features/slash-commands/workflows',
        'features/focus-chain',
        'features/auto-compact',
        'features/editing-messages',
        {
          type: 'category',
          label: '@ Mentions',
          items: [
            'features/at-mentions/overview',
            'features/at-mentions/file-mentions',
            'features/at-mentions/terminal-mentions',
            'features/at-mentions/problem-mentions',
            'features/at-mentions/git-mentions',
            'features/at-mentions/url-mentions'
          ]
        },
        {
          type: 'category',
          label: 'Slash Commands',
          items: [
            'features/slash-commands/new-task',
            'features/slash-commands/new-rule',
            'features/slash-commands/smol',
            'features/slash-commands/report-bug',
            'features/slash-commands/deep-planning'
          ]
        },
        {
          type: 'category',
          label: 'Commands & Shortcuts',
          items: [
            'features/commands-and-shortcuts/overview',
            'features/commands-and-shortcuts/code-commands',
            'features/commands-and-shortcuts/terminal-integration',
            'features/commands-and-shortcuts/git-integration',
            'features/commands-and-shortcuts/keyboard-shortcuts'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Exploring Cline\'s Tools',
      items: [
        'exploring-clines-tools/cline-tools-guide',
        'exploring-clines-tools/new-task-tool',
        'exploring-clines-tools/remote-browser-support'
      ]
    },
    {
      type: 'category',
      label: 'Enterprise Solutions',
      items: [
        'enterprise-solutions/cloud-provider-integration',
        'enterprise-solutions/custom-instructions',
        'enterprise-solutions/mcp-servers',
        'enterprise-solutions/security-concerns'
      ]
    },
    {
      type: 'category',
      label: 'MCP Servers',
      items: [
        'mcp/mcp-overview',
        'mcp/adding-mcp-servers-from-github',
        'mcp/configuring-mcp-servers',
        'mcp/connecting-to-a-remote-server',
        'mcp/mcp-marketplace',
        'mcp/mcp-server-development-protocol',
        'mcp/mcp-transport-mechanisms'
      ]
    },
    {
      type: 'category',
      label: 'Provider Configuration',
      items: [
        'provider-config/anthropic',
        'provider-config/claude-code',
        {
          type: 'category',
          label: 'AWS Bedrock',
          items: [
            'provider-config/aws-bedrock/api-key',
            'provider-config/aws-bedrock/iam-credentials',
            'provider-config/aws-bedrock/cli-profile'
          ]
        },
        'provider-config/gcp-vertex-ai',
        'provider-config/litellm-and-cline-using-codestral',
        'provider-config/vscode-language-model-api',
        'provider-config/xai-grok',
        'provider-config/mistral-ai',
        'provider-config/deepseek',
        'provider-config/groq',
        'provider-config/cerebras',
        'provider-config/doubao',
        'provider-config/fireworks',
        'provider-config/zai',
        'provider-config/ollama',
        'provider-config/openai',
        'provider-config/openai-compatible',
        'provider-config/openrouter',
        'provider-config/sap-aicore',
        'provider-config/vercel-ai-gateway',
        'provider-config/requesty'
      ]
    },
    {
      type: 'category',
      label: 'Running Models Locally',
      items: [
        'running-models-locally/read-me-first',
        'running-models-locally/lm-studio',
        'running-models-locally/ollama'
      ]
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/terminal-quick-fixes',
        'troubleshooting/terminal-integration-guide'
      ]
    },
    {
      type: 'category',
      label: 'More Info',
      items: [
        'more-info/telemetry'
      ]
    }
  ],
};

export default sidebars;