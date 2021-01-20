import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import SuggestionInput from "../Form/SuggestionInput";
import TextInput from "../Form/TextInput";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import env from '../../env'

export default function SellingOrderForm({ id }) {
  const [sellingOrder, setSellingOrder] = useState(null);

  useEffect(() => {
    axios
      .get(env()+"index.php?path=selling-orders/" + id)
      .then((response) => {
        setSellingOrder(response.data);
      });
  }, []);

  console.log(sellingOrder);
  return (
    <>
      <h2>Selling order number {id}</h2>
      <Grid style={{ padding: "1em" }} container spacing={3}>
        <Grid item xs={12} sm={6}>
          <SuggestionInput
            disabled={false}
            label={"Client"}
            // onOptionChange={onSuppliersChangeHandler}
            // options={suppliers && suppliers.length ? suppliers : null}
            // selectedOptions={
            //   purchaseOrder &&
            //   purchaseOrder.orderInfo[0] &&
            //   purchaseOrder.orderInfo &&
            //   suppliers &&
            //   suppliers.length
            //     ? suppliers.find(
            //         (supplier) =>
            //           purchaseOrder.orderInfo[0].company_name === supplier.name
            //       )
            //     : null
            // }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SuggestionInput
            disabled={false}
            label={"Selling point"}
            // onOptionChange={onSuppliersChangeHandler}
            // options={suppliers && suppliers.length ? suppliers : null}
            // selectedOptions={
            //   purchaseOrder &&
            //   purchaseOrder.orderInfo[0] &&
            //   purchaseOrder.orderInfo &&
            //   suppliers &&
            //   suppliers.length
            //     ? suppliers.find(
            //         (supplier) =>
            //           purchaseOrder.orderInfo[0].company_name === supplier.name
            //       )
            //     : null
            // }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SuggestionInput
            disabled={false}
            label={"Delivery method"}
            // onOptionChange={onSuppliersChangeHandler}
            // options={suppliers && suppliers.length ? suppliers : null}
            // selectedOptions={
            //   purchaseOrder &&
            //   purchaseOrder.orderInfo[0] &&
            //   purchaseOrder.orderInfo &&
            //   suppliers &&
            //   suppliers.length
            //     ? suppliers.find(
            //         (supplier) =>
            //           purchaseOrder.orderInfo[0].company_name === supplier.name
            //       )
            //     : null
            // }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SuggestionInput
            disabled={false}
            label={"Pickup point"}
            // onOptionChange={onSuppliersChangeHandler}
            // options={suppliers && suppliers.length ? suppliers : null}
            // selectedOptions={
            //   purchaseOrder &&
            //   purchaseOrder.orderInfo[0] &&
            //   purchaseOrder.orderInfo &&
            //   suppliers &&
            //   suppliers.length
            //     ? suppliers.find(
            //         (supplier) =>
            //           purchaseOrder.orderInfo[0].company_name === supplier.name
            //       )
            //     : null
            // }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SuggestionInput
            disabled={false}
            label={"Created by"}
            // onOptionChange={onSuppliersChangeHandler}
            // options={suppliers && suppliers.length ? suppliers : null}
            // selectedOptions={
            //   purchaseOrder &&
            //   purchaseOrder.orderInfo[0] &&
            //   purchaseOrder.orderInfo &&
            //   suppliers &&
            //   suppliers.length
            //     ? suppliers.find(
            //         (supplier) =>
            //           purchaseOrder.orderInfo[0].company_name === supplier.name
            //       )
            //     : null
            // }
          />
        </Grid>
      </Grid>
      <hr />

      <Grid container spacing={3}>
        <Grid item>
          <Checkbox
            checked={false}
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            // onChange={onLineCheck(index)}
          />
        </Grid>
        <Grid item>
          <TextInput
            // disabled={
            //   purchaseOrder.orderInfo[0].statu === "COMPLETE"
            //     ? "disabled"
            //     : null
            // }
            // value={line.code_bar}
            fullWidth
            label="Code bar"
            // onBlur={searchCodeBarHandler(index)}
            // onChange={codeBarChangeHandler(index)}
          />
        </Grid>

        <Grid item>
          <TextInput
            // disabled={
            //   purchaseOrder.orderInfo[0].statu === "COMPLETE"
            //     ? "disabled"
            //     : null
            // }
            // value={line.product_id || " "}
            // fullWidth
            label="Product id"
            // InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item>
          <TextInput
            // disabled={
            //   purchaseOrder.orderInfo[0].statu === "COMPLETE"
            //     ? "disabled"
            //     : null
            // }
            // value={line.product_count}
            // fullWidth
            label="Product count"
            // onBlur={calculateLineTotalPrice(index)}
            // onChange={productCountChangeHandler(index)}
          />
        </Grid>

        <Grid item>
          <TextInput
            // disabled={
            //   purchaseOrder.orderInfo[0].statu === "COMPLETE"
            //     ? "disabled"
            //     : null
            // }
            // value={line.unit_price || " "}
            // fullWidth
            label="Price unite"
            // onBlur={calculateLineTotalPrice(index)}
            // onChange={productPriceChangeHandler(index)}
          />
        </Grid>

        <Grid item>
          <TextInput
            // disabled={
            //   purchaseOrder.orderInfo[0].statu === "COMPLETE"
            //     ? "disabled"
            //     : null
            // }
            // value={line.total_price || " "}
            // fullWidth
            label="Price total"
            // InputLabelProps={{ shrink: true }}
            // disabled={true}
          />
        </Grid>
      </Grid>
    </>
  );
}
