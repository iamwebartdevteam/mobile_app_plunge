import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { loginScreen, registration } from "../../assets/style";
import loginBg from "../../assets/loginbg.png";
import { Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
const Forgotpassword = ({ navigation }) => {
  // ? forgot screen page naviget
  const forgotNaviget = (screenName) => {
    navigation.navigate(screenName);
  };

  useEffect(() => {}, []);

  return (
    <View style={loginScreen.container}>
      <ImageBackground
        source={loginBg}
        resizeMode="cover"
        style={registration.image}
      >
        <View style={loginScreen.icondiv}>
          <Entypo name="lock-open" size={50} color="#BD69EE" />
        </View>
        <Text style={loginScreen.logheading}>Forgotten password ?</Text>
        <View>
          <TextInput
            style={registration.inputFeild}
            placeholder="Email Address"
          />
          <Button
            style={registration.button}
            icon={{ source: "arrow-right", direction: "ltr" }}
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            SEND REQUEST
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Forgotpassword;
