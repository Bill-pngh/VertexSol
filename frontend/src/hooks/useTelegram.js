import { useEffect, useState } from 'react';

export default function useTelegram() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    
    // Parse init data
    try {
      const initData = new URLSearchParams(tg.initData);
      const userData = JSON.parse(initData.get('user'));
      setUser({
        ...userData,
        wallet: localStorage.getItem('walletAddress')
      });
    } catch (e) {
      console.error('Telegram initData parse error:', e);
    }

    return () => tg.disableClosingConfirmation();
  }, []);

  return {
    tg: window.Telegram.WebApp,
    user,
    setUser
  };
}
