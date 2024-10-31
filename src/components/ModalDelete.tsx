import { ModalWindow } from './ModalWindow/ModalWindow';
import filmStore from '../store/filmStore';
import { Box, Button, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

export const ModalDelete = observer(() => {
  const { isDeleting, setIsDeleting, deleteFilm } = filmStore;

  return (
    <ModalWindow visible={isDeleting} setVisible={() => setIsDeleting}>
      <Typography
        variant="h5"
        component="h5"
        sx={{
          m: 2,
          p: 2,
        }}
      >
        Вы уверены, что хотите удалить фильм?
      </Typography>
      <Box
        sx={{ p: 2, marginTop: 4, display: 'flex', justifyContent: 'space-around'}}
      >
        <Button variant='outlined' onClick={deleteFilm}>Да</Button>
        <Button variant='outlined' onClick={()=>setIsDeleting(false)}>Нет</Button>
      </Box>
    </ModalWindow>
  );
});
