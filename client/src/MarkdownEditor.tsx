// @refresh reset
import React, { useState, useMemo, useCallback } from 'react';
import { marked } from 'marked';
import {
  Flex,
  Segment,
  Text,
  Divider,
  TextArea,
} from '@fluentui/react-northstar';
import { createEditor, BaseEditor, Node } from 'slate';
import isHotKey from 'is-hotkey';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';

import { initialValue, HOTKEYS } from './utils/Constants';
import { insertMarkdownAnnotations } from './utils/EditorUtils';
import EditorToolBar from './components/EditorToolBar';

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

const MarkdownEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [content, setContent] = useState('');

  const outputString = (nodes: any[]) => {
    const content = nodes.map((n: any) => Node.string(n)).join('\n');
    setContent(content);
  };

  marked.setOptions({
    breaks: true,
    gfm: true,
  });
  const html: string = marked.parse(content);

  return (
    <Flex
      gap="gap.small"
      padding="padding.medium"
      style={{ minHeight: 500, maxWidth: '100%' }}
    >
      <Flex.Item size="size.half">
        <Segment>
          <Slate
            editor={editor}
            value={initialValue}
            onChange={() => outputString(editor.children)}
          >
            <EditorToolBar />
            <Divider />

            <Editable
              style={{ height: '100%' }}
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
          </Slate>
        </Segment>
      </Flex.Item>

      <Flex.Item size="size.half">
        <Segment>
          <Text content="Preview" size="larger" weight="semibold" />
          <Divider />
          <div id="content" dangerouslySetInnerHTML={{ __html: html }} />
          {/* <Markdown gfm breaks>
            {content}
          </Markdown> */}
        </Segment>
      </Flex.Item>
    </Flex>
  );
};

export default MarkdownEditor;
