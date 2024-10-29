import { Box, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

enum FilmAttribute {
  Title = 'Название',
  Year = 'Год',
  Rating = 'Рейтинг',
  DateAdded = 'Дата добавления'
}

export const SortSelect = () => {
  const [field, setField] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setField(event.target.value);
  };

  return (
    <Container>
      <Box sx={{ minWidth: 200, marginTop: '1rem' }}>
        <FormControl fullWidth>
          <InputLabel id="sort-id" >Сортировать по</InputLabel>
          <Select
            labelId="sort-id"
            id="sort-select"
            value={field}
            label="Сортировать по"
            onChange={handleChange}
          >
            <MenuItem value={"title"}>{FilmAttribute.Title}</MenuItem>
            <MenuItem value={"year"}>{FilmAttribute.Year}</MenuItem>
            <MenuItem value={"rating"}>{FilmAttribute.Rating}</MenuItem>
            <MenuItem value={"date_added"}>{FilmAttribute.DateAdded}</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}