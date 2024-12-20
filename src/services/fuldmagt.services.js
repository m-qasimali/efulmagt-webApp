import getAxiosInstance from "./axiosProvider";

export async function getFuldmagtsList(token){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get('/fuldmagt/getUserFuldmagts');
    return response;
}

export async function getSpecificFuldmagtRequest(token, fuldmagtRequestId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/fuldmagt/getSpecificFuldmagtRequest/${fuldmagtRequestId}`);
    return response;
}

export async function approveFuldmagtRequest(token, fuldmagtRequestId, formData){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/fuldmagt/approveFuldmagtRequest/${fuldmagtRequestId}`,formData);
    return response
}

export async function getSpecificFuldmagt(token, fuldmagtId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/fuldmagt/getSpecificFuldmagt/${fuldmagtId}`);
    return response;
}

export async function revokeFuldmagt(token, fuldmagtId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put(`/fuldmagt/revokeFuldmagt/${fuldmagtId}`);
    return response;
}

export async function issueAgainFuldmagt(token, fuldmagtId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put(`/fuldmagt/issueAgain/${fuldmagtId}`);
    return response;
}

export async function createFuldmagt(token, formData){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/fuldmagt/createFuldmagt`, formData);
    return response;
}

export async function requestFuldmagt(token, formData){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/fuldmagt/requestFuldmagt`, formData);
    return response;
}