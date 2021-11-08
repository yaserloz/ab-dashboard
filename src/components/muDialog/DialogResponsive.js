import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogResponsive(props) {
  return (
    <div>
      <Dialog
        fullScreen
        open={props.product ? true : false}
        onClose={props.onCloseDialogHandler}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`I should add how many items from the product number ${
            props.product ? props.product.id : null
          }? `}
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <Button onClick={props.onPresistProductToCurrentOrder} autoFocus>
            Add product to current selling order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
