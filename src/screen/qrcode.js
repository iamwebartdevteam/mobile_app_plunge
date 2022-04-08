import { View, Text, ScrollView, ImageBackground } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import loginBg from "../../assets/subBg.png";
import { dashBoard, notification, registration } from "../../assets/style";
import logoicon from "../../assets/logo.png";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";

const Qrcode = ({ navigation }) => {
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
            <QRCode
              size={250}
              logoSize={100}
              value="https://medium.com/@mushtaque87/qrcode-generator-for-react-native-391ae401e275"
              // logo={logoicon}
              // logoBackgroundColor="transparent"
            />
            <View style={notification.scannerSec}>
              <Text
                style={notification.qrBtn}
                onPress={() => navigation.navigate("Scanner")}
              >
                <AntDesign name="scan1" size={30} color="#fff" />
              </Text>
              {/* <Text style={notification.qrBtn}>
                <Entypo name="link" size={30} color="#fff" />
              </Text> */}
              <Text style={[notification.qrBtn, { marginRight: 0 }]}>
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
