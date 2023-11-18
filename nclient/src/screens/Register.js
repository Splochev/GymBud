import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Dimensions, View } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { Text } from "react-native-paper";
import PropTypes from "prop-types";
import LoggedOutPageLayout from "../components/LoggedOutPageLayout";
import { Divider } from "react-native-paper";
import { dataValidators } from "../Utils/dataValidators";
import RadioButton from "../components/RadioButton";
import { GENDERS, GENDERS_DICT } from "../Utils/constants";
import { DatePickerInput } from "react-native-paper-dates";
import { getTodayMinus18Years } from "../Utils/commonFunctions";
import { register } from "../services/userService";

const styles = StyleSheet.create({
  signUp: {
    width: "60%",
    marginBottom: 60,
  },
  divider: {
    margin: 10,
    width: "90%",
    padding: 1,
  },
  headLine: {
    marginBottom: 10,
  },
  text: {
    width: "90%",
    textAlign: "left",
  },
  returnToLoginPageBtn: {
    marginBottom: 10,
  },
  textContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  termsOfServiceAction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
  },
  datePickerInput: {
    width: "90%",
    marginTop: 12,
  },
});

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailIsCorrect, setEmailIsCorrect] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordIsCorrect, setPasswordIsCorrect] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordIsCorrect, setConfirmPasswordIsCorrect] =
    useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [secretUgbPassword, setSecretUgbPassword] = useState("");
  const [confirmSecretUgbPassword, setConfirmSecretUgbPassword] =
    useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameIsCorrect, setFirstNameIsCorrect] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameIsCorrect, setLastNameIsCorrect] = useState(false);
  const [sex, setSex] = useState(GENDERS[0]);
  const [birthDate, setBirthDate] = useState(getTodayMinus18Years());

  const signUp = async () => {
    try {
      await register(
        email,
        password,
        firstName,
        lastName,
        GENDERS_DICT[sex],
        secretUgbPassword,
        birthDate
      );
    } catch (error) {
      console.log(error);
      console.error("Error while signing in:", error);
    }
  };

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const screenWidth = Dimensions.get("window").width;
  return (
    <LoggedOutPageLayout>
      <Text style={[styles.text, styles.headLine]} variant="headlineMedium">
        Sign Up
      </Text>
      <Text style={styles.text} variant="titleSmall">
        It&apos;s quick and easy.
      </Text>
      <Divider style={styles.divider} />
      <ScrollView
        contentContainerStyle={{
          width: screenWidth,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={true}
      >
        <Input
          label="First Name"
          value={firstName}
          setValue={setFirstName}
          leftIcon="text-account"
          validator={dataValidators.isRequired}
          setValidatorPassed={setFirstNameIsCorrect}
        />
        <Input
          label="Last Name"
          value={lastName}
          setValue={setLastName}
          leftIcon="text-account"
          validator={dataValidators.isRequired}
          setValidatorPassed={setLastNameIsCorrect}
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
          label="Secret UGB Password"
          value={secretUgbPassword}
          setValue={setSecretUgbPassword}
          isPassword={true}
          leftIcon="lock"
          validator={dataValidators.isRequired}
          setValidatorPassed={setConfirmSecretUgbPassword}
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
        <Input
          label="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          isPassword={true}
          leftIcon="lock"
          validator={dataValidators.isRequired}
          setValidatorPassed={setConfirmPasswordIsCorrect}
        />
        {!passwordsMatch && password && confirmPassword && (
          <Text style={{ color: "red" }}>Passwords do not match</Text>
        )}
        <View style={styles.datePickerInput}>
          <DatePickerInput
            locale="en"
            mode="outlined"
            label="Birthdate"
            value={birthDate}
            onChange={(d) => setBirthDate(d)}
            inputMode="start"
            validRange={{
              startDate: new Date(1900, 0, 1),
              endDate: getTodayMinus18Years(),
            }}
            endYear={getTodayMinus18Years().getFullYear()}
            startYear={1900}
          />
        </View>
        <RadioButton
          buttons={GENDERS}
          selectedButton={sex}
          setSelectedButton={setSex}
          areIcons={true}
          label="Sex: "
        />

        <View style={styles.textContainer}>
          <Text style={styles.text} variant="bodyMedium">
            By clicking Sign Up, you agree to our Terms, Data
          </Text>

          <View style={styles.termsOfServiceAction}>
            <Text variant="bodyMedium">Policy and Cookie Policy.</Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate("LoginScreen")}
            >
              Term of Service
            </Button>
          </View>
        </View>
      </ScrollView>
      <Button
        style={styles.returnToLoginPageBtn}
        mode="text"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Return to login page
      </Button>
      <Button
        mode="contained"
        onPress={
          firstNameIsCorrect &&
          lastNameIsCorrect &&
          emailIsCorrect &&
          confirmSecretUgbPassword &&
          passwordIsCorrect &&
          confirmPasswordIsCorrect &&
          passwordsMatch &&
          birthDate &&
          signUp
        }
        style={styles.signUp}
      >
        Sign Up
      </Button>
    </LoggedOutPageLayout>
  );
};

Register.propTypes = {
  navigation: PropTypes.object,
};

export default Register;
