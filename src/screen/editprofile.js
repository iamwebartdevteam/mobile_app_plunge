import {
  View,
  Text,
  ScrollView,
  Picker,
  TextInput,
  ImageBackground,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useRef } from "react";
import {
  dashBoard,
  editProfile,
  loginScreen,
  notification,
  registration,
} from "../../assets/style";
import loginBg from "../../assets/subBg.png";
import { useState } from "react";
import { Button } from "react-native-paper";
import * as API from "../Api/apiHalper";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lgoinKey, userStatus } from "../utility/commonStaticData";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import * as c from "../Api/constant";
import { io } from "socket.io-client";
import { showMessage } from "react-native-flash-message";
import MobileOtp from "./mobileOtp";

const socket = io(c.URL);

const initialData = {
  fname: "",
  lname: "",
  userName: "",
  mobileNo: "",
  emailId: "",
  dob: "",
  gender: "",
  zipCode: "",
  countryName: "",
  stateName: "",
  cityName: "",
};

const initEditMobile = {
  mobileNo: "",
};

const EditProfile = ({ navigation }) => {
  const pin1ref = useRef(null);
  const pin2ref = useRef(null);
  const pin3ref = useRef(null);
  const pin4ref = useRef(null);
  const pin5ref = useRef(null);
  const pin6ref = useRef(null);

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [pin5, setPin5] = useState("");
  const [pin6, setPin6] = useState("");

  const handalNaviget = (screenName) => {
    navigation.navigate(screenName);
  };
  const [formData, setFormData] = useState(initialData);
  const [yourstate, setYourstate] = useState("");
  const [city, setCity] = useState([]);
  const [pinCode, setPinCode] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [editMobileNo, setEditMobileNo] = useState(initEditMobile);

  // ? EDIT EMAIL AND OTP VARIFICATION STATUS MAINTAINS
  const [isEmailSection, setIsEmailSection] = useState(0);
  const [isMobileSection, setIsMobileSection] = useState(0);
  const [mobileOtp, setMobileOtp] = useState(0);

  // ?>>>>>>>>>>>> USER DETAILS BY ID >>>>>>>>>>>>>>
  const user_details_byid = async () => {
    try {
      const value = await AsyncStorage.getItem(lgoinKey);
      console.log("value", value);
      const reqObj = {
        id: await AsyncStorage.getItem(lgoinKey),
      };
      const response = await API.user_data_id(reqObj);
      console.log("Editresponse", JSON.stringify(response.data.data.zipCode));
      setFormData(response.data.data);
      get_load(response.data.data.zipCode, response.data.data.countryName);
    } catch (error) {
      console.log("error", error);
    }
  };

  // ?>>>>>>>> INPUT HANDALER =======>>>>>>
  const inputHandaler = (name, value) => {
    if (name === "zipCode") {
      getState(value);
    }
    setFormData({ ...formData, [name]: value });
  };

  const getState = async (value) => {
    setPinCode(value);
    //  setFormData({ ...formData, [name]: value });
    get_load(value, formData.countryName ? formData.countryName : "US");
  };

  // ? >>>>>> SUBMIT BUTTON EDIT USER ====>>>>>>>
  const submitButton = async () => {
    try {
      const proFileStatus = await AsyncStorage.getItem(userStatus);
      const reqObj = {
        fname: formData.fname,
        lname: formData.lname,
        userName: formData.userName,
        mobileNo: formData.mobileNo,
        emailId: formData.emailId,
        dob: formData.dob,
        gender: formData.gender,
        zipCode: formData.zipCode,
        countryName: "US",
        stateName: yourstate,
        cityName: formData.cityName,
        id: await AsyncStorage.getItem(lgoinKey),
        status: proFileStatus > 1 ? proFileStatus : "1",
      };
      console.log("reqObj", reqObj);
      const response = await API.user_update(reqObj);
      if (response.status === 200) {
        showMessage({
          message: "Update successfully",
          type: "success",
          animationDuration: 1000,
        });
        navigation.navigate("imageUpload");
        socket.emit("sendEvent", {
          id: await AsyncStorage.getItem(lgoinKey),
          message: "Your Profile Information Has Changed!",
          showOn: await AsyncStorage.getItem(lgoinKey),
        });
      }
      console.log("response", response);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // ? ZPI CODE API START
  const get_load = async (pincode, countryCode) => {
    try {
      if (pincode !== null && countryCode !== null) {
        const respons = await fetch(
          `https://zipcode.apibag.in/api/pincodes/${pincode}/${countryCode}`
        );
        const actualData = await respons.json();
        const zipCodeData = actualData.data;
        formData.stateName = zipCodeData[0].stateName;
        formData.cityName = actualData.data.cityName;
        setYourstate(zipCodeData[0].stateName);
        setCity(actualData.data);
        console.log("actualData", actualData.data);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  // ? Edit Mobile Number Handaler
  const editMobileHandaler = (name, value) => {
    setEditMobileNo({ ...editMobileNo, [name]: value });
  };

  // ? EDIT MOBILE NUMBER SUBMIT
  const editMobileNumber = async () => {
    try {
      const reqObj = {
        id: await AsyncStorage.getItem(lgoinKey),
        mobileNo: editMobileNo.mobileNo,
      };
      console.log("reqObj", reqObj);
      const response = await API.user_mobile(reqObj);
      if (response.status === 200) {
        setMobileOtp(response.data.otp);
        setIsMobileSection(1);
        showMessage({
          message: "Mobile no update successfully",
          type: "success",
          animationDuration: 1000,
        });
      }
      console.log("response", response);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // ? MOBILE NUMBER OTP SUBMIT
  const mobileNumberOtp = async () => {
    try {
      const reqObj = {
        id: await AsyncStorage.getItem(lgoinKey),
        otp: pin1 + pin2 + pin3 + pin4 + pin5 + pin6,
      };
      console.log("reqObj", reqObj);
      const response = await API.user_mobile_verification(reqObj);
      console.log("response", response);
      if (response.status === 200) {
        user_details_byid();
        setModalVisible(!modalVisible);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    user_details_byid();
  }, []);

  return (
    <View style={dashBoard.dasboardScreen}>
      <ImageBackground
        source={loginBg}
        resizeMode="cover"
        style={registration.image}
      >
        <View
          style={[
            dashBoard.subPackeg,
            {
              marginRight: 0,
              marginTop: 0,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              height: "80%",
              paddingHorizontal: 0,
            },
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={[dashBoard.dasboardScreen, editProfile.formBgScreen]}>
              <TextInput
                style={editProfile.inputFeild}
                placeholder="First Name"
                editable={false}
                onChangeText={(value) => inputHandaler("fname", value)}
                value={formData.fname}
              />
              <TextInput
                style={editProfile.inputFeild}
                placeholder="Last Name"
                editable={false}
                onChangeText={(value) => inputHandaler("lname", value)}
                value={formData.lname}
              />
              <TextInput
                style={[editProfile.inputFeild, { marginBottom: 0 }]}
                placeholder="User Name"
                editable={false}
                onChangeText={(value) => inputHandaler("userName", value)}
                value={formData.userName}
              />
              <View style={editProfile.editIcon}>
                <Pressable
                  style={[styles.buttonOpen]}
                  onPress={() => setModalVisible(true)}
                >
                  <Feather name="edit" size={15} color="#000" />
                </Pressable>
              </View>
              <TextInput
                style={[editProfile.inputFeild, { marginBottom: 0 }]}
                placeholder="Mobile Number"
                onChangeText={(value) => inputHandaler("mobileNo", value)}
                value={formData.mobileNo}
                keyboardType="numeric"
              />
              <View
                style={editProfile.editIcon}
                onPress={() => setEmailModalVisible(true)}
              >
                <Feather name="edit" size={15} color="#000" />
              </View>
              <TextInput
                style={editProfile.inputFeild}
                placeholder="Email Address"
                onChangeText={(value) => inputHandaler("emailId", value)}
                value={formData.emailId}
              />
              <View style={editProfile.inputFeild}>
                <Picker
                  selectedValue={formData.gender}
                  style={{ height: 40, width: "100%" }}
                  onValueChange={(itemValue) =>
                    inputHandaler("gender", itemValue)
                  }
                >
                  <Picker.Item label="Select gender" value="" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="X" value="X" />
                </Picker>
              </View>
              <View style={editProfile.inputFeild}>
                <Picker
                  selectedValue={formData.gender}
                  style={{ height: 40, width: "100%" }}
                  onValueChange={(itemValue) =>
                    inputHandaler("countryName", itemValue)
                  }
                >
                  <Picker.Item label="United States" value="US" />
                </Picker>
              </View>
              <TextInput
                style={editProfile.inputFeild}
                placeholder="Zip Code"
                onChangeText={(value) => inputHandaler("zipCode", value)}
                value={formData.zipCode}
              />
              <TextInput
                style={editProfile.inputFeild}
                placeholder="State Name"
                onChangeText={(value) => inputHandaler("stateName", value)}
                value={yourstate}
              />
              <View style={editProfile.inputFeild}>
                <Picker
                  selectedValue={formData.cityName}
                  style={{ height: 40, width: "100%" }}
                  onValueChange={(itemValue) =>
                    inputHandaler("cityName", itemValue)
                  }
                >
                  <Picker.Item label="City name" value="" />
                  {city.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.cityName}
                      value={item.cityName}
                    />
                  ))}
                </Picker>
              </View>
              <Button
                style={[registration.button, editProfile.updateBtn]}
                icon={{ source: "arrow-right", direction: "ltr" }}
                mode="contained"
                //disabled={!agree}
                onPress={submitButton}
              >
                UPDATE PROFILE
              </Button>
            </View>
            {/* MODAL FOR MOBILE NUMBER */}
            <View style={[notification.centeredViewBack]}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={notification.centeredViewBack}>
                  <View style={[notification.modalView]}>
                    <Text
                      onPress={() => setModalVisible(!modalVisible)}
                      style={notification.reloadIcon}
                    >
                      <Entypo
                        name="circle-with-cross"
                        size={24}
                        color="#fd248a"
                      />
                    </Text>
                    {isMobileSection === 0 ? (
                      <>
                        <Text style={styles.modalText}>Edit Mobile Number</Text>
                        <TextInput
                          style={editProfile.inputFeild}
                          placeholder="Mobile Number"
                          onChangeText={(value) =>
                            editMobileHandaler("mobileNo", value)
                          }
                          value={editMobileNo.mobileNo}
                          keyboardType="numeric"
                          maxLength={10}
                        />
                        <Button
                          color="#fff"
                          style={[registration.button, editProfile.updateBtn]}
                          onPress={editMobileNumber}
                        >
                          Update
                        </Button>
                      </>
                    ) : (
                      <>
                        <Text style={styles.modalText}>
                          Mobile Number verification code
                        </Text>
                        <View style={[loginScreen.otpFeildSection]}>
                          <TextInput
                            ref={pin1ref}
                            style={[
                              registration.otpfeild,
                              { borderWidth: 1, borderColor: "#dfe1e5" },
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(pin1) => {
                              setPin1(pin1);
                              if (pin1 !== "") {
                                pin2ref.current.focus();
                              }
                            }}
                            value={pin1}
                          />
                          <TextInput
                            ref={pin2ref}
                            style={[
                              registration.otpfeild,
                              { borderWidth: 1, borderColor: "#dfe1e5" },
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(pin2) => {
                              setPin2(pin2);
                              if (pin2 !== "") {
                                pin3ref.current.focus();
                              }
                            }}
                            value={pin2}
                          />
                          <TextInput
                            ref={pin3ref}
                            style={[
                              registration.otpfeild,
                              { borderWidth: 1, borderColor: "#dfe1e5" },
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(pin3) => {
                              setPin3(pin3);
                              if (pin3 !== "") {
                                pin4ref.current.focus();
                              }
                            }}
                            value={pin3}
                          />
                          <TextInput
                            ref={pin4ref}
                            style={[
                              registration.otpfeild,
                              { borderWidth: 1, borderColor: "#dfe1e5" },
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(pin4) => {
                              setPin4(pin4);
                              if (pin4 !== "") {
                                pin5ref.current.focus();
                              }
                            }}
                            value={pin4}
                          />
                          <TextInput
                            ref={pin5ref}
                            style={[
                              registration.otpfeild,
                              { borderWidth: 1, borderColor: "#dfe1e5" },
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(pin5) => {
                              setPin5(pin5);
                              if (pin5 !== "") {
                                pin6ref.current.focus();
                              }
                            }}
                            value={pin5}
                          />
                          <TextInput
                            ref={pin6ref}
                            style={[
                              registration.otpfeild,
                              { borderWidth: 1, borderColor: "#dfe1e5" },
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(pin6) => setPin6(pin6)}
                            value={pin6}
                          />
                        </View>
                        <Text>{mobileOtp}</Text>
                        <Button
                          color="#fff"
                          style={[registration.button, editProfile.updateBtn]}
                          onPress={mobileNumberOtp}
                        >
                          Submit
                        </Button>
                      </>
                    )}
                  </View>
                </View>
              </Modal>
            </View>
            {/* MODAL FOR EMAIL UPDATE AND OTP VARIFICATION */}

            <View style={[notification.centeredViewBack]}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={emailModalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setEmailModalVisible(!emailModalVisible);
                }}
              >
                <View style={notification.centeredViewBack}>
                  <View style={[notification.modalView]}>
                    <Text
                      onPress={() => setEmailModalVisible(!emailModalVisible)}
                      style={notification.reloadIcon}
                    >
                      <Entypo
                        name="circle-with-cross"
                        size={24}
                        color="#fd248a"
                      />
                    </Text>
                    {isMobileSection === 0 ? (
                      <>
                        <Text style={styles.modalText}>Edit Mobile Number</Text>
                        <TextInput
                          style={editProfile.inputFeild}
                          placeholder="Mobile Number"
                          onChangeText={(value) =>
                            editMobileHandaler("mobileNo", value)
                          }
                          value={editMobileNo.mobileNo}
                          keyboardType="numeric"
                          maxLength={10}
                        />
                        <Button
                          color="#fff"
                          style={[registration.button, editProfile.updateBtn]}
                          onPress={editMobileNumber}
                        >
                          Update
                        </Button>
                      </>
                    ) : (
                      <>
                        <Text style={styles.modalText}>
                          Mobile Number verification code
                        </Text>
                        <View style={[loginScreen.otpFeildSection]}>
                          <TextInput
                            ref={pin1ref}
                            style={[
                              registration.otpfeild,
                              { borderWidth: 1, borderColor: "#dfe1e5" },
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(pin1) => {
                              setPin1(pin1);
                              if (pin1 !== "") {
                                pin2ref.current.focus();
                              }
                            }}
                            value={pin1}
                          />
                          <TextInput
                            ref={pin2ref}
                            style={[
                              registration.otpfeild,
                              { borderWidth: 1, borderColor: "#dfe1e5" },
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(pin2) => {
                              setPin2(pin2);
                              if (pin2 !== "") {
                                pin3ref.current.focus();
                              }
                            }}
                            value={pin2}
                          />
                          <TextInput
                            ref={pin3ref}
                            style={[
                              registration.otpfeild,
                              { borderWidth: 1, borderColor: "#dfe1e5" },
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(pin3) => {
                              setPin3(pin3);
                              if (pin3 !== "") {
                                pin4ref.current.focus();
                              }
                            }}
                            value={pin3}
                          />
                          <TextInput
                            ref={pin4ref}
                            style={[
                              registration.otpfeild,
                              { borderWidth: 1, borderColor: "#dfe1e5" },
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(pin4) => {
                              setPin4(pin4);
                              if (pin4 !== "") {
                                pin5ref.current.focus();
                              }
                            }}
                            value={pin4}
                          />
                          <TextInput
                            ref={pin5ref}
                            style={[
                              registration.otpfeild,
                              { borderWidth: 1, borderColor: "#dfe1e5" },
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(pin5) => {
                              setPin5(pin5);
                              if (pin5 !== "") {
                                pin6ref.current.focus();
                              }
                            }}
                            value={pin5}
                          />
                          <TextInput
                            ref={pin6ref}
                            style={[
                              registration.otpfeild,
                              { borderWidth: 1, borderColor: "#dfe1e5" },
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(pin6) => setPin6(pin6)}
                            value={pin6}
                          />
                        </View>
                        <Text>{mobileOtp}</Text>
                        <Button
                          color="#fff"
                          style={[registration.button, editProfile.updateBtn]}
                          onPress={mobileNumberOtp}
                        >
                          Submit
                        </Button>
                      </>
                    )}
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "700",
  },
});
