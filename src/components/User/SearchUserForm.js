import React from "react";
import TextInput from "../Form/TextInput";
import Button from "@material-ui/core/Button";
import api from "../api/api";
import UserList from "./UserList";
const SearchUserForm = (props) => {
  const searchByfirstNameRef = React.createRef(); 
  const searchBylastNameRef = React.createRef(); 

  const searchByTelephoneRef = React.createRef();
  const searchByAdressRef = React.createRef();
  const [searchButtonDisabled, setSearchButtonDisabled] = React.useState(true);
  const [clients, setClients] = React.useState([]);

  const onSearchHandler = () => {
    api
      .searchUser({
        firstname: searchByfirstNameRef.current.value 
          ? searchByfirstNameRef.current.value
          : null,
        lastname: searchBylastNameRef.current.value
          ? searchBylastNameRef.current.value
          : null,
        telephone: searchByTelephoneRef.current.value
          ? searchByTelephoneRef.current.value
          : null,
        address: searchByAdressRef.current.value
          ? searchByAdressRef.current.value
          : null,
      })
      .then((response) => {
        const clients = response.data;
        setClients(clients);
      })
      .catch((error) => {
        alert("Error api");
      });
  };

  const handleChange = () => {
    if (searchByAdressRef.current.value) {
      setSearchButtonDisabled(false);
      return;
    }

    if (searchByTelephoneRef.current.value) {
      setSearchButtonDisabled(false);
      return;
    }

    if (searchByfirstNameRef.current.value) {
      setSearchButtonDisabled(false);
      return;
    }

    if (searchBylastNameRef.current.value) {
      setSearchButtonDisabled(false);
      return;
    }

    setSearchButtonDisabled(true);
  };

  return (
    <div>
      <TextInput
        inputRef={searchByfirstNameRef}
        placeholder=" ابحث عن طريق الاسم الاول"
        fullWidth
        onChange={handleChange}
      />
      <br />
      <br />
      <TextInput
        inputRef={searchBylastNameRef}
        placeholder=" ابحث عن طريق الاسم الثاني"
        fullWidth
        onChange={handleChange}
      />
      <br />
      <br />
      <TextInput
        inputRef={searchByTelephoneRef}
        placeholder="ابحث عن طريق رقم التلفون"
        fullWidth
        onChange={handleChange}
      />
      <br />
      <br />
      <TextInput
        inputRef={searchByAdressRef}
        placeholder="ابحث عن طريق العنوان"
        fullWidth
        onChange={handleChange}
      />
      <br />
      <br />
      <Button
        disabled={searchButtonDisabled}
        onClick={onSearchHandler}
        fullWidth
        variant="outlined"
        color="primary"
      >
        ابحث
      </Button>
      <UserList
        {... props}
        options={{
          tableHead: [
            "اكشن",
            "التسلسل",
            "الاسم الاول",
            "الاسم الثاني",
            "رقم التلفون",
            "العنوان",
        ],
        data:clients 
        }}
      />
    </div>
  );
};

export default SearchUserForm;
