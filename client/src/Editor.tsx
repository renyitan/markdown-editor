// @refresh reset
import React, { useState, useMemo, useCallback } from 'react';
import { createEditor, BaseEditor, Node } from 'slate';
import isHotKey from 'is-hotkey';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';

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

const EditorArea = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const renderElement = useCallback(
    (props: any) => <SlateElement {...props} />,
    []
  );

  const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);

  const outputHTML = (nodes: any[]) => {
    console.log(nodes.map((n: any) => Node.string(n)).join('\n'));
  };

  return (
    <Slate editor={editor} value={initialValue}>
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
        <Button
          primary
          content="hi"
          onClick={() => outputHTML(editor.children)}
        />
      </>
    </Slate>
  );
};

export default EditorArea;
