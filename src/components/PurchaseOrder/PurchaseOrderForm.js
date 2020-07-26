import React, {useEffect} from "react";
import {
    getPurchaseOrders,
    loadPurchaseOrders,
  } from "../../store/PurchaseOrderReducer/PurchaseOrderReducer";
import moment from 'moment'
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
import SuggestionInput from '../Form/SuggestionInput'
import TextInput from '../Form/TextInput'
import DateTimeInput from '../Form/DateTimeInput'
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
  
    // useEffect(() => {
    //   dispatch(loadPurchaseOrders());
    // }, []);
    console.log('form')

    const classes = useStyles();
  return (
    <div>
     <h3>Purchase order {`23`}</h3>
     <Grid container spacing={3}>

        <Grid item xs={12} sm={6}>
          <SuggestionInput fullWidth label='Supplier' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SuggestionInput fullWidth label='Delivery type'  />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SuggestionInput fullWidth label='Currency'  />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput fullWidth disabled label='User' defaultValue="2017-05-24" />
        </Grid>

        <Grid item xs={12} sm={6}>
        <TextInput fullWidth type="date" label='Arraved at' de />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput fullWidth disabled label='User' value='ALQAISI yasir' />
        </Grid>
      </Grid>
    </div>
  );
};


export default PurchaseOrderList