import React from "react";
import { StyleSheet } from "react-native";
import { forgottenPassword } from "../services/userService";
import Button from "../components/Button";
import Input from "../components/Input";
import { Text } from "react-native-paper";
import PropTypes from "prop-types";
import LoggedOutPageLayout from "../components/LoggedOutPageLayout";
import { Divider } from "react-native-paper";
import { useStoreContext } from "../store/Store";
import { dataValidators } from "../Utils/dataValidators";

const styles = StyleSheet.create({
  sendResetInstructionsBtn: {
    width: "60%",
    marginTop: 8,
  },
  divider: {
    margin: 10,
    width: "90%",
    padding: 1,
  },
  text: {
    width: "90%",
    textAlign: "left",
  },
  returnToLoginPageBtn: {
    marginBottom: 8,
  },
});

const ForgotPassword = ({ navigation }) => {
  const [store, setStore] = useStoreContext();
  const [email, setEmail] = React.useState("");
  const [emailIsCorrect, setEmailIsCorrect] = React.useState(false);

  const resetPassword = async () => {
    try {
      await forgottenPassword(email);
      setStore({
        ...store,
        email: email,
      });
      setEmail("");
      navigation.navigate("ConfirmForgotPasswordCode");
    } catch (error) {
      console.error("Error while signing in:", error);
    }
  };

  return (
    <LoggedOutPageLayout>
      <Text style={styles.text} variant="headlineMedium">
        Reset Password
      </Text>
      <Text style={styles.text} variant="titleSmall">
        Please provide your email to reset your password.
      </Text>
      <Divider style={styles.divider} />
      <Input
        label="Email"
        value={email}
        setValue={setEmail}
        leftIcon="email"
        validator={dataValidators.isEmail}
        setValidatorPassed={setEmailIsCorrect}
      />
      <Button
        mode="contained"
        onPress={emailIsCorrect && resetPassword}
        style={styles.sendResetInstructionsBtn}
      >
        Send Reset Instructions
      </Button>
    </LoggedOutPageLayout>
  );
};

ForgotPassword.propTypes = {
  navigation: PropTypes.object,
};

export default ForgotPassword;
