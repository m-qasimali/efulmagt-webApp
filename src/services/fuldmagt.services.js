import getAxiosInstance from "./axiosProvider";

export async function getFuldmagtsList(token) {
  let axiosInstance = getAxiosInstance(token);
  let response = await axiosInstance.get("/user/fuldmagts");
  return response;
}

export async function getSpecificFuldmagtRequest(token, fuldmagtRequestId) {
  let axiosInstance = getAxiosInstance(token);
  let response = await axiosInstance.get(
    `/user/fuldmagts/${fuldmagtRequestId}`
  );
  return response;
}

export async function approveFuldmagtRequest(
  token,
  fuldmagtRequestId,
  formData
) {
  let axiosInstance = getAxiosInstance(token);
  let response = await axiosInstance.post(
    `/user/fuldmagt-requests/${fuldmagtRequestId}/approve`,
    formData
  );
  return response;
}

export async function getSpecificFuldmagt(token, fuldmagtId) {
  let axiosInstance = getAxiosInstance(token);
  let response = await axiosInstance.get(
    `/user/fuldmagt-requests/${fuldmagtId}`
  );
  return response;
}

export async function revokeFuldmagt(token, fuldmagtId) {
  let axiosInstance = getAxiosInstance(token);
  let response = await axiosInstance.put(
    `/user/fuldmagts/${fuldmagtId}/revoke`
  );
  return response;
}

export async function issueAgainFuldmagt(token, fuldmagtId) {
  let axiosInstance = getAxiosInstance(token);
  let response = await axiosInstance.put(`/user/fuldmagts/${fuldmagtId}/reissue`);
  return response;
}

export async function createFuldmagt(token, formData) {
  let axiosInstance = getAxiosInstance(token);
  let response = await axiosInstance.post(`/user/fuldmagts/`, formData);
  return response;
}

export async function requestFuldmagt(token, formData) {
  let axiosInstance = getAxiosInstance(token);
  let response = await axiosInstance.post(
    `/user/fuldmagt-requests/`,
    formData
  );
  return response;
}

export async function getFuldmagt(token) {
  let axiosInstance = getAxiosInstance(token);
  let response = await axiosInstance.get(`/user/fuldmagt-forms`);
  return response;
}

export async function getUploadUrl(token) {
  let axiosInstance = getAxiosInstance(token);
  let response = await axiosInstance.post("/general/get-presigned-url", {
    fileName: "test4",
    fileExtension: "jpg",
  });
  return response;
}

export async function rejectFuldmagt(token, id) {
  let axiosInstance = getAxiosInstance(token);
  let response = await axiosInstance.delete(`/user/fuldmagt-requests/${id}/reject`);
  return response
}

export async function getFuldmagtSpecified(token, id) {
  let axiosInstance = getAxiosInstance(token);
  let response = await axiosInstance.get(`/user/fuldmagt-forms/${id}`);
  return response
}

export async function acknowlegeFuldmagtRequest(token, id, signature) {
  let axiosInstance = getAxiosInstance(token)
  let response = await axiosInstance.put(`/user/fuldmagts/${id}/acknowledge`, {
    agentSignature: signature
  });
  return response
}