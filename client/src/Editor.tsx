// @refresh reset
import React, { useState, useMemo, useCallback } from 'react';
import { createEditor, BaseEditor, Node } from 'slate';
import isHotKey from 'is-hotkey';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { Flex, Segment } from '@fluentui/react-northstar';
import ReactMarkdown from 'react-markdown';
import Markdown from 'marked-react';

import SlateElement from './components/SlateElement';
import SlateLeaf from './components/SlateLeaf';
import { initialValue, HOTKEYS } from './utils/Constants';
import { insertMarkdownAnnotations } from './utils/EditorUtils';
import EditorToolBar from './components/EditorToolBar';

import { Divider, Button } from '@fluentui/react-northstar';

type ParagraphElement = { type: 'paragraph'; children: CustomText[] };
type CodeElement = { type: 'code'; children: CustomText[] };
type CustomElement = ParagraphElement | CodeElement;
type CustomText = { text: string; bold?: true };

export type CustomEditor = BaseEditor & ReactEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: ParagraphElement | CodeElement;
    Text: CustomText;
  }
}

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [content, setContent] = useState('');

  const renderElement = useCallback(
    (props: any) => <SlateElement {...props} />,
    []
  );

  const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);

  const outputString = (nodes: any[]) => {
    const content = nodes.map((n: any) => Node.string(n)).join('\n');
    setContent(content);
  };

  return (
    <Flex gap="gap.small" padding="padding.medium" style={{ minHeight: 200 }}>
      <Flex.Item size="size.half">
        <Segment>
          <Slate
            editor={editor}
            value={initialValue}
            onChange={() => outputString(editor.children)}
          >
            <>
              <EditorToolBar />
              <Divider />
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                autoFocus
                onKeyDown={(event: any) => {
                  for (const hotkey in HOTKEYS) {
                    if (isHotKey(hotkey, event as any)) {
                      event.preventDefault();
                      const annotationType = HOTKEYS[hotkey];
                      insertMarkdownAnnotations(editor, annotationType);
                    }
                  }
                }}
              />
            </>
          </Slate>
        </Segment>
      </Flex.Item>

      <Flex.Item size="size.half">
        <Segment>
          <Divider />
          <Markdown>{content}</Markdown>
        </Segment>
      </Flex.Item>
    </Flex>
  );
};

export default App;
