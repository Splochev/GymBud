import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMe } from "./src/services/userService";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import { StoreContext, initialStoreState } from "./src/store/Store";
import ForgotPassword from "./src/screens/ForgotPassword";
import ConfirmForgotPasswordCode from "./src/screens/ConfirmForgotPasswordCode";
import ResetPassword from "./src/screens/ResetPassword";
import Register from "./src/screens/Register";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [storeState, setStoreState] = useState(initialStoreState);

  useEffect(() => {
    const signAutomatically = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const myData = await getMe(token);

          setStoreState({
            ...storeState,
            user: myData,
            isLoggedIn: Boolean(myData),
          });
        } else {
          setStoreState({ ...storeState, user: undefined, isLoggedIn: false });
        }
      } catch (error) {
        setStoreState({ ...storeState, user: undefined, isLoggedIn: false });
        await AsyncStorage.clear();
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    signAutomatically();
  }, []);

  if (loading) {
    return <ActivityIndicator animating={true} />;
  }

  if (storeState.isLoggedIn) {
    return (
      <PaperProvider>
        <StoreContext.Provider value={[storeState, setStoreState]}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={"Details"}>
              <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </StoreContext.Provider>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <StoreContext.Provider value={[storeState, setStoreState]}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"LoginScreen"}>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ConfirmForgotPasswordCode"
              component={ConfirmForgotPasswordCode}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreContext.Provider>
    </PaperProvider>
  );
}
