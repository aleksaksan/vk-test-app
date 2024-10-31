import { render, screen, fireEvent } from '@testing-library/react';
import { ModalWindow } from './ModalWindow';

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

  test('renders modal content when visible is true', () => {
    render(
      <ModalWindow visible={true} setVisible={jest.fn()}>
        <div>Test Content</div>
      </ModalWindow>
    );

    const contentElement = screen.getByText(/Test Content/i);
    expect(contentElement).toBeInTheDocument();
  });

  test('does not render modal content when visible is false', () => {
    render(
      <ModalWindow visible={false} setVisible={jest.fn()}>
        <div>Test Content</div>
      </ModalWindow>
    );

    const contentElement = screen.queryByText(/Test Content/i);
    expect(contentElement).not.toBeInTheDocument();
  });

  test('calls setVisible with false when clicking outside modal content', () => {
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
