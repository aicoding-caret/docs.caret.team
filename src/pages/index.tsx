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
                          <p>Documentation in English</p>
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
                          <p>Cline 기반의 향상된 AI 코딩 도구</p>
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
                          <p>中文文档</p>
                          <a href="/zh/getting-started/what-is-caret" className="button button--primary button--block">
                            中文文档
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
                          <p>日本語ドキュメント</p>
                          <a href="/ja/getting-started/what-is-caret" className="button button--primary button--block">
                            日本語ドキュメント
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
                        Caret is an AI-powered coding assistant based on Cline that brings frontier AI models 
                        directly to your VS Code editor. Unlike autocomplete tools, Caret is a true coding 
                        agent that can understand entire codebases, plan complex changes, and execute multi-step tasks.
                      </p>
                      <div className="text--center">
                        <a href="https://marketplace.visualstudio.com/items?itemName=caretive.caret" className="button button--primary margin-right--sm">
                          📥 Download from VS Code Marketplace
                        </a>
                        <a href="https://github.com/aicoding-caret/caret" className="button button--outline button--primary margin-right--sm">
                          GitHub Repository
                        </a>
                        <a href="https://caret.team" className="button button--outline button--secondary">
                          Official Website
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