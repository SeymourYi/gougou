import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';
import BillStore from './components/BillStore';
import { RouterProvider } from "react-router-dom";
import router from './router';

function App() {
  
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
