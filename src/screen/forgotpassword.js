import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { loginScreen, notification, registration } from "../../assets/style";
import loginBg from "../../assets/loginbg.png";
import { Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import * as API from "../Api/apiHalper";
const initialForgot = {
  emailId: "",
};
const initialData = {
  password: "",
  confirmPassword: "",
};
const Forgotpassword = ({ navigation }) => {
  // ? forgot screen page naviget
  const forgotNaviget = (screenName) => {
    navigation.navigate(screenName);
  };
  // ? forgot Password
  const [isEmail, setIsEmail] = useState(0);
  const [forgotData, setForgotData] = useState(initialForgot);
  const [newPassword, setNewPassword] = useState(initialData);

  // ? forgot handelar
  const forgotHandelar = (name, value) => {
    setForgotData({ ...forgotData, [name]: value });
  };
  // ? forgot email submit
  const emailSubmit = async () => {
    try {
      const reqObj = {
        emailId: forgotData.emailId,
      };
      console.log("reqObj", reqObj);

      const respones = await API.user_forgot_password(reqObj);
      console.log("respones", respones);
      // seterrorEmailMess(respones.data.msg);
      // if (respones.status === 200) {
      //   setIsEmail(1);
      // }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {}, []);

  return (
    <View style={loginScreen.container}>
      <ImageBackground
        source={loginBg}
        resizeMode="cover"
        style={registration.image}
      >
        <View style={[loginScreen.icondiv, loginScreen.extraIcon]}>
          <Entypo name="lock-open" size={50} color="#BD69EE" />
        </View>
        <Text style={loginScreen.logheading}>Forgotten password ?</Text>
        <View>
          <TextInput
            style={registration.inputFeild}
            placeholder="Email Address"
            onChangeText={(value) => forgotHandelar("emailId", value)}
            value={forgotData.emailId}
          />
          <TouchableOpacity onPress={emailSubmit} style={registration.button}>
            <Entypo
              name="arrow-long-right"
              style={{ marginRight: 15 }}
              size={20}
              color="#fff"
            />
            <Text style={notification.forgotBtn}> SEND REQUEST</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Forgotpassword;
