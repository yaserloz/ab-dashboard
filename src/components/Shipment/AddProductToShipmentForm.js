import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from "axios";
import env from "../../env";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import ProductByShipmentList from "./ProductByShipmentList";

const SignupSchema = Yup.object().shape({
  codeBarOrProductId: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter a value "),
  value: Yup.number().required(
    "Please select if you want to search by product id and codebar"
  ),
});

const AddProductToShipmentForm = (props) => {
  const {
    values,
    handleSubmit,
    submitCount,
    handleChange,
    getFieldProps,
    setValues,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      value: "",
      codeBarOrProductId: "",
    },
    validationSchema: SignupSchema,

    async onSubmit(values) {
      let query = "?selling-point=" + props.sellingPoint;
      if (values.value == 1) {
        query = query + "&code-bar=" + values.codeBarOrProductId;
      }
      if (values.value == 2) {
        query = query + "&product-id=" + values.codeBarOrProductId;
      }
      axios
        .get(`${env()}product-stock/availability${query}`)
        .then((response) => {
          setStockinfoForProduct(response.data);
        });
    },
  });

  const [stockinfoForProduct, setStockinfoForProduct] = React.useState([]);
  const [stockToAddToShipment, setStockToAddToShipment] = React.useState([]);

  const handleCheckboxChange = (object) => (Event) => {
    const stockinfoForProductCopy = [...stockinfoForProduct];
    stockinfoForProductCopy[object.index].checked = !stockinfoForProductCopy[
      object.index
    ].checked;
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

  const addProductToShipmentHandler = () => {
    let answer;
    answer = window.confirm(
      "Are you sure you want to add products to shipment?"
    );
    if (!answer) {
      return;
    }
    const stockToAddToShipmentCopy = [...stockToAddToShipment];
    axios
      .post(
        env() + "shipments/" + props.shipment + "/stock/add",
        stockToAddToShipmentCopy
      )
      .then((response) => {
        setStockToAddToShipment([]);
        handleSubmit();
        props.onFormDataChange();
      }).catch(error => {
        alert(error.response.data.Explination)
      })
  };

  return (
    <div style={{ margin: "2em", minWidth: "800px" }}>
      <Button onClick={props.onFormClose}>x</Button>
      <h1>Shipment info Form</h1>
      <form onSubmit={handleSubmit} noValidate>
        <br />
        <br />
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="value"
            defaultValue="top"
            onChange={handleChange}
            error={touched["value"] && errors["value"]}
          >
            <FormControlLabel
              value="1"
              control={<Radio color="primary" />}
              label="CodeBar"
            />
            <FormControlLabel
              value="2"
              control={<Radio color="primary" />}
              label="Product Id"
            />
          </RadioGroup>
          <FormHelperText>{touched.value && errors.value}</FormHelperText>
        </FormControl>
        <br />
        <br />
        <TextField
          id="codeBarOrProductId"
          name="codeBarOrProductId"
          label="codeBarOrProductId"
          variant="outlined"
          value={values.codeBarOrProductId}
          onChange={handleChange}
          error={touched["codeBarOrProductId"] && errors["codeBarOrProductId"]}
          helperText={
            touched["codeBarOrProductId"] && errors["codeBarOrProductId"]
          }
        />
        <br /> <br />
        <Button variant="contained" color="primary" type="submit">
          Search this product
        </Button>
      </form>
      <br />
      <hr />

      {stockinfoForProduct &&
        !!stockinfoForProduct.length &&
        stockToAddToShipment &&
        !!stockToAddToShipment.length && (
          <div>
            Product to add to shipment: {stockToAddToShipment.length}
            <Button onClick={addProductToShipmentHandler}>
              Add product to shipment
            </Button>
          </div>
        )}

      {
        //Show product stock info in shippment
        stockinfoForProduct && !!stockinfoForProduct.length && (
          <ProductByShipmentList
            onProductCheck={handleCheckboxChange}
            stockInfo={stockinfoForProduct}
          />
        )
      }
    </div>
  );
};
export default AddProductToShipmentForm;
