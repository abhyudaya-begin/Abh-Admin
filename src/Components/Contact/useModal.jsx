// src/hooks/useModal.js
import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null
  });

  const showConfirmModal = (title, message) => {
    return new Promise((resolve) => {
      setModalConfig({
        title,
        message,
        onConfirm: () => {
          setIsOpen(false);
          resolve(true);
        },
        onCancel: () => {
          setIsOpen(false);
          resolve(false);
        }
      });
      setIsOpen(true);
    });
  };

  return {
    isOpen,
    setIsOpen,
    modalConfig,
    showConfirmModal
  };
};