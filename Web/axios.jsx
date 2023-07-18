import axios from "axios";
import { apiDomain } from "./src/Utils/Utils";

export const makeRequest = axios.create({
    baseURL: `${apiDomain}`,
    withCredentials: true,
})