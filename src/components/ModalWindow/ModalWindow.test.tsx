import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalWindow } from './ModalWindow';

// проверил все зависимости, добавил types.d.ts с описанием модуле, 
// добавил в список include в tsconfig - не помогло
//     ● Test suite failed to run

//     src/components/ModalWindow/ModalWindow.tsx:2:20 - error TS2307: Cannot find module './ModalWindow.module.css' or its corresponding type declarations.

//     2 import styles from './ModalWindow.module.css';

describe('ModalWindow Component', () => {
  // Добавляем элемент для портала в DOM перед тестами
  beforeAll(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  // Убираем элемент после тестов
  afterAll(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  test('renders modal when visible', () => {
    render(
      <ModalWindow visible={true} setVisible={jest.fn()}>
        <div>Test Content</div>
      </ModalWindow>
    );

    const contentElement = screen.getByText(/Test Content/i);
    expect(contentElement).toBeInTheDocument();
  });

  test('when visible is false', () => {
    render(
      <ModalWindow visible={false} setVisible={jest.fn()}>
        <div>Test Content</div>
      </ModalWindow>
    );

    const contentElement = screen.queryByText(/Test Content/i);
    expect(contentElement).not.toBeInTheDocument();
  });

  test('when clicking outside modal content', () => {
    const setVisibleMock = jest.fn();

    render(
      <ModalWindow visible={true} setVisible={setVisibleMock}>
        <div>Test Content</div>
      </ModalWindow>
    );

    const modalBackground = screen.getByTestId('modal-background');
    fireEvent.click(modalBackground);

    expect(setVisibleMock).toHaveBeenCalledWith(false);
  });

  test('does not call setVisible when clicking inside modal content', () => {
    const setVisibleMock = jest.fn();

    render(
      <ModalWindow visible={true} setVisible={setVisibleMock}>
        <div>Test Content</div>
      </ModalWindow>
    );

    const modalContent = screen.getByText(/Test Content/i);
    fireEvent.click(modalContent);

    expect(setVisibleMock).not.toHaveBeenCalled();
  });
});
