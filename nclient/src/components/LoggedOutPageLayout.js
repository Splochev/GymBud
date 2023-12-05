import React, { useEffect } from "react";
import { View, StyleSheet, ImageBackground, Image } from "react-native";
import PropTypes from "prop-types";
import { useStoreContext } from "../store/Store";
import { LOGGED_OUT_PAGES } from "../Utils/constants";
import { Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
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

const LoggedOutPageLayout = ({ children }) => {
  const [store] = useStoreContext();
  const deviceHeight = Dimensions.get("window").height;

  useEffect(() => {console.log('currentPage', store.currentPage)}, [store.currentPage]);
  useEffect(() => {console.log('previousPage', store.previousPage)}, [store.previousPage]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/indoorBike.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.pageContainer}>
          {store.currentPage !== LOGGED_OUT_PAGES.REGISTER && (
            <View>
              <Image
                source={require("../../assets/logo-no-background-with-slogan.png")}
                style={
                  deviceHeight === 667 &&
                  store.currentPage ===
                    LOGGED_OUT_PAGES.CONFIRM_FORGOT_PASSWORD_CODE
                    ? styles.smallerLogo
                    : styles.logo
                }
              />
            </View>
          )}
          <View style={styles.contentContainer}>{children}</View>
        </View>
      </ImageBackground>
    </View>
  );
};

LoggedOutPageLayout.propTypes = {
  children: PropTypes.any,
};

export default LoggedOutPageLayout;
