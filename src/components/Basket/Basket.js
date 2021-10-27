import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useSelector, useDispatch } from 'react-redux';
import { getProductInBasketForCurentUser } from '../../store/backet';
import Drawer from '../Drawer/Drawer';
import { showBacket } from '../../store/backet';
import ItemInBasketList from './ItemInBasketList';


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
  const backetIsShowedBacket = useSelector((state) => state.backet.show);

  const dispatch = useDispatch();

  const productsInBasket = useSelector((state) => state.backet.products);
  const user = useSelector((state) => state.auth.user);
  const [client, setClient] = useState(null)

  useEffect(() => {
    dispatch(getProductInBasketForCurentUser());
  }, [user]);

  const onBasketClickHandler = () => {
    console.log('eee');
    dispatch(showBacket());
  };

  return (
    <>
      <Drawer show={backetIsShowedBacket}>
       <ItemInBasketList />
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
