import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useSelector, useDispatch } from 'react-redux';
import { getProductInBasketForCurentUser } from '../../store/backet';
import Drawer from '../Drawer/Drawer';
import { showBacket } from '../../store/backet';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core';
import { deleteProductFromBasket } from '../../store/backet';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root': {
      width: '50%'
    }
  }
}));

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  console.log(qty, unit);
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99)
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function ItemInBasketList() {
  const classes = useStyles();

  // const backetIsShowedBacket = useSelector((state) => state.backet.show);

  const dispatch = useDispatch();

  const productsInBasket = useSelector((state) => state.backet.products);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getProductInBasketForCurentUser());
  }, [user]);

  const deleteProductFromBasketHandler = (product) => (event) => {
    dispatch(deleteProductFromBasket(product));
  };

  return (
    <>
      {productsInBasket && productsInBasket.length ? (
        <TableContainer sx={{ width: '100% !important' }} component={Paper}>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Unit price</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsInBasket &&
                productsInBasket.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell align="right">{product.count}</TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">
                      {priceRow(product.count, product.price)}
                    </TableCell>
                    <TableCell align="right">
                      <DeleteIcon
                        onClick={deleteProductFromBasketHandler(product)}
                      />
                    </TableCell>
                  </TableRow>
                ))}

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div
          style={{
            textAlign: 'center',
            margin: 'auto',
            width: '50%',
            border: '3px solid green',
            padding: '10px'
          }}
        >
          No products in basket
        </div>
      )}
    </>
  );
}
