'use client'

import { getCookie, setCookie } from "cookies-next/client";


export const getToken = () => {
  const tok = getCookie("authToken");
  return tok ? tok : null;
}


export const setToken = (tok) => {
  setCookie("authToken", tok);
}




export const toAuthHeaders = (headers) => {
  const tok = getCookie("authToken");

  if (tok) {
    headers["Authorization"] = `BEARER ${tok}`
    return headers;
  }

  return headers;
}



