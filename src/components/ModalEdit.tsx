import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ModalWindow } from './ModalWindow/ModalWindow';
import { Box, Button, TextField } from '@mui/material';
import filmStore from '../store/filmStore';

export const ModalEdit = observer(() => {
  const { isEdditing, setIsEdditing, edditFilm, chosenFilmId, films } = filmStore;
  const chosenFilm = films.find(film => film.id === chosenFilmId);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  
  useEffect(() => {
    if (chosenFilm) {
      setTitle(chosenFilm.title);
      setYear(chosenFilm.year.toString());
    }
  }, [chosenFilm]);

  const SubmitHandler = () => {
    edditFilm(title, Number(year));
  }

  return (
    <ModalWindow visible={isEdditing} setVisible={() => setIsEdditing}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(e)=>{e.preventDefault()}}
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Название фильма"
          multiline
          maxRows={3}
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Год"
          value={year}
          onChange={(e)=>setYear(e.target.value)}
        />
        
        <Box
          sx={{ p: 2, marginTop: 4, display: 'flex', justifyContent: 'space-around'}}
        >
          <Button type='submit' variant='outlined' onClick={SubmitHandler}>Сохранить</Button>
          <Button variant='outlined' onClick={()=>setIsEdditing(false)}>Отмена</Button>
        </Box>
      </Box>
    </ModalWindow>
  );
});
