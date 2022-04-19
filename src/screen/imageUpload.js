import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import avterImg from "../../assets/userMale.png";
import { Camera } from "expo-camera";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { dashBoard, imageUpload } from "../../assets/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lgoinKey, userStatus } from "../utility/commonStaticData";
import { showMessage } from "react-native-flash-message";
import * as API from "../Api/apiHalper";
import logo from "../../assets/logo.png";
import * as c from "../Api/constant";

const tag = "[CAMERA]";
export default function ImageUpload({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState("");
  const [startOver, setStartOver] = useState(true);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [loader, setLoader] = useState(false);
  const [userData, setuserData] = useState([]);
  //console.log("userData", userData.image);
  // const getDataSt = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem(userStatus);
  //     console.log("value", value);
  //     if (JSON.parse(value) === "0") {
  //       navigation.navigate("editprofile");
  //       showMessage({
  //         message: "Please update your profile details",
  //         type: "danger",
  //         animationDuration: 1000,
  //       });
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  // ? USER DETAILS >>>>>>>
  const user_details_byid = async () => {
    try {
      const reqObj = {
        id: await AsyncStorage.getItem(lgoinKey),
      };
      const response = await API.user_data_id(reqObj);
      setuserData(response.data.data);
      setLoader(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  // ? >>>>>>> USER IAMAGES >>>>>>>
  const userImg = c.URL + "/" + userData.image;

  let camera = Camera;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    user_details_byid();
  }, []);

  // ? CLOSE CAMERA
  const __closeCamera = () => {
    setStartOver(true);
  };

  // ? TAKE PICTURE
  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ base64: true, quality: 0.3 });
    let tfimage = photo.base64;
    const base64Img = `data:image/jpeg;base64,${tfimage}`;
    setPreviewVisible(true);
    setCapturedImage(base64Img);
  };

  // ? SAVE PHOTO
  const __savePhoto = async () => {
    setStartOver(true);
    try {
      const reqObj = {
        id: await AsyncStorage.getItem(lgoinKey),
        image: capturedImage,
      };
      console.log("reqObj", reqObj);
      const response = await API.user_profile_img(reqObj);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    //getDataSt();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {startOver ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loader === false ? (
            <Text style={{ marginBottom: 20 }}>
              <ActivityIndicator size="large" color="red" />
            </Text>
          ) : (
            <>
              <View style={imageUpload.finalImg}>
                <Image
                  source={{ uri: userImg }}
                  style={
                    capturedImage === null
                      ? dashBoard.nonImg
                      : dashBoard.imagesSelfi
                  }
                />
              </View>
              <TouchableOpacity
                onPress={() => setStartOver(false)}
                style={{
                  borderRadius: 4,
                  backgroundColor: "#14274e",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 25,
                    textTransform: "capitalize",
                  }}
                >
                  take selfie
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          {previewVisible ? (
            <View style={imageUpload.inprogressImgBG}>
              <Text style={imageUpload.heading}>Check Selfie</Text>
              <Text style={imageUpload.preagraph}>
                make sure your Selfie clearly shows your face
              </Text>
              <ImageBackground
                source={{ uri: capturedImage && capturedImage }}
                style={imageUpload.inprogressImg}
              ></ImageBackground>
              <View
                style={{
                  flexDirection: "column",
                  padding: 15,
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setPreviewVisible(false)}
                    style={imageUpload.redoButton}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 20,
                      }}
                    >
                      Redo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__savePhoto}
                    style={imageUpload.confirmButton}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        paddingTop: 5,
                      }}
                    >
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <>
              <View style={imageUpload.camaraBg}>
                <Camera
                  style={imageUpload.cameraSec}
                  type={type}
                  ref={(r) => {
                    camera = r;
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        top: "5%",
                        right: "5%",
                      }}
                    >
                      <TouchableOpacity onPress={__closeCamera}>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 20,
                          }}
                        >
                          X
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* CLICK PHOTO CAMERA */}
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        top: "5%",
                        left: "5%",
                      }}
                      onPress={() => {
                        setType(
                          type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 25,
                          marginBottom: 10,
                          backgroundColor: "#fff",
                          borderRadius: 50,
                          padding: 5,
                        }}
                      >
                        <MaterialIcons
                          name="flip-camera-ios"
                          size={24}
                          color="#315498"
                        />
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        position: "absolute",
                        bottom: 0,
                        flexDirection: "row",
                        flex: 1,
                        width: "100%",
                        padding: 20,
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          alignSelf: "center",
                          flex: 1,
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={__takePicture}
                          style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: "#fff",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Feather name="camera" size={30} color="#315498" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Camera>
              </View>

              <View style={dashBoard.imageUpoladDetact}></View>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
