import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import ReplayIcon from '@material-ui/icons/Replay';
import Add from '@material-ui/icons/Add';
import { green } from '@material-ui/core/colors';
import { useDispatch, useSelector } from "react-redux";
import {
    addPurchaseOrder
  } from "../../store/PurchaseOrderReducer/PurchaseOrderReducer";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonFailed: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CircularIntegration() {
  const classes = useStyles();
  const timer = React.useRef();

  const dispatch = useDispatch();
  const state = useSelector(state => state);


  const onAddClickHandler = () => {
    dispatch(addPurchaseOrder({user:1}))
    }
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
      {
      state.PurchaseOrders.purchaseOrderAddSuccess && state.PurchaseOrders.purchaseOrderAddFinished ? 
        <Fab
          aria-label="save"
          color="primary"
          className={classes.buttonSuccess}
        >
          <CheckIcon  /> 
        </Fab>
        : 
        !state.PurchaseOrders.purchaseOrderAddSuccess && state.PurchaseOrders.purchaseOrderAddFinished ? 
        <Fab
        aria-label="save"
        color="primary"
        className={classes.buttonFailed}
       >
        <ReplayIcon onClick={onAddClickHandler}  /> 
        </Fab>
        :
        <Fab
        aria-label="save"
        color="primary"
       >
          <Add onClick={onAddClickHandler} />

        </Fab>
        }
        {state.PurchaseOrders.loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
    </div>
  );
}