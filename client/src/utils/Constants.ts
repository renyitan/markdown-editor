import { Descendant } from 'slate';

export interface IHotKeys {
  [key: string]: string;
}

export const HOTKEYS: IHotKeys = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

export const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];
