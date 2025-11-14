import AppProvider from '@components/providers/app-provider';
import appRoutes from '@config/routes.config';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { store } from './store';
import { Toaster } from 'sonner';
import { ModalProvider } from 'src/components/providers/modal-provider';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Toaster richColors expand />
        <ModalProvider />
        <AppProvider routes={appRoutes} />
      </Provider>
    </Router>
  );
}

export default App;
