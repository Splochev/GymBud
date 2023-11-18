import React from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../services/userService";
import { useStoreContext } from "../store/Store";
import { Divider } from "react-native-paper";
import Button from "../components/Button";
import Input from "../components/Input";
import PropTypes from "prop-types";
import LoggedOutPageLayout from "../components/LoggedOutPageLayout";
import { dataValidators } from "../Utils/dataValidators";

const styles = StyleSheet.create({
  divider: {
    margin: 10,
    width: "90%",
    padding: 1,
  },
  signInButton: {
    width: "90%",
  },
  marginTop: {
    marginTop: 20,
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
    <LoggedOutPageLayout>
      <Input
        label="Email"
        value={email}
        setValue={setEmail}
        leftIcon="email"
        validator={dataValidators.isEmail}
        setValidatorPassed={setEmailIsCorrect}
      />
      <View style={styles.marginTop} />
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
        style={[styles.signInButton, styles.marginTop]}
      >
        Sign In
      </Button>
      <Button mode="text" onPress={() => navigation.navigate("ForgotPassword")}>
        Forgot Password?
      </Button>
      <Divider style={styles.divider} />
      <Button mode="contained" onPress={() =>navigation.navigate("Register")}>
        Create New Account
      </Button>
    </LoggedOutPageLayout>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.object,
};

export default LoginScreen;
