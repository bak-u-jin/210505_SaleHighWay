import React from 'react';

import { Provider } from 'react-redux';

import Index from './Index';
import store from './Store';

export default function App() {

  return (
    <Provider store={store}>
      <Index/>
    </Provider>
  );
}