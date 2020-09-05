import React from 'react';

import StreamView from './StreamView/StreamView';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <StreamView />
    </Provider>
  );
};

export default App;
