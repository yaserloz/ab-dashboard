/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';




function SuggestionInput({selectedOptions , options, label, disabled}) {

  const [value, setValue] = React.useState(selectedOptions);
  
  const [inputValue, setInputValue] = React.useState('');


  React.useEffect( () => {
    setValue(selectedOptions);
  }, [selectedOptions]);


  return (
    <div>

      <Autocomplete
        disabled={disabled ? true:false}
        
        fullWidth 
      
        getOptionLabel={(options) => options.name }


        value={value}
        
        getOptionSelected={(option, value) => {
          return option.name === value.name
        }}

        onChange={(event, newValue) => {
          setValue(newValue);
        }}

        inputValue={inputValue}


        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}

        options = {options && options.length ? options : [] }

        id="controllable-states-demo"


        renderInput={(params) => <TextField fullWidth {...params} label={label} variant="outlined" />}

      />
    </div>
  );
}


export default SuggestionInput;
