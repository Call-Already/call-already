import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NX_PUBLIC_API_URL,
  timeout: 5000,
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log("Interceptor says: " + error);
  return Promise.reject(error);
});

export type ValidateGroupProps = {
  ID: string;
}

export type ValidateGroupResponse = {
  UserNicknames: string[];
  Dates: string[],
  NumUsers: number;
};

export type PostResponsesProps = {
  ID: string;
  Nickname: string;
  Email: string;
  Timezone: string;
  SelectedTimes: string[];
  IsGroupCreator: boolean;
};

export type CreateGroupProps = {
  ID: string;
  NumUsers: number;
  ShowUsers: boolean;
  CallDates: Array<string>;
};

export async function validateGroup(props: ValidateGroupProps) {
  const response = await instance.get<ValidateGroupResponse>(`/validate-group?ID=${props.ID}`);
  return response;
}

export async function postResponses(props: PostResponsesProps) {
  const serverResponse = await instance.post("/post-responses", props);
  return serverResponse;
}

export async function createGroup(props: CreateGroupProps) {
  const serverResponse = await instance.post("/create-group", props);
  return serverResponse;
}
