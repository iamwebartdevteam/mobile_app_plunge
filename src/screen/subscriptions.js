import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { dashBoard, registration } from "../../assets/style";
import loginBg from "../../assets/subBg.png";
import * as API from "../Api/apiHalper";
import { showMessage } from "react-native-flash-message";
import { lgoinKey, userStatus } from "../utility/commonStaticData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const Subscriptions = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState([]);
  const [userData, setuserData] = useState([]);
  const [subscribeId, setSubscribeId] = useState([]);

  // ? USER STATUS CONFIGARATION
  const getDataSt = async () => {
    try {
      const value = await AsyncStorage.getItem(userStatus);
      console.log("svalue", value);
      if (JSON.parse(value) === "0" || JSON.parse(value) === "1") {
        navigation.navigate("imageUpload");
        showMessage({
          message: "Please update your profile details",
          type: "danger",
          animationDuration: 1000,
        });
      }
    } catch (e) {
      // error reading value
    }
  };

  // ? USER SUBSCRIPTION PALN SHOW
  const subscription_plan = async () => {
    try {
      const respons = await API.subscription_get();
      console.log("respons", respons.data.data);
      setSubscription(respons.data.data);
      if (respons.status === 200) {
        setLoading(respons.data.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // ? GET USER PAYMENT DETAILS
  const get_user_payment_details = async () => {
    try {
      const reqObj = {
        id: await AsyncStorage.getItem(lgoinKey),
      };
      const response = await API.user_payment_details(reqObj);
      console.log("response_sub", response);
      var expdate = moment(response.data.data.endDate).format("YYYY-MM-DD");
      var given = moment(expdate, "YYYY-MM-DD");
      var current = moment().startOf("day");
      setSubscribeId(response.data.data.subscribeId);
      setuserData(moment.duration(given.diff(current)).asDays());
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    subscription_plan();
    getDataSt();
    get_user_payment_details();
  }, []);

  return (
    <View
      style={[
        dashBoard.dasboardScreen,
        {
          padding: 0,
        },
      ]}
    >
      <ImageBackground
        source={loginBg}
        resizeMode="cover"
        style={registration.image}
      >
        <View style={dashBoard.subScrollbg}>
          {loading === true ? (
            <Text>
              <ActivityIndicator size="large" color="red" />
            </Text>
          ) : (
            <FlatList
              data={subscription}
              horizontal
              renderItem={(element) => {
                return (
                  <View style={dashBoard.subPackeg}>
                    <Text style={dashBoard.packageHeading}>
                      {element.item.name}
                    </Text>
                    <Text style={dashBoard.pragarph}>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour,{" "}
                    </Text>
                    <View style={dashBoard.subImgIcon}>
                      <FontAwesome5 name="credit-card" size={60} color="#fff" />
                    </View>
                    <View style={dashBoard.subPackDetail}>
                      <Text style={dashBoard.subpackageAmount}>
                        ${element.item.amount}.00
                      </Text>
                      <Text
                        style={[
                          subscribeId === element.item.id
                            ? dashBoard.expiryDate
                            : dashBoard.subPacMonth,
                        ]}
                      >
                        {subscribeId === element.item.id
                          ? "Expire in " + userData + " Days"
                          : element.item.valid + " Month"}
                      </Text>
                    </View>
                    {/* <Text style={dashBoard.packageValidDate}>25/02/22</Text> */}
                    {subscribeId === element.item.id ? (
                      <Text
                        style={[
                          dashBoard.subpackageStatus,
                          {
                            backgroundColor: "green",
                          },
                        ]}
                      >
                        Active Plan
                      </Text>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("payment", {
                            planId: element.item.id,
                          })
                        }
                      >
                        <Text style={dashBoard.subpackageStatus}>
                          SELECT PLAN
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Subscriptions;
