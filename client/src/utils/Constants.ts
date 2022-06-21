import { Descendant } from 'slate';

export const ANNOTATIONS = {
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  STRIKE: 'strike',
  CODE: 'code',
};

export interface IHotKeys {
  [key: string]: string;
}

export const HOTKEYS: IHotKeys = {
  'mod+b': ANNOTATIONS.BOLD,
  'mod+i': ANNOTATIONS.ITALIC,
  'mod+`': ANNOTATIONS.CODE,
};

export const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '## Hello' }],
  },
];
