import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Picker,
  ScrollView,
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

  // ?>>>>>>>> INPUT HANDALER =======>>>>>>
  const inputHandaler = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const submitButtonRequest = async () => {
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
        navigation.navigate("testhistory");
        showMessage({
          message: "Thank You For Notifying Us Of A New STI Test",
          type: "success",
          animationDuration: 900,
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
    } catch (error) {
      console.log("Error", error);
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
                {labName.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.id} />
                ))}
              </Picker>
            </View>
            <Button
              style={[registration.button, editProfile.updateBtn]}
              icon={{ source: "arrow-right", direction: "ltr" }}
              mode="contained"
              //disabled={!agree}
              onPress={submitButtonRequest}
            >
              submit
            </Button>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default NewTest;
