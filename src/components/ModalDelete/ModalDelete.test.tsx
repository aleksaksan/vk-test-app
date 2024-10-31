import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalDelete } from './ModalDelete';
import filmStore from '../../store/filmStore';

jest.mock('../../store/filmStore', () => ({
  isDeleting: true,
  setIsDeleting: jest.fn(),
  deleteFilm: jest.fn(),
}));

describe('ModalDelete Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders confirmation message', () => {
    render(<ModalDelete />);

    const confirmationMessage = screen.getByText(/Вы уверены, что хотите удалить фильм\?/i);
    expect(confirmationMessage).toBeInTheDocument();
  });

  test('renders Yes and No buttons', () => {
    render(<ModalDelete />);

    const yesButton = screen.getByText(/да/i);
    const noButton = screen.getByText(/нет/i);

    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();
  });

  test('calls deleteFilm on "Да" button click', () => {
    render(<ModalDelete />);

    const yesButton = screen.getByText(/да/i);
    fireEvent.click(yesButton);

    expect(filmStore.deleteFilm).toHaveBeenCalled();
  });

  test('calls setIsDeleting with false on "Нет" button click', () => {
    render(<ModalDelete />);

    const noButton = screen.getByText(/нет/i);
    fireEvent.click(noButton);

    expect(filmStore.setIsDeleting).toHaveBeenCalledWith(false);
  });

  test('does not render content when isDeleting is false', () => {
    filmStore.isDeleting = false;

    render(<ModalDelete />);

    const confirmationMessage = screen.queryByText(/Вы уверены, что хотите удалить фильм\?/i);
    expect(confirmationMessage).not.toBeInTheDocument();
  });
});
