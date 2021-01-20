import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: "1000",
  },
}));

export default function AddButtonCircle(props) {
  const classes = useStyles();
  return (
    <Zoom  onClick={props.onClick} key="primary" in={1} unmountOnExit>
      <Fab disabled={props.loading  ? true : false} aria-label="Add" className={classes.fab} color="primary">
        {props.loading ? <CircularProgress color="secondary" /> : <AddIcon />}
      </Fab>
    </Zoom>
  );
}
