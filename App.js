import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import WaitingMsg from "./src/screens/WaitingMsg";
import AddMessage from "./src/screens/AddMessage";
import EditMessage from "./src/screens/EditMessage";
import ContextProvider from "./context/ContextProvider";
import { LogBox } from "react-native";
import InstantMessage from "./src/screens/InstantMessage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
LogBox.ignoreAllLogs(true)
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
             <Stack.Screen
            name="InstantMsg"
            component={InstantMessage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddMsg"
            component={AddMessage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Waiting"
            component={WaitingMsg}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Edit"
            component={EditMessage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
 
      </NavigationContainer>
    </ContextProvider>
  );
};
export default App;
