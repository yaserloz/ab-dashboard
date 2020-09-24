import React, { useEffect } from "react";
import {
  getSellingOrders,
  loadSellingOrders,
} from "../../store/SellingOrderReducer/SellingOrderReducer";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom'


const orderStateTranslate = {
  NEW:"طلب جديد",
  PAIED:"تم الدفع للموزع",
}


const useStyles = makeStyles((theme) => ({
  poContainer: {
    display: "flex",
    height: "100%",
  },
  poCreationDate: {
    height: "100%",
    backgroundColor: "#e24443",
    flexGrow: 1,
    fontSize: "50px",
    textAlign: "center",
    color: "white",
    lineHeight: "50px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    fontFamily: "'Spartan', sans-serif",
    width: "90px",
    marginRight: ".5em",
  },
  poId: {
    fontSize: "13px",
  },
}));

const SellingOrderList = (props) => {

  const dispatch = useDispatch();
  const SellingOrders = useSelector(getSellingOrders);

  useEffect(() => {
    dispatch(loadSellingOrders());
  }, []);
  const classes = useStyles();
  console.log(SellingOrders);
  let total = 0

  return (
    <>
      {
      SellingOrders && SellingOrders.length ? 
      SellingOrders.forEach(order => {
          total += parseInt(order.total_order_price);
      })
      :null
      }
      <div>المجموع الكلي للطلبات: <strong>{parseInt(total).toLocaleString("ar-IQ")}</strong></div>
       <List className={classes.root}>
        {SellingOrders && SellingOrders.length
          ? SellingOrders.map((sellingOrder) => (
              <ListItem key={sellingOrder.id}>
                <ListItemAvatar>
                {sellingOrder.id}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    sellingOrder.first_name + " " + sellingOrder.last_name
                  }
                  secondary={parseInt(sellingOrder.total_order_price).toLocaleString("ar-IQ")  + " دينار / " + ' '+ orderStateTranslate[sellingOrder.order_state]}
                />
                <ListItemSecondaryAction>
                <Link  to = {'/selling-order/' + sellingOrder.id} target="_blank" > 
                <VisibilityIcon />
                </Link>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          : null}
      </List>
    </>
  );
};

export default SellingOrderList;
