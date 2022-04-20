import { View, Text, Image, ProgressBarAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { dashBoard } from "../../assets/style";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lgoinKey, userStatus } from "../utility/commonStaticData";
import * as API from "../Api/apiHalper";
import * as c from "../Api/constant";
import { io } from "socket.io-client";

const CustomDrawer = (props) => {
  const [userData, setuserData] = useState([]);
  const [userProfileStatus, setUserProfileStatus] = useState("");
  const [notifications, setNotifications] = useState([]);
  console.log("customNav", userProfileStatus);
  //console.log("notifications", notifications);
  const getNotification = async () => {
    const value = await AsyncStorage.getItem(lgoinKey);
    console.log("value", value);
    const respons = await API.getuserNotification(value);
    if (respons != "" && respons.data.data != undefined) {
      respons.data.data.map((res, index) => {
        const jsonres = JSON.parse(res.message);
        notifications.push(jsonres);
      });
    }

    setNotifications(notifications);
  };

  // ? USER DETAILS >>>>>>>
  const user_details_byid = async () => {
    try {
      const value = await AsyncStorage.getItem(userStatus);
      setUserProfileStatus(value);
      const reqObj = {
        id: await AsyncStorage.getItem(lgoinKey),
      };
      const response = await API.user_data_id(reqObj);
      console.log("response", response);
      setuserData(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  // ? >>>>>>> USER IAMAGES >>>>>>>
  const userImg = c.URL + "/" + userData.image;

  useEffect(() => {
    user_details_byid();
    getNotification();
    const socket = io(c.URL);
    socket.on("receiveEvent", (msg) => {
      notifications.push(msg);
      setNotifications(notifications);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={[dashBoard.navigationContainer]}>
        <View style={dashBoard.userMenuImg}>
          <Image
            style={dashBoard.userMenuImgPic}
            source={{
              uri:
                userData.image === null
                  ? c.URL + "/images/avatar-1577909_960_720.png"
                  : userImg,
            }}
          />
        </View>
        <Text style={dashBoard.paragraph}>
          {userData.fname} {userData.lname}
        </Text>
        <Text
          style={[
            dashBoard.paragraph,
            { fontSize: 13, marginTop: 5, marginBottom: 0 },
          ]}
        >
          {userData.userName}
        </Text>
      </View>
      {userProfileStatus >= "3" ? (
        ""
      ) : (
        <View
          style={{
            width: 300,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {/* isAcountProgress >= 3 ? 100 : isAcountProgress * 25 */}
          {/* <ProgressBarAndroid
            styleAttr="Horizontal"
            style={{ marginRight: 15, width: 180 }}
            indeterminate={false}
            progress={userProfileStatus >= "3" ? 5 : 5}
          />
          <Text>100%</Text> */}
        </View>
      )}

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={dashBoard.logOutSec}>
        <Button
          style={dashBoard.logOut}
          onPress={() =>
            props.navigation.navigate("login", {
              logout: true,
            })
          }
        >
          <AntDesign name="logout" size={20} color="#fff" />
        </Button>
      </View>
    </View>
  );
};

export default CustomDrawer;
