import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function DialogResponsive(props) { 
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.product ? true : false}
        onClose={props.onCloseDialogHandler}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`I should add how many items from the product number ${props.product ? props.product.id : null  }? `}
        </DialogTitle>
        <DialogContent>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onPresistProductToBacket} autoFocus>
            Save!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
