
import { FormControl, InputLabel, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { useSelectYearContext } from '../../context/SelectYearContext';
import { useCallback, useMemo } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const SelectYear = () => {

    const { year, setYear } = useSelectYearContext();

    const handleChange = useCallback((event: SelectChangeEvent) => {
        setYear(event.target.value);
    }, [year]);

    const listYear = useMemo(() => {
        let initialYear = 2010;

        let list = [];
        for (let i = 0; i < 50; i++) {
            let year = initialYear + i;
            list.push(year);
        }

        return list;
    }, []);

    return (
        <ListItem alignItems="center">
            <ListItemIcon>
                <HistoryIcon />
            </ListItemIcon>
            <ListItem>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120}} fullWidth>
                    <InputLabel id="label-id">Ano</InputLabel>
                    <Select
                        labelId="label-id"
                        value={year}
                        onChange={handleChange}
                        label="Ano"
                        MenuProps={MenuProps}
                        fullWidth
                    >
                        {
                            listYear.map((year) => (
                                <MenuItem value={year}>{year}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </ListItem>
        </ListItem>
    )
}