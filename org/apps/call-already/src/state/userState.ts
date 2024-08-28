import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const NICKNAME_STATE_KEY = "nickname";

export const TIMEZONE_STATE_KEY = "myTimezone";

export const SELECTED_TIMES_KEY = "mySelectedTimes";

export const GROUP_CODE_STATE_KEY = "myGroupCode";

export const IS_CREATING_GROUP_KEY = "isCreatingGroup";

export const DATE_1_KEY = "date1Key";

export const DATE_2_KEY = "date2Key";

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

export const date1State = atom({
  key: DATE_1_KEY,
  default: new Date(),
  effects: [persistAtom],
});

export const date2State = atom({
  key: DATE_2_KEY,
  default: new Date(),
  effects: [persistAtom],
});
