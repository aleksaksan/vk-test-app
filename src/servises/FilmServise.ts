import axios from 'axios';
import { FilmSortAttributeEnum } from '../shared/enums/FilmSortAttributeEnum';

export interface IFilm {
  id: number;
  title: string;
  medium_cover_image: string;
  year: number;
}

export class FilmService {
  //unused now
  static async getAll() {
    const response = await axios.get('https://yts.mx/api/v2/list_movies.json');
    
    return response.data.data;
  };

  static async getFilmsByPages(limit = 10, page = 1) {
    const response = await axios.get('https://yts.mx/api/v2/list_movies.json', {
      params: {
        limit: limit,
        page: page,
      }
    });
    return response.data.data;
  };

  static async getFilmsByPagesWithSort(limit = 10, page = 1, sortBy: FilmSortAttributeEnum) {
    const response = await axios.get('https://yts.mx/api/v2/list_movies.json', {
      params: {
        limit: limit,
        page: page,
        sort_by: sortBy,
      }
    });
    return response.data.data;
  }
  
};