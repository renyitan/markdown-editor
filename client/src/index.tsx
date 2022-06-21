import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, teamsTheme } from '@fluentui/react-northstar';

import Editor from './Editor';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider theme={teamsTheme}>
    {/* <Editor /> */}
    <App />
  </Provider>
);