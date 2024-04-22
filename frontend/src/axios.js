import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.request.use(config => {
    config.timeout = 15000;
    return config
})

export default instance;
