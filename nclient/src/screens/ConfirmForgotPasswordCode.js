import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import { Text } from "react-native-paper";
import PropTypes from "prop-types";
import LoggedOutPageLayout from "../components/LoggedOutPageLayout";
import { Divider } from "react-native-paper";
import { useStoreContext } from "../store/Store";
import CodeInput from "../components/CodeInput";
import { verifyForgotPasswordCode } from "../services/userService";
import { CELL_COUNT } from "../Utils/constants";
import { dataValidators } from "../Utils/dataValidators";

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
  },
  textContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
  },
  emailAction: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  text: {
    textAlign: "left",
  },
  returnToLoginPageBtn: {
    marginBottom: 10,
  },
});

const ConfirmForgotPasswordCode = ({ navigation }) => {
  const [store, setStore] = useStoreContext();
  const [code, setCode] = React.useState("");
  const [codeIsCorrect, setCodeIsCorrect] = React.useState(false);

  const confirmForgotPasswordCode = async () => {
    try {
      await verifyForgotPasswordCode(store.email, code);
      setStore({
        ...store,
        code: code,
      });
      navigation.navigate("ResetPassword");
    } catch (error) {
      console.error("Error while signing in:", error);
    }
  };

  return (
    <LoggedOutPageLayout>
      <Text style={[styles.text, styles.headLine]} variant="headlineMedium">
        Reset Password
      </Text>
      <View style={styles.textContainer}>
        <Text style={styles.text} variant="bodyMedium">
          You have requested a password reset. To get a new password, please
          check your inbox for the confirmation code and enter the Password
          reset code we have sent to:
        </Text>
        <View style={styles.emailAction}>
          <Text>{store.email}</Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Change email
          </Button>
        </View>
      </View>
      <CodeInput
        value={code}
        setValue={setCode}
        cellCount={CELL_COUNT}
        setValidatorPassed={setCodeIsCorrect}
        validator={dataValidators.codeIsCorrect}
      />
      <Divider style={styles.divider} />
      <Button
        mode="contained"
        onPress={codeIsCorrect && confirmForgotPasswordCode}
        style={styles.sendResetInstructionsBtn}
      >
        Confirm
      </Button>
    </LoggedOutPageLayout>
  );
};

ConfirmForgotPasswordCode.propTypes = {
  navigation: PropTypes.object,
};

export default ConfirmForgotPasswordCode;
