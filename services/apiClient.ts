import axios from "axios";

let AUTH_TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : ''

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

let token = AUTH_TOKEN ? `Bearer ${AUTH_TOKEN}` : ''



// Alter defaults after instance has been created
api.defaults.headers.common = { 'Authorization': token }
// api.defaults.headers.common['Authorization'] = AUTH_TOKEN;
api.defaults.headers.common['Content-type'] = "application/json";
api.defaults.timeout = 2500; // most apis should not require more than 2.5 seconds. Even this is too much.



// using interceptors for debugging while in debug mode
// Add a request interceptor
if (process.env.NEXT_PUBLIC_ENVIRONMENT == 'development') {

    api.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    api.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
}


export default api;
