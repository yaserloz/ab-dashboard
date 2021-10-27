import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));


export default function TextInput(props) {
    return (
        <TextField {...props} id="outlined-basic"  label={props.label} variant="outlined" />
    )
}
