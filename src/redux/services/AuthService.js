import axios from 'axios';

export function LoginUserService(credentials) {
    return axios.get('/sanctum/csrf-cookie')
        .then(response => {
            return axios.post('/login', {
                email: credentials.email,
                password: credentials.password
            })
                .then(response => {
                    console.log(response.data)
                    return response.data;
                })
                .catch(error => {
                    return { error: "Invalid Email or Password!" }
                });
        }).catch(error => console.log(error));
}

export const LogOutUserService = () => {
    return axios.post('/logout')
        .then(response => { return response.data })
        .catch(error => { return error })
}

export const RegisterUserService = (credentials) => {
    return axios.get('/sanctum/csrf-cookie')
        .then(response => {
            return axios.post('/register', credentials).then((response) => {
                return response.data;
            }).catch((error) => {
                return error.response.data;
            })
        }).catch(error => console.log(error.response));
}