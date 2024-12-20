import getAxiosInstance from './axiosProvider';

export async function getUserNotifications(token){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get('/user/notifications');
    return response;
}

export async function addNotifcationId(token, {notificationId}){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put('/user/add-notifications-token/', {notificationId});
    return response;
}

export async function getNotificationSettings(token){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get('/user/notificationSettings');
    return response;
}

export async function setActivityNotification(token, {email, pushNotification}){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put('/user/setActivityNotification',  {email, pushNotification});
    return response;
}