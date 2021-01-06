import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { AppContext } from "../../context/ContextProvider";
import { Entypo } from "@expo/vector-icons";

import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const EditMessage = ({ navigation }) => {
  const {
    getSingleMessage,
    singleMsg,
    loadingForSingleMsg,
    setSingleMsg,
    deleteSingleMsg,
    updateMessage,
  } = useContext(AppContext);
  const [messageForm, setMessageForm] = useState({
    message: "",
  });
  const [dataBool, setDataBool] = useState(true);

  useEffect(() => {
    getSingleMessage();
    setTimeout(() => {
      if (dataBool) {
        if (singleMsg && !loadingForSingleMsg) {
          setMessageForm(singleMsg);
          setDataBool(false);
        } else {
          setDataBool(true);
        }
      }
    }, 2000);
  }, [singleMsg]);

  const [error, setError] = useState(false);

  return (
    <SafeAreaView>
      <View style={styles.AddMessageLayout}>
        {singleMsg && (
          <>
            <Text style={styles.title}>
              {messageForm.sendToPhoneNumber
                ? `${messageForm.draftName}`
                : "שם הדראפט..."}
            </Text>
            <Text style={styles.textTitle}>
              {messageForm.sendToPhoneNumber
                ? `${messageForm.sendToPhoneNumber}`
                : "05. ... ...."}
            </Text>

            <View style={styles.textBoxView}>
              <Text style={styles.textTitle}>ערוך הודעה</Text>
              <View style={styles.textBoxInnerView}>
                <TextInput
                  style={styles.textBox}
                  editable
                  spellCheck
                  multiline={true}
                  maxLength={500}
                  underlineColorAndroid="transparent"
                  placeholder="טוען הודעה"
                  placeholderTextColor="#00000029"
                  onChangeText={(text) => {
                    setError(false);
                    setMessageForm({
                      ...messageForm,
                      message: text,
                    });
                  }}
                  value={messageForm.message}
                />
              </View>
            </View>
            {error && (
              <Text style={styles.error}>נתונים שהוזנו אינם תקינים</Text>
            )}
            <View style={styles.sendMessageTo}>
              <TouchableOpacity
                style={styles.msgBtn}
                onPress={() => {
                  if (messageForm.sendToPhoneNumber.message < 3) {
                    setError(true);
                  } else {
                    setError(false);
                    updateMessage(messageForm);
                    navigation.push("Waiting");
                  }
                }}
              >
                <LinearGradient
                  colors={["#59cea3", "#248f94", "#0f758f"]}
                  style={styles.msgBtn}
                  start={{ x: 0.7, y: 0 }}
                >
                  <Text>
                    <Entypo name="check" size={30} color="white" />
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.msgBtn}
                onPress={() => {
                  deleteSingleMsg();
                  navigation.push("Waiting");
                }}
              >
                <LinearGradient
                  colors={["#59cea3", "#248f94", "#0f758f"]}
                  style={styles.msgBtn}
                  start={{ x: 0.7, y: 0 }}
                >
                  <Text>
                    <FontAwesome name="trash" size={30} color="white" />
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                setSingleMsg(null);
                setMessageForm({
                  ...messageForm,
                  message: "loading message....",
                  dateAndTimeToSend: "",
                });
                navigation.push("Waiting");
              }}
            >
              <Text style={styles.backText}>חזור</Text>
            </TouchableOpacity>
          </>
        )}
        {loadingForSingleMsg && (
          <View style={styles.AddMessageLayout}>
            <Text>
              <ActivityIndicator size="large" color="#59cea3" />
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  AddMessageLayout: {
    height: "100%",
    backgroundColor: "#121212",
    alignItems: "center",
    paddingTop: 70,
  },
  title: {
    marginVertical: 10,
    fontSize: 22,
    color: "#0f758f",
    fontWeight: "100",
    letterSpacing: 2,
    textAlign: "center",
  },
  textTitle: {
    marginVertical: 10,
    fontSize: 14,
    color: "white",
    fontWeight: "100",
    letterSpacing: 2,
    textAlign: "center",
  },
  addContactBox: {
    width: 266,
    height: 40,
    borderRadius: 5,
    borderColor: "#707070",
    borderWidth: 1.5,
    textAlign: "center",
    color: "#707070",
    backgroundColor: "#FFFFFF",
  },

  textBoxView: {
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  textBoxInnerView: {
    width: 266,
    height: 100,
    borderRadius: 5,
    borderColor: "#707070",
    borderWidth: 1,

    padding: 10,
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  textBox: {
    textAlignVertical: "top",
    width: 240,
    height: 150,
    color: "#707070",
    writingDirection: "rtl",
  },

  error: {
    marginTop: 30,
    position: "relative",
    fontSize: 12,
    color: "#59cea3",
    fontWeight: "100",
    letterSpacing: 2,
    textAlign: "center",
  },
  backBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 40,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#121212",
    borderColor: "#59cea3",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  sendMessageTo: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  msgBtn: {
    borderRadius: 5,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
export default EditMessage;
