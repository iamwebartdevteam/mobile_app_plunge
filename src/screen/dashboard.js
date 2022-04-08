import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ProgressBarAndroid,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from "react-native";
import userCover from "../../assets/userCover.png";
import { Ionicons, Feather } from "@expo/vector-icons";
import { dashBoard } from "../../assets/style";
import { Button, Colors, Divider, ProgressBar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as API from "../Api/apiHalper";
import * as c from "../Api/constant";
import {
  FontAwesome5,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { isLogin, lgoinKey, userStatus } from "../utility/commonStaticData";
import moment from "moment";

const Dashboard = ({ navigation, data }) => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [userData, setuserData] = useState([]);
  const [userReport, setUserReport] = useState([]);
  const [finalStatus, setFinalStatus] = useState("Negative");
  const [userUniqueRecord, setUserUniqueRecord] = useState([]);
  const [subcPackegDetails, setSubcPackegDetails] = useState([]);
  const [dateAgo, setDateAgo] = useState([]);
  const [userDate, setUserDate] = useState([]);
  const [labname, setLabName] = useState([]);
  const handalNaviget = (screenName) => {
    navigation.navigate(screenName);
  };

  // ? USER DETAILS >>>>>>>
  const user_details_byid = async () => {
    // const profileStatus = await AsyncStorage.getItem(userStatus);
    // console.log("profileStatus", profileStatus);
    // const value = await AsyncStorage.getItem(isLogin);
    // console.log("valuRouter", value);
    try {
      const reqObj = {
        id: await AsyncStorage.getItem(lgoinKey),
      };
      const response = await API.user_data_id(reqObj);
      console.log("response", response);
      setuserData(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  // ?Get_user_reportId
  const get_user_reportId = async () => {
    try {
      const reqObj = {
        id:
          (await AsyncStorage.getItem(lgoinKey)) +
          "/" +
          (await AsyncStorage.getItem(lgoinKey)),
      };
      const respons = await API.user_report_id_dashBoard(reqObj);
      console.log("report_result", respons.data.data);
      setLoading(respons.data.data);
      respons.data.data.map((item, index) =>
        item.status === "1" ? setFinalStatus("Positive") : ""
      );
      setUserReport(respons.data.data);
      //setRequestDate(respons.data.data);
      console.log();
    } catch (error) {
      console.log("Error", error);
    }
  };

  // ? >>>>>>>>> USER UNIQ RECORD >>>>>>>>>>
  const user_uniq_record = async () => {
    try {
      const reqObj = {
        id: await AsyncStorage.getItem(lgoinKey),
      };
      const response = await API.user_report_dashBoard_uniqRequrd(reqObj);
      console.log("user_uniq_record", response.data.data);
      setLoading(response.data.data);
      setLabName(response.data.data.laboratory);
      setUserUniqueRecord(response.data.data);
      var expdate = moment(response.data.data.date).format("YYYY-MM-DD");
      var given = moment(expdate, "YYYY-MM-DD");
      var current = moment().startOf("day");
      setDateAgo(moment.duration(current.diff(given)).asDays());
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
      console.log("Payresponse", response);
      setLoading(response.data.data);
      setSubcPackegDetails(response.data.data.subscription);
      var expdate = moment(response.data.data.endDate).format("YYYY-MM-DD");
      var given = moment(expdate, "YYYY-MM-DD");
      var current = moment().startOf("day");
      setUserDate(moment.duration(given.diff(current)).asDays());
    } catch (error) {
      console.log("Error", error);
    }
  };

  // ? >>>>>>> USER IAMAGES >>>>>>>
  const userImg = c.URL + "/" + userData.image;

  useEffect(() => {
    user_details_byid();
    get_user_reportId();
    user_uniq_record();
    get_user_payment_details();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        {/* <View style={dashBoard.notification}>
          <Text>noti</Text>
        </View> */}
        {loading === true ? (
          <Text style={{ marginTop: 300 }}>
            <ActivityIndicator size="large" color="red" />
          </Text>
        ) : (
          <View style={dashBoard.dasboardScreen}>
            <View style={dashBoard.userCoverBg}>
              <ImageBackground
                source={userCover}
                resizeMode="cover"
                style={dashBoard.userCoverImg}
                imageStyle={dashBoard.borderRedus}
              >
                <View
                  style={[
                    userReport.length === 0 || finalStatus === "Positive"
                      ? (dashBoard.userImg, dashBoard.userImgBorder)
                      : dashBoard.userImg,
                  ]}
                >
                  <Image
                    style={dashBoard.userMenuImgI}
                    source={{
                      uri:
                        userData.image === null
                          ? c.URL + "/images/avatar-1577909_960_720.png"
                          : userImg,
                    }}
                  />
                </View>
              </ImageBackground>
              <TouchableOpacity>
                <Feather
                  style={dashBoard.camaraIcon}
                  name="camera"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View style={dashBoard.details}>
              <View style={dashBoard.leftSide}>
                <Text style={dashBoard.detailsHeading}>
                  {userData.fname} {""}
                  {userData.lname}
                  {""}
                </Text>
                {userReport.length === 0 || finalStatus === "Positive" ? (
                  <AntDesign name="exclamationcircle" size={30} color="gray" />
                ) : (
                  <AntDesign name="checkcircle" size={30} color="green" />
                )}
              </View>
            </View>
            <Button style={dashBoard.editBtn} color="#fff">
              {/* <Feather name="edit-2" size={20} color="#fff" /> {""} */}
              Your Plan Expire After {userDate} Days
            </Button>
            {userReport.length === 0 || finalStatus === "Positive" ? (
              <Text style={dashBoard.nagativetext}>
                UNABLE TO VERIFY NEGATIVE STI TEST RESULTS
              </Text>
            ) : (
              <>
                <View
                  style={[
                    dashBoard.profileDet,
                    {
                      borderTopWidth: 1,
                      paddingTop: 10,
                      marginTop: 10,
                      borderTopColor: "#ccc",
                    },
                  ]}
                >
                  <Text style={[dashBoard.menuIcon]}>
                    <Ionicons name="ios-today" size={20} color="#fff" />
                  </Text>
                  <Text style={dashBoard.labname}>
                    <Text style={dashBoard.profileDtText}>How old</Text>{" "}
                    {dateAgo} Days Ago
                  </Text>
                </View>
                <View style={dashBoard.profileDet}>
                  <Text style={[dashBoard.menuIcon]}>
                    <MaterialIcons name="date-range" size={20} color="#fff" />
                  </Text>
                  <Text style={dashBoard.labname}>
                    <Text style={dashBoard.profileDtText}>Test Date</Text>{" "}
                    {userUniqueRecord === null ? null : userUniqueRecord.date}
                  </Text>
                </View>
                <View style={dashBoard.profileDet}>
                  <Text style={[dashBoard.menuIcon]}>
                    <Entypo name="lab-flask" size={20} color="#fff" />
                  </Text>
                  <Text style={dashBoard.labname}>
                    {" "}
                    <Text style={dashBoard.profileDtText}>Lab Name</Text>{" "}
                    {/* {userUniqueRecord === null
                        ? null
                        : userUniqueRecord.laboratory.name} */}
                    {labname.name}
                  </Text>
                </View>
              </>
            )}

            <View style={dashBoard.profileDet}>
              <Text style={[dashBoard.menuIcon]}>
                <MaterialIcons name="payments" size={20} color="#fff" />
              </Text>
              <Text style={dashBoard.labname}>
                <Text style={dashBoard.profileDtText}>Your Current Plan</Text> ${" "}
                {""}
                {subcPackegDetails.amount}, {subcPackegDetails.name}
                {/* {subcPackegDetails.subscription.amount} ,{" "}
                {subcPackegDetails.subscription.name} */}
              </Text>
            </View>

            <Text
              style={
                userReport.length === 0 || finalStatus === "Positive"
                  ? dashBoard.dasGrayBg
                  : dashBoard.lastHeading
              }
              onPress={() => handalNaviget("drawar")}
            >
              {userReport.length === 0 || finalStatus === "Positive"
                ? "NOT TESTED"
                : "TESTED"}
            </Text>
            <Text style={dashBoard.diclamer}>
              THIS APP IS NOT A SUBSTITUTE FOR ADOPTING SAFER SEXUAL PRACTICES
              AS RECOMMENDED BY THE U.S. CENTERS FOR DISEASE CONTROL AND
              PREVENTION
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Dashboard;
