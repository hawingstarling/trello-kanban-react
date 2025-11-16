/// <reference types="vite/client" />
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto';
import './index.css';
import * as React from 'react';
import { Toaster } from 'sonner';
import { ModalProvider } from './providers/modal-provider';
import Routes from './routes';
import AppProvider from './providers/app-provider';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <Provider store={store}>
        <Toaster richColors expand />
        <ModalProvider />
        <Routes />
      </Provider>
    </AppProvider>
  </React.StrictMode>,
);
