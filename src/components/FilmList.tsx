import Grid from '@mui/material/Grid2';
import mockData from '../assets/tempMockData.json';
import { FilmCard } from './FilmCard';
import { SkeletonCard } from './SkeletonCard';



const mock = mockData.data.movies;

export const FilmList = () => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {mock.map(film => (
        <FilmCard
          id={film.id}
          title={film.title}
          src={film.medium_cover_image}
          year={film.year}
        />
      ))}
      <SkeletonCard />
        
    </Grid>
  );
};
