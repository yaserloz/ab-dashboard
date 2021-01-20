import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectList(props) {
  const classes = useStyles();
  const [option, setOption] = React.useState();

  const handleChange = event => {
    setOption(event.target.value);
  };
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          // defaultValue ={props.selectedOption}

          value={option}
          onChange={handleChange}
          label={props.label}
        >
          {props.options &&
            props.options.map((option) => (
              <MenuItem value={option}>{option.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
