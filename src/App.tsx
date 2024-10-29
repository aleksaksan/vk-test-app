
import { Box, Container } from '@mui/material';
import './App.css';
import { Header } from './components/Header';
import { FilmList } from './components/FilmList';


function App() {

  
  return (
    <Box 
      display="flex" 
      flexDirection="column"
      height="100vh"
    >
      <Header/>
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
