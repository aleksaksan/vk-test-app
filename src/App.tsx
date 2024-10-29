
import { Box, Container, Typography } from '@mui/material';
import './App.css';
import { Header } from './components/Header';
import { FilmList } from './components/FilmList';
import { SortSelect } from './components/SortSelect';
import { ModalWindow } from './components/ModalWindow/ModalWindow';
import { useState } from 'react';


function App() {

  const [visible, setVisible] = useState(true);
  
  return (
    <Box 
      display="flex" 
      flexDirection="column"
      height="100vh"
    >
      <Header/>
      <SortSelect />
      <Box 
        component="main" 
        flexGrow={1}
        py={2}
      >
        <Container>
          <FilmList />

        </Container>
      </Box>
      <ModalWindow setVisible={setVisible} visible={visible}>
        <Typography variant="h6" component="h2" gutterBottom>
          Это модальное окно
        </Typography>
        <Typography variant="body1">
          Здесь находится контент модального окна.
        </Typography>
      </ModalWindow>
    </Box>
  )
}

export default App
