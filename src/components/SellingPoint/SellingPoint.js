import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon
  } from '@material-ui/core';
  import Drawer from '../Drawer/Drawer';
import SelectSellingPointForm from './SelectSellingPointForm';


const SellingPoint = () => {

    const selectedSellingPoint = useSelector((state) => state.sellingPoint.selectedSellingPoint);
    const [selectSellingPointFormOpen, setSelectSellingPointFormOpen ] = useState(false)

    const selectSellingPointFormOpenHandler = () => {
        console.log('se')
        setSelectSellingPointFormOpen(true)
    }

    const formCloseHandler = () => setSelectSellingPointFormOpen(false)
    return <>
    <Drawer show={selectSellingPointFormOpen}>
        <SelectSellingPointForm onFormClose={formCloseHandler}  />
    </Drawer>
    {selectedSellingPoint ? <Button onClick={selectSellingPointFormOpenHandler}>{selectedSellingPoint.name}</Button> : <Button onClick={selectSellingPointFormOpenHandler}>Select selling point</Button>}
    </>

}
export default SellingPoint;