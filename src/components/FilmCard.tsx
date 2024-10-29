import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

export type FilmCardType = {
  id: number;
  title: string;
  src: string;
  year: number;
}


export const FilmCard = ({id, title, src, year}: FilmCardType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid key={id} size={{ xs: 2, sm: 4, md: 4 }}>
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
          <IconButton aria-label="settings" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { handleMenuClose(); }}>Редактировать</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); }}>Удалить</MenuItem>
          </Menu>
        </CardActions>
        
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
          <CardMedia
            component="img"
            sx={{ height: 300, width: 'auto', objectFit: 'cover', borderRadius: 2 }}
            image={src}
            alt={title}
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
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
            {year}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
