import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { loginScreen, registration } from "../../assets/style";
import loginBg from "../../assets/loginbg.png";
import { Button } from "react-native-paper";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import * as API from "../Api/apiHalper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { showMessage } from "react-native-flash-message";
const MobileOtp = ({ navigation, route }) => {
  const pin1ref = useRef(null);
  const pin2ref = useRef(null);
  const pin3ref = useRef(null);
  const pin4ref = useRef(null);
  const pin5ref = useRef(null);
  const pin6ref = useRef(null);

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [pin5, setPin5] = useState("");
  const [pin6, setPin6] = useState("");

  //const [formData, setFormData] = useState(initialOtpData);
  // ? forgot screen page naviget
  const forgotNaviget = (screenName) => {
    navigation.navigate(screenName);
  };

  const inputHandaler = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const eamilOtpSubmit = async () => {
    try {
      const reqObj = {
        id: route.params.loginId,
        otp: pin1 + pin2 + pin3 + pin4 + pin5 + pin6,
      };
      console.log("reqObj", reqObj);
      const response = await API.user_mobile_verification(reqObj);
      console.log("response", response);
      if (response.status === 200) {
        navigation.navigate("commonNav", {
          loginId: route.params.loginId,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const disabledbtnOtp = () => {
    showMessage({
      message: "Please enter your verification code",
      type: "danger",
      animationDuration: 1000,
    });
  };

  const validation = !pin1 || !pin2 || !pin3 || !pin4 || !pin5 || !pin6;

  useEffect(() => {}, []);

  return (
    <View style={registration.container}>
      <ImageBackground
        source={loginBg}
        resizeMode="cover"
        style={registration.image}
      >
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text style={registration.heading}>Mobile verification</Text>
          {/* <Text style={registration.loginPra}>{route.params.message}</Text> */}
          <View style={loginScreen.userImg}>
            <View style={[loginScreen.icondiv, loginScreen.extraIcon]}>
              <MaterialIcons name="mobile-friendly" size={50} color="#BD69EE" />
            </View>
          </View>
          <View style={loginScreen.otpFeildSection}>
            <TextInput
              ref={pin1ref}
              style={registration.otpfeild}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(pin1) => {
                setPin1(pin1);
                if (pin1 !== "") {
                  pin2ref.current.focus();
                }
              }}
              value={pin1}
            />
            <TextInput
              ref={pin2ref}
              style={registration.otpfeild}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(pin2) => {
                setPin2(pin2);
                if (pin2 !== "") {
                  pin3ref.current.focus();
                }
              }}
              value={pin2}
            />
            <TextInput
              ref={pin3ref}
              style={registration.otpfeild}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(pin3) => {
                setPin3(pin3);
                if (pin3 !== "") {
                  pin4ref.current.focus();
                }
              }}
              value={pin3}
            />
            <TextInput
              ref={pin4ref}
              style={registration.otpfeild}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(pin4) => {
                setPin4(pin4);
                if (pin4 !== "") {
                  pin5ref.current.focus();
                }
              }}
              value={pin4}
            />
            <TextInput
              ref={pin5ref}
              style={registration.otpfeild}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(pin5) => {
                setPin5(pin5);
                if (pin5 !== "") {
                  pin6ref.current.focus();
                }
              }}
              value={pin5}
            />
            <TextInput
              ref={pin6ref}
              style={registration.otpfeild}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(pin6) => setPin6(pin6)}
              value={pin6}
            />
          </View>

          {validation ? (
            <TouchableOpacity
              onPress={disabledbtnOtp}
              style={[
                registration.button,
                {
                  backgroundColor: "gray",
                },
              ]}
            >
              <Entypo
                name="arrow-long-right"
                style={{ marginRight: 15 }}
                size={20}
                color="#fff"
              />
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  textTransform: "uppercase",
                }}
              >
                verification
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={eamilOtpSubmit}
              style={[registration.button]}
            >
              <Entypo
                name="arrow-long-right"
                style={{ marginRight: 15 }}
                size={20}
                color="#fff"
              />
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  textTransform: "uppercase",
                }}
              >
                verification
              </Text>
            </TouchableOpacity>
          )}
          <Text
            style={[
              registration.pragreph,
              {
                backgroundColor: "#fff",
                padding: 10,
              },
            ]}
          >
            <Text style={[registration.pragrephContaint]}>
              Mobile Otp Here : {route.params.otp}
            </Text>
          </Text>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default MobileOtp;
