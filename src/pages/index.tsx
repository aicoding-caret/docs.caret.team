import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Caret Documentation"
      description="AI-powered coding assistant based on Cline">
      <main>
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <div className="text--center margin-vert--lg">
                <Heading as="h1" className="hero__title">
                  Welcome to Caret Documentation
                </Heading>
                <p className="hero__subtitle">
                  AI-powered coding assistant based on Cline
                </p>
                
                <div className="margin-vert--lg">
                  <h2>Choose Your Language</h2>
                  <div className="row">
                    <div className="col col--6">
                      <div className="card">
                        <div className="card__header">
                          <h3>🇺🇸 English</h3>
                        </div>
                        <div className="card__body">
                          <p>Your personalized AI coding partner</p>
                          <a href="/en/getting-started/what-is-caret" className="button button--primary button--block">
                            Go to English Docs
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col col--6">
                      <div className="card">
                        <div className="card__header">
                          <h3>🇰🇷 한국어</h3>
                        </div>
                        <div className="card__body">
                          <p>나만의 개인화된 AI 코딩 파트너</p>
                          <a href="/ko/getting-started/what-is-caret" className="button button--primary button--block">
                            한국어 문서 보기
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row margin-top--md">
                    <div className="col col--6">
                      <div className="card">
                        <div className="card__header">
                          <h3>🇨🇳 中文</h3>
                        </div>
                        <div className="card__body">
                          <p>您的个性化 AI 编程伙伴</p>
                          <a href="/zh/getting-started/what-is-caret" className="button button--primary button--block">
                            查看中文文档
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col col--6">
                      <div className="card">
                        <div className="card__header">
                          <h3>🇯🇵 日本語</h3>
                        </div>
                        <div className="card__body">
                          <p>あなた専用のパーソナライズド AI コーディングパートナー</p>
                          <a href="/ja/getting-started/what-is-caret" className="button button--primary button--block">
                            日本語ドキュメントを見る
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="margin-vert--xl">
                  <div className="card">
                    <div className="card__header">
                      <h3>About Caret</h3>
                    </div>
                    <div className="card__body">
                      <p>
                        <strong>Caret = Cline + Personalized AI Companion + Enhanced System Prompts</strong>
                      </p>
                      <p>
                        Caret is an enhanced AI coding agent based on Cline that brings frontier AI models
                        directly to your VS Code editor. What makes Caret unique is its <strong>Persona System</strong> -
                        customize your AI's name and avatar to create your own personalized coding partner!
                      </p>
                      <p>
                        🎭 <strong>5 Built-in Personas</strong> | 🔄 <strong>Dual Mode System</strong> (Agent/Chatbot) |
                        🌍 <strong>4 Languages</strong> (English, Korean, Japanese, Chinese) |
                        ⌨️ <strong>Prompt History</strong> (↑↓ keys)
                      </p>
                      <div className="text--center">
                        <a href="https://marketplace.visualstudio.com/items?itemName=caretive.caret" className="button button--primary margin-right--sm">
                          📥 Download from VS Code Marketplace
                        </a>
                        <a href="https://github.com/aicoding-caret/caret" className="button button--outline button--primary margin-right--sm">
                          🌟 GitHub Repository
                        </a>
                        <a href="https://caret.team" className="button button--outline button--secondary">
                          🌐 Official Website
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}