import { render, screen, fireEvent } from '@testing-library/react';
import { FilmCard } from './FilmCard'; 
import filmStore from '../../store/filmStore';

jest.mock('../../store/filmStore', () => ({
  setIsEdditing: jest.fn(),
  setIsDeleting: jest.fn(),
}));

const filmData = {
  id: 1,
  title: 'Test Film',
  src: 'test-image.jpg',
  year: 2024,
};

describe('FilmCard Component', () => {
  beforeEach(() => {
    render(<FilmCard {...filmData} />);
  });

  test('renders film card with correct title and year', () => {
    const titleElement = screen.getByText(/Test Film/i);
    const yearElement = screen.getByText(/2024/i);
    
    expect(titleElement).toBeInTheDocument();
    expect(yearElement).toBeInTheDocument();
  });

  test('opens menu on settings button click', () => {
    const settingsButton = screen.getByLabelText(/settings/i);
    
    fireEvent.click(settingsButton);
    
    // меню открыто
    const editMenuItem = screen.getByText(/Редактировать/i);
    const deleteMenuItem = screen.getByText(/Удалить/i);

    expect(editMenuItem).toBeInTheDocument();
    expect(deleteMenuItem).toBeInTheDocument();
  });

  test('calls setIsEdditing when edit is clicked', () => {
    const settingsButton = screen.getByLabelText(/settings/i);
    fireEvent.click(settingsButton);

    const editMenuItem = screen.getByText(/Редактировать/i);
    fireEvent.click(editMenuItem);

    expect(filmStore.setIsEdditing).toHaveBeenCalledWith(true, filmData.id);
  });

  test('calls setIsDeleting when delete is clicked', () => {
    const settingsButton = screen.getByLabelText(/settings/i);
    fireEvent.click(settingsButton);

    const deleteMenuItem = screen.getByText(/Удалить/i);
    fireEvent.click(deleteMenuItem);

    expect(filmStore.setIsDeleting).toHaveBeenCalledWith(true, filmData.id);
  });
});
