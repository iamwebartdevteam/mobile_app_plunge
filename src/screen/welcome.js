import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import { dashBoard, newTestStyle } from "../../assets/style";
import { LinearGradient } from "expo-linear-gradient";
import welcome from "../../assets/welcome.png";
import logo from "../../assets/logo.png";
import {
  JosefinSans_100Thin,
  JosefinSans_200ExtraLight,
  JosefinSans_300Light,
  JosefinSans_400Regular,
  JosefinSans_500Medium,
  JosefinSans_600SemiBold,
  JosefinSans_700Bold,
  JosefinSans_100Thin_Italic,
  JosefinSans_200ExtraLight_Italic,
  JosefinSans_300Light_Italic,
  JosefinSans_400Regular_Italic,
  JosefinSans_500Medium_Italic,
  JosefinSans_600SemiBold_Italic,
  JosefinSans_700Bold_Italic,
} from "@expo-google-fonts/josefin-sans";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
const Welcome = ({ navigation }) => {
  let [fontsLoaded, error] = useFonts({
    JosefinSans_100Thin,
    JosefinSans_200ExtraLight,
    JosefinSans_300Light,
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_600SemiBold,
    JosefinSans_700Bold,
    JosefinSans_100Thin_Italic,
    JosefinSans_200ExtraLight_Italic,
    JosefinSans_300Light_Italic,
    JosefinSans_400Regular_Italic,
    JosefinSans_500Medium_Italic,
    JosefinSans_600SemiBold_Italic,
    JosefinSans_700Bold_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={newTestStyle.welcomePage}>
      <ImageBackground
        resizeMode="cover"
        source={welcome}
        style={newTestStyle.welcomeImg}
      >
        <View style={newTestStyle.contantSec}>
          <Text
            style={[
              newTestStyle.headingW,
              {
                fontFamily: "JosefinSans_700Bold_Italic",
              },
            ]}
          >
            Welcome To Plunge
          </Text>
          <Text
            style={{
              paddingBottom: 10,
              color: "#788291",
              fontFamily: "JosefinSans_700Bold",
              textAlign: "center",
            }}
          >
            Plunge provides a secure, discrete, subscriber-based community for
            responsible, sexually active adults.
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 120,
          }}
        >
          <Text
            style={{
              borderBottomColor: "#264c97",
              borderBottomWidth: 2,
              width: 30,
            }}
          />
          <Image style={{ width: 40, height: 40 }} source={logo} />
          <Text
            style={{
              borderBottomColor: "#264c97",
              borderBottomWidth: 2,
              width: 30,
            }}
          />
        </View>
        <LinearGradient
          style={newTestStyle.regisButton}
          colors={["#264c97", "#2f6be0"]}
          start={{ x: 0.6, y: 0.2 }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={newTestStyle.regText}>Register Now</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 17, fontFamily: "JosefinSans_400Regular" }}>
            Already Registered ?
          </Text>
          <Text
            style={newTestStyle.login}
            onPress={() => navigation.navigate("login")}
          >
            Login Now
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;
