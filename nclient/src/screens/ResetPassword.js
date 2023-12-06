import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { Text } from "react-native-paper";
import PropTypes from "prop-types";
import LoggedOutPageLayout from "../components/LoggedOutPageLayout";
import { Divider } from "react-native-paper";
import { useStoreContext } from "../store/Store";
import { resetForgottenPassword } from "../services/userService";
import { dataValidators } from "../Utils/dataValidators";

const styles = StyleSheet.create({
  sendResetInstructionsBtn: {
    width: "60%",
    marginTop: 16,
  },
  divider: {
    margin: 8,
    width: "90%",
    padding: 1,
  },
  headLine: {
    marginBottom: 8,
  },
  text: {
    width: "90%",
    textAlign: "left",
  },
});

const ResetPassword = ({ navigation }) => {
  const [store] = useStoreContext();
  const [password, setPassword] = useState("");
  const [passwordIsCorrect, setPasswordIsCorrect] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordIsCorrect, setConfirmPasswordIsCorrect] =
    useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const resetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        setPasswordsMatch(false);
        throw new Error("Passwords do not match");
      }
      await resetForgottenPassword(password, store.code);
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error while signing in:", error);
    }
  };

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <LoggedOutPageLayout>
      <Text style={[styles.text, styles.headLine]} variant="headlineMedium">
        Reset Password
      </Text>
      <Divider style={styles.divider} />
      <Input
        label="Password"
        value={password}
        setValue={setPassword}
        isPassword={true}
        leftIcon="lock"
        validator={dataValidators.isRequired}
        setValidatorPassed={setPasswordIsCorrect}
      />
      <Input
        label="Confirm Password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        isPassword={true}
        leftIcon="lock"
        validator={dataValidators.isRequired}
        setValidatorPassed={setConfirmPasswordIsCorrect}
      />
      {!passwordsMatch && (
        <Text style={{ color: "red" }}>Passwords do not match</Text>  // TODO: use theme
      )}
      <Button
        mode="contained"
        onPress={
          passwordIsCorrect &&
          confirmPasswordIsCorrect &&
          passwordsMatch &&
          resetPassword
        }
        style={styles.sendResetInstructionsBtn}
      >
        Confirm
      </Button>
    </LoggedOutPageLayout>
  );
};

ResetPassword.propTypes = {
  navigation: PropTypes.object,
};

export default ResetPassword;
