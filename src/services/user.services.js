import getAxiosInstance from "./axiosProvider";

export async function updateUserInfo(token, userBody){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put('/user/updateInfo',{
        ...userBody
    });
    return response;
}

export async function getUsers({q}){
    let axiosInstance = getAxiosInstance();
    let response = await axiosInstance.get(`/user/users?q=${q}`);
    return response;
}


export async function updateUserSignature(token, formData){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put('/user/uploadSignature',
        formData
    )

    return response;
}

export async function updateProfileImage(token, formData){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put('/user/uploadProfileImage',
        formData
    )

    return response;
}

export async function getUser(id) {
    let axiosInstance = getAxiosInstance();
    let response = await axiosInstance.get(`/user/users/${id}`)
    
    return response;
}