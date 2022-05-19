import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    getCurrent,
    logout
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/chat/authenticate`, requestOptions)
        .then(handleResponse)
        .then(res => {
            localStorage.setItem('token', res.token);
            return true;
        },error => {
            this.error = error;
            this.loading = false;
        }
    );
}

function getCurrent() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/chat/current`, requestOptions).then(handleResponse);
}

function logout() {
    localStorage.removeItem('token');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}