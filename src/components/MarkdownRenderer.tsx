import { useContext } from 'react';
import { marked } from 'marked';
import { StateContext } from '../context/State';

const MarkdownRenderer = () => {
  const { content } = useContext(StateContext);

  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  console.log(JSON.stringify(content));

  const html: string = marked.parse(content);

  return (
    <div
      style={{ height: '100%', maxWidth: '100%' }}
      id="content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;
