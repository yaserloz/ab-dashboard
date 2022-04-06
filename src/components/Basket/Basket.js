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
// import {
//   getSelectedCustomerToLocalStorage,
//   deletedSelectedCustomerToLocalStorage
// } from '../../localStorage/Customer';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { updateSellingOrder } from '../../store/sellingOrder';
import { createNewSellingOrder } from '../../store/sellingOrder';
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

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
  // const productsInBasket = useSelector((state) => state.backet.products);
  const user = useSelector((state) => state.auth.user);
  const sellingOrder = useSelector((state) => state.sellingOrder);
  const sellingPoint = useSelector((state) => state.sellingPoint);

  const orderInfo = useSelector(
    (state) =>
      state.sellingOrder.currentSellingOrder &&
      state.sellingOrder.currentSellingOrder.orderInfo
  );


  // const [client, setClient] = useState(null);
  // const [selectedCustomer, setSelectedCustomer] = useState(
  //   getSelectedCustomerToLocalStorage()
  //     ? getSelectedCustomerToLocalStorage
  //     : null
  // );
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

  const userSelectHandler = (client) => {
    dispatch(
      updateSellingOrder({
        //TODO put pack selling point diynmcly
        id: 1,
        created_for_id: client.id
      })
    );

    setOpenSelectCustomerDialog(false);
  };
  // const removeSelectedCustomer = () => {
  //   setSelectedCustomer(null);
  //   deletedSelectedCustomerToLocalStorage();
  // };

  const createOrderHandler = () => {
    dispatch(
      createNewSellingOrder({
        selling_point: sellingPoint.selectedSellingPoint.id,
        created_by: user.id
      })
    );
  };

  return (
    <>
      {openSelectCustomerDialog && (
        <SelectCustomertForm onUserSelectHandler={userSelectHandler} />
      )}
      <Drawer show={backetIsShowedBacket}>
        <>
          <Button onClick={createOrderHandler}>Create Order</Button>
          <Button onClick={openSelectDialogFormHandler}>
            Update order Client
          </Button>

          {orderInfo && (
            <>
              <TableContainer
                sx={{ minWidth: '100% !important' }}
                component={Paper}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">ORDER ID</TableCell>
                      <TableCell align="right">FIRST NAME</TableCell>
                      <TableCell align="right">LAST NAME</TableCell>
                      <TableCell align="right">TELEPHONE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{orderInfo.id}</TableCell>
                      <TableCell align="right">
                        {orderInfo.first_name}
                      </TableCell>
                      <TableCell align="right">{orderInfo.last_name}</TableCell>
                      <TableCell align="right">{orderInfo.telephone}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

  

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
            sellingOrder.currentSellingOrder &&  sellingOrder.currentSellingOrder.orderLines && sellingOrder.currentSellingOrder.orderLines.length
              ? sellingOrder.currentSellingOrder.orderLines.length
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
