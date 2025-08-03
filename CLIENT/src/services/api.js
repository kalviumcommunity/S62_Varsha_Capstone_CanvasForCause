import axios from 'axios';

const API_URL = 'https://s62-varsha-capstone-canvasforcause.onrender.com/api';

const api = axios.create({
    baseURL:API_URL,
    withCredentials:true,
    headers:{
        'Content-Type':'application/json',
    }
})

api.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest = error.config;

        if(error.response?.status===401 && error.response?.data?.tokenExpired && !originalRequest._retry){
            originalRequest._retry=true;

            try{
                await axios.post(`${API_URL}/auth/refresh-token`, {}, {withCredentials:true});
                return api(originalRequest);
            }
            catch(refreshError){
                localStorage.removeItem('user');
                sessionStorage.removeItem('user');

                window.location.href= '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default api;

