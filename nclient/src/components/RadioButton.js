import * as React from "react";
import { RadioButton, Icon, Text } from "react-native-paper";
import PropTypes from "prop-types";
import { View } from "react-native";
import Button from "./Button";
import { isIOS } from "../Utils/commonFunctions";

const UGBRadioButton = ({
  buttons,
  selectedButton,
  setSelectedButton,
  areIcons,
  label,
}) => {
  return areIcons ? (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Text variant="titleMedium">{label}</Text>
      {buttons.map((button) => (
        <Button
          mode="text"
          key={button}
          style={{ flexDirection: "row", alignItems: "center", minWidth: 85 }}
          onPress={() => setSelectedButton(button)}
        >
          <Icon source={button} size={30} />
          <Icon
            source={
              selectedButton === button
                ? isIOS()
                  ? "check"
                  : "radiobox-marked"
                : isIOS
                ? ""
                : "radiobox-blank"
            }
            size={30}
          />
        </Button>
      ))}
    </View>
  ) : (
    <RadioButton.Group
      onValueChange={(value) => setSelectedButton(value)}
      value={selectedButton}
    >
      {buttons.map((button) => (
        <RadioButton.Item key={button} label={button} value={button} />
      ))}
    </RadioButton.Group>
  );
};

UGBRadioButton.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.string),
  selectedButton: PropTypes.string,
  setSelectedButton: PropTypes.func,
  areIcons: PropTypes.bool,
  label: PropTypes.string,
};

export default UGBRadioButton;
