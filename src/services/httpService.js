import axios from "axios";
import { getCookieObject } from "../utility/loginUtils";

const httpService = (
  serviceUrl,
  type = "get",
  data,
  service = "user",
  multipart = false,
  additionalHeaders = {},
  stream = false,
  additionalConfig = {}
) => {
  let BASE_URL = "https://page-market.vercel.app/api"; //provide url
  // let BASE_URL = "http://localhost:3000/api";
  const config = {
    headers: {
      "Access-Control-Allow-Orgin": "*",
      "Content-Type": "application/json",
    },
    ...additionalConfig,
  };
  if (additionalHeaders) {
    config.headers = { ...config.headers, ...additionalHeaders };
  }

  if (multipart) config.headers["Content-Type"] = "multipart/form-data";
  if (stream) config["responseType"] = "blob";

  let url = "";
  if (serviceUrl) {
    url = `${BASE_URL}/${service}/${serviceUrl}`;
  } else {
    url = `${BASE_URL}/${service}`;
  }

  const { jwtToken } = getCookieObject();
  if (jwtToken && !url.includes("/user/login") && !url.includes("/user/add")) {
    config.headers.Authorization = jwtToken;
  }

  switch (type) {
    case "get": {
      const promise = axios.get(url, config);
      return promise;
    }
    case "post":
    case "put":
    case "patch":
      return axios[type](url, data, config);
    case "delete":
      return axios.delete(url, config);
    default: {
      break;
    }
  }
  return null;
};

export default httpService;
