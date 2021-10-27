import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});




export default function UserList(props) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {props.options.data.length && props.options.tableHead.length
              ? props.options.tableHead.map((head) => {
                  return <TableCell>{head}</TableCell>;
                })
              : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.options.data.data && props.options.data.data.length
            ? props.options.data.data.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Button
                        onClick={() => props.onUserSelectHandler(item)}
                        fullWidth
                        variant="outlined"
                        color="primary"
                      >
                        اضف  
                      </Button>
                    </TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.first_name}</TableCell>
                    <TableCell>{item.last_name}</TableCell>
                    <TableCell>{item.telephone}</TableCell>
                    <TableCell>{item.address_line}</TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
