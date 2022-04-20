import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Picker,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useRef } from "react";
import { loginScreen, registration } from "../../assets/style";
import loginBg from "../../assets/loginbg.png";
import { Button } from "react-native-paper";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import * as API from "../Api/apiHalper";
import { lgoinId, lgoinKey } from "../utility/commonStaticData";
import { showMessage } from "react-native-flash-message";

const initialOtpData = {
  mobileNo: "",
};

const Mobilnumber = ({ navigation, route }) => {
  const [formData, setFormData] = useState(initialOtpData);
  const [number, setNumber] = useState("");

  // ? forgot screen page naviget
  const forgotNaviget = (screenName) => {
    navigation.navigate(screenName);
  };

  function formatPhoneNumber(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;

    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, "");

    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;

    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early
    if (phoneNumberLength < 4) return phoneNumber;

    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }
  const inputHandaler = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // ? MOBILE NUMBER SUBMIT
  const eamilOtpSubmit = async () => {
    if (formData.mobileNo.length < 10) {
      showMessage({
        message: "Please enter your 10 digit mobile number",
        type: "danger",
        animationDuration: 1000,
      });
    } else {
      try {
        const reqObj = {
          id: route.params.loginId,
          mobileNo: `+1${formData.mobileNo}`,
        };
        console.log("reqObj", reqObj);
        const response = await API.user_mobile(reqObj);
        console.log("response", response.data.otp);
        if (response.status === 200) {
          navigation.navigate("mobileOtp", {
            message: response.data.msg,
            otp: response.data.otp,
            loginId: route.params.loginId,
          });
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(lgoinKey);
      console.log("valuemOdd", value);
      setLoginKey(value);
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };
  // ? validation condition
  const validation = !formData.mobileNo;

  const disabledbtnNumber = () => {
    if (!formData.mobileNo) {
      showMessage({
        message: "Please enter your mobile number",
        type: "danger",
        animationDuration: 1000,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
          <Text style={[registration.heading, { marginTop: 100 }]}>
            Enter your Mobile Number
          </Text>
          <View style={loginScreen.userImg}>
            <View style={[loginScreen.icondiv, loginScreen.extraIcon]}>
              <FontAwesome5 name="mobile-alt" size={50} color="#BD69EE" />
            </View>
          </View>
          <View style={registration.phoneNumber}>
            <Picker
              //selectedValue={formData.gender}
              style={{ height: 40, width: "30%" }}
              onValueChange={(itemValue) => inputHandaler("gender", itemValue)}
            >
              <Picker.Item label="US" value="US" />
            </Picker>
            <TextInput
              placeholder="mobile No."
              style={{ width: "100%" }}
              onChangeText={(value) => inputHandaler("mobileNo", value)}
              value={formData.mobileNo}
            />
          </View>
          {validation ? (
            <TouchableOpacity
              onPress={disabledbtnNumber}
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
                Submit
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
                Submit
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Mobilnumber;
