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
  PhoneNumber: string;
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
  return serverResponse;
}

export async function postResponses(props: PostResponsesProps) {
  const serverResponse = await instance.post("/post-responses", props);
  return serverResponse;
}

export async function createGroup(props: CreateGroupProps) {
  const serverResponse = await instance.post("/create-group", props);
  return serverResponse;
}

export async function register(props: RegisterProps) {
  const serverResponse = await instance.post("/register", props);
  return serverResponse;
}

export async function verifyEmail(props: VerifyEmailProps) {
  const serverResponse = await instance.get(
    `/verify-email?Email=${props.Email}&UserID=${props.UserID}`,
  );
  return serverResponse;
}

export async function loginUser(props: LoginProps) {
  const serverResponse = await instance.post<LoginResponse>(
    "/login-user",
    props,
  );
  return serverResponse;
}

export async function getUser(props: GetUserProps) {
  const serverResponse = await instance.get<GetUserResponse>(
    `/get-user?Email=${props.Email}`,
  );
  return serverResponse;
}
