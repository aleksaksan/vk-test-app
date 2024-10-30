import { Box, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { FilmSortAttributeEnum } from "../shared/enums/FilmSortAttributeEnum";
import { observer } from "mobx-react-lite";
import filmStore from "../store/filmStore";


export const SortSelect = observer(() => {
  const [field, setField] = useState('');
  const { changeSorting } = filmStore;

  const handleChange = (event: SelectChangeEvent) => {
    setField(event.target.value);
    changeSorting(event.target.value as FilmSortAttributeEnum);
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
            <MenuItem value={FilmSortAttributeEnum.Title}>Название</MenuItem>
            <MenuItem value={FilmSortAttributeEnum.Year}>Год</MenuItem>
            <MenuItem value={FilmSortAttributeEnum.Rating}>Рейтинг</MenuItem>
            <MenuItem value={FilmSortAttributeEnum.DateAdded}>Дата добавления</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
});
