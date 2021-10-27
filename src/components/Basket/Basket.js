import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useSelector, useDispatch } from 'react-redux';
import { getProductInBasketForCurentUser } from '../../store/backet';
import Drawer from '../Drawer/Drawer';
import { showBacket } from '../../store/backet';
import ItemInBasketList from './ItemInBasketList';
import SelectCustomertForm from './SelectCustomertForm';
import { Button } from '@material-ui/core';
import {
  setSelectedCustomerToLocalStorage,
  getSelectedCustomerToLocalStorage,
  deletedSelectedCustomerToLocalStorage
} from '../../localStorage/Customer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

export default function Basket() {
  const dispatch = useDispatch();

  const backetIsShowedBacket = useSelector((state) => state.backet.show);
  const productsInBasket = useSelector((state) => state.backet.products);
  const user = useSelector((state) => state.auth.user);

  const [client, setClient] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(
    getSelectedCustomerToLocalStorage()
      ? getSelectedCustomerToLocalStorage
      : null
  );
  const [openSelectCustomerDialog, setOpenSelectCustomerDialog] =
    useState(false);

  useEffect(() => {
    dispatch(getProductInBasketForCurentUser());
  }, [user]);

  const onBasketClickHandler = () => {
    dispatch(showBacket());
  };

  const openSelectDialogFormHandler = () => {
    setOpenSelectCustomerDialog(true);
  };

  const userSelectHandler = (item) => {
    setSelectedCustomer(item);
    setSelectedCustomerToLocalStorage(item);
    setOpenSelectCustomerDialog(false);
  };
  const removeSelectedCustomer = () => {
    setSelectedCustomer(null);
    deletedSelectedCustomerToLocalStorage();
  };

  return (
    <>
      {openSelectCustomerDialog && (
        <SelectCustomertForm onUserSelectHandler={userSelectHandler} />
      )}
      <Drawer show={backetIsShowedBacket}>
        <>
          {!selectedCustomer ? (
            <Button onClick={openSelectDialogFormHandler}>
              Select Customer
            </Button>
          ) : (
            <>
              <Button onClick={removeSelectedCustomer}>
                Remove selected Customer
              </Button>
              <TableContainer sx={{ minWidth: '100% !important' }} component={Paper}>
                <Table  aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">ID</TableCell>
                      <TableCell align="right">FIRST NAME</TableCell>
                      <TableCell align="right">LAST NAME</TableCell>
                      <TableCell align="right">TELEPHONE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{selectedCustomer.id}</TableCell>
                      <TableCell align="right">
                        {selectedCustomer.first_name}
                      </TableCell>
                      <TableCell align="right">
                        {selectedCustomer.last_name}
                      </TableCell>
                      <TableCell align="right">
                        {selectedCustomer.telephone}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
                    <br />
                    <br />
                    <br />

          <hr />
          <br />
          <br />
          <br />

          <ItemInBasketList />
        </>
      </Drawer>
      <IconButton
        onClick={onBasketClickHandler}
        aria-label={notificationsLabel(100)}
      >
        <Badge
          badgeContent={
            productsInBasket && productsInBasket.length
              ? productsInBasket.length
              : 0
          }
          color="secondary"
        >
          <ShoppingBasketIcon />
        </Badge>
      </IconButton>
    </>
  );
}
