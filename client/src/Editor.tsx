import React, { useState, useCallback } from 'react';
import { createEditor, BaseEditor } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import isHotKey from 'is-hotkey';

import SlateElement from './components/SlateElement';
import SlateLeaf from './components/SlateLeaf';
import { HOTKEYS, initialValue } from './utils/Constants';
import { toggleMark } from './utils/EditorUtils';
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

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const Editor = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback(
    (props: any) => <SlateElement {...props} />,
    []
  );

  const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);

  return (
    <Slate editor={editor} value={initialValue}>
      <EditorToolBar />
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
    </Slate>
  );
};

export default Editor;
