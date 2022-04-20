import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Picker,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import loginBg from "../../assets/subBg.png";
import {
  dashBoard,
  editProfile,
  newTestStyle,
  registration,
} from "../../assets/style";
import DatePicker from "react-native-datepicker";
import * as API from "../Api/apiHalper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lgoinKey, userStatus } from "../utility/commonStaticData";
import moment from "moment";
import { showMessage } from "react-native-flash-message";
import * as c from "../Api/constant";
import { Entypo } from "@expo/vector-icons";
import { io } from "socket.io-client";

const socket = io(c.URL);
const initialData = {
  zipCode: "",
  laboratoryId: "",
  date: "",
};
const NewTest = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [labName, setLabName] = useState([]);
  const [formData, setFormData] = useState(initialData);
  const [disable, setDisable] = useState(false);
  const [labnameLoader, setLabnameLoader] = useState(false);

  // ? >>>>>>>> INPUT VALIDATION
  const [errorZipCode, setErrorZipCode] = useState("");
  const [errorLabName, setErrorLabName] = useState("");

  // ?>>>>>>>> INPUT HANDALER =======>>>>>>
  const inputHandaler = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // ? >>>>>>> NEW SEND REQUEST BTN =====>>>>>>>>>>
  const submitButtonRequest = async () => {
    setDisable(true);
    try {
      const reqObj = {
        userId: await AsyncStorage.getItem(lgoinKey),
        zipCode: formData.zipCode,
        laboratoryId: formData.laboratoryId,
        date: moment(date).format("YYYY-MM-DD"),
      };
      console.log("reqObj", reqObj);

      const response = await API.send_request(reqObj);
      console.log("response", response);
      if (response.status === 200) {
        navigation.navigate("qrcode");
        showMessage({
          message: "Thank You For Notifying Us Of A New STI Test",
          type: "success",
          animationDuration: 900,
        });
        socket.emit("sendEvent", {
          id: await AsyncStorage.getItem(lgoinKey),
          message: "We Have Received Your New STI Test Notification!",
          showOn: await AsyncStorage.getItem(lgoinKey),
        });
        socket.emit("sendEvent", {
          id: await AsyncStorage.getItem(lgoinKey),
          message: "You received one new test request!",
          showOn: "admin",
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // ? LAB NAME LIST
  const labnameList = async () => {
    try {
      const response = await API.labname_list();
      setLabName(response.data.data);
      setLabnameLoader(response.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const validition = !formData.zipCode || !formData.laboratoryId || !date;

  const disabledbtnRequst = () => {
    if (!formData.zipCode) {
      setErrorZipCode(
        showMessage({
          message: "Please enter your zipCode",
          type: "danger",
          animationDuration: 1000,
        })
      );
    } else if (!formData.laboratoryId) {
      setErrorLabName(
        showMessage({
          message: "Please select your lab name",
          type: "danger",
          animationDuration: 1000,
        })
      );
    }
    if (formData.zipCode || formData.laboratoryId) {
    } else {
      showMessage({
        message: "Please enter your request details",
        type: "danger",
        animationDuration: 1000,
      });
    }
  };

  useEffect(() => {
    labnameList();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={loginBg}
        resizeMode="cover"
        style={registration.image}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={[
              dashBoard.subPackeg,
              {
                marginRight: 0,
                justifyContent: "flex-start",
              },
            ]}
          >
            <DatePicker
              style={[editProfile.inputFeild, newTestStyle.dateFeild]}
              date={date}
              mode="date"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  display: "none",
                },
                dateInput: {
                  borderWidth: 0,
                  alignItems: "flex-start",
                },
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />
            <TextInput
              style={[
                editProfile.inputFeild,
                {
                  marginTop: 30,
                },
              ]}
              placeholder="Zip code"
              keyboardType="numeric"
              onChangeText={(value) => inputHandaler("zipCode", value)}
              value={formData.zipCode}
            />
            <View
              style={[
                editProfile.inputFeild,
                {
                  marginTop: 30,
                  marginBottom: 50,
                },
              ]}
            >
              <Picker
                selectedValue={formData.laboratoryId}
                style={{ height: 40, width: "100%" }}
                onValueChange={(itemValue) =>
                  inputHandaler("laboratoryId", itemValue)
                }
              >
                <Picker.Item label="Lab name" value="" />
                {labnameLoader === false ? (
                  <Picker.Item label="Please wait ..." value="" />
                ) : (
                  labName.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.id}
                    />
                  ))
                )}
              </Picker>
            </View>

            {validition ? (
              <TouchableOpacity
                onPress={disabledbtnRequst}
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
                <Text style={{ color: "#fff", fontWeight: "700" }}>Submit</Text>
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
                onPress={submitButtonRequest}
              >
                {disable === false ? (
                  <>
                    <Entypo
                      name="arrow-long-right"
                      style={{ marginRight: 15 }}
                      size={20}
                      color="#fff"
                    />
                    <Text style={{ color: "#fff", fontWeight: "700" }}>
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
      </ImageBackground>
    </View>
  );
};

export default NewTest;
