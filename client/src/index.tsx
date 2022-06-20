import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, teamsTheme } from '@fluentui/react-northstar';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider theme={teamsTheme}>
    <App />
  </Provider>
  // </React.StrictMode>
);
