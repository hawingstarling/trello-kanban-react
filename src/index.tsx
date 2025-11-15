/// <reference types="vite/client" />
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto';
import './index.css';
import './app/config/i18n.config';
import * as React from 'react';
import { Toaster } from 'sonner';
import { ModalProvider } from './components/providers/modal-provider';
import Routes from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
 <React.StrictMode>
      <Toaster richColors expand />
      <ModalProvider />
      <Routes />
  </React.StrictMode>,
);
