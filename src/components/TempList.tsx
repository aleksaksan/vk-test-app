import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import filmStore from '../store/filmStore';
import { FilmCard } from './FilmCard';
import { CircularProgress, Typography } from '@mui/material';
import { toJS } from 'mobx';

const TempList = observer(() => {
  const { films, getFilmsByPages, isLoading, error } = filmStore;

  useEffect(() => {
    getFilmsByPages();
  }, [getFilmsByPages]);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  console.log(toJS(films))

  return (
    <div>
      {films.map(film => (
        <FilmCard
          key={film.id}
          id={film.id}
          title={film.title}
          src={film.medium_cover_image}
          year={film.year}
      />
      ))}
    </div>
  );
});

export default TempList;