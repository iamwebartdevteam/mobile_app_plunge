import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { dashBoard, editProfile, registration } from "../../assets/style";
import loginBg from "../../assets/subBg.png";
import { useState } from "react";
import { Button } from "react-native-paper";
import * as API from "../Api/apiHalper";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lgoinKey, userStatus } from "../utility/commonStaticData";
import { Entypo } from "@expo/vector-icons";
import { CURRENCY } from "../Api/constant";
import * as c from "../Api/constant";
import { io } from "socket.io-client";
import { showMessage } from "react-native-flash-message";

const socket = io(c.URL);
const Payment = ({ navigation, route }) => {
  useEffect(() => {
    subscription_plan();
  }, []);
  console.log("route", route.params.planId);
  const [formData, setFormData] = useState([]);
  const [subsAmount, setSubsAmount] = useState("");
  const [disable, setDisable] = useState(false);

  const amount = route.params.amount + ".00";

  // ?>>>>>>>> INPUT HANDALER =======>>>>>>
  const inputHandaler = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // ? SUBSCRIPTION PLAN BY ID
  const subscription_plan = async () => {
    try {
      const reqOBj = {
        id: route.params.planId,
      };
      const respons = await API.subscription_getID(reqOBj);
      console.log("respons", respons.data.data);
      setSubsAmount(respons.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const btnDisabel =
    !formData.recipient_name ||
    !formData.line1 ||
    !formData.line2 ||
    !formData.city ||
    !formData.country_code ||
    !formData.postal_code ||
    !formData.phone ||
    !formData.state;

  // ? PAYMENT SUBMIT
  const submitButton = async () => {
    setDisable(true);
    try {
      const reqObj = {
        userId: await AsyncStorage.getItem(lgoinKey),
        currency: CURRENCY,
        subscribeId: route.params.planId,
        amount: route.params.amount,
        details: {
          subtotal: "30.00",
          tax: "0.07",
          shipping: "0.03",
          handling_fee: "1.00",
          shipping_discount: "-1.00",
          insurance: "0.01",
        },
        billingAddress: {
          recipient_name: formData.recipient_name,
          line1: formData.line1,
          line2: formData.line2,
          city: formData.city,
          country_code: formData.country_code,
          postal_code: formData.postal_code,
          phone: formData.phone,
          state: formData.state,
        },
      };
      console.log("reqObj", reqObj);
      return false;
      const response = await API.add_payment(reqObj);
      console.log("response", response);
      if (response.status === 200) {
        socket.emit("sendEvent", {
          id: await AsyncStorage.getItem(lgoinKey),
          message: formData.recipient_name + " Purchase one subscription plan!",
          showOn: "admin",
        });
        navigation.navigate("Subscriptions");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const disabledbtnPayment = () => {
    showMessage({
      message: "Please enter your payment details",
      type: "danger",
      animationDuration: 1000,
    });
  };

  return (
    <View style={dashBoard.dasboardScreen}>
      <ImageBackground
        source={loginBg}
        resizeMode="cover"
        style={registration.image}
      >
        <View style={[dashBoard.editProfileFormBg]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={[dashBoard.dasboardScreen, editProfile.formBgScreen]}>
              <TextInput
                style={editProfile.inputFeild}
                placeholder="Amount"
                editable={false}
                value={amount}
              />
              <TextInput
                style={editProfile.inputFeild}
                placeholder="Recipient Name"
                onChangeText={(value) => inputHandaler("recipient_name", value)}
                value={formData.recipient_name}
              />
              <TextInput
                style={editProfile.inputFeild}
                placeholder="Line1"
                onChangeText={(value) => inputHandaler("line1", value)}
                value={formData.line1}
              />
              <TextInput
                style={editProfile.inputFeild}
                placeholder="Line2"
                onChangeText={(value) => inputHandaler("line2", value)}
                value={formData.line2}
              />
              <TextInput
                style={editProfile.inputFeild}
                placeholder="City"
                onChangeText={(value) => inputHandaler("city", value)}
                value={formData.city}
              />
              <TextInput
                style={editProfile.inputFeild}
                placeholder="Country Name"
                onChangeText={(value) => inputHandaler("country_code", value)}
                value={formData.country_code}
              />
              <TextInput
                style={editProfile.inputFeild}
                placeholder="Postal Code"
                onChangeText={(value) => inputHandaler("postal_code", value)}
                value={formData.postal_code}
              />
              <TextInput
                style={editProfile.inputFeild}
                placeholder="Phone"
                onChangeText={(value) => inputHandaler("phone", value)}
                value={formData.phone}
              />
              <TextInput
                style={editProfile.inputFeild}
                placeholder="State"
                onChangeText={(value) => inputHandaler("state", value)}
                value={formData.state}
              />
              {btnDisabel ? (
                <TouchableOpacity
                  onPress={disabledbtnPayment}
                  style={[
                    registration.button,
                    editProfile.updateBtn,
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
                  <Text style={{ color: "#fff", fontWeight: "700" }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    registration.button,
                    editProfile.updateBtn,
                    {
                      backgroundColor: disable === false ? "#BD69EE" : "gray",
                    },
                  ]}
                  disabled={disable}
                  onPress={submitButton}
                >
                  {disable === false ? (
                    <>
                      <Entypo
                        name="arrow-long-right"
                        style={{ marginRight: 15 }}
                        size={20}
                        color="#fff"
                      />
                      <Text
                        disabled={btnDisabel}
                        style={{ color: "#fff", fontWeight: "700" }}
                      >
                        Submit
                      </Text>
                    </>
                  ) : (
                    <>
                      <ActivityIndicator
                        size="small"
                        color="#0000ff"
                        style={{ marginRight: 15 }}
                      />
                      <Text style={{ fontWeight: "700", color: "#000" }}>
                        Loading...
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Payment;
