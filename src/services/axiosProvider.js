import axios from "axios";
const { SERVER_HOST } = import.meta.env;

function getAxiosInstance(token){
    const instance = axios.create({
        baseURL: "https://backend.e-fuldmagt.dk/",
        // withCredentials: true,
        // credentials: 'include'
      });
      //console.log(SERVER_HOST);
    
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    
    return instance;
}


export default getAxiosInstance;