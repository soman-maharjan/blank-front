import axios from 'axios';

const LoadProfile = () => {
    axios.get('api/user')
        .then(response => response)
        .catch(error => error)
}