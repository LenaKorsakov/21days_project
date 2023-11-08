import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from '../src/components/App/App';
import AuthContentWrapper from './components/AuthContextWrapper/AuthContextWrapper';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <AuthContentWrapper>
        <App />
      </AuthContentWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
