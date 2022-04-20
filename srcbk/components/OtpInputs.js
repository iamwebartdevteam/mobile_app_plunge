import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

class OtpInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.refs.nameref.focus();
  }

  render() {
    return (
      <View>
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
              <View style={loginScreen.userImg}>
                <View style={loginScreen.icondiv}>
                  <FontAwesome5 name="user-check" size={50} color="#BD69EE" />
                </View>
              </View>
              <View style={loginScreen.otpFeildSection}>
                <TextInput
                  style={registration.otpfeild}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => inputHandaler("firstV", value)}
                  value={formData.firstV}
                />
                <TextInput
                  style={registration.otpfeild}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => inputHandaler("secndV", value)}
                  value={formData.secndV}
                />
                <TextInput
                  style={registration.otpfeild}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => inputHandaler("thardV", value)}
                  value={formData.thardV}
                />
                <TextInput
                  style={registration.otpfeild}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => inputHandaler("fourthV", value)}
                  value={formData.fourthV}
                />
                <TextInput
                  style={registration.otpfeild}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => inputHandaler("fivetV", value)}
                  value={formData.fivetV}
                />
                <TextInput
                  style={registration.otpfeild}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => inputHandaler("sixThV", value)}
                  value={formData.sixThV}
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
                  onPress={() => handalNaviget("mailOtp")}
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
      </View>
    );
  }
}

export default OtpInputs;
