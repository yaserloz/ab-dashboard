import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiPaper-root": {
     width:'80%'
    }
  }
}));

export default function DrawerC(props) {
  const classes = useStyles();

  const [closeDrawer, setcloseDrawer] = React.useState(false)
  const drawercloseHandler = () => {
    props.closeDrawer()
  }

  return (
    <div>
        <React.Fragment  key={'top'}>
          <Drawer className={classes.root}   anchor={props.anchor ? props.anchor : 'right'} open={props.show } onClose={() => {}} >
            {React.cloneElement(props.children, { onDrawerCloseHandler: drawercloseHandler})}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
