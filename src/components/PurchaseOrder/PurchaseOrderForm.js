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
    axios.get( "suppliers").then((response) => {
      const suppliers = response.data;
      setSuppliers(suppliers);
    });

    axios.get("delivery-type").then((response) => {
      const deliverytypes = response.data;
      setDeliveryTypes(deliverytypes);
    });

    axios.get("purchase-order/" + props.po).then((response) => {
      setPurchaseOrder(response.data);
    });
  }, [props.po]);

  const onSuppliersChangeHandler = (supplier) => {
    const purchaseOrderCopy = { ...purchaseOrder };
    purchaseOrderCopy.PurchaseOrder.supplierId = supplier.id;
    purchaseOrderCopy.PurchaseOrder.supplierName = supplier.name;
    setPurchaseOrder(purchaseOrderCopy);
  };

  const onDeliveryTypesHandler = (deliveryType) => {
    const purchaseOrderCopy = { ...purchaseOrder };
    purchaseOrderCopy.PurchaseOrder.deliveryTypeId = deliveryType.id;
    purchaseOrderCopy.PurchaseOrder.name = deliveryType.name;
    setPurchaseOrder(purchaseOrderCopy);
  };

  const onCurrencyChangeHandler = (currency) => {
    const purchaseOrderCopy = { ...purchaseOrder };
    purchaseOrderCopy.PurchaseOrder.currencyId = currency.value;
    purchaseOrderCopy.PurchaseOrder.currecny = currency.name;
    setPurchaseOrder(purchaseOrderCopy);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const saveOrder = () => {
    const purchaseOrderCopy = { ...purchaseOrder };

    axios.post(
      env() + "purchase-order/save/" + purchaseOrderCopy.PurchaseOrder.id,
      {
        purchaseOrder: purchaseOrderCopy.PurchaseOrder,
        ac: "ThisIsHowIKnowYasir@ab",
      }
    );
  };

  const searchCodeBarHandler = (lineIndex) => async (event) => {
    
    const productCodeBar = event.target.value.trim();
    if (!productCodeBar) return;
    const product = await fetchProductByItsCodeBar(productCodeBar);
    const codeBar = product.data.code_bar;
    const id = product.data.id;

    const purchaseOrderCopy = { ...purchaseOrder };

    purchaseOrderCopy.Lines[lineIndex] = {
      ...purchaseOrderCopy.Lines[lineIndex],
      code_bar: codeBar,
      product_id: id,
    };
    setPurchaseOrder(purchaseOrderCopy);
  };

  const codeBarChangeHandler = (lineIndex) => (event) => {
    const productCodeBar = event.target.value;
    const purchaseOrderCopy = { ...purchaseOrder };
    purchaseOrderCopy.Lines[lineIndex] = {
      ...purchaseOrderCopy.Lines[lineIndex],
      code_bar: productCodeBar,
    };

    setPurchaseOrder(purchaseOrderCopy);
  };

  const productCountChangeHandler = (lineIndex) => (event) => {
    const productCount = event.target.value;
    const purchaseOrderCopy = { ...purchaseOrder };

    purchaseOrderCopy.Lines[lineIndex] = {
      ...purchaseOrderCopy.Lines[lineIndex],
      product_count: productCount,
    };
    setPurchaseOrder(purchaseOrderCopy);
  };

  const calculateLineTotalPrice = (lineIndex) => (event) => {
    const purchaseOrderCopy = { ...purchaseOrder };
    const totalPrice =
      purchaseOrderCopy.Lines[lineIndex].product_count *
      purchaseOrderCopy.Lines[lineIndex].unit_price;
    purchaseOrderCopy.Lines[lineIndex] = {
      ...purchaseOrderCopy.Lines[lineIndex],
      total_price: totalPrice,
    }


    setPurchaseOrder(purchaseOrderCopy);
  };

  const productPriceChangeHandler = (lineIndex) => (event) => {
    const productPrice = event.target.value;
    const purchaseOrderCopy = { ...purchaseOrder };
    purchaseOrderCopy.Lines[lineIndex] = {
      ...purchaseOrderCopy.Lines[lineIndex],
      unit_price: productPrice,
    };
    setPurchaseOrder(purchaseOrderCopy);
  };

  const fetchProductByItsCodeBar = async (codeBar) =>
    await axios.get(`${env()}products/codebar/${codeBar}`);

  const addEmptyOrderLine = () => {
    const purchaseOrderCopy = { ...purchaseOrder };

    purchaseOrderCopy.Lines = [
      {
        toAdd: true,
        unit_price: " ",
        code_bar: " ",
        product_id: " ",
        product_count: " ",
        total_price: " ",
        notSaved: "",
      },
    ].concat(purchaseOrderCopy.Lines);
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
    const lineToPresiste = purchaseOrderCopy.Lines[index];
    const response = await axios.post(
      env() + "purchase-order/" + props.po + "/lines/add",
      {
        ac: "ThisIsHowIKnowYasir@ab",
        productStockLine: lineToPresiste,
      }
    );
    if (!response.data.error) {
      axios.get(env() + "purchase-order/" + props.po).then((response) => {
        setPurchaseOrder(response.data);
      });
      return;
    }

    alert("Error saving data");
  };

  const onLineCheck = (index) => (e) => {
    const purchaseOrderCopy = { ...purchaseOrder };

    if (e.target.checked) {
      purchaseOrderCopy.Lines[index].checked = true;
      setPurchaseOrder(purchaseOrderCopy);
      return;
    }
    purchaseOrderCopy.Lines[index].checked = false;
    setPurchaseOrder(purchaseOrderCopy);
  };

  const clearLineInput = (index) => {
    const purchaseOrderCopy = { ...purchaseOrder };

    purchaseOrderCopy.Lines[index] = {
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
    purchaseOrderCopy.Lines.forEach((line, index) => {
      if (line.checked) {
        clearLineInput(index);
      }
    });
  };

  const classes = useStyles();

  const speedDialStyle = speedDialuseStyles();
  if (purchaseOrder && !purchaseOrder.PurchaseOrder) {
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
              purchaseOrder.PurchaseOrder &&
              purchaseOrder.PurchaseOrder.orderState === "COMPLETE"
                ? true
                : false
            }
            label={"Supplier"}
            label="Supplier"
            onOptionChange={onSuppliersChangeHandler}
            options={suppliers && suppliers.length ? suppliers : null}
            selectedOptions={
              purchaseOrder &&
              purchaseOrder.PurchaseOrder &&
              purchaseOrder.PurchaseOrder &&
              suppliers &&
              suppliers.length
                ? suppliers.find(
                    (supplier) =>
                      purchaseOrder.PurchaseOrder.supplierName === supplier.name
                  )
                : null
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SuggestionInput
            disabled={
              purchaseOrder &&
              purchaseOrder.PurchaseOrder &&
              purchaseOrder.PurchaseOrder.orderState === "COMPLETE"
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
              purchaseOrder.PurchaseOrder &&
              deliveryTypes &&
              deliveryTypes.length
                ? deliveryTypes.find(
                    (deliveryType) =>
                      purchaseOrder.PurchaseOrder.name === deliveryType.name
                  )
                : null
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SuggestionInput
            disabled={
              purchaseOrder &&
              purchaseOrder.PurchaseOrder &&
              purchaseOrder.PurchaseOrder.orderState === "COMPLETE"
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
              name: purchaseOrder && purchaseOrder.PurchaseOrder ? purchaseOrder.PurchaseOrder.currecny : null,
              value: purchaseOrder
                ? purchaseOrder.PurchaseOrder.currencyId
                : null,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectList
            disabled={
              purchaseOrder &&
              purchaseOrder.PurchaseOrder &&
              purchaseOrder.PurchaseOrder.orderState === "COMPLETE"
                ? true
                : false
            }
            fullWidth
            label="Arrived"
            // selectedOption = { purchaseOrder && parseInt(purchaseOrder.PurchaseOrder.arrived)}
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
              purchaseOrder.PurchaseOrder &&
              purchaseOrder.PurchaseOrder.orderState === "COMPLETE"
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
        purchaseOrder.Lines &&
        purchaseOrder.Lines.length
          ? parseInt(
              purchaseOrder.Lines.reduce((a, b) => ({
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
        ? purchaseOrder.Lines.map((line, index) => {
            return (
              <Grid container spacing={3} key={index}>
                <Grid item></Grid>
                <Grid item>
                  <TextInput
                    disabled={
                      purchaseOrder.PurchaseOrder.orderState === "COMPLETE"
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
                      purchaseOrder.PurchaseOrder.orderState === "COMPLETE"
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
                      purchaseOrder.PurchaseOrder.orderState === "COMPLETE"
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
                      purchaseOrder.PurchaseOrder.orderState === "COMPLETE"
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
                      purchaseOrder.PurchaseOrder.orderState === "COMPLETE"
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
