import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const NICKNAME_STATE_KEY = "nickname";

export const nicknameState = atom({
  key: NICKNAME_STATE_KEY,
  default: "",
  effects: [persistAtom],
});
