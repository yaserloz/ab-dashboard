import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {setSelectedSellingPoint} from '../../store/sellingPoint'
import {setSellingPointToLocalStorage} from '../../localStorage/sellingPoint'
const SelectSellingPointForm = props => {
  const [sellingPoints, setSellingPoints] = useState([]);
  const selectedSellingPoint = useSelector(
    (state) => state.sellingPoint.selectedSellingPoint
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getSellingPoints();
  }, []);

  const getSellingPoints = () => {
    axios.get('selling-points').then((response) => {
      setSellingPoints(response.data);
    });
  };

  const onSellingPoingChange = event => {
    dispatch(setSelectedSellingPoint(event.target.value));
    setSellingPointToLocalStorage(event.target.value)
    props.onFormClose()
  };
  return (
    <>
      {' '}
      <div
        style={{
          textAlign: 'center',
          margin: 'auto',
          width: '50%',
          padding: '10px'
        }}
      >
        <Select
          sx={{ width: '100%' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSellingPoint ? selectedSellingPoint.id : 0}
          onChange={onSellingPoingChange}
        >
          {sellingPoints && sellingPoints.length
            ? sellingPoints.map((sellingPoint) => (
                <MenuItem key ={sellingPoint.id} value={sellingPoint}>{sellingPoint.name}</MenuItem>
              ))
            : null}
        </Select>
      </div>
    </>
  );
};
export default SelectSellingPointForm;
