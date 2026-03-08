import { FC } from 'react';
import styles from './modal-overlay.module.css';
import { TModalOverlayUIProps } from './type';

export const ModalOverlayUI: FC<TModalOverlayUIProps> = ({ onClick }) => (
  <div data-cy='modal-overlay' className={styles.overlay} onClick={onClick} />
);
