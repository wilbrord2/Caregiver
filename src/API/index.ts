import axios from "axios";

const consumeAPI = (token?: string) => {
  const accessToken: string = token
    ? token
    : JSON.parse(localStorage.getItem("access_token") as string);
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export default consumeAPI;
