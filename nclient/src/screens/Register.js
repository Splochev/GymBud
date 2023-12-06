import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
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
import Checkbox from "../components/Checkbox";

const styles = StyleSheet.create({
  signUp: {
    width: "60%",
    marginBottom: 32,
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
  datePickerInput: {
    width: "90%",
    marginTop: 8,
  },
  termsAndConditionsContainer: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  termsAndConditionsBtn: {
    color: "#007AFF",
  },
  upperContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  logo: {
    maxHeight: 280,
    resizeMode: "contain",
  },
  smallerLogo: {
    maxHeight: 240,
    resizeMode: "contain",
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
  const [checked, setChecked] = useState(false);

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
  const deviceHeight = Dimensions.get("window").height;

  return (
    <LoggedOutPageLayout>
      <ScrollView
        contentContainerStyle={{
          width: screenWidth,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={true}
      >
        <View>
          <Image
            source={require("../../assets/logo-no-background-with-slogan.png")}
            style={deviceHeight === 667 ? styles.smallerLogo : styles.logo}
          />
        </View>

        <View style={styles.upperContainer}>
          <Text style={[styles.text, styles.headLine]} variant="headlineMedium">
            Sign Up
          </Text>
          <Text style={styles.text} variant="titleSmall">
            It&apos;s quick and easy.
          </Text>
          <Divider style={styles.divider} />
        </View>
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
        <View style={styles.termsAndConditionsContainer}>
          <Checkbox setChecked={setChecked} checked={checked} />
          <Text variant="bodyMedium">Agree with</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.termsAndConditionsBtn} variant="bodyMedium">
              Terms & Conditions
            </Text>
          </TouchableOpacity>
        </View>
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
            checked &&
            signUp
          }
          style={styles.signUp}
        >
          Sign Up
        </Button>
      </ScrollView>
    </LoggedOutPageLayout>
  );
};

Register.propTypes = {
  navigation: PropTypes.object,
};

export default Register;
