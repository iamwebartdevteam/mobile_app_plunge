import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import RegistrationH from "./src/components/registration";
import MainRouter from "./src/components/router/mainRouter";
import Dashboard from "./src/screen/dashboard";
import Forgotpassword from "./src/screen/forgotpassword";
import Login from "./src/screen/login";
import MailOtp from "./src/screen/mailOtp";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();

export default function App() {
  const [login, setlogin] = useState("");
  console.log("login", login);

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("isLoggedIn");
  //     console.log("valuRouter", value);
  //     setlogin(JSON.parse(value));
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  useEffect(() => {
    return async () => {
      const value = await AsyncStorage.getItem("isLoggedIn");
      console.log("valuRouter", value);
    };
  }, []);

  // useEffect(() => {
  //   getData();
  //   console.log("applogin");
  // }, []);
  return <MainRouter login={login} />;
}
