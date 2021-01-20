import React, { useEffect } from "react";
import {
  getPurchaseOrders,
  loadPurchaseOrders,
} from "../../store/PurchaseOrderReducer/PurchaseOrderReducer";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import env from "../../env";
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

const ProductsList = (props) => {
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    axios.get(env() + "products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="right">
                Code <bar></bar>
              </StyledTableCell>
              <StyledTableCell align="right">Local code bar</StyledTableCell>
              <StyledTableCell align="right">Weight</StyledTableCell>
              <StyledTableCell align="right">Volume</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              ? products.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.code_bar}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.local_code_bar}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.weight}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.volume}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      <Button
                        onClick={() =>
                          props.onEditHandler(row.id)
                        }
                      >
                        Edit
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductsList;
