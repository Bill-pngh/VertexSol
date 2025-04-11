import { createContext, useState } from 'react';

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [currentModal, setCurrentModal] = useState(null);
  const [modalProps, setModalProps] = useState({});

  const showModal = (modalName, props = {}) => {
    setCurrentModal(modalName);
    setModalProps(props);
  };

  const hideModal = () => {
    setCurrentModal(null);
    setModalProps({});
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {currentModal === 'wallet' && (
        <WalletModal onClose={hideModal} {...modalProps} />
      )}
      {currentModal === 'chart' && (
        <ChartModal onClose={hideModal} {...modalProps} />
      )}
      {currentModal === 'notification' && (
        <NotificationModal onClose={hideModal} {...modalProps} />
      )}
    </ModalContext.Provider>
  );
}
