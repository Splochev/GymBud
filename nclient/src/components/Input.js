import { Text, TextInput } from "react-native-paper";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useState } from "react";

const style = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    width: "90%",
    flexDirection: "column",
  },
  input: {
    width: "100%",
  },
});

const UgbInput = ({ ...params }) => {
  const [isPassword, setIsPassword] = useState(params.isPassword || false);
  const [validationErr, setValidationErr] = useState([]);

  const onChangeText = (text) => {
    if (params.validator) {
      setValidationErr(params.validator(text));
      if (params.setValidatorPassed) {
        if (params.validator(text).length) {
          params.setValidatorPassed(false);
        } else {
          params.setValidatorPassed(true);
        }
      }
    }
    params.setValue(text);
  };

  useEffect(() => {
    setIsPassword(params.isPassword);
  }, [params.isPassword]);

  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={style.container}>
        <Text>{params.label}</Text>
        <TextInput
          style={style.input}
          {...params}
          mode="outlined"
          label=""
          onChangeText={onChangeText}
          onBlur={dismissKeyboard}
          secureTextEntry={isPassword}
          right={
            params.isPassword ? (
              <TextInput.Icon
                icon="eye"
                onPress={() => setIsPassword(!isPassword)}
              />
            ) : params.rightIcon ? (
              <TextInput.Icon icon={params.rightIcon} />
            ) : null
          }
          left={
            params.leftIcon ? <TextInput.Icon icon={params.leftIcon} /> : null
          }
        />
      </View>
      {/* {validationErr.map(x => <BrandAlert key={x}>{x}</BrandAlert>)} */}
    </TouchableWithoutFeedback>
  );
};

export default UgbInput;
