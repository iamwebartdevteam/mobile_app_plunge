import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, View, ScrollView, StatusBar } from "react-native";
import RegistrationH from "../registration";
import Dashboard from "../../screen/dashboard";
import Forgotpassword from "../../screen/forgotpassword";
import Login from "../../screen/login";
import MailOtp from "../../screen/mailOtp";
import EditProfile from "../../screen/editprofile";
import Subscriptions from "../../screen/subscriptions";
import Drawar from "../../screen/drawar";
import ImageUpload from "../../screen/imageUpload";
import Qrcode from "../../screen/qrcode";
import Mobilnumber from "../../screen/mobilenumber";
import Question from "../../screen/question";
import Testhistory from "../../screen/testhistory";
import MobileOtp from "../../screen/mobileOtp";
import FlashMessage from "react-native-flash-message";
import { useEffect, useState } from "react";
import { isLogin } from "../../utility/commonStaticData";
import CommonNav from "../commonNav";
import NewTest from "../../screen/newTest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Payment from "../../screen/payment";
import Welcome from "../../screen/welcome";
import Scanner from "../../screen/scanner";
import UserStatus from "../../screen/userStatus";
const Stack = createNativeStackNavigator();

export default function MainRouter() {
  //console.log("mainRout");
  const [isLogin, setIsLogin] = useState("");

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("isLoggedIn");
      console.log("loginId", value);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#9980e9" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            options={{ headerShown: false }}
            name="commonNav"
            component={CommonNav}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="login"
            component={Login}
          />

          {/* <Stack.Screen
            options={{ headerShown: false }}
            name="login"
            component={Login}
          /> */}

          {/* {login !== 1 ? (
            <Stack.Screen
              options={{ headerShown: false }}
              name="login"
              component={Login}
            />
          ) : undefined} */}

          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={RegistrationH}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="mailOtp"
            component={MailOtp}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="mobilenumber"
            component={Mobilnumber}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="mobileOtp"
            component={MobileOtp}
          />
          {/* <Stack.Screen
            options={{ headerShown: false }}
            name="dashboard"
            component={Dashboard}
          /> */}
          <Stack.Screen
            options={{ headerTitle: "Edit Profile" }}
            name="editprofile"
            component={EditProfile}
          />

          <Stack.Screen
            options={{ headerTitle: "Image Upload" }}
            name="imageUpload"
            component={ImageUpload}
          />
          <Stack.Screen
            options={{ headerTitle: "New Test" }}
            name="newTest"
            component={NewTest}
          />
          <Stack.Screen
            options={{ headerTitle: "STI Test History" }}
            name="testhistory"
            component={Testhistory}
          />
          <Stack.Screen
            options={{ headerTitle: "Subscriptions & Payment" }}
            name="Subscriptions"
            component={Subscriptions}
          />
          <Stack.Screen
            options={{ headerTitle: "Subscriptions & Payment" }}
            name="payment"
            component={Payment}
          />
          {/* <Stack.Screen
            options={{ headerTitle: "Subscriptions & Payment" }}
            name="subscriptions"
            component={Subscriptions}
          />
          <Stack.Screen
            options={{ headerTitle: "Question" }}
            name="question"
            component={Question}
          />
          <Stack.Screen
            options={{ headerTitle: "STI Test History" }}
            name="testhistory"
            component={Testhistory}
          />
          <Stack.Screen
            options={{ headerTitle: "QR Code" }}
            name="qrcode"
            component={Qrcode}
          /> */}
          <Stack.Screen
            options={{ headerTitle: "Scanner" }}
            name="Scanner"
            component={Scanner}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="forgot"
            component={Forgotpassword}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="userStatus"
            component={UserStatus}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </View>
  );
}
