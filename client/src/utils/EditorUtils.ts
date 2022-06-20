import { Editor, Element } from 'slate';

export const isMarkActive = (editor: any, format: any) => {
  const marks = Editor.marks(editor) as any;
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (editor: any, format: any, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
    })
  );
  return !!match;
};
