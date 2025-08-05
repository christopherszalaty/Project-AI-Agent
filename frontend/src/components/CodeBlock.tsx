// src/components/CodeBlock.tsx
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript'; // Załaduj potrzebne języki
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';

interface CodeBlockProps {
  code: string;
  language: string;
}

export const CodeBlock = ({ code, language }: CodeBlockProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <div className="my-2 rounded-md overflow-hidden bg-[#272822]">
      <pre className="!bg-transparent">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};