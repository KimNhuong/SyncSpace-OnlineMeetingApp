import {default as axios} from 'axios';

const loginAPI = process.env.REACT_APP_API_URL + 'user/login';

function RegisterRequest(){
    
}

async function LoginRequest(username,password) {
    try{
        const payload = {
            loginUsername: username,
            loginPassword: password
        };

        const response = await axios.post(loginAPI,payload);
        console.log(response.data);
    } catch (e) {
        console.log(e);
    }
}

export { RegisterRequest , LoginRequest};