import axios from 'axios';

const instanse = axios.create({
    baseURL: 'https://hp-api.onrender.com/api',
});

export default instanse;
