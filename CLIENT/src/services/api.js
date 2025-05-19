import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL:API_URL,
    withCredentials:true,
    headers:{
        'Content-Type':'application/json',
    }
})

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest = error.config;

        if(error.response?.status===401 && error.response?.data?.tokenExpired && !originalRequest._retry){
            originalRequest._retry=true;

            try{
                const refreshResponse = await axios.post(`${API_URL}/auth/refresh-token`, {}, {withCredentials:true});

                const{token, expiresIn} = refreshResponse.data;
                localStorage.setItem('token', token);
                const expiryTime = new Date(Date.now()+expiresIn*1000);
                localStorage.setItem('tokenExpiry', expiryTime.toISOString());

                sessionStorage.setItem('token', token);
                sessionStorage.setItem('tokenExpiry', expiryTime.toISOString());

                originalRequest.headers.Authorization=`Bearer ${token}`;
                return api(originalRequest);
            }
            catch(refreshError){
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiry');
                localStorage.removeItem('user');

                sessionStorage.removeItem('token');
                sessionStorage.removeItem('tokenExpiry');
                sessionStorage.removeItem('user');

                window.location.href= '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default api;

