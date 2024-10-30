import { makeAutoObservable, runInAction, toJS } from "mobx";
import { FilmService, IFilm } from "../servises/FilmServise";
import { FilmSortAttributeEnum } from "../shared/enums/FilmSortAttributeEnum";

class FilmStore {
  films: IFilm[] = [];
  isLoading = false;
  error: string | null = null;
  limit = 15;
  page = 1;
  sortBy?: FilmSortAttributeEnum;
  totalFilms = this.limit;

  get totalPages() {
    return Math.ceil(this.totalFilms / this.limit);
  }

  constructor () {
    makeAutoObservable(this);
  };

  getFilmsByPages = async () => {
    if (this.page > this.totalPages) {
      return;
    }

    try {
      this.isLoading = true;
      this.error = null;

      if (this.sortBy) {
        const res = await FilmService.getFilmsByPagesWithSort(this.limit, this.page, this.sortBy);
        
        runInAction(() => {
          this.totalFilms = res.movie_count;
          this.films = [...toJS(this.films), ...res.movies];
          this.isLoading = false;
        });
        
      } else {
        const res = await FilmService.getFilmsByPages(this.limit, this.page);
        
        runInAction(() => {
          this.totalFilms = res.movie_count;
          this.films = [...toJS(this.films), ...res.movies];
          this.isLoading = false;
        });
      }
    } catch (e) {
      console.log(e);
      runInAction(() => {
        this.isLoading = false;
      })
    }
  };

  changePage = () => {
    this.page += 1;
    this.getFilmsByPages();
  };

  changeSorting = (sortAttribute: FilmSortAttributeEnum) => {
    this.sortBy = sortAttribute;
    this.films = [];
    this.getFilmsByPages();
  }
};

export default new FilmStore();
