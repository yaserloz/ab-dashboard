import axios from "axios";
import env from '../../env'

const api = {
  searchUser: (filter) => {

    let url = env() + "clients?"
    if(filter.firstname)
    {
        url = `${url}firstname=${filter.firstname}`
    }

    if(filter.lastname)
    {
        url = `${url}&lastname=${filter.lastname}`
    }

    if(filter.telephone)
    {
        url = `${url}&telephone=${filter.telephone}`
    }

    if(filter.address)
    {
        url = `${url}&address=${filter.address}`
    }

    return axios.get(url);
  },
  addSellingOrder : () => {
    return axios.post(env() + "selling-orders")
  }
};

export default api;
