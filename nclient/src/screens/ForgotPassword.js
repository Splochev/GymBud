import React from "react";
import { StyleSheet } from "react-native";
import { forgottenPassword } from "../services/userService";
import Button from "../components/Button";
import Input from "../components/Input";
import { Text } from "react-native-paper";
import PropTypes from "prop-types";
import LoggedOutPageLayout from "../components/LoggedOutPageLayout";
import { Divider } from "react-native-paper";

const styles = StyleSheet.create({
  sendResetInstructionsBtn: {
    width: "60%",
  },
  divider: {
    margin: 10,
    width: "90%",
    padding: 1,
  },
  headLine: {
    marginBottom: 10,
    marginTop: 90,
  },
  text: {
    width: "90%",
    textAlign: "left",
  },
  returnToLoginPageBtn: {
    marginBottom: 10,
  },
});

const dataValidators = {
  isEmail: (value) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      errors.push("Please enter a valid email address.");
    }

    return errors;
  },
};

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [emailIsCorrect, setEmailIsCorrect] = React.useState(false);

  const resetPassword = async () => {
    try {
      await forgottenPassword(email);
      //TODO: redirect to reset password page that uses a token
    } catch (error) {
      console.log(error);
      console.error("Error while signing in:", error);
    }
  };

  return (
    <LoggedOutPageLayout>
      <Text style={[styles.text, styles.headLine]} variant="headlineMedium">
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
        style={styles.returnToLoginPageBtn}
        mode="text"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Return to login page
      </Button>
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