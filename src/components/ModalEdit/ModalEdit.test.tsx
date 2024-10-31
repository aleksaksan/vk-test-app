import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalEdit } from './ModalEdit';
import filmStore from '../../store/filmStore';

jest.mock('../../store/filmStore', () => ({
  isEdditing: true,
  setIsEdditing: jest.fn(),
  edditFilm: jest.fn(),
  chosenFilmId: 1,
  films: [
    { id: 1, title: 'Old Title', year: 2020 },
  ],
}));

describe('ModalEdit Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal with pre-filled data', () => {
    render(<ModalEdit />);

    const titleField = screen.getByLabelText(/Название фильма/i);
    const yearField = screen.getByLabelText(/Год/i);

    expect(titleField).toBeInTheDocument();
    expect(titleField).toHaveValue('Old Title');
    expect(yearField).toHaveValue('2020');
  });

  test('updates title and year fields when typed into', () => {
    render(<ModalEdit />);

    const titleField = screen.getByLabelText(/Название фильма/i);
    const yearField = screen.getByLabelText(/Год/i);

    fireEvent.change(titleField, { target: { value: 'New Title' } });
    fireEvent.change(yearField, { target: { value: '2022' } });

    expect(titleField).toHaveValue('New Title');
    expect(yearField).toHaveValue('2022');
  });

  test('calls edditFilm with updated values on save', () => {
    render(<ModalEdit />);

    const titleField = screen.getByLabelText(/Название фильма/i);
    const yearField = screen.getByLabelText(/Год/i);
    const saveButton = screen.getByText(/Сохранить/i);

    fireEvent.change(titleField, { target: { value: 'New Title' } });
    fireEvent.change(yearField, { target: { value: '2022' } });
    fireEvent.click(saveButton);

    expect(filmStore.edditFilm).toHaveBeenCalledWith('New Title', 2022);
  });

  test('calls setIsEdditing with false on cancel button click', () => {
    render(<ModalEdit />);

    const cancelButton = screen.getByText(/Отмена/i);
    fireEvent.click(cancelButton);

    expect(filmStore.setIsEdditing).toHaveBeenCalledWith(false);
  });

  test('does not render modal content if isEdditing is false', () => {
    filmStore.isEdditing = false;

    render(<ModalEdit />);

    const titleField = screen.queryByLabelText(/Название фильма/i);
    expect(titleField).not.toBeInTheDocument();
  });
});
