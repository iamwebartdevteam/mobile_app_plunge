import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  dashBoard,
  loginScreen,
  newTestStyle,
  registration,
} from "../../assets/style";
import loginBg from "../../assets/loginscreen.png";
import { Button, Checkbox } from "react-native-paper";
import * as appUtils from "../utility/appUtils";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import * as API from "../Api/apiHalper";
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLogin, lgoinKey, userStatus } from "../utility/commonStaticData";
import logoName from "../../assets/logo-name.png";
import { LinearGradient } from "expo-linear-gradient";

import loginScr from "../../assets/login.png";
const initialData = {
  emailId: "",
  password: "",
};

const Login = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [disable, setDisable] = useState(false);

  // ? Sign UP screen naviget
  const handalNaviget = (screenName) => {
    navigation.navigate(screenName);
  };
  // ? forgot screen page naviget
  const forgotNaviget = (screenName) => {
    navigation.navigate(screenName);
  };

  // ? INPUT HANDALER
  const inputHandaler = (name, value) => {
    switch (name) {
      case "emailId":
        setErrorEmail("");
        break;
      case "password":
        setErrorPassword("");
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: value });
  };

  // ? REMOVE ALL STORAGE
  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
    } catch (e) {
      console.log("Failed to clear the async storage.");
    }
  };

  // ? LOGIN SUBMIT BUTTON
  const handleSubmit = async () => {
    setDisable(true);
    setLoading(true);
    let flag = validate();
    if (!flag) {
      setLoading(false);
      return;
    }
    try {
      const reqObj = {
        emailId: formData.emailId,
        password: formData.password,
      };
      console.log("reqObj", reqObj);

      const response = await API.user_login(reqObj);
      console.log("response", response.data.data);
      if (response.status === 200) {
        navigation.navigate("commonNav", {
          loginId: response.data.data.id,
          status: response.data.data.status,
        });
        await AsyncStorage.setItem(
          lgoinKey,
          JSON.stringify(response.data.data.id)
        );
        await AsyncStorage.setItem(
          userStatus,
          JSON.stringify(response.data.data.status)
        );
        await AsyncStorage.setItem("isLoggedIn", "1");
        const userId = await AsyncStorage.getItem(lgoinKey);
        console.log("loginId", userId);
        const profileStatus = await AsyncStorage.getItem(userStatus);
        console.log("status", profileStatus);
        const login = await AsyncStorage.getItem("isLoggedIn");
        console.log("isLogin", login);
      } else {
        showMessage({
          message: response.data.msg,
          type: "danger",
          animationDuration: 500,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    // if (route.params.logout) {
    //   console.log("hellllooooooo");
    // }
    clearStorage();
  }, []);

  // ? VALIDATE-INPUT
  const validate = () => {
    const { emailId, password } = formData;
    let flag = true;
    let validateEmailID = appUtils.validateEmail(emailId);

    if (validateEmailID === 1) {
      setErrorEmail({
        field: "emailId",
        message: "",
      });
    }

    if (!(validateEmailID === 1)) {
      let msg = "";
      if (validateEmailID === 0) {
        msg = "Please enter your email address.";
      } else {
        msg = "That doesn't look like an email address.";
      }
      setErrorEmail({
        field: "emailId",
        message: msg,
      });
      flag = false;
    }

    // ? password
    if (password) {
      if (password.length < 8) {
        setErrorPassword({
          field: "password",
          message: "Your password is too short. It needs to be 8+ characters",
        });
        flag = false;
      }
      if (password.length > 8) {
        setErrorPassword({
          field: "password",
          message: "",
        });
        flag = true;
      }
    } else {
      setErrorPassword({
        field: "password",
        message: "Please enter your password.",
      });
      flag = false;
    }

    return flag;
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={loginScreen.scroll}>
          <View style={loginScreen.icondiv}>
            <Image source={logoName} style={loginScreen.logoImg} />
          </View>
          <View style={loginScreen.textContant}>
            <Text style={newTestStyle.headingW}>Welcome To Plunge</Text>
            <Text style={{ textAlign: "center" }}>
              Plunge provides a secure, discrete, subscriber-based community for
              responsible, sexually active adults.
            </Text>
          </View>
          <ImageBackground
            source={loginScr}
            resizeMode="cover"
            style={[
              registration.image,
              {
                height: 500,
              },
            ]}
          >
            <Text style={registration.logheading}>User Login</Text>
            <View>
              <TextInput
                style={[
                  errorEmail
                    ? registration.inputFeildNomb
                    : registration.inputFeild,
                ]}
                placeholder="Email Address"
                onChangeText={(value) => inputHandaler("emailId", value)}
                value={formData.emailId}
              />
              {errorEmail.field === "emailId" && (
                <Text style={registration.erroMeg}>{errorEmail.message}</Text>
              )}
              <TextInput
                secureTextEntry
                style={[
                  errorPassword
                    ? registration.inputFeildNomb
                    : registration.inputFeild,
                ]}
                placeholder="Password"
                onChangeText={(value) => inputHandaler("password", value)}
                value={formData.password}
              />
              {errorPassword.field === "password" && (
                <Text style={registration.erroMeg}>
                  {errorPassword.message}
                </Text>
              )}

              <TouchableOpacity onPress={handleSubmit}>
                <LinearGradient
                  //style={newTestStyle.regisButton}
                  style={registration.button}
                  colors={["#7d0ebe", "#BD69EE"]}
                  start={{ x: 0.7, y: 0.8 }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Entypo
                      name="arrow-long-right"
                      style={{ marginRight: 15 }}
                      size={20}
                      color="#fff"
                    />
                    <Text
                      style={{
                        marginRight: 15,
                        color: "#fff",
                        fontWeight: "600",
                      }}
                    >
                      LOGIN NOW
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <Text style={registration.forgot}>
            <TouchableOpacity
              style={registration.touchBtn}
              onPress={() => forgotNaviget("forgot")}
            >
              <Text style={registration.forgot}>forgot password ?</Text>
            </TouchableOpacity>
          </Text>
          <View
            style={[
              registration.pragreph,
              {
                width: 300,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              },
            ]}
          >
            <Text style={registration.pragrephContaint}>
              Don't Have account ? {""}
            </Text>
            <LinearGradient
              style={newTestStyle.regisButton}
              colors={["#264c97", "#2f6be0"]}
              start={{ x: 0.6, y: 0.2 }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={newTestStyle.regText}>Register Now</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
