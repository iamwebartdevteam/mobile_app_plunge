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
  const [userProfileStatus, setUserProfileStatus] = useState("");
  const [notifications, setNotifications] = useState([]);
  const status = route.params.status;
  console.log("status", route.params.status);
  console.log("userStatus", route.params.status);

  const getNotification = async () => {
    await AsyncStorage.setItem(userStatus, JSON.stringify(route.params.status));

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
  // const getDataSt = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem(userStatus);
  //     console.log("valuecommmon", value);
  //     setUserProfileStatus(JSON.parse(value));
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  useEffect(() => {
    //getDataSt();
    getNotification();
    const socket = io(c.URL);
    socket.on("receiveEvent", (msg) => {
      notifications.push(msg);
      setNotifications(notifications);
    });
  }, []);

  const Drawer = createDrawerNavigator();

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        d
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
          style={notification.disable}
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
          component={
            route.params.status === "0" || route.params.status === "1"
              ? UserStatus
              : Subscriptions
          }
          options={{
            drawerIcon: () => (
              <Text style={dashBoard.menuIcon}>
                <MaterialIcons name="payments" size={20} color="#fff" />
              </Text>
            ),
          }}
        />
        {route.params.status >= "4" ? undefined : (
          <Drawer.Screen
            name="Additional Info"
            component={
              route.params.status === "0" || route.params.status === "1"
                ? UserStatus
                : Question
            }
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
        {/* <Drawer.Screen
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
                <Ionicons name="ios-qr-code-outline" size={20} color="#fff" />
              </Text>
            ),
          }}
        /> */}

        {route.params.status >= "4" ? (
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
