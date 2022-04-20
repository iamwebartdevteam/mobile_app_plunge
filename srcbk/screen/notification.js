import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { notification } from "../../assets/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lgoinKey } from "../utility/commonStaticData";
import { io } from "socket.io-client";
import * as c from "../Api/constant";
import * as API from "../Api/apiHalper";
import logoName from "../../assets/logo-name.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Notification = ({ data }) => {
  const [notifications, setNotifications] = useState([]);
  console.log("notifications", notifications);
  const getNotification = async () => {
    try {
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
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getNotification();
    // Fetch from database
    const socket = io(c.URL);
    socket.on("receiveEvent", (msg) => {
      notifications.push(msg);
      setNotifications(notifications);
    });
  }, []);

  return (
    <View style={notification.maintable}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <View key={index} style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              style={{ marginRight: 10, marginTop: 7 }}
              name="bell"
              size={20}
              color="#fd248a"
            />
            <Text style={notification.contant}>{item.message}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Notification;
