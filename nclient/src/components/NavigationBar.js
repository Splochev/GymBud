import React, { useEffect } from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import PropTypes from "prop-types";
import { useStoreContext } from "../store/Store";

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
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={onBackPress} /> : null}
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
