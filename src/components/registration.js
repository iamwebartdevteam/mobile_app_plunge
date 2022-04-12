import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Picker,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import Checkbox from "expo-checkbox";
import { registration } from "../../assets/style";
import loginBg from "../../assets/loginbg.png";
import { Button } from "react-native-paper";
import { useState } from "react";
import * as API from "../Api/apiHalper";
import * as appUtils from "../utility/appUtils";
import { showMessage, hideMessage } from "react-native-flash-message";
import { isLogin, lgoinKey, userStatus } from "../utility/commonStaticData";
import { Entypo } from "@expo/vector-icons";
const initialData = {
  fname: "",
  lname: "",
  userName: "",
  emailId: "",
  password: "",
  confirmPassword: "",
  gender: "",
  dob: "",
};

const RegistrationH = ({ navigation }) => {
  const handalNaviget = (screenName) => {
    navigation.navigate(screenName);
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [agree, setAgree] = useState(false);
  const [userAge, setUserAge] = useState("");

  // ? Error validation masseg
  const [allErrorMsg, setAllErrorMsg] = useState([]);
  const [errorMas, setErrorMas] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmErrorPasword, setConfirmErrorPasword] = useState("");
  console.log("allErrorMsg", allErrorMsg);
  const [loginKey, setLoginKey] = useState("");

  // ? INPUT HANDALER
  const inputHandaler = (name, value) => {
    switch (name) {
      case "emailId":
        setErrorEmail("");
        break;
      case "fname":
        setErrorName("");
        break;
      case "lname":
        setErrorLastName("");
        break;
      case "userName":
        setUserName("");
        break;
      case "password":
        setErrorPassword("");
        break;
      case "confirmPassword":
        setConfirmErrorPasword("");
        break;
      default:
        break;
    }
    const currentTime = new Date();
    const currentYear = currentTime.getFullYear();
    if (name === "dob") {
      const errorMess = currentYear - value;
      if (errorMess < 19) {
        showMessage({
          message: "You are not eligible",
          type: "danger",
          animationDuration: 800,
        });
      } else {
        setUserAge("");
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  // ? SIGNUP BUTTON START
  const submitButton = async () => {
    setLoading(true);
    let flag = validate();
    if (!flag) {
      setLoading(false);
      return;
    }
    try {
      const reqObj = {
        fname: formData.fname,
        lname: formData.lname,
        userName: formData.userName,
        emailId: formData.emailId,
        password: formData.password,
        gender: formData.gender,
        dob: formData.dob,
      };
      console.log("reqObj", reqObj);

      const response = await API.user_registration(reqObj);
      console.log("response", response);

      if (response.status === 200) {
        navigation.navigate("mailOtp", {
          loginId: response.data.data.id,
          message: response.data.message,
        });
        await AsyncStorage.setItem(
          lgoinKey,
          JSON.stringify(response.data.data.id)
        );
        await AsyncStorage.setItem(
          userStatus,
          JSON.stringify(response.data.data.status)
        );
        await AsyncStorage.setItem(isLogin, JSON.stringify(true));
        const userId = await AsyncStorage.getItem(lgoinKey);
        console.log("loginId", userId);
        const profileStatus = await AsyncStorage.getItem(userStatus);
        console.log("status", profileStatus);
        const login = await AsyncStorage.getItem(isLogin);
        console.log("isLogin", login);
      }
      response.data.msg.errors.map((item) => setAllErrorMsg(item.message));
      showMessage({
        message: allErrorMsg,
        type: "danger",
        animationDuration: 800,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem(lgoinKey);
  //     console.log("loginId", value);
  //     setLoginKey(value);
  //     if (value !== null) {
  //       // value previously stored
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };
  const getDataSt = async () => {
    try {
      const value = await AsyncStorage.getItem(userStatus);
      console.log("status", value);
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  // ? VALIDATE-INPUT
  const validate = () => {
    const { emailId, password, fname, lname, userName, confirmPassword } =
      formData;
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

    //?   Firt name
    let validateName = appUtils.validateName(fname);
    if (validateName === 1) {
      setErrorName({
        field: "fname",
        message: "",
      });
    }
    if (!(validateName === 1)) {
      let msg = "";
      if (validateName === 0) {
        msg = "Please enter your first name";
      } else {
        msg = "That doesn't look like a name.";
      }
      setErrorName({
        field: "fname",
        message: msg,
      });
      flag = false;
    }

    //   Last name
    let validateLastName = appUtils.validateLastName(lname);
    if (validateLastName === 1) {
      setErrorLastName({
        field: "lname",
        message: "",
      });
    }
    if (!(validateLastName === 1)) {
      let msg = "";
      if (validateLastName === 0) {
        msg = "Please enter your last name.";
      } else {
        msg = "That doesn't look like a last name.";
      }
      setErrorLastName({
        field: "lname",
        message: msg,
      });
      flag = false;
    }

    // ?  UER name
    let validateUserName = appUtils.validateUserName(userName);
    if (validateUserName === 1) {
      setUserName({
        field: "userName",
        message: "",
      });
    }
    if (!(validateUserName === 1)) {
      let msg = "";
      if (validateUserName === 0) {
        msg = "Please enter your user name.";
      }
      setUserName({
        field: "userName",
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

    // ? confirmPassword

    if (password === "" || password !== confirmPassword) {
      setConfirmErrorPasword({
        field: "confirmPassword",
        message: "Please confirm your password",
      });
      flag = false;
    } else {
      setConfirmErrorPasword({
        field: "confirmPassword",
        message: "",
      });
      flag = true;
    }

    return flag;
  };

  const disable =
    !formData.fname ||
    !formData.lname ||
    !formData.userName ||
    !formData.emailId ||
    !formData.password ||
    !formData.dob ||
    !formData.confirmPassword ||
    !formData.gender;

  useEffect(async () => {
    //submitButton();
    // getData();
    getDataSt();
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
          <Text style={registration.heading}>create account</Text>
          <View>
            <TextInput
              style={[registration.inputFeild]}
              placeholder="First Name"
              onChangeText={(value) => inputHandaler("fname", value)}
              value={formData.fname}
            />
            {/* {errorName.field === "fname" && (
              <Text style={registration.erroMeg}>{errorName.message}</Text>
            )} */}
            <TextInput
              style={[registration.inputFeild]}
              placeholder="Last Name"
              onChangeText={(value) => inputHandaler("lname", value)}
              value={formData.lname}
            />
            {/* {errorLastName.field === "lname" && (
              <Text style={registration.erroMeg}>{errorLastName.message}</Text>
            )} */}
            <TextInput
              style={[
                userName
                  ? registration.inputFeildNomb
                  : registration.inputFeild,
              ]}
              placeholder="User Name"
              onChangeText={(value) => inputHandaler("userName", value)}
              value={formData.userName}
            />
            {userName.field === "userName" && (
              <Text style={registration.erroMeg}>{userName.message}</Text>
            )}
            <View style={registration.inputFeild}>
              <Picker
                selectedValue={formData.gender}
                style={{ height: 40, width: "100%" }}
                onValueChange={(itemValue) =>
                  inputHandaler("gender", itemValue)
                }
              >
                <Picker.Item label="Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="X" value="X" />
              </Picker>
            </View>

            <TextInput
              style={[registration.inputFeild, { marginBottom: 0 }]}
              placeholder="Birth Years"
              onChangeText={(value) => inputHandaler("dob", value)}
              value={formData.dob}
              keyboardType="numeric"
            />
            <Text style={registration.errorMessage}>{userAge}</Text>
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
              <Text style={registration.erroMeg}>{errorPassword.message}</Text>
            )}
            <TextInput
              secureTextEntry
              style={[
                confirmErrorPasword
                  ? registration.inputFeildNomb
                  : registration.mbsm,
              ]}
              placeholder="Confirm Password"
              onChangeText={(value) => inputHandaler("confirmPassword", value)}
              value={formData.confirmPassword}
            />
            {confirmErrorPasword.field === "confirmPassword" && (
              <Text style={registration.erroMeg}>
                {confirmErrorPasword.message}
              </Text>
            )}
            <View style={registration.checkBoxSec}>
              <Checkbox
                style={registration.checkBox}
                value={agree}
                onValueChange={() => setAgree(!agree)}
                color={agree ? "#BD69EE" : undefined}
              />
              <Text style={registration.checkLable}>
                I accept the terms and conditions {agree ? "👍" : ""}
              </Text>
            </View>
            <Button
              style={[
                registration.button,
                {
                  backgroundColor: !disable && agree ? "#BD69EE" : "grey",
                  paddingVertical: 2,
                },
              ]}
              icon={{ source: "arrow-right", direction: "ltr" }}
              mode="contained"
              disabled={!agree || disable}
              onPress={submitButton}
            >
              Register NOW
            </Button>
          </View>

          <View style={registration.pragreph}>
            <Text style={registration.pragrephContaint}>
              Already Registered ? {""}
            </Text>
            <Text
              style={registration.login}
              onPress={() => handalNaviget("login")}
            >
              Login Now
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default RegistrationH;
