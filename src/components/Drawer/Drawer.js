import React from 'react';
import Drawer from '@material-ui/core/Drawer';

export default function DrawerC(props) {
  const [closeDrawer, setcloseDrawer] = React.useState(false)
  const drawercloseHandler = () => {
    props.closeDrawer()
  }

  return (
    <div style={{width:"50%"}}>
        <React.Fragment key={'top'}>
          <Drawer  anchor={props.anchor ? props.anchor : 'top'} open={props.show } onClose={() => {}} >
           {React.cloneElement(props.children, { onDrawerCloseHandler: drawercloseHandler})}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
