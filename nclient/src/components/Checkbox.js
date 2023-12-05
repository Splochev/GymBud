import * as React from "react";
import { Icon } from "react-native-paper";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const Checkbox = ({ checked, setChecked }) => {
  return (
    <TouchableOpacity onPress={() => setChecked(!checked)}>
      <View>
        <Icon
          source={checked ? "checkbox-outline" : "checkbox-blank-outline"}
          size={25}
        />
      </View>
    </TouchableOpacity>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  setChecked: PropTypes.func,
};

export default Checkbox;
