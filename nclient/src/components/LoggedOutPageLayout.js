import React from "react";
import { View, StyleSheet, ImageBackground, Image } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backgroundImage: {
    width: "100%",
    height: "95%",
    resizeMode: "cover",
  },
  pageContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    maxHeight: 300,
    resizeMode: "contain",
  },
});

const LoggedOutPageLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/indoorBike.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.pageContainer}>
          <Image
            source={require("../../assets/logo-no-background-with-slogan.png")}
            style={styles.logo}
          />
          {children}
        </View>
      </ImageBackground>
    </View>
  );
};

LoggedOutPageLayout.propTypes = {
  children: PropTypes.any,
};

export default LoggedOutPageLayout;