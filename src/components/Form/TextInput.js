import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function TextInput(props) {
    return (
        <TextField {...props} id="outlined-basic"  label={props.label} variant="outlined" />
    )
}
