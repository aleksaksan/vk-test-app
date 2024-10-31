
import { Box, Container } from '@mui/material';
import './App.css';
import { Header } from './components/Header/Header';
import { FilmList } from './components/FilmList/FilmList';
import { SortSelect } from './components/SortSelect/SortSelect';
import { ModalDelete } from './components/ModalDelete/ModalDelete';
import { ModalEdit } from './components/ModalEdit/ModalEdit';


function App() {
  
  return (
    <>
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
      </Box>
      
      <ModalDelete />
      <ModalEdit />
    </>
  )
}

export default App
