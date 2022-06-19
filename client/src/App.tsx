import React, { useState } from 'react';
import { createEditor, BaseEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

function App() {
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        onKeyDown={(event) => {
          if (event.key === '&') {
            // Prevent the ampersand character from being inserted.
            event.preventDefault();
            // Execute the `insertText` method when the event occurs.
            editor.insertText('and');
          }
        }}
      />
    </Slate>
  );
}

export default App;
