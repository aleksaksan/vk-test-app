import Grid from '@mui/material/Grid2';
import mockData from '../assets/tempMockData.json';
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const mock = mockData.data.movies;

export const FilmList = () => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {mock.map(film => (
        <Grid key={film.id} size={{ xs: 2, sm: 4, md: 4 }}>
          <Card
            sx={{
              m: 2,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              padding: 2,
            }}
          >
            <CardActions sx={{ position: 'absolute', top: 8, right: 8 }}>
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            </CardActions>

            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
              <CardMedia
                component="img"
                sx={{ height: 300, width: 'auto', objectFit: 'cover', borderRadius: 2 }}
                image={film.medium_cover_image}
                alt={film.title_english}
              />
            </Box>

            <CardContent sx={{ p: 1, paddingBottom: 0, display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {film.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                {film.year}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
        
    </Grid>
  );
};
