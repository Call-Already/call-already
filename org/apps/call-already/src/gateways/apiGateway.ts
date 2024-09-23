import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NX_PUBLIC_API_URL,
  timeout: 8000,
});

export type ValidateGroupProps = {
  ID: string;
  Email: string;
};

export type ValidateGroupResponse = {
  UserNicknames: string[];
  Dates: string[];
  NumUsers: number;
  CallType: string;
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
  GroupName?: string;
  Email: string;
  NumUsers: number;
  ShowUsers: boolean;
  Dates: Array<string>;
  CallType: string;
};

export type RegisterProps = {
  Nickname: string;
  Email: string;
  Password: string;
};

export type VerifyEmailResponse = {
  User: {
    Email: string;
    Nickname: string;
    IsVerified: boolean;
  };
  Token: string;
};

export type VerifyEmailProps = {
  Email: string;
  UserID: string;
};

export type LoginResponse = {
  User: {
    Email: string;
    Nickname: string;
    IsVerified: boolean;
  };
  Token: string;
};

export type LoginProps = {
  Email: string;
  Password: string;
};

export type GetUserProps = {
  Email: string;
};

export type GetUserResponse = {
  Email: string;
  Nickname: string;
  IsVerified: boolean;
  GroupsCreated?: number;
  GroupsJoined?: number;
};

export async function validateGroup(props: ValidateGroupProps) {
  const serverResponse = await instance.get<ValidateGroupResponse>(
    `/validate-group?ID=${props.ID}`,
  );
  console.log("ValidateGroup", "[RESPONSE]", serverResponse);
  return serverResponse;
}

export async function postResponses(props: PostResponsesProps) {
  console.log("PostResponses", "[REQUEST]", props);
  const serverResponse = await instance.post("/post-responses", props);
  console.log("PostResponses", "[RESPONSE]", serverResponse);
  return serverResponse;
}

export async function createGroup(props: CreateGroupProps) {
  console.log("CreateGroup", "[REQUEST]", props);
  const serverResponse = await instance.post("/create-group", props);
  console.log("CreateGroup", "[RESPONSE]", serverResponse);
  return serverResponse;
}

export async function register(props: RegisterProps) {
  console.log("Register", "[REQUEST]", props);
  const serverResponse = await instance.post("/register", props);
  console.log("Register", "[RESPONSE]", serverResponse);
  return serverResponse;
}

export async function verifyEmail(props: VerifyEmailProps) {
  console.log("VerifyEmail", "[REQUEST]", props);
  const serverResponse = await instance.get(
    `/verify-email?Email=${props.Email}&UserID=${props.UserID}`,
  );
  console.log("VerifyEmail", "[RESPONSE]", serverResponse);
  return serverResponse;
}

export async function loginUser(props: LoginProps) {
  console.log("LoginUser", "[REQUEST]", props);
  const serverResponse = await instance.post<LoginResponse>(
    "/login-user",
    props,
  );
  console.log("LoginUser", "[RESPONSE]", serverResponse);
  return serverResponse;
}

export async function getUser(props: GetUserProps) {
  const serverResponse = await instance.get<GetUserResponse>(
    `/get-user?Email=${props.Email}`,
  );
  return serverResponse;
}
