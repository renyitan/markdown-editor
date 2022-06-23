import { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { Text, Box } from '@fluentui/react-northstar';

import { StateContext } from '../context/State';

import 'highlight.js/styles/github.css';

const MarkdownRenderer = () => {
  const { content } = useContext(StateContext);

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
    breaks: true,
    gfm: true,
  });

  const html: string = marked.parse(content);

  return (
    <div
      style={{ overflowX: 'scroll', height: '100%', maxWidth: '100%' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;
