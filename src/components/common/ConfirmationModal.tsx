// src/components/common/ConfirmationModal.tsx
import styled from '@emotion/styled';
import { Modal, Button } from 'antd';
import React from 'react';

const ModalActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'primary';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  type = 'danger',
}) => {
  return (
    <Modal open={isOpen} title={title} onCancel={onCancel} footer={null} centered>
      <p>{message}</p>
      <ModalActions>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button type="primary" danger={type === 'danger'} onClick={onConfirm}>
          {confirmText}
        </Button>
      </ModalActions>
    </Modal>
  );
};
