import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Text } from "react-native-paper";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const styles = StyleSheet.create({
  codeFieldRoot: {},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030", // TODO: use theme
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000", // TODO: use theme
  },
});


const CodeInput = ({ value, setValue, cellCount, setValidatorPassed, validator }) => {
  const ref = useBlurOnFulfill({ value, cellCount: cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  // eslint-disable-next-line no-unused-vars
  const [validationErr, setValidationErr] = useState([]);

  useEffect(() => {
    if (validator) {
      setValidationErr(validator(value));
      if (setValidatorPassed) {
        if (validator(value).length) {
          setValidatorPassed(false);
        } else {
          setValidatorPassed(true);
        }
      }
    }
  }, [value]);

  return (
    <SafeAreaView>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

CodeInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  cellCount: PropTypes.number,
  setValidatorPassed: PropTypes.func,
  validator: PropTypes.func,
};

export default CodeInput;
