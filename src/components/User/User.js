import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Tabs from '../Tabs/Tabs';
import SearchUserForm from '../User/SearchUserForm';
import AddUserForm from '../User/AddUserForm';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root': {
      width: '50%'
    }
  }
}));

export default function CustomizedDialogs(props) {
  const classes = useStyles();
  const [showSearchClientForm, setShowSearchClientForm] = React.useState(false);
  const [showAddClientForm, setShowAddClientForm] = React.useState(false);

  const handleClose = () => {
    props.onCloseHandler(false);
  };

  const onSearchClientHandler = () => {
    setShowSearchClientForm(true);
    setShowAddClientForm(false);
  };
  const onAddClientHandler = () => {
    setShowSearchClientForm(false);
    setShowAddClientForm(true);
  };

  return (
    <div className={classes.root}>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
        fullWidth
        style={{
          width: 'none'
        }}
      >
        <MuiDialogTitle disableTypography>
          <Typography variant="h6">ابحث او اضف زبون</Typography>
        </MuiDialogTitle>

        <Typography gutterBottom>
          <div style={{ justifyContent: 'space-between', display: 'flex' }}>
            <Tabs
              options={[
                {
                  title: 'اضف زبون',
                  content: <AddUserForm />
                },
                {
                  title: 'ابحث عن زبون',
                  content: <SearchUserForm {...props} />
                }
              ]}
            />
          </div>
        </Typography>
      </Dialog>
    </div>
  );
}
