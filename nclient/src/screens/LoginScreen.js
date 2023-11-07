import React from "react";
import "react-native-gesture-handler";
import { View, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, getMe } from "../services/userService";
import { useStoreContext } from "../store/Store";

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const LoginScreen = ({ navigation }) => {
  const [storeState, setStoreState] = useStoreContext();

  const signIn = async () => {
    try {
      const data = await login("1", "z");
      const auth = data?.authorization;
      if (auth) {
        await AsyncStorage.setItem("token", auth);
        setStoreState({
          ...storeState,
          user: data,
          isLoggedIn: true,
        });
      }
    } catch (error) {
      console.log(error);
      console.error("Error while signing in:", error);
    }
  };

  return (
    <View style={style.container}>
      <Button mode="contained" onPress={signIn} title="Login" />
      <Button
        mode="contained"
        onPress={async () => await AsyncStorage.clear()}
        title="Clear Storage"
      />
      <Button
        mode="contained"
        onPress={() => {
          AsyncStorage.getItem("token").then((token) => {
            if (token) {
              getMe(token).then((myData) => {
                if (!myData) {
                  console.log("Token expired, logging in again");
                } else {
                  console.log("My data: ", myData);
                }
              });
            } else {
              console.log("No token");
            }
          });
        }}
        title="Get me"
      />
    </View>
  );
};

export default LoginScreen;
