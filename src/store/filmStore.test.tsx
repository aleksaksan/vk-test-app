import FilmStore from './filmStore';
import { FilmService } from '../servises/FilmServise';
// import { FilmSortAttributeEnum } from '../shared/enums/FilmSortAttributeEnum';
import { act } from '@testing-library/react';
// import mockGetFilmsByPages from './mocks/mockGetFilmsByPages.json'
// import { FilmList } from '../components/FilmList/FilmList';
// import axios from 'axios';

jest.mock('../servises/FilmServise');
jest.mock('axios');
describe('FilmStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with default values', () => {
    expect(FilmStore.films).toEqual([]);
    expect(FilmStore.isLoading).toBe(false);
    expect(FilmStore.error).toBeNull();
    expect(FilmStore.limit).toBe(15);
    expect(FilmStore.page).toBe(1);
    expect(FilmStore.totalFilms).toBe(FilmStore.limit);
    expect(FilmStore.isEdditing).toBe(false);
    expect(FilmStore.isDeleting).toBe(false);
    expect(FilmStore.chosenFilmId).toBeNull();
  });

  test('setIsDeleting updates isDeleting and chosenFilmId', () => {
    FilmStore.setIsDeleting(true, 1);
    expect(FilmStore.isDeleting).toBe(true);
    expect(FilmStore.chosenFilmId).toBe(1);

    FilmStore.setIsDeleting(false);
    expect(FilmStore.isDeleting).toBe(false);
    expect(FilmStore.chosenFilmId).toBeNull();
  });

  test('deleteFilm removes a film by chosenFilmId', () => {
    FilmStore.films = [{ id: 1, title: 'Film 1', year: 2021, medium_cover_image: 'image1.jpg' }];
    FilmStore.chosenFilmId = 1;

    FilmStore.deleteFilm();
    expect(FilmStore.films).toEqual([]);
    expect(FilmStore.isDeleting).toBe(false);
  });

  test('setIsEdditing updates isEdditing and chosenFilmId', () => {
    FilmStore.setIsEdditing(true, 2);
    expect(FilmStore.isEdditing).toBe(true);
    expect(FilmStore.chosenFilmId).toBe(2);

    FilmStore.setIsEdditing(false);
    expect(FilmStore.isEdditing).toBe(false);
    expect(FilmStore.chosenFilmId).toBeNull();
  });

  test('edditFilm updates film details by chosenFilmId', () => {
    FilmStore.films = [{ id: 1, title: 'Old Title', year: 2020, medium_cover_image: 'image1.jpg' }];
    FilmStore.chosenFilmId = 1;

    FilmStore.edditFilm('New Title', 2022);
    const editedFilm = FilmStore.films.find(film => film.id === 1);
    expect(editedFilm).toEqual({ id: 1, title: 'New Title', year: 2022, medium_cover_image: 'image1.jpg' });
    expect(FilmStore.isEdditing).toBe(false);
  });
//
//   test('getFilmsByPages loads films without sort', async () => {
//     axios.get.mockReturnValue(mockGetFilmsByPages.data)
//     render(<FilmList/>)
//     const mockResponse = mockGetFilmsByPages.data;
//     jest.spyOn(FilmService, 'getFilmsByPages').mockResolvedValue(mockResponse);
//     await act(async () => {
//       await FilmStore.getFilmsByPages()
//     });
// /////////////////////////////////////
//     expect(FilmStore.totalFilms).toBe(63597);
//     expect(FilmStore.films as IFilm[]).toContainEqual(mockResponse.movies as IFilm[]);
//     expect(FilmStore.isLoading).toBe(false);
//   });

  // test('getFilmsByPages loads films with sort', async () => {
  //   const mockResponse = {
  //     movie_count: 2,
  //     movies: [{ id: 1, title: 'Film A', year: 2023, medium_cover_image: 'image1.jpg' }, { id: 2, title: 'Film B', year: 2024, medium_cover_image: 'image1.jpg' }],
  //   };
  //   FilmStore.sortBy = FilmSortAttributeEnum.Title;
  //   jest.spyOn(FilmService, 'getFilmsByPagesWithSort').mockResolvedValue(mockResponse);

  //   await act(async () => {
  //     await FilmStore.getFilmsByPages();
  //   });

  //   expect(FilmStore.totalFilms).toBe(2);
  //   expect(FilmStore.films).toEqual(mockResponse.movies);
  //   expect(FilmStore.isLoading).toBe(false);
  // });

  test('getFilmsByPages handles errors gracefully', async () => {
    const error = new Error('Network Error');
    jest.spyOn(FilmService, 'getFilmsByPages').mockRejectedValue(error);

    await act(async () => {
      await FilmStore.getFilmsByPages();
    });

    expect(FilmStore.isLoading).toBe(false);
    expect(FilmStore.error).toBeNull();
  });

  // test('changePage increments page and fetches films', async () => {
  //   const mockResponse = {
  //     movie_count: 4,
  //     movies: [{ id: 1, title: 'Film C', year: 2023, medium_cover_image: 'image1.jpg' }, { id: 2, title: 'Film D', year: 2024, medium_cover_image: 'image1.jpg' }],
  //   };
  //   jest.spyOn(FilmService, 'getFilmsByPages').mockResolvedValue(mockResponse);

  //   FilmStore.page = 1;
  //   await act(async () => {
  //     await FilmStore.changePage();
  //   });

  //   expect(FilmStore.page).toBe(2);
  //   expect(FilmStore.films).toEqual(mockResponse.movies);
  // });

//   test('changeSorting sets sortBy, clears films, and fetches new films', async () => {
//     const mockResponse = {
//       movie_count: 3,
//       movies: [{ id: 3, title: 'Film E', year: 2025, medium_cover_image: 'image1.jpg' }],
//     };
//     jest.spyOn(FilmService, 'getFilmsByPagesWithSort').mockResolvedValue(mockResponse);

//     await act(async () => {
//       await FilmStore.changeSorting(FilmSortAttributeEnum.Rating);
//     });

//     expect(FilmStore.sortBy).toBe(FilmSortAttributeEnum.Rating);
//     expect(FilmStore.films).toEqual(mockResponse.movies);
//   });
});
