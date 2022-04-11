import { View, Text, ScrollView, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import loginBg from "../../assets/subBg.png";
import { dashBoard, notification, registration } from "../../assets/style";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import * as c from "../Api/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lgoinKey } from "../utility/commonStaticData";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
const Qrcode = ({ navigation }) => {
  const [loginId, setLoginId] = useState("");

  const viewShot = React.useRef();

  // ? login id
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(lgoinKey);
      console.log("loginId", value);
      setLoginId(value);
    } catch (e) {
      // error reading value
    }
  };

  // ? qr code value
  const qrValue = c.PROFILE_URL + "/profile-complete/" + loginId;

  // ? Expo  Sharer implement
  const captureAndShareScreenshot = () => {
    viewShot.current.capture().then((uri) => {
      console.log("do something with ", uri);
      Sharing.shareAsync("file://" + uri);
    }),
      (error) => console.error("Oops, snapshot failed", error);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={loginBg}
        resizeMode="cover"
        style={registration.image}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={[
              dashBoard.subPackeg,
              {
                marginRight: 0,
                justifyContent: "center",
              },
            ]}
          >
            <ViewShot ref={viewShot} options={{ format: "jpg", quality: 0.9 }}>
              <View style={{ backgroundColor: "#fff", padding: 10 }}>
                <QRCode size={250} value={qrValue} />
              </View>
            </ViewShot>
            <View style={notification.scannerSec}>
              <Text
                style={notification.qrBtn}
                onPress={() => navigation.navigate("Scanner")}
              >
                <AntDesign name="scan1" size={30} color="#fff" />
              </Text>

              <Text
                onPress={captureAndShareScreenshot}
                style={[notification.qrBtn, { marginRight: 0 }]}
              >
                <FontAwesome name="share-square-o" size={30} color="#fff" />
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Qrcode;
