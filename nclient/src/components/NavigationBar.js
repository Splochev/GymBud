import React, { useEffect } from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import PropTypes from "prop-types";
import { useStoreContext } from "../store/Store";
import { Image } from "react-native";
import { LOGGED_OUT_PAGES } from "../Utils/constants";

const NavigationBar = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.name);
  const [store, setStore] = useStoreContext();

  useEffect(() => {
    const currentPage = store.currentPage;
    setStore({
      ...store,
      currentPage: route.name,
      previousPage: currentPage,
    });
  }, [title]);

  const onBackPress = () => {
    navigation.goBack();
    const previousPage = store.previousPage;

    setStore({
      ...store,
      currentPage: previousPage,
      previousPage: route.name,
    });
  };

  return (
    <Appbar.Header style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: 32
    }}>
      {back ? <Appbar.BackAction onPress={onBackPress} /> : null}
      {route.name === LOGGED_OUT_PAGES.REGISTER ? (
        <Image
          source={require("../../assets/logo-no-background.png")}
          style={{ width: 60, height: 60, resizeMode: "contain" }}
        />
      ) : null}
    </Appbar.Header>
  );
};

NavigationBar.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  options: PropTypes.object,
  back: PropTypes.object,
};

export default NavigationBar;
