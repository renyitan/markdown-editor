import { useContext } from 'react';
import { marked } from 'marked';
import { StateContext } from '../context/State';

const MarkdownRenderer = () => {
  const { content } = useContext(StateContext);

  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  const html: string = marked.parse(content);

  return <div id="content" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default MarkdownRenderer;
