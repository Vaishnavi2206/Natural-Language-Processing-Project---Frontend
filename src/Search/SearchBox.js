import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';

const initialOptions = [
  { label: "Find me companies that are attending Oil & Gas related events over the next 12 months", value: 1 },
  { label: "Find sales people for companies that are attending events in Singapore over the next 9 months.", value: 2 },
  { label: "Find me events that companies in Pharmaceuticals sector are attending", value: 3 },
  { label: "I need the email addresses of people working for companies that are attending finance and banking events", value: 4 },
//   { label: 'Five 5', value: 5 },
];

const SearchBox = ({sendSearchInput}) => {
  const [options, setOptions] = useState(initialOptions);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    event.preventDefault();
    const filteredOptions = initialOptions.filter(option =>
        option.label.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log("filteredOptions",filteredOptions)
    if(filteredOptions.length > 0 && filteredOptions[0].label === event.target.value){
      // console.log("event",event);
      // console.log("newInputValue",event.target.value);
  
      sendSearchInput(filteredOptions[0].label)
      setInputValue(filteredOptions[0].label);
      setOptions(filteredOptions);
    }
  };

  const handleDropdownSelection = (e)=>{
    console.log("event 1",e);
    e.preventDefault();
    sendSearchInput(e.target.innerText)
  }

  useEffect(()=>{
    setOptions(initialOptions);
  },[options])

  return (
  
    <Autocomplete 
    sx={{
        width:"80%",
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
      }}
      options={options}
      onChange={handleDropdownSelection}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
        value={inputValue}
          {...params}
          label="Select a query"
          placeholder='Enter you search query to start fetching data'
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          onChange={handleInputChange}
        />
      )}
    />
  );
};

export default SearchBox;
