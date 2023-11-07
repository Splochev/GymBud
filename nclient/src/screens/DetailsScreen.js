import React from "react";
import "react-native-gesture-handler";
import { View, StyleSheet, Button } from "react-native";
import { getMe, logout } from "../services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStoreContext } from "../store/Store";

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const DetailsScreen = () => {
  const [storeState, setStoreState] = useStoreContext();

  return (
    <View style={style.container}>
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
      <Button
        mode="contained"
        onPress={() => {
          AsyncStorage.getItem("token").then((token) => {
            if (token) {
              logout(token).then(async () => {
                setStoreState({
                  ...storeState,
                  user: undefined,
                  isLoggedIn: false,
                });
                await AsyncStorage.clear();
              });
            } else {
              console.log("No token");
            }
          });
        }}
        title="Logout"
      />
      <Button
        mode="contained"
        onPress={() =>
          AsyncStorage.getItem("token").then((token) => console.log(token))
        }
        title="Get Token"
      />
    </View>
  );
};

export default DetailsScreen;
