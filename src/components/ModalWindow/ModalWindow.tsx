import { ReactNode } from 'react';
import styles from './ModalWindow.module.scss';
import { createPortal } from 'react-dom';

export const ModalWindow = (
  {
    children, 
    visible, 
    setVisible } : {
      children: ReactNode,
      visible: boolean,
      setVisible: (value: boolean) => void;
    }) => {
  const rootClasses = [styles.modalWindow];

  if (visible)
    rootClasses.push(styles.active);

  return createPortal(
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)} >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};