import React, { useState, useCallback } from 'react';
import {
  createEditor,
  BaseEditor,
  Descendant,
  Transforms,
  Editor,
} from 'slate';
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  DefaultEditable,
} from 'slate-react';
import { Button, TextArea, Box } from '@fluentui/react-northstar';

type CustomElement = { type: any; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const App = () => {
  const [editor] = useState(() => withReact(createEditor()));

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const CustomTextArea = () => {
    return (
      <TextArea
        as={Editable}
        renderElement={renderElement}
        onKeyDown={(event: any) => {
          if (event.key === '&') {
            event.preventDefault();
            // Determine whether any of the currently selected blocks are code blocks.
            const [match]: any = Editor.nodes(editor, {
              match: (n: any) => n.type === 'code',
            });
            // Toggle the block type depending on whether there's already a match.
            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              { match: (n) => Editor.isBlock(editor, n) }
            );
          }
        }}
      />
    );
  };

  return (
    <>
      <Slate editor={editor} value={initialValue}>
        <CustomTextArea />
      </Slate>
    </>
  );
};

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default App;
