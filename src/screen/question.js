import {
  View,
  Text,
  ImageBackground,
  Image,
  Picker,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { dashBoard, question, registration } from "../../assets/style";
import loginBg from "../../assets/subBg.png";
import qusImg from "../../assets/question.png";
import * as API from "../Api/apiHalper";
import { Button } from "react-native-paper";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { lgoinKey, userStatus } from "../utility/commonStaticData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
const initialData = { question: "" };
const Question = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [useQuestion, setUseQuestion] = useState([]);
  const [inputQuestion, setInputQuestion] = useState([]);
  const [presentIndex, setPresentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [preIndex, setPreIndex] = useState(0);
  const [isanswer, setIsAnswer] = useState([]);
  const [anstips, setAnstips] = useState("");
  const [presentId, setPresentId] = useState("");
  const [formData, setFormData] = useState({ question: "" });
  const [userAnswer, setUserAnswer] = useState([]);

  // ? GET USER QUESTION START
  const userQuestion = async (presIndex) => {
    try {
      const value = await AsyncStorage.getItem(userStatus);
      console.log("svalue", value);
      if (JSON.parse(value) === "0" || JSON.parse(value) === "1") {
        navigation.navigate("Subscriptions");
        showMessage({
          message: "Please update your profile details",
          type: "danger",
          animationDuration: 1000,
        });
      }
      const respons = await API.user_question();
      setUseQuestion(respons.data.data);
      setLoader(respons.data.data);
      setPresentId(respons.data.data[preIndex].id);
      setIsAnswer(JSON.parse(respons.data.data[presIndex]["answer"]));
    } catch (e) {
      console.log("Error", e);
    }
  };

  const questionHandelar = (questionId, value) => {
    setFormData(value);
    console.log("questionId", questionId);
    const questionvalue = value.split("_");
    setAnstips(questionvalue[1]);
    userAnswer.push({ id: questionId, answer: questionvalue[0] });
    setUserAnswer(userAnswer);
    console.log("userAnswer", userAnswer);
  };

  const nextQuestion = () => {
    setPreIndex(presentIndex);
    setPresentIndex(presentIndex + 1);
    setNextIndex(presentIndex + 1);
    setInputQuestion("");
    userQuestion(presentIndex + 1);
    setAnstips("");
    setFormData();
  };
  //console.log("getData", addQuestion);

  useEffect(() => {
    userQuestion(presentIndex);
  }, []);

  const prevQuestion = () => {
    setNextIndex(presentIndex);
    setPreIndex(presentIndex - 1);
    setPresentIndex(presentIndex - 1);
    userQuestion(presentIndex - 1);
    setFormData();
  };

  // ? SUBMIT QUESTION AND ANSWER
  const submithandelar = async () => {
    const userId = await AsyncStorage.getItem(lgoinKey);
    try {
      var userquestionsans = [];
      userAnswer.map((answers, index) => {
        let ob = "";
        ob = {
          userId: userId,
          questionId: answers.id,
          answer: answers.answer,
        };
        userquestionsans = [...userquestionsans, ob];
      });
      userquestionsans = { userquestions: userquestionsans };
      console.log("userquestionsans", userquestionsans);

      const response = await API.add_user_question(userquestionsans);
      console.log("response", response);
      if (response.status === 200) {
        await AsyncStorage.setItem(userStatus, "4");
        navigation.navigate("testhistory");
        showMessage({
          message: "Your profile has been successfully completed",
          type: "success",
          animationDuration: 2000,
        });

        (await AsyncStorage.getItem(userStatus)) === "4"
          ? await AsyncStorage.setItem(
              userStatus,
              await AsyncStorage.getItem(userStatus)
            )
          : await AsyncStorage.setItem(userStatus, "4");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    userQuestion(presentIndex);
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
              height: "80%",
            },
          ]}
        >
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/hand-drawn-people-asking-questions-illustration_23-2148921810.jpg",
            }}
            style={question.qimg}
          />
          {loader === false ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <>
              {useQuestion.map((item, index) =>
                index === presentIndex ? (
                  <>
                    <View style={[dashBoard.menu]} key={index}>
                      <>
                        <Text style={dashBoard.menuIcon}>{index + 1}</Text>
                        <Text style={[dashBoard.menuItem, question.lableName]}>
                          {item.question} ?
                        </Text>
                      </>
                    </View>
                    <View style={question.ansFeild}>
                      <Picker
                        id={index}
                        style={{ height: 40, width: "100%" }}
                        onValueChange={(itemValue) =>
                          questionHandelar(item.id, itemValue)
                        }
                        //selectedValue={formData.question}
                      >
                        <Picker.Item
                          style={question.ansFeildItem}
                          label="Answer"
                          value=""
                        />
                        {isanswer.map((ansitem, index) => (
                          <Picker.Item
                            key={index}
                            style={question.ansFeildItem}
                            label={ansitem.answer}
                            value={ansitem.answer + "_" + ansitem.tips}
                          />
                        ))}
                      </Picker>
                    </View>
                  </>
                ) : undefined
              )}
            </>
          )}
          <View style={question.buttonSec}>
            {presentIndex === 0 ? (
              <Button style={question.buttonHandis} color="#fff">
                {" "}
                <Entypo name="arrow-long-left" size={24} color="#fff" />
              </Button>
            ) : (
              <Button
                style={question.buttonHan}
                color="#fff"
                onPress={prevQuestion}
              >
                {" "}
                <Entypo name="arrow-long-left" size={24} color="#fff" />
              </Button>
            )}

            {presentIndex === useQuestion.length - 1 ? (
              <Button
                onPress={submithandelar}
                style={question.buttonHan}
                color="#fff"
              >
                submit
              </Button>
            ) : (
              <Button
                onPress={nextQuestion}
                style={question.buttonHan}
                color="#fff"
              >
                <Entypo name="arrow-long-right" size={24} color="#fff" />
              </Button>
            )}
          </View>
          {anstips === "" ? undefined : (
            <View style={question.tipsSec}>
              <Text style={question.tipstext}>
                <AntDesign name="star" size={15} color="#0a45ad" /> Note :{" "}
                {anstips}
              </Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Question;
