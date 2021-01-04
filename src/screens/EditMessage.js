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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

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
            <View style={styles.AddMessageLayoutinner}>
              <Text style={styles.textTitle}>
                {messageForm.sendToPhoneNumber
                  ? `${messageForm.sendToPhoneNumber}`
                  : "05. ... ...."}
              </Text>

              <View style={styles.textBoxView}>
                <Text style={styles.textSubTittle}>ערוך הודעה</Text>
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

              <TouchableOpacity
                style={styles.finishedTouchable}
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
                <Text style={styles.finishedTouchableText}>סיימתי</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtnTouchable}
                onPress={() => {
                  deleteSingleMsg();
                  navigation.push("Waiting");
                }}
              >
                <FontAwesome name="trash" size={25} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.backView}>
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
                <Text>
                  <AntDesign name="right" size={24} color="white" />
                </Text>
              </TouchableOpacity>
              <Text style={styles.backText}>חזור</Text>
            </View>
          </>
        )}
        {loadingForSingleMsg && (
          <View style={styles.AddMessageLayout}>
            <Text>
              <ActivityIndicator size="large" color="#20B038" />
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  AddMessageLayout: {
    backgroundColor: "#121212",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  AddMessageLayoutinner: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 10,
  },
  addContactView: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    justifyContent: "center",
    marginBottom: 30,
  },

  textTitle: {
    fontSize: 30,
    color: "#FFFFFF",
    textAlign: "center",
    marginVertical: 10,
  },
  textSubTittle: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
    marginVertical: 10,
  },
  addContactBox: {
    height: 60,
    width: 266,
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 15,

    fontSize: 20,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
  },

  textBoxView: {
    marginBottom: 20,
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  textBoxInnerView: {
    width: 266,
    height: 150,
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 15,
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

  calenderTouchable: {
    backgroundColor: "#707070",
    width: 138,
    height: 45,
    borderRadius: 23,
    justifyContent: "center",
    marginTop: 10,
  },
  calenderTouchableText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  finishedTouchable: {
    backgroundColor: "#20B038",
    width: 138,
    height: 45,
    borderRadius: 23,
    justifyContent: "center",
    marginTop: 10,
  },
  finishedTouchableText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  error: {
    position: "relative",
    fontSize: 16,
    color: "red",
    fontWeight: "100",
    letterSpacing: 2,
    textAlign: "center",
  },
  backBtn: {
    marginLeft: 15,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: "#20B038",
    height: 42,
    width: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  backView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    flex: 2,
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 20,
    marginRight: 10,
  },
  deleteBtnTouchable: {
    backgroundColor: "red",
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: "center",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default EditMessage;
