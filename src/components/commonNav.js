import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import EditProfile from "../screen/editprofile";
import ImageUpload from "../screen/imageUpload";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawer from "./customDrawer";
import Drawar from "../screen/drawar";
import {
  FontAwesome5,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { dashBoard, notification } from "../../assets/style";
import Subscriptions from "../screen/subscriptions";
import Question from "../screen/question";
import Testhistory from "../screen/testhistory";
import Qrcode from "../screen/qrcode";
import Dashboard from "../screen/dashboard";
import { lgoinKey, userStatus } from "../utility/commonStaticData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../screen/login";
import { Button } from "react-native-paper";
import Notification from "../screen/notification";
import * as API from "../Api/apiHalper";
import { io } from "socket.io-client";
import * as c from "../Api/constant";
import UserStatus from "../screen/userStatus";

const CommonNav = ({ navigation, route }) => {
  useEffect(() => {
    user_details_byid();
  }, []);

  const [userProfileStatus, setUserProfileStatus] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [userDataStatus, setUserDataStatus] = useState([]);
  const status = route.params.status;
  console.log("status", route.params.status);
  console.log("userStatus", userDataStatus);

  // ?>>>>>>>>>>>> USER DETAILS BY ID >>>>>>>>>>>>>>
  const user_details_byid = async () => {
    console.log("hello");
    try {
      const reqObj = {
        id: await AsyncStorage.getItem(lgoinKey),
      };
      const response = await API.user_data_id(reqObj);
      console.log("drawrRessss", response.data.data);
      setUserDataStatus(response.data.data.status);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getNotification = async () => {
    await AsyncStorage.setItem(userStatus, JSON.stringify(route.params.status));
    const useStatus = await AsyncStorage.getItem(userStatus);
    console.log("useStatus", useStatus);
    setUserProfileStatus(JSON.parse(await AsyncStorage.getItem(userStatus)));
    const value = await AsyncStorage.getItem(lgoinKey);
    const respons = await API.getuserNotification(value);
    if (respons != "" && respons.data.data != undefined) {
      respons.data.data.map((res, index) => {
        const jsonres = JSON.parse(res.message);
        notifications.push(jsonres);
      });
    }
    setNotifications(notifications);
  };

  useEffect(() => {
    getNotification();
    user_details_byid();
    const socket = io(c.URL);
    socket.on("receiveEvent", (msg) => {
      notifications.push(msg);
      setNotifications(notifications);
    });
  }, []);
  user_details_byid();
  const Drawer = createDrawerNavigator();

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          drawerActiveBackgroundColor: "#4387ff",
          drawerActiveTintColor: "#fff",
          drawerInactiveBackgroundColor: "#fff",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: {
            marginLeft: -25,
            fontSize: 17,
            fontWeight: "700",
          },
        }}
      >
        {route.params.status >= "4" ? (
          <Drawer.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              drawerIcon: () => (
                <Text style={dashBoard.menuIcon}>
                  <MaterialIcons name="dashboard" size={20} color="#fff" />
                </Text>
              ),
            }}
          />
        ) : undefined}

        <Drawer.Screen
          name="Edit Profile"
          component={EditProfile}
          options={{
            drawerIcon: () => (
              <Text style={dashBoard.menuIcon}>
                <FontAwesome5 name="user-edit" size={17} color="#fff" />
              </Text>
            ),
          }}
        />

        <Drawer.Screen
          name="Selfie"
          component={ImageUpload}
          options={{
            drawerIcon: () => (
              <Text style={dashBoard.menuIcon}>
                <Entypo name="upload" size={20} color="#fff" />
              </Text>
            ),
          }}
        />
        <Drawer.Screen
          name="Subscriptions"
          component={Subscriptions}
          options={{
            drawerIcon: () => (
              <Text style={dashBoard.menuIcon}>
                <MaterialIcons name="payments" size={20} color="#fff" />
              </Text>
            ),
          }}
        />
        {userDataStatus >= "4" ? undefined : (
          <Drawer.Screen
            name="Additional Info"
            component={Question}
            options={{
              drawerIcon: () => (
                <Text style={dashBoard.menuIcon}>
                  <MaterialCommunityIcons
                    name="frequently-asked-questions"
                    size={20}
                    color="#fff"
                  />
                </Text>
              ),
            }}
          />
        )}

        {userDataStatus >= "4" ? (
          <>
            <Drawer.Screen
              name="STI Test History"
              component={Testhistory}
              options={{
                drawerIcon: () => (
                  <Text style={dashBoard.menuIcon}>
                    <FontAwesome5 name="file-invoice" size={20} color="#fff" />
                  </Text>
                ),
              }}
            />
            <Drawer.Screen
              name="Plunge"
              component={Qrcode}
              options={{
                drawerIcon: () => (
                  <Text style={dashBoard.menuIcon}>
                    <Ionicons
                      name="ios-qr-code-outline"
                      size={20}
                      color="#fff"
                    />
                  </Text>
                ),
              }}
            />
          </>
        ) : undefined}

        <Drawer.Screen
          name="Notification"
          component={() => <Notification data={notifications} />}
          options={{
            drawerIcon: () => (
              <>
                <Text style={dashBoard.menuIcon}>
                  <MaterialCommunityIcons name="bell" size={20} color="#fff" />
                </Text>
                <Text
                  style={[
                    dashBoard.menuIcon,
                    { position: "absolute", right: 0 },
                  ]}
                >
                  {notifications.length}
                </Text>
              </>
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default CommonNav;
