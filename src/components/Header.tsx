import { AppBar, Container, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6">
            Список фильмов
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
