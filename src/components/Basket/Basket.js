import {useEffect}  from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useSelector, useDispatch } from 'react-redux';
import {getProductInBasketForCurentUser} from "../../store/backet"
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

  const productsInBasket = useSelector((state) => state.backet.products);
  console.log('rerender')
  useEffect(() => {
    dispatch(getProductInBasketForCurentUser());
  }, [])

  return (
    <IconButton aria-label={notificationsLabel(100)}>
      <Badge badgeContent={productsInBasket && productsInBasket.length ? productsInBasket.length  : 0} color="secondary">
        <ShoppingBasketIcon />
      </Badge>
    </IconButton>
  );
}