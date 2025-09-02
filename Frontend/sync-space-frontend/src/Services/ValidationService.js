import {default as axios} from 'axios';
import { jwtDecode } from 'jwt-decode';

const loginAPI = process.env.REACT_APP_API_URL + 'user/login';
const registerAPI = process.env.REACT_APP_API_URL + 'user/register'

function RegisterRequest(){
    try {
        const payload = {
            
        }
    } catch (e) {

    }
}

async function LoginRequest(username,password) {
    try{
        const payload = {
            loginUsername: username,
            loginPassword: password
        };

        const response = await axios.post(loginAPI,payload);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

function DecodeToken(token){
    return jwtDecode(token);
}

export { RegisterRequest , LoginRequest, DecodeToken};