import { render, screen, fireEvent } from '@testing-library/react';
import { SortSelect } from './SortSelect';
import filmStore from '../../store/filmStore';
import { FilmSortAttributeEnum } from '../../shared/enums/FilmSortAttributeEnum';

// Мокаем метод changeSorting из filmStore
jest.mock('../../store/filmStore', () => ({
  changeSorting: jest.fn(),
}));

describe('SortSelect Component', () => {
  test('renders all sorting options', () => {
    render(<SortSelect />);

    // Проверяем, что заголовок и все опции сортировки присутствуют
    const labelElement = screen.getByLabelText(/Сортировать по/i);
    expect(labelElement).toBeInTheDocument();

    // Открываем меню
    fireEvent.mouseDown(labelElement);

    // Проверяем, что все варианты сортировки присутствуют
    expect(screen.getByText(/Название/i)).toBeInTheDocument();
    expect(screen.getByText(/Год/i)).toBeInTheDocument();
    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
    expect(screen.getByText(/Дата добавления/i)).toBeInTheDocument();
  });

  test('updates field and calls changeSorting on option select', () => {
    render(<SortSelect />);
    const labelElement = screen.getByLabelText(/Сортировать по/i);

    // Открываем меню и выбираем "Год"
    fireEvent.mouseDown(labelElement);
    const yearOption = screen.getByText(/Год/i);
    fireEvent.click(yearOption);

    // Проверяем, что filmStore.changeSorting вызван с правильным значением
    expect(filmStore.changeSorting).toHaveBeenCalledWith(FilmSortAttributeEnum.Year);
  });

  test('updates field and calls changeSorting with "Название"', () => {
    render(<SortSelect />);
    const labelElement = screen.getByLabelText(/Сортировать по/i);

    // Открываем меню и выбираем "Название"
    fireEvent.mouseDown(labelElement);
    const titleOption = screen.getByText(/Название/i);
    fireEvent.click(titleOption);

    // Проверяем, что filmStore.changeSorting вызван с правильным значением
    expect(filmStore.changeSorting).toHaveBeenCalledWith(FilmSortAttributeEnum.Title);
  });
});
