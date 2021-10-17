import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ProductListToolbar = (props) => {




  return <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button color="primary" variant="contained">
        Add product
      </Button>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500, paddingBottom:"1em" }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search product"
              variant="outlined"
            />
          </Box>
          <Box sx={{ maxWidth: 500 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.selectedSellingPoint ? props.selectedSellingPoint : 0}
                label="Age"
                onChange={props.onSellingPoingChange}
              >
                {
                  props.sellingPoints && props.sellingPoints.length  ? props.sellingPoints.map(sellingPoint => <MenuItem value={sellingPoint.id}>{sellingPoint.name}</MenuItem>) : null
                }
                
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
}

export default ProductListToolbar;
