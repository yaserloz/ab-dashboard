import axios from "axios";
import env from "src/env";

export default axios.create({
    baseURL:env(),
    credentials:true
})