import Grid from '@mui/material/Grid2';
import { FilmCard } from './FilmCard';
import { SkeletonCard } from './SkeletonCard';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { observer } from 'mobx-react-lite';
import filmStore from '../store/filmStore';



export const FilmList = observer(() => {
  const lastElement = useRef<HTMLDivElement>(null);
  const { totalPages, page, isLoading, changePage, limit, films, getFilmsByPages, error } = filmStore;
  useIntersectionObserver(lastElement, page < totalPages, isLoading, changePage);

  useEffect(() => {
    getFilmsByPages();
  }, [getFilmsByPages]);

  const skeletonCardsArr = Array.from({ length: limit });

  if (error) return <h2>Something wents wrong!!!</h2>

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {films.map(film => (
        <FilmCard
          key={film.id}
          id={film.id}
          title={film.title}
          src={film.medium_cover_image}
          year={film.year}
        />
      ))}
      <div ref={lastElement} style={{height: 20, backgroundColor: 'red'}}></div>
      {isLoading && skeletonCardsArr.map((_, idx) => (<SkeletonCard key={idx} />))}
        
    </Grid>
  );
});
