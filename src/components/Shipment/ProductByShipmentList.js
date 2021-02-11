import React from 'react'
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";

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


const useStyles = makeStyles(() => ({
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


const ProductByShipmentList = props => {
    const classes = useStyles();

    return (
        <div>
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="right">Product</StyledTableCell>
              <StyledTableCell align="right">SELLING POINT</StyledTableCell>
              <StyledTableCell align="right">
                PRODUCT IN SHIPMENT
              </StyledTableCell>
              <StyledTableCell align="right">Shipment</StyledTableCell>
              <StyledTableCell align="right">Shipment status</StyledTableCell>

              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.stockInfo && props.stockInfo.length
              ? props.stockInfo.map((stock, index) => (
                  <StyledTableRow key={stock.ID}>
                    <StyledTableCell align="right">{stock.id}</StyledTableCell>
                    <StyledTableCell align="right">
                      {stock.product}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {stock.selling_point}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {stock.productStockFoundInShipment ? "Yes" : "no"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {stock.shipmentWhereTheProductStockIsFound
                        ? stock.shipmentWhereTheProductStockIsFound
                        : "No shipment"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {stock.statsOfTheShipmentWhereProductStockIsFound
                        ? stock.statsOfTheShipmentWhereProductStockIsFound
                        : "No shipment status"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {!stock.productStockFoundInShipment &&
                        !stock.productStockFoundInShipment &&
                        !stock.statsOfTheShipmentWhereProductStockIsFound && (
                          <Checkbox
                            defaultChecked
                            checked={stock.checked ? true : false}
                            onChange={props.onProductCheck({index, id:stock.id})}
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
    )
}

export default ProductByShipmentList
