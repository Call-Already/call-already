import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NX_PUBLIC_API_URL,
  timeout: 5000,
});

export async function postResponses() {
  const serverResponse = await instance.post("/post-responses", {});
  return serverResponse;
}
