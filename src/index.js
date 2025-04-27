import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/bootstrap/scss/bootstrap.scss";
import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';
import { Provider } from 'react-redux';
import CardDesignProvider from './providers/products/cardDesignProvider';
import  store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CardDesignProvider>
          <App />
        </CardDesignProvider>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

