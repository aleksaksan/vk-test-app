import Grid from '@mui/material/Grid2';
import { FilmCard } from '../FilmCard/FilmCard';
import { SkeletonCard } from '../SkeletonCard/SkeletonCard';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { observer } from 'mobx-react-lite';
import filmStore from '../../store/filmStore';



export const FilmList = observer(() => {
  const lastElement = useRef<HTMLDivElement>(null);
  const { totalPages, page, isLoading, changePage, limit, films, getFilmsByPages, error } = filmStore;
  useIntersectionObserver(lastElement, page < totalPages, isLoading, changePage);

  useEffect(() => {
    getFilmsByPages();
  }, [getFilmsByPages]);

  const skeletonCardsArr = Array.from({ length: limit });

  if (error) return 

  return (
    <>
      {error ? 
        <Grid container spacing={{ xs: 1, md: 2, lg: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <h2>Something wents wrong!!!</h2>
        </Grid>
      :
      <>
        <Grid container spacing={{ xs: 1, md: 2, lg: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent={{ xs: 'center'}}
          alignItems="center"
        >
          {films.map(film => (
            <FilmCard
              key={film.id}
              id={film.id}
              title={film.title}
              src={film.medium_cover_image}
              year={film.year}
            />
          ))}
          {isLoading && skeletonCardsArr.map((_, idx) => (<SkeletonCard key={idx} />))}
            
        </Grid>
        <div ref={lastElement} style={{height: 20}}></div>
      </>
      }
    </>
  );
});
