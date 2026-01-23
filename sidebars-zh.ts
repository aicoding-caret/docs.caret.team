import type { SidebarsConfig } from "@docusaurus/plugin-content-docs"

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
			type: "category",
			label: "入门指南",
			items: [
				"getting-started/what-is-careti",
				"getting-started/installing-careti",
				"getting-started/model-selection-guide",
				"getting-started/selecting-your-model",
				"getting-started/your-first-project",
				"getting-started/understanding-context-management",
				"getting-started/for-new-coders",
				"getting-started/task-management",
				"getting-started/installing-dev-essentials",
			],
		},
		{
			type: "category",
			label: "介绍",
			items: ["introduction/welcome", "introduction/overview"],
		},
		{
			type: "category",
			label: "功能特性",
			items: [
				{
					type: "doc",
					id: "caret-exclusive/persona-system",
					label: "^ 角色系统",
				},
				{
					type: "doc",
					id: "caret-exclusive/dual-prompt-modes",
					label: "^ 双模式系统",
				},
				{
					type: "doc",
					id: "features/input-history",
					label: "^ 提示词历史",
				},
				{
					type: "doc",
					id: "caret-exclusive/brand-switching",
					label: "^ OEM品牌切换",
				},
				{
					type: "doc",
					id: "caret-exclusive/enhanced-provider-setup",
					label: "^ 增强的提供商设置",
				},
				{
					type: "doc",
					id: "caret-exclusive/caret-provider",
					label: "^ Caret提供商",
				},
				{
					type: "doc",
					id: "caret-exclusive/knowledge-parity-system",
					label: "^ AI组织知识与规则标准化",
				},
				{
					type: "doc",
					id: "caret-exclusive/document-tools",
					label: "^ 文档读取工具",
				},
				{
					type: "doc",
					id: "caret-exclusive/image-tools",
					label: "^ 图像工具",
				},
				{
					type: "doc",
					id: "caret-exclusive/multilingual-ui",
					label: "^ 完整的多语言UI",
				},
				"features/skills",
				"features/yolo-mode",
				"features/dictation",
				"features/multiroot-workspace",
				"features/drag-and-drop",
				"features/focus-chain",
				"features/plan-and-act",
				"features/auto-compact",
				"features/auto-approve",
				"features/checkpoints",
				"features/caret-rules",
				"features/editing-messages",
				"features/hooks",
				{
					type: "category",
					label: "@ 提及",
					items: [
						"features/at-mentions/overview",
						"features/at-mentions/file-mentions",
						"features/at-mentions/folder-mentions",
						"features/at-mentions/git-mentions",
						"features/at-mentions/problem-mentions",
						"features/at-mentions/terminal-mentions",
						"features/at-mentions/url-mentions",
					],
				},
				{
					type: "category",
					label: "斜杠命令",
					items: [
						"features/slash-commands/slash-commands",
						"features/slash-commands/deep-planning",
						"features/slash-commands/new-rule",
						"features/slash-commands/new-task",
						"features/slash-commands/report-bug",
						"features/slash-commands/smol",
						"features/slash-commands/workflows",
						"features/slash-commands/workflows/quickstart",
						"features/slash-commands/workflows/best-practices",
					],
				},
				{
					type: "category",
					label: "命令与快捷键",
					items: [
						"features/commands-and-shortcuts/overview",
						"features/commands-and-shortcuts/code-commands",
						"features/commands-and-shortcuts/git-integration",
						"features/commands-and-shortcuts/keyboard-shortcuts",
						"features/commands-and-shortcuts/terminal-integration",
					],
				},
				{
					type: "category",
					label: "自定义",
					items: [
						"features/customization/opening-caret-in-sidebar",
						"features/customization/disable-terminal-pagers",
					],
				},
				{
					type: "category",
					label: "任务",
					items: ["features/tasks/understanding-tasks", "features/tasks/task-management"],
				},
			],
		},
		/* Careti CLI hidden for v0.4.4.
		{
			type: "category",
			label: "Careti CLI",
			items: [
				"caret-cli/overview",
				"caret-cli/installation",
				"caret-cli/three-core-flows",
				"caret-cli/cli-reference",
				{
					type: "category",
					label: "示例",
					items: [
						"caret-cli/samples/overview",
						"caret-cli/samples/github-integration",
						"caret-cli/samples/github-issue-rca",
					],
				},
			],
		},
		*/
		{
			type: "category",
			label: "提升提示技巧",
			items: ["prompting/prompt-engineering-guide", "prompting/caret-memory-bank"],
		},
		{
			type: "category",
			label: "模型配置",
			items: [
				"core-features/model-selection-guide",
				"model-config/model-comparison",
				"model-config/context-windows",
			],
		},
		{
			type: "category",
			label: "供应商配置",
			items: [
				"provider-config/anthropic",
				"provider-config/openai",
				"provider-config/claude-code",
				"provider-config/ollama",
				"provider-config/openai-compatible",
				"provider-config/openrouter",
				"provider-config/baseten",
				"provider-config/deepseek",
				"provider-config/groq",
				"provider-config/cerebras",
				"provider-config/xai-grok",
				"provider-config/mistral-ai",
				"provider-config/fireworks-ai",
				"provider-config/gcp-vertex-ai",
				"provider-config/vercel-ai-gateway",
				"provider-config/doubao",
				"provider-config/fireworks",
				"provider-config/zai",
				"provider-config/upstage",
				"provider-config/requesty",
				"provider-config/sap-aicore",
				"provider-config/vscode-language-model-api",
				"provider-config/litellm-and-caret-using-codestral",
				{
					type: "category",
					label: "AWS Bedrock",
					items: [
						"provider-config/aws-bedrock/api-key",
						"provider-config/aws-bedrock/cli-profile",
						"provider-config/aws-bedrock/iam-credentials",
					],
				},
			],
		},
		{
			type: "category",
			label: "MCP服务器",
			items: [
				"mcp/mcp-overview",
				"mcp/configuring-mcp-servers",
				"mcp/mcp-marketplace",
				"mcp/adding-mcp-servers-from-github",
				"mcp/connecting-to-a-remote-server",
				"mcp/mcp-server-development-protocol",
				"mcp/mcp-transport-mechanisms",
			],
		},
		{
			type: "category",
			label: "本地运行模型",
			items: [
				"running-models-locally/overview",
				"running-models-locally/read-me-first",
				"running-models-locally/ollama",
				"running-models-locally/lm-studio",
			],
		},
		{
			type: "category",
			label: "故障排除",
			items: ["troubleshooting/terminal-integration-guide", "troubleshooting/terminal-quick-fixes"],
		},
		{
			type: "category",
			label: "探索Caret工具",
			items: [
				"exploring-carets-tools/caret-tools-guide",
				"exploring-carets-tools/document-tools",
				"exploring-carets-tools/new-task-tool",
				"exploring-carets-tools/remote-browser-support",
			],
		},
		{
			type: "category",
			label: "企业级解决方案",
			items: [
				"enterprise-solutions/overview",
				"enterprise-solutions/cloud-provider-integration",
				"enterprise-solutions/custom-instructions",
				"enterprise-solutions/mcp-servers",
				"enterprise-solutions/security-concerns",
			],
		},
		{
			type: "category",
			label: "更多信息",
			items: ["more-info/telemetry"],
		},
	],
}

export default sidebars
