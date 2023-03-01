import axios from 'axios';

const configBase = {
    baseURL: process.env.REACT_APP_BASE_URL
};

const ApiForm = axios.create(configBase);

export { ApiForm };