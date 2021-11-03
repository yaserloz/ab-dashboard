import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ProductStockInfo from './ProductStockInfo';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderInfo } from '../../store/sellingOrder';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import {showNotification} from '../../store/notification'
const AddProductToOrder = (props) => {
  const theme = useTheme();

  const [stockinfoForProduct, setStockinfoForProduct] = React.useState([]);
  const [stockToAddToShipment, setStockToAddToShipment] = React.useState([]);

  const sellingPoint = useSelector((state) => state.sellingPoint);

  const currentSellingOrder = useSelector(
    (state) => state.sellingOrder.currentSellingOrder
  );

  const dispatch = useDispatch();

  const handleCheckboxChange = (object) => (Event) => {
    const stockinfoForProductCopy = [...stockinfoForProduct];
    stockinfoForProductCopy[object.index].checked =
      !stockinfoForProductCopy[object.index].checked;
    const stockToAddToShipmentCopy = [...stockToAddToShipment];
    if (stockinfoForProductCopy[object.index].checked) {
      stockToAddToShipmentCopy.push(stockinfoForProductCopy[object.index]);
      setStockToAddToShipment(stockToAddToShipmentCopy);
    } else {
      let arrayTemp = stockToAddToShipmentCopy.filter(
        (stock, stockIndex) => stock.id != object.id
      );
      setStockToAddToShipment(arrayTemp);
    }

    setStockinfoForProduct(stockinfoForProductCopy);
  };

  useEffect(() => {
    axios
      .get(
        `product-stock/availability?product-id=${props.selectedProduct.id}&selling-point=${sellingPoint.selectedSellingPoint.id}`
      )
      .then((response) => {
        setStockinfoForProduct(response.data);
      });
  }, []);

  const addProductToShipmentHandler = () => {
    let answer;
    answer = window.confirm(
      'Are you sure you want to add products to current order?'
    );
    if (!answer) {
      return;
    }

    const stockToAddToShipmentCopy = [...stockToAddToShipment];

    axios
      .put('selling-order/' + currentSellingOrder.orderInfo.id + '/lines/add', {
        ac: 'ThisIsHowIKnowYasir@ab',
        sellingOrderLine: stockToAddToShipmentCopy
      })
      .then((response) => {
        setStockToAddToShipment([]);
        props.onCloseDialogHandler();
        dispatch(showNotification({type:'success', message:"تم اضافة المنتج الى الوصل الحالي", show:true}));
        dispatch(getOrderInfo(currentSellingOrder.orderInfo.id));
      })
      .catch((error) => {
        dispatch(showNotification({type:'error', message:"هنالك مشكلة لم استطع اضافة المنتج الى الوصل الحالي", show:true}))
      });
  };
  return (
      <Dialog
        fullScreen
        open={props.selectedProduct ? true : false}
        onClose={props.onCloseDialogHandler}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`I should add how many items from the product number ${
            props.selectedProduct ? props.selectedProduct.id : null
          }? `}
        </DialogTitle>
        <DialogContent>
          <div style={{ margin: '1em', minWidth: '800px' }}>


            {
              //Show product stock info in shippment
              stockinfoForProduct && !!stockinfoForProduct.length && (
                <ProductStockInfo
                  onProductCheck={handleCheckboxChange}
                  stockInfo={stockinfoForProduct}
                />
              )
            }
          </div>
        </DialogContent>
        <DialogActions>
        {stockinfoForProduct &&
              !!stockinfoForProduct.length &&
              stockToAddToShipment &&
              !!stockToAddToShipment.length && (
                <div>
                  Products to add to order: {stockToAddToShipment.length}
                  <Button onClick={addProductToShipmentHandler}>
                  Add product to current selling order

                  </Button>
                </div>
              )}
                  <Button onClick={props.onCloseDialogHandler}>
                    Cancel
                  </Button>
        </DialogActions>
      </Dialog>
  );
};
export default AddProductToOrder;
