import { API_URL, DEFAULT_API_URL } from "@env";
import { Platform } from "react-native";

export const getHostUrl = () => {
  return isIOS() ? DEFAULT_API_URL : API_URL;
};

export const isIOS = () => {
  return Platform.OS === "ios";
};

export const getTodayMinus18Years = () => {
  let today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today;
};
