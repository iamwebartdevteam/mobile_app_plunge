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
import { FontAwesome5 } from "@expo/vector-icons";
import * as API from "../Api/apiHalper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
const MailOtp = ({ navigation, route }) => {
  //console.log("route", route.params.loginId);

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
      const response = await API.user_OTP_mail(reqObj);
      console.log("response", response);
      if (response.status === 200) {
        navigation.navigate("mobilenumber", {
          loginId: route.params.loginId,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // const readData = async () => {
  //   try {
  //     const userAge = await AsyncStorage.getItem(STORAGE_KEY);
  //     //console.log("userAge", userAge);
  //     if (userAge !== null) {
  //       console.log("userAge", userAge);
  //     }
  //   } catch (e) {
  //     alert("Failed to fetch the data from storage");
  //   }
  // };

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
          <Text style={registration.heading}>verification Code</Text>
          {/* <Text style={registration.loginPra}>{route.params.message}</Text> */}
          <View style={loginScreen.userImg}>
            <View style={loginScreen.icondiv}>
              <FontAwesome5 name="user-check" size={50} color="#BD69EE" />
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
          <Button
            style={registration.button}
            icon={{ source: "arrow-right", direction: "ltr" }}
            mode="contained"
            onPress={eamilOtpSubmit}
          >
            verification
          </Button>

          <Text style={registration.pragreph}>
            <Text style={registration.pragrephContaint}>
              Don't receive the code ? {""}
            </Text>
            <TouchableOpacity
              style={registration.touchBtn}
              onPress={() => forgotNaviget("mobilenumber")}
            >
              <Text style={registration.login}>
                {""}
                Resend
              </Text>
            </TouchableOpacity>
          </Text>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default MailOtp;
