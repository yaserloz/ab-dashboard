import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { hideNotification } from '../../store/notification';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Munotification(props) {
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {

    dispatch(hideNotification());
  };
  

  const { show, message, type } = useSelector((state) => state.notifications);

  if(!show) {
    return null;
  }
  
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={show}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
