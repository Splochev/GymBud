import axios from "axios";
import { API_URL } from "@env";

export const login = async (email, password) => {
  try {
    const res = await axios.post(API_URL + "/api/user/login", {
      email: email,
      password: password,
      isNative: true,
    });
    return res.data;
  } catch (err) {
    console.error("Login: ", err);
    return null;
  }
};

export const logout = async (authorizationToken) => {
  try {
    const res = await axios.post(
      API_URL + "/api/user/native/logout",
      {},
      {
        headers: {
          Authorization: authorizationToken,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Logout: ", err);
    return null;
  }
};

export const register = async (
  email,
  password,
  firstName,
  lastName,
  sex,
  secretUgbPassword,
  birthDate
) => {
  try {
    const res = await axios.post(API_URL + "/api/user/register", {
      email,
      password,
      firstName,
      lastName,
      sex,
      secretUgbPassword,
      birthDate,
    });
    return res.data;
  } catch (err) {
    console.error("Register: ", err);
    return null;
  }
};

export const verify = async (token) => {
  try {
    const res = await axios.put(API_URL + `/api/user/verify?token=${token}`);
    return res.data;
  } catch (err) {
    console.error("Verify: ", err);
    return null;
  }
};

export const forgottenPassword = async (email) => {
  try {
    const res = await axios.put(API_URL + "/forgotten-password", { email });
    return res.data;
  } catch (err) {
    console.error("Forgotten Password: ", err);
    return null;
  }
};

export const resetForgottenPassword = async (password, token) => {
  try {
    const res = await axios.put(API_URL + "/reset-forgotten-password", {
      password,
      token,
    });
    return res.data;
  } catch (err) {
    console.error("Reset Forgotten Password: ", err);
    return null;
  }
};

export const getMe = async (authorizationToken) => {
  try {
    const res = await axios.get(API_URL + "/api/user/native/me", {
      headers: {
        Authorization: authorizationToken,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Me: ", err);
    return null;
  }
};
