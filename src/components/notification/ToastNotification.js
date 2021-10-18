import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { hideNotification } from '../../store/notification';

const App = (props) => {
  const { show, message, type } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    dispatch(hideNotification());
  };
  const notifySuccess = (message) =>
    toast.success(message, {
      onClose: handleClose()
    });
  const notifyError = (message) =>
    toast.error(message, {
      onClose: handleClose()
    });

  useEffect(() => {
    if (show && type == 'success') {
      notifySuccess(message);
    }
    if (show && type == 'error') {
      notifyError(message);
    }
  }, [show, message]);

  return (
    <div>
      <Toaster />
    </div>
  );
};
export default App;
