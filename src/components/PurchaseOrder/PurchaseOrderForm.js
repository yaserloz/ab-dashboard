import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SuggestionInput from "../Form/SuggestionInput";
import SelectList from "../Form/SelectList";

import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import TextInput from "../Form/TextInput";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import env from "../../env";

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

const speedDialuseStyles = makeStyles((theme) => ({
  root: {
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const PurchaseOrderForm = (props) => {


  const [suppliers, setSuppliers] = React.useState([]);
  const [deliveryTypes, setDeliveryTypes] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [checkedLines, setCheckedLines] = React.useState([]);
  const [purchaseOrder, setPurchaseOrder] = React.useState(null);

  useEffect(() => {
    axios.get(env() + "suppliers").then((response) => {
      const suppliers = response.data;
      setSuppliers(suppliers);
    });

    axios.get(env() + "delivery-type").then((response) => {
      const deliverytypes = response.data;
      setDeliveryTypes(deliverytypes);
    });

    axios.get(env() + "purchase-order/" + props.po).then((response) => {
      setPurchaseOrder(response.data);
    });
  }, [props.po]);

  const onSuppliersChangeHandler = (supplier) => {
    const purchaseOrderCopy = { ...purchaseOrder };
    purchaseOrderCopy.orderInfo[0].supplier = supplier.id;
    purchaseOrderCopy.orderInfo[0].company_name = supplier.name;
    setPurchaseOrder(purchaseOrderCopy);
  };

  const onDeliveryTypesHandler = (deliveryType) => {
    console.log(deliveryType);
    const purchaseOrderCopy = { ...purchaseOrder };
    purchaseOrderCopy.orderInfo[0].delivery_type_id = deliveryType.id;
    purchaseOrderCopy.orderInfo[0].name = deliveryType.name;
    setPurchaseOrder(purchaseOrderCopy);
  };

  const onCurrencyChangeHandler = (currency) => {
    const purchaseOrderCopy = { ...purchaseOrder };
    purchaseOrderCopy.orderInfo[0].currency_id = currency.value;
    purchaseOrderCopy.orderInfo[0].title = currency.name;
    setPurchaseOrder(purchaseOrderCopy);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const saveOrder = () => {
    const purchaseOrderCopy = { ...purchaseOrder };

    axios.post(
      env() + "purchase-order/save/" + purchaseOrderCopy.orderInfo[0].id,
      {
        purchaseOrder: purchaseOrderCopy.orderInfo[0],
        ac: "ThisIsHowIKnowYasir@ab",
      }
    );
  };

  const searchCodeBarHandler = (lineIndex) => async (event) => {
    
    const productCodeBar = event.target.value.trim();
    if (!productCodeBar) return;
    const product = await fetchProductByItsCodeBar(productCodeBar);
    const codeBar = product.data[0].code_bar;
    const id = product.data[0].id;

    const purchaseOrderCopy = { ...purchaseOrder };

    purchaseOrderCopy.orderLines[lineIndex] = {
      ...purchaseOrderCopy.orderLines[lineIndex],
      code_bar: codeBar,
      product_id: id,
    };
    setPurchaseOrder(purchaseOrderCopy);
  };

  const codeBarChangeHandler = (lineIndex) => (event) => {
    const productCodeBar = event.target.value;
    const purchaseOrderCopy = { ...purchaseOrder };
    purchaseOrderCopy.orderLines[lineIndex] = {
      ...purchaseOrderCopy.orderLines[lineIndex],
      code_bar: productCodeBar,
    };

    setPurchaseOrder(purchaseOrderCopy);
  };

  const productCountChangeHandler = (lineIndex) => (event) => {
    const productCount = event.target.value;
    const purchaseOrderCopy = { ...purchaseOrder };

    purchaseOrderCopy.orderLines[lineIndex] = {
      ...purchaseOrderCopy.orderLines[lineIndex],
      product_count: productCount,
    };
    setPurchaseOrder(purchaseOrderCopy);
  };

  const calculateLineTotalPrice = (lineIndex) => (event) => {
    const purchaseOrderCopy = { ...purchaseOrder };
    const totalPrice =
      purchaseOrderCopy.orderLines[lineIndex].product_count *
      purchaseOrderCopy.orderLines[lineIndex].unit_price;
    purchaseOrderCopy.orderLines[lineIndex] = {
      ...purchaseOrderCopy.orderLines[lineIndex],
      total_price: totalPrice,
    }


    setPurchaseOrder(purchaseOrderCopy);
  };

  const productPriceChangeHandler = (lineIndex) => (event) => {
    const productPrice = event.target.value;
    const purchaseOrderCopy = { ...purchaseOrder };
    purchaseOrderCopy.orderLines[lineIndex] = {
      ...purchaseOrderCopy.orderLines[lineIndex],
      unit_price: productPrice,
    };
    setPurchaseOrder(purchaseOrderCopy);
  };

  const fetchProductByItsCodeBar = async (codeBar) =>
    await axios.get(`${env()}product/${codeBar}`);

  const addEmptyOrderLine = () => {
    const purchaseOrderCopy = { ...purchaseOrder };

    purchaseOrderCopy.orderLines = [
      {
        toAdd: true,
        unit_price: " ",
        code_bar: " ",
        product_id: " ",
        product_count: " ",
        total_price: " ",
        notSaved: "",
      },
    ].concat(purchaseOrderCopy.orderLines);
    setPurchaseOrder(purchaseOrderCopy);
  };

  const handleClose = (action) => {
    if (action.operation === "addOrderLine") {
      addEmptyOrderLine();
    }

    if (action.operation === "saveOrder") {
      saveOrder();
    }
    setOpen(false);
  };

  const presisteLine = async (index, event) => {
    const purchaseOrderCopy = { ...purchaseOrder };
    const lineToPresiste = purchaseOrderCopy.orderLines[index];
    const response = await axios.post(
      env() + "purchase-order/" + props.po + "/lines/add",
      {
        ac: "ThisIsHowIKnowYasir@ab",
        productStockLine: lineToPresiste,
      }
    );
    if (!response.data.error) {
      // fetchPurchaseOrder()
      return;
    }

    alert("Error saving data");
  };

  const onLineCheck = (index) => (e) => {
    const purchaseOrderCopy = { ...purchaseOrder };

    if (e.target.checked) {
      purchaseOrderCopy.orderLines[index].checked = true;
      setPurchaseOrder(purchaseOrderCopy);
      return;
    }
    purchaseOrderCopy.orderLines[index].checked = false;
    setPurchaseOrder(purchaseOrderCopy);
  };

  const clearLineInput = (index) => {
    const purchaseOrderCopy = { ...purchaseOrder };

    purchaseOrderCopy.orderLines[index] = {
      unit_price: " ",
      code_bar: " ",
      product_id: " ",
      product_count: " ",
      total_price: " ",
    };
    setPurchaseOrder(purchaseOrderCopy);
  };

  const cleanLinesHandler = (popupstate) => {
    const purchaseOrderCopy = { ...purchaseOrder };
    popupstate.close();
    purchaseOrderCopy.orderLines.forEach((line, index) => {
      if (line.checked) {
        clearLineInput(index);
      }
    });
  };

  const classes = useStyles();

  const speedDialStyle = speedDialuseStyles();

  if (purchaseOrder && !purchaseOrder.orderInfo.length) {
    return <h3>Error could not fetch orderInfo {`${props.po}`}</h3>;
  }

  return (
    <div>
      <h3>Purchase order {`${props.po}`}</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <SuggestionInput
            disabled={
              purchaseOrder &&
              purchaseOrder.orderInfo[0] &&
              purchaseOrder.orderInfo[0].statu === "COMPLETE"
                ? true
                : false
            }
            label={"Supplier"}
            label="Supplier"
            onOptionChange={onSuppliersChangeHandler}
            options={suppliers && suppliers.length ? suppliers : null}
            selectedOptions={
              purchaseOrder &&
              purchaseOrder.orderInfo[0] &&
              purchaseOrder.orderInfo &&
              suppliers &&
              suppliers.length
                ? suppliers.find(
                    (supplier) =>
                      purchaseOrder.orderInfo[0].company_name === supplier.name
                  )
                : null
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SuggestionInput
            disabled={
              purchaseOrder &&
              purchaseOrder.orderInfo[0] &&
              purchaseOrder.orderInfo[0].statu === "COMPLETE"
                ? true
                : false
            }
            label={"Supplier"}
            options={
              deliveryTypes && deliveryTypes.length ? deliveryTypes : null
            }
            onOptionChange={onDeliveryTypesHandler}
            selectedOptions={
              purchaseOrder &&
              purchaseOrder.orderInfo &&
              deliveryTypes &&
              deliveryTypes.length
                ? deliveryTypes.find(
                    (deliveryType) =>
                      purchaseOrder.orderInfo[0].name === deliveryType.name
                  )
                : null
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SuggestionInput
            disabled={
              purchaseOrder &&
              purchaseOrder.orderInfo[0] &&
              purchaseOrder.orderInfo[0].statu === "COMPLETE"
                ? true
                : false
            }
            fullWidth
            label="Currency"
            options={[
              { name: "EURO", value: 1 },
              { name: "Dinar", value: 2 },
            ]}
            onOptionChange={onCurrencyChangeHandler}
            selectedOptions={{
              name: purchaseOrder ? purchaseOrder.orderInfo[0].title : null,
              value: purchaseOrder
                ? purchaseOrder.orderInfo[0].currency_id
                : null,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectList
            disabled={
              purchaseOrder &&
              purchaseOrder.orderInfo[0] &&
              purchaseOrder.orderInfo[0].statu === "COMPLETE"
                ? true
                : false
            }
            fullWidth
            label="Arrived"
            // selectedOption = { purchaseOrder && parseInt(purchaseOrder.orderInfo[0].arrived)}
            // value="Arrived ?"
            options={[
              {
                name: "Yes",
                value: 1,
              },
              {
                name: "No",
                value: 0,
              },
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextInput
            disabled={
              purchaseOrder &&
              purchaseOrder.orderInfo[0] &&
              purchaseOrder.orderInfo[0].statu === "COMPLETE"
                ? true
                : false
            }
            fullWidth
            type="datetime-local"
            label="Arraved at"
            defaultValue="2017-05-24T10:30"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput fullWidth disabled label="User" value="ALQAISI yasir" />
        </Grid>
      </Grid>
      <br />
      <div>
        Order Total :-{" "}
        {purchaseOrder &&
        purchaseOrder.orderLines &&
        purchaseOrder.orderLines.length
          ? parseInt(
              purchaseOrder.orderLines.reduce((a, b) => ({
                total_price:
                  parseFloat(a.total_price) + parseFloat(b.total_price),
              })).total_price
            ).toFixed(2)
          : 0}
      </div>
      <br />
      <br /> <br />
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Menu {...bindMenu(popupState)}>
              <MenuItem   onClick={(e) => cleanLinesHandler(popupState)}>
                Clear Lines
              </MenuItem>
              <MenuItem onClick={popupState.close}>Delete lines</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
      <Button style={{marginRight:'1em', marginLeft:'1em'}} onClick={saveOrder} variant="contained" color="primary">
        Save order info
      </Button>
      <Button onClick={addEmptyOrderLine} variant="contained" color="primary">
        Add line
      </Button>
      <br /> <br /><br /> <br />
      {purchaseOrder
        ? purchaseOrder.orderLines.map((line, index) => {
            return (
              <Grid container spacing={3} key={index}>
                <Grid item></Grid>
                <Grid item>
                  <TextInput
                    disabled={
                      purchaseOrder.orderInfo[0].statu === "COMPLETE"
                        ? "disabled"
                        : null
                    }
                    value={line.code_bar}
                    fullWidth
                    label="Code bar"
                    onBlur={searchCodeBarHandler(index)}
                    onChange={codeBarChangeHandler(index)}
                  />
                </Grid>

                <Grid item>
                  <TextInput
                    disabled={
                      purchaseOrder.orderInfo[0].statu === "COMPLETE"
                        ? "disabled"
                        : null
                    }
                    value={line.product_id || " "}
                    fullWidth
                    label="Product id"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item>
                  <TextInput
                    disabled={
                      purchaseOrder.orderInfo[0].statu === "COMPLETE"
                        ? "disabled"
                        : null
                    }
                    value={line.product_count}
                    fullWidth
                    label="Product count"
                    onBlur={calculateLineTotalPrice(index)}
                    onChange={productCountChangeHandler(index)}
                  />
                </Grid>

                <Grid item>
                  <TextInput
                    disabled={
                      purchaseOrder.orderInfo[0].statu === "COMPLETE"
                        ? "disabled"
                        : null
                    }
                    value={line.unit_price || " "}
                    fullWidth
                    label="Price unite"
                    onBlur={calculateLineTotalPrice(index)}
                    onChange={productPriceChangeHandler(index)}
                  />
                </Grid>

                <Grid item>
                  <TextInput
                    disabled={
                      purchaseOrder.orderInfo[0].statu === "COMPLETE"
                        ? "disabled"
                        : null
                    }
                    value={line.total_price || " "}
                    fullWidth
                    label="Price total"
                    InputLabelProps={{ shrink: true }}
                    disabled={true}
                  />
                </Grid>
                <Grid item>
                  {line.toAdd ? (
                    <Button
                      onClick={(e) => presisteLine(index, e)}
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                  ) : null}
                </Grid>
              </Grid>
            );
          })
        : null}
    </div>
  );
};

export default PurchaseOrderForm;
