import { createContext, useReducer } from 'react';
import reducer from './reducer';

const initialState: any = {
  content: '',
};

export const StateContext = createContext(initialState);

export const StateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // actions for changing state
  const updateContent = (html: string) => {
    dispatch({
      type: 'UPDATE_CONTENT',
      payload: html,
    });
  };

  return (
    <StateContext.Provider value={{ content: state.content, updateContent }}>
      {children}
    </StateContext.Provider>
  );
};
