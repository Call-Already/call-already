import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const NICKNAME_STATE_KEY = "nickname";

export const TIMEZONE_STATE_KEY = "myTimezone";

export const SELECTED_DAYS_KEY = "mySelectedDays";

export const SELECTED_TIMES_KEY = "mySelectedTimes";

export const GROUP_CODE_STATE_KEY = "myGroupCode";

export const IS_CREATING_GROUP_KEY = "isCreatingGroup";

export const EXISTING_USERS_KEY = "existingUsers";

export const EXPECTED_NUM_USERS_KEY = "expectedNumUsers";

export const nicknameState = atom({
  key: NICKNAME_STATE_KEY,
  default: "",
  effects: [persistAtom],
});

export const timezoneState = atom({
  key: TIMEZONE_STATE_KEY,
  default: "",
  effects: [persistAtom],
});

export const selectedDaysState = atom({
  key: SELECTED_DAYS_KEY,
  default: [],
  effects: [persistAtom],
});

export const selectedTimesState = atom({
  key: SELECTED_TIMES_KEY,
  default: [],
  effects: [persistAtom],
});

export const groupCodeState = atom({
  key: GROUP_CODE_STATE_KEY,
  default: "",
  effects: [persistAtom],
});

export const isCreatingGroupState = atom({
  key: IS_CREATING_GROUP_KEY,
  default: false,
  effects: [persistAtom],
});

export const existingUsersState = atom({
  key: EXISTING_USERS_KEY,
  default: [],
  effects: [persistAtom],
});

export const expectedNumUsersState = atom({
  key: EXPECTED_NUM_USERS_KEY,
  default: 0,
  effects: [persistAtom],
});
