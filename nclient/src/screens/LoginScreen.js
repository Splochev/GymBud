import React, { useEffect } from "react";
import { View, StyleSheet, ImageBackground, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../services/userService";
import { useStoreContext } from "../store/Store";
import { Divider } from "react-native-paper";
import Button from "../components/Button";
import Input from "../components/Input";

const dataValidators = {
  isRequired: (value) => {
    const errors = [];
    if (value.trim() === "") {
      errors.push("This field is required.");
    }
    return errors;
  },
  isEmail: (value) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      errors.push("Please enter a valid email address.");
    }

    return errors;
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 15,
    paddingBottom: 50,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  divider: {
    margin: 10,
    width: "90%",
    padding: 1,
  },
  signInButton: {
    width: "90%",
  },
  logo: {
    maxHeight: 300,
    resizeMode: "contain",
  },
});

const LoginScreen = ({ navigation }) => {
  const [storeState, setStoreState] = useStoreContext();
  const [email, setEmail] = React.useState("");
  const [emailIsCorrect, setEmailIsCorrect] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordIsCorrect, setPasswordIsCorrect] = React.useState(false);

  const signIn = async () => {
    try {
      const data = await login(email, password);
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
    <ImageBackground
      source={require("../../assets/indoorBike.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo-no-background-with-slogan.png")}
          style={styles.logo}
        />
        <Input
          label="Email"
          value={email}
          setValue={setEmail}
          leftIcon="email"
          validator={dataValidators.isEmail}
          setValidatorPassed={setEmailIsCorrect}
        />
        <Input
          label="Password"
          value={password}
          setValue={setPassword}
          isPassword={true}
          leftIcon="lock"
          validator={dataValidators.isRequired}
          setValidatorPassed={setPasswordIsCorrect}
        />
        <Button
          mode="contained"
          onPress={
            (emailIsCorrect || email === "1") && passwordIsCorrect && signIn
          }
          style={styles.signInButton}
        >
          Sign In
        </Button>
        <Button
          mode="text"
          onPress={() => console.log("Forgotten Password Page")}
        >
          Forgot Password?
        </Button>
        <Divider style={styles.divider} />
        <Button mode="contained" onPress={() => console.log("Register Page")}>
          Create New Account
        </Button>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
