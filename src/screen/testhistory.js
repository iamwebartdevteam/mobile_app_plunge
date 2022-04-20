import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  ActivityIndicator,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { dashBoard, registration, testHistory } from "../../assets/style";
import loginBg from "../../assets/subBg.png";
import { FontAwesome5, Feather, AntDesign, Entypo } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import * as API from "../Api/apiHalper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lgoinKey, userStatus } from "../utility/commonStaticData";
import moment from "moment";

const Testhistory = ({ navigation }) => {
  const [requestList, setRequestList] = useState([]);
  const [finalStatus, setFinalStatus] = useState("Negative");
  const [loader, setLoader] = useState(false);
  console.log("requestList", requestList);
  const handalNaviget = (screenName) => {
    navigation.navigate(screenName);
  };

  // ? REQUEST LIST TABLE
  const requestListTable = async () => {
    try {
      const response = await API.send_request_list(
        await AsyncStorage.getItem(lgoinKey)
      );
      console.log("response", response.data.data);
      setLoader(response.data.data);
      var resArray = [];
      response.data.data.map((res, index) => {
        var status = "";
        if (res.reports.length > 0) {
          res.reports.map((ress, ind) => {
            if (status === "" || status === "n") {
              status = ress.status == "1" ? "p" : "n";
            }
          });
        } else {
          status = "n/a";
        }
        resArray[res.id] = status;
      });

      setFinalStatus(resArray);

      setRequestList(response.data.data);

      response.data.data.reports.map((item, index) =>
        item.status === "1" ? setFinalStatus("Positive") : ""
      );

      // const dataTime = [];
      // requestList.map((item, index) => dataTime.push(item.date));
      // dataTime.getFullYear();
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    requestListTable();
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
        style={[
          registration.image,
          { alignItems: "flex-start", justifyContent: "flex-start" },
        ]}
      >
        <View>
          <Text
            style={testHistory.newTestBtn}
            onPress={() => handalNaviget("newTest")}
          >
            New Test <AntDesign name="arrowright" size={17} color="black" />
          </Text>
        </View>
        <View style={testHistory.listHistoryBg}>
          {loader === false ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 300,
              }}
            >
              <ActivityIndicator size="large" color="red" />
            </View>
          ) : (
            <>
              <Animated.FlatList
                vertical
                //onScroll={Animated.event([{ nativeEvent: { contentOffset } }])}
                showsVerticalScrollIndicator={false}
                data={requestList}
                renderItem={(element) => {
                  return (
                    <View style={[testHistory.testListBox]}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={testHistory.table}>
                          <Text style={testHistory.iconLab}>
                            <FontAwesome5
                              name="hospital-user"
                              size={30}
                              color="#fff"
                            />
                          </Text>
                        </View>
                        <View style={testHistory.tableBody}>
                          <Text style={testHistory.Headlab}>
                            {element.item.laboratory.name}
                          </Text>
                          <Text style={testHistory.testDate}>
                            {/* {element.item.date} */}
                            {moment(element.item.date).format("Do MMMM YYYY")}
                          </Text>
                          <Text style={testHistory.zipCode}>
                            {element.item.zipCode}{" "}
                          </Text>
                        </View>
                        <View style={testHistory.table}>
                          {finalStatus[element.item.id] === "n/a" ? (
                            <Entypo
                              name="circle-with-cross"
                              size={30}
                              color="gray"
                            />
                          ) : finalStatus[element.item.id] === "n" ? (
                            <Feather
                              name="check-circle"
                              size={30}
                              color="#08c305"
                            />
                          ) : (
                            <Entypo
                              name="circle-with-cross"
                              size={30}
                              color="red"
                            />
                          )}
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
              {requestList.length === 0 ? (
                <View style={testHistory.defulttextMess}>
                  <Image
                    source={{
                      uri: "https://images.all-free-download.com/images/graphiclarge/female_doctor_icon_cartoon_character_design_6829081.jpg",
                    }}
                    style={{ width: 200, height: 200 }}
                  />
                  <Text style={testHistory.messTest}>
                    You have not sent any requests !
                  </Text>
                </View>
              ) : undefined}
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Testhistory;
