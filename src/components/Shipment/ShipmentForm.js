import React from "react";
import TextInput from "../Form/TextInput";
import axios from "axios";
import env from "../../env";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AddProductToShipmentForm from "./AddProductToShipmentForm";
import Drawer from "../Drawer/Drawer";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

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

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const ShipmentForm = (props) => {
  const classes = useStyles();
  const [shipment, setshipment] = React.useState([]);
  const [
    showAddProductToShipmentForm,
    setShowAddProductToShipmentForm,
  ] = React.useState(false);

  React.useEffect(() => {
    getshipmentDetails().then((response) => {
      setshipment(response.data);
    });
  }, [props.shipmentId]);

  const getshipmentDetails = () => {
    return axios.get(env() + "shipments/" + props.shipmentId);
  };

  const openAddProductToShippmentHandler = () => {
    setShowAddProductToShipmentForm(true);
  };

  const closeAddProductToShipmentForm = () => {
    getshipmentDetails().then((response) => {
      setshipment(response.data);
    });
    setShowAddProductToShipmentForm(false);
  };

  const formDataChange = () => {
    getshipmentDetails().then((response) => {
      setshipment(response.data);
    });
  };

  const shipmentRecivedHandler = () => {
    let answer;
    answer = window.confirm(
      "Are you sure you want to mark this shipment as recived ?"
    );

    if (!answer) {
      return;
    }
    axios
      .post(env() + "shipments/confirm/" + props.shipmentId)
      .then((response) => {
        getshipmentDetails().then((response) => {
          setshipment(response.data);
        });
      })
      .catch((error) => {
        alert(error.response.data.Explination);
      });
  };

  const shipShipmentHandler = () => {
    let answer;
    answer = window.confirm(
      "Are you sure you want to ship this shipment"
    );

    if (!answer) {
      return;
    }
    axios.post(env()+'shipments/ship/'+props.shipmentId).then(response=>{
      getshipmentDetails().then((response) => {
        setshipment(response.data);
      });
    }).catch(error=>{
      alert(error.response.data.Explination);
    })
  }

  console.log(shipment);
  return (
    <div style={{ padding: "3em" }}>
      <Drawer
        closeDrawer={closeAddProductToShipmentForm}
        show={showAddProductToShipmentForm}
        anchor="right"
      >
        <AddProductToShipmentForm
          sellingPoint={
            shipment &&
            shipment.shipment &&
            shipment.shipment.selling_point_from
          }
          onFormClose={closeAddProductToShipmentForm}
          onFormDataChange={formDataChange}
          shipment={props.shipmentId}
        />
      </Drawer>
      <Button onClick={props.onDrawerCloseHandler}>X</Button>
      <h1>SHIPMENT DETAIL : {props.shipmentId}</h1>
      <TextInput
        InputLabelProps={{ shrink: true }}
        fullWidth
        label="From"
        value={shipment && shipment.shipment && shipment.shipment.from_sp}
        placeholder="Codebar"
        // onChange={codeBarChangeHandler}
      />
      <br />
      <br />
      <TextInput
        InputLabelProps={{ shrink: true }}
        fullWidth
        label="To"
        value={shipment && shipment.shipment && shipment.shipment.to_sp}
        placeholder="Local code bar"
        // onChange={localCodeBarChangeHandler}
      />
      <br />
      <br />
      <TextInput
        InputLabelProps={{ shrink: true }}
        fullWidth
        label="Weight"
        value={shipment && shipment.shipment && shipment.shipment.weight}
        placeholder="Weight"
        // onChange={weightChangeHandler}
      />
      <br />
      <br />
      <br />
      <Button
        disabled={
          shipment && shipment.shipment && (shipment.shipment.shipment_state == 3 || shipment.shipment.shipment_state == 2)
        }
        onClick={openAddProductToShippmentHandler}
        variant="contained"
      >
        Add new product to this shipment
      </Button>

      <Button
        disabled={
          shipment && shipment.shipment && (shipment.shipment.shipment_state == 1 || shipment.shipment.shipment_state == 3)
        }
        onClick={shipmentRecivedHandler}
        variant="contained"
      >
        Recived
      </Button>

      <Button
        disabled={
          shipment && shipment.shipment && (shipment.shipment.shipment_state == 3 || shipment.shipment.shipment_state == 2)
        }
        onClick={shipShipmentHandler}
        variant="contained"
      >
        Ship
      </Button>
      <br />
      <br />
      {shipment.shipmentLines && !!shipment.shipmentLines.length && (
        <div>Product coint in shipment is: {shipment.shipmentLines.length}</div>
      )}
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="right">Product stock id</StyledTableCell>
              <StyledTableCell align="right">Shipment</StyledTableCell>
              <StyledTableCell align="right">action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipment.shipmentLines && shipment.shipmentLines
              ? shipment.shipmentLines.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.products_stock}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.shipment}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button onClick={() => props.onEditHandler(row.id)}>
                        Edit
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
    </div>
  );
};

export default ShipmentForm;
