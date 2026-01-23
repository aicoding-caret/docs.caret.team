#!/usr/bin/env python3
"""
Translation script to translate docs-en files to German (docs-de).
This script reads English MDX files and translates them to German.
"""

import os
import re
import json
from pathlib import Path
from typing import Tuple
import subprocess

# Configuration
DOCS_EN_DIR = Path("/home/luke/dev/caret/docs.careti.ai/docs-en")
DOCS_DE_DIR = Path("/home/luke/dev/caret/docs.careti.ai/docs-de")

# Technical terms that should NOT be translated
PRESERVE_TERMS = {
    "Caret", "Cline", "Claude", "VS Code", "VSCode",
    "personas", "workflows", "tasks", "shortcuts", "commands",
    "MCP", "LLM", "AI", "API", "SDK", "CLI", "gRPC",
    "GitHub", "Anthropic", "OpenAI", "Google", "AWS",
    "Gemini", "Claude Opus", "Claude Sonnet", "Claude Haiku",
    "TypeScript", "JavaScript", "Python", "Go", "Rust",
    "JSON", "YAML", "MDX", "Markdown", "Git",
    "Slack", "Discord", "HTTP", "REST", "WebSocket",
    "Terminal", "Shell", "Bash", "zsh", "PowerShell",
    "Model", "Provider", "Token", "Context Window",
    "System Prompt", "User Message", "Assistant",
    "Function Calling", "Tool Use", "RAG",
    "Ollama", "LM Studio", "Mistral", "Groq", "xAI", "OpenRouter",
    "GPT-4", "GPT-3.5", "Bedrock", "Vertex AI", "FireWorks",
    "Codestral", "DeepSeek", "Qwen", "Doubao",
    "Memory Bank", "Checkpoint", "Auto-Compact",
    "Dual Mode", "Enhanced Mode", "YOLO Mode",
    "Focus Chain", "Multiroot Workspace",
    "Dark Mode", "Light Mode",
    "v3.38.2", "v3", "Docusaurus",
    "Import", "Export", "Settings", "Extensions",
    "Marketplace", "Repository", "README", "LICENSE",
    "Enterprise", "Sovereign Cloud"
}

def extract_frontmatter(content: str) -> Tuple[dict, str]:
    """Extract YAML frontmatter from MDX content."""
    pattern = r'^---\s*\n(.*?)\n---\s*\n'
    match = re.match(pattern, content, re.DOTALL)

    if not match:
        return {}, content

    frontmatter_str = match.group(1)
    body = content[match.end():]

    # Simple YAML parsing for basic key-value pairs
    frontmatter = {}
    for line in frontmatter_str.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip().strip('"\'')
            frontmatter[key] = value

    return frontmatter, body

def translate_text_with_claude(text: str) -> str:
    """Use Claude via subprocess to translate text to German."""
    prompt = f"""You are an expert translator. Translate the following technical documentation from English to German.

IMPORTANT RULES:
1. Keep these technical terms in English: Caret, Cline, Claude, personas, workflows, tasks, MCP, LLM, API, CLI, SDK, gRPC, GitHub, VS Code, Python, TypeScript, JSON, YAML, Terminal, Model, Provider, Token, etc.
2. Keep all code blocks unchanged
3. Keep all markdown formatting (links, bold, italic, headers)
4. Keep image URLs unchanged
5. Keep HTML tags and JSX expressions unchanged
6. Only translate natural language text
7. Maintain the exact same structure and formatting
8. Use natural, idiomatic German - not machine translation
9. Keep all emojis
10. Keep all file paths and command syntax unchanged

Text to translate:
---
{text}
---

Provide ONLY the translated text, with no additional explanations or comments."""

    try:
        result = subprocess.run(
            ['claude-code', 'ask', prompt],
            capture_output=True,
            text=True,
            timeout=120
        )

        if result.returncode == 0:
            return result.stdout.strip()
        else:
            print(f"Translation error: {result.stderr}")
            return text
    except Exception as e:
        print(f"Error calling Claude: {e}")
        return text

def translate_mdx_file(en_path: Path) -> str:
    """Translate an MDX file from English to German."""
    try:
        with open(en_path, 'r', encoding='utf-8') as f:
            original_content = f.read()

        # Extract frontmatter
        frontmatter, body = extract_frontmatter(original_content)

        # Translate frontmatter
        translated_frontmatter = {}
        for key, value in frontmatter.items():
            if key in ['title', 'description', 'keywords', 'sidebar_label']:
                translated_frontmatter[key] = translate_text_with_claude(value)
            else:
                translated_frontmatter[key] = value

        # Translate body
        translated_body = translate_text_with_claude(body)

        # Reconstruct the document
        result = "---\n"
        for key, value in translated_frontmatter.items():
            result += f'{key}: "{value}"\n'
        result += "---\n\n"
        result += translated_body

        return result
    except Exception as e:
        print(f"Error processing {en_path}: {e}")
        return ""

def main():
    """Main translation function."""
    print("Starting German translation of docs-en to docs-de...")

    # Get all MDX files
    mdx_files = sorted(DOCS_EN_DIR.rglob("*.mdx"))
    print(f"Found {len(mdx_files)} MDX files to translate")

    successful = 0
    skipped = 0
    failed = 0

    for i, en_file in enumerate(mdx_files, 1):
        # Calculate relative path
        rel_path = en_file.relative_to(DOCS_EN_DIR)
        de_file = DOCS_DE_DIR / rel_path

        # Ensure directory exists
        de_file.parent.mkdir(parents=True, exist_ok=True)

        print(f"\n[{i}/{len(mdx_files)}] Translating: {rel_path}")

        # Check if already translated (contains German content)
        if de_file.exists():
            with open(de_file, 'r', encoding='utf-8') as f:
                existing = f.read()
            if "title:" in existing and ("Was ist" in existing or "Einführung" in existing or not existing.strip().endswith("Caret")):
                print(f"  ✓ Already translated, skipping")
                skipped += 1
                continue

        # Translate the file
        translated_content = translate_mdx_file(en_file)

        if translated_content:
            with open(de_file, 'w', encoding='utf-8') as f:
                f.write(translated_content)
            print(f"  ✓ Translated successfully")
            successful += 1
        else:
            print(f"  ✗ Translation failed")
            failed += 1

    print(f"\n\nTranslation Summary:")
    print(f"  Successful: {successful}")
    print(f"  Skipped: {skipped}")
    print(f"  Failed: {failed}")
    print(f"  Total: {len(mdx_files)}")

if __name__ == "__main__":
    main()
