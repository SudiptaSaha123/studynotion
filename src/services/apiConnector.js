import axios from "axios";

export const axioxInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axioxInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
