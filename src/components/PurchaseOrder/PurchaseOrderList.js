import React, {useEffect} from "react";
import {
    getPurchaseOrders,
    loadPurchaseOrders,
  } from "../../store/PurchaseOrderReducer/PurchaseOrderReducer";
import moment from 'moment'
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    poContainer:{
      display:'flex',
      height:'100%',
    },
    poCreationDate:{
      height:'100%',
      backgroundColor:'#e24443',
      flexGrow:1,
      fontSize:'50px',
      textAlign:'center',
      color:'white',
      lineHeight:'50px',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',
      fontFamily: "'Spartan', sans-serif",
      width:'90px',
      marginRight:".5em"
    },
    poId:{
      fontSize:"13px"
    }
  }));
const PurchaseOrderList = (props) => {
    const dispatch = useDispatch();
    const purchaseOrders = useSelector(getPurchaseOrders);
  
    useEffect(() => {
      dispatch(loadPurchaseOrders());
    }, []);
    const classes = useStyles();
  return (
    <>
      {purchaseOrders.length
        ? purchaseOrders.map((purchaseOrder, index) => (
            <Paper key={purchaseOrder.OPURCHASE_ORDER_ID} variant="outlined">
              <div className={classes.poContainer}>
                <div
                  style={{
                    backgroundColor: index % 2 == 0 ? "#e24443" : "#2c3f50",
                  }}
                  className={classes.poCreationDate}
                >
                  {moment(purchaseOrder.ORDER_CREATION_TIME).format("D")}
                  <br />
                  {moment(purchaseOrder.ORDER_CREATION_TIME)
                    .format("MMM")
                    .toUpperCase()}
                </div>
                <div style={{ flexGrow: 11 }}>
                  <div className={classes.poId}>
                    Order number ({purchaseOrder.OPURCHASE_ORDER_ID})
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className={classes.poId}>
                      Supplier: ({purchaseOrder.SUPPLIER}) /{" "}
                    </div>
                    <div className={classes.poId}>
                      Total: ({purchaseOrder.TOTAL_ORDER_AMOUNT}) /{" "}
                    </div>
                    <div className={classes.poId}>
                      Reduction: ({purchaseOrder.REDUCTION}) /{" "}
                    </div>
                    <div className={classes.poId}>
                      To pay: ({purchaseOrder.FINAL_ORDER_AMOUNT}){" "}
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          ))
        : null}
    </>
  );
};


export default PurchaseOrderList