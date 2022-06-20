import React, { useState, useMemo, useCallback } from 'react';
import {
  createEditor,
  Editor,
  BaseEditor,
  Range,
  Point,
  Transforms,
  Element,
} from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';

import SlateElement from './components/SlateElement';
import SlateLeaf from './components/SlateLeaf';
import { initialValue } from './utils/Constants';
import EditorToolBar from './components/EditorToolBar';

import { Divider } from '@fluentui/react-northstar';

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

const SHORTCUTS: any = {
  '>': 'block-quote',
};

const EditorArea = () => {
  const editor = useMemo(() => withShortcuts(withReact(createEditor())), []);

  const renderElement = useCallback(
    (props: any) => <SlateElement {...props} />,
    []
  );

  const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);

  return (
    <Slate editor={editor} value={initialValue}>
      <>
        {/* <EditorToolBar /> */}
        <Divider />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          autoFocus
          // onKeyDown={(event: any) => {
          //   for (const hotkey in HOTKEYS) {
          //     if (isHotKey(hotkey, event as any)) {
          //       event.preventDefault();
          //       const mark = HOTKEYS[hotkey];
          //       toggleMark(editor, mark);
          //     }
          //   }
          // }}
        />
      </>
    </Slate>
  );
};

const withShortcuts = (editor: any) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text: any) => {
    const { selection } = editor;

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        const newProperties: Partial<Element> = {
          type,
        };
        Transforms.setNodes<Element>(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args: any[]) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          Element.isElement(block) &&
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<Element> = {
            type: 'paragraph',
          };
          Transforms.setNodes(editor, newProperties);

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

export default EditorArea;
