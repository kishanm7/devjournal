import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import mermaid from 'mermaid';
import CodeBlock from '../CodeBlock/CodeBlock';
import './MarkdownRenderer.css';

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: 'var(--font-sans)',
    primaryColor: '#3b82f6',
    primaryTextColor: '#fff',
    primaryBorderColor: '#2563eb',
    lineColor: '#8b5cf6',
    secondaryColor: '#1e293b',
    tertiaryColor: '#0f172a'
  }
});

const Mermaid = ({ chart }) => {
  const containerRef = useRef(null);
  const [svgStr, setSvgStr] = useState('');

  useEffect(() => {
    if (chart) {
      const renderChart = async () => {
        try {
          // Generate a unique ID for the mermaid chart
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);
          setSvgStr(svg);
        } catch (error) {
          console.error("Mermaid parsing error:", error);
          setSvgStr(`<div class="mermaid-error">Error rendering diagram</div>`);
        }
      };
      renderChart();
    }
  }, [chart]);

  return (
    <div className="mermaid-container">
      {svgStr ? (
        <div dangerouslySetInnerHTML={{ __html: svgStr }} />
      ) : (
        <div className="mermaid-loading">Rendering diagram...</div>
      )}
    </div>
  );
};

export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match ? match[1] : '';

            // Handle Mermaid code blocks
            if (!inline && lang === 'mermaid') {
              return <Mermaid chart={String(children).replace(/\n$/, '')} />;
            }

            // Handle standard code blocks
            if (!inline && match) {
              return (
                <CodeBlock 
                  code={String(children).replace(/\n$/, '')} 
                  language={lang} 
                />
              );
            }

            // Handle inline code
            return (
              <code className="inline-code" {...props}>
                {children}
              </code>
            );
          },
          table({ children }) {
            return (
              <div className="table-wrapper">
                <table>{children}</table>
              </div>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
