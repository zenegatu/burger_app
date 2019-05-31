import axios from 'axios'
const fireAx = axios.create({
    baseURL: 'https://myburgerapp-39307.firebaseio.com/'

});

export default  fireAx