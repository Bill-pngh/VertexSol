import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import { ModalProvider } from './context/ModalContext';
import MainLayout from './components/layout/MainLayout';
import Router from './Router';
import './styles/main.scss';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    // Initialize Telegram WebApp
    tg.ready();
    tg.expand();
    tg.enableClosingConfirmation();

    // Set theme params
    const applyTheme = () => {
      document.documentElement.style.setProperty(
        '--tg-theme-bg-color', 
        tg.themeParams.bg_color || '#0F0B33'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-text-color',
        tg.themeParams.text_color || '#FFFFFF'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-button-color',
        tg.themeParams.button_color || '#6E3AFF'
      );
    };

    applyTheme();
    tg.onEvent('themeChanged', applyTheme);

    return () => {
      tg.offEvent('themeChanged', applyTheme);
    };
  }, [tg]);

  return (
    <ModalProvider>
      <MainLayout>
        <Router />
      </MainLayout>
    </ModalProvider>
  );
}

export default App;
