import axios from 'axios';

export function LoadProfileService() {
    return axios.get('api/user')
        .then(response => {
            return response.data;
        }).catch(error => {
            return error.response
        });
}