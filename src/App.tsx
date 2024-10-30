
import { Box, Container } from '@mui/material';
import './App.css';
import { Header } from './components/Header';
import { FilmList } from './components/FilmList';
import { SortSelect } from './components/SortSelect';
import TempList from './components/TempList';


function App() {
  
  return (
    <Box 
      display="flex" 
      flexDirection="column"
      height="100vh"
    >
    <TempList />
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
  )
}

export default App
