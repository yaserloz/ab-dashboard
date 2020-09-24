import React, {useEffect} from "react";
import {
  getOnePurchaseOrder,
  getPurchaseOrder,
  } from "../../store/PurchaseOrderReducer/PurchaseOrderReducer";
import moment from 'moment'
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
import SuggestionInput from '../Form/SuggestionInput'
import SelectList from '../Form/SelectList'
import fetch from 'cross-fetch';

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
const PurchaseOrderForm = (props) => {

    const dispatch = useDispatch();
    const purchaseOrder = useSelector(getOnePurchaseOrder);
    const [suppliers, setSuppliers] = React.useState([]);
    const [deliveryTypes, setDeliveryTypes] = React.useState([]);

    useEffect( () => {

      (async()=> {
        dispatch(getPurchaseOrder(props.match.params.id));

        let response = await fetch("https://api.yaz-fr.com/api/suppliers");
        const suppliers = await response.json();
        setSuppliers(suppliers)

        response = await fetch("https://api.yaz-fr.com/api/delivery-type");
        const deliverytypes = await response.json();
        setDeliveryTypes(deliverytypes)



      })()
    }, []);
    console.log(purchaseOrder)
    console.log(deliveryTypes)
    const classes = useStyles();
  return (
    <div>
     <h3>Purchase order {`${props.match.params.id}`}</h3>
     <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <SuggestionInput disabled label={"Supplier"} label='Supplier' options={suppliers && suppliers.length ? suppliers : null}  selectedOptions = { purchaseOrder && purchaseOrder.orderInfo && suppliers && suppliers.length  ? suppliers.find(supplier => purchaseOrder.orderInfo[0].company_name === supplier.name ) : null } />
        </Grid>
        <Grid item xs={12} sm={6}>
        <SuggestionInput disabled label={"Supplier"} label='Supplier' options={deliveryTypes && deliveryTypes.length ? deliveryTypes : null}  selectedOptions = { purchaseOrder && purchaseOrder.orderInfo && deliveryTypes && deliveryTypes.length  ? deliveryTypes.find(deliveryType => purchaseOrder.orderInfo[0].name === deliveryType.name ) : null } />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SuggestionInput fullWidth label='Currency'  />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectList fullWidth value='Arrived ?' options={[
          {
            label:'Yes',
            value:1
          },
          {
            label:'No',
            value:0
          }
          ]} />
        </Grid>

        <Grid item xs={12} sm={6}>
        <TextInput fullWidth     type="datetime-local"  label='Arraved at'     defaultValue="2017-05-24T10:30" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput fullWidth disabled label='User' value='ALQAISI yasir' />
        </Grid>
      </Grid>
    </div>
  );
};


export default PurchaseOrderForm