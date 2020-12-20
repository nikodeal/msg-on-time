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
  } = useContext(AppContext);
  const [messageForm, setMessageForm] = useState({
    message: "",
    dateAndTimeToSend: "",
  });
  const [dataBool, setDataBool] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    getSingleMessage();
    setTimeout(() => {
      if (dataBool) {
        if (singleMsg && !loadingForSingleMsg) {
          setMessageForm(singleMsg);
        }
        setDataBool(false);
      }
    }, 2000);
  }, [singleMsg]);

  const [error, setError] = useState(false);

  const updateMessage = async (id) => {
    const saveEditedMessage = {
      sendToPhoneNumber: messageForm.sendToPhoneNumber,
      message: messageForm.message,
      dateAndTimeToSend: messageForm.dateAndTimeToSend,
      active: messageForm.active,
    };
    try {
      await axios.patch(
        `https://msgontimeapi.herokuapp.com/message/${id}`,
        saveEditedMessage
      );
    } catch (err) {
      console.log(err);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (datetime) => {
    setError(false);
    setMessageForm({
      ...messageForm,
      dateAndTimeToSend: datetime,
    });
    hideDatePicker();
  };

  return (
    <SafeAreaView>
      <View style={styles.AddMessageLayout}>
        {singleMsg && (
          <>
            <View style={styles.AddMessageLayoutinner}>
              <Text style={styles.textTitle}>
                {messageForm.sendToPhoneNumber
                  ? `0${messageForm.sendToPhoneNumber}`
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
              <View style={styles.addContactView}>
                <TouchableOpacity
                  style={styles.calenderTouchable}
                  onPress={showDatePicker}
                >
                  <Text style={styles.calenderTouchableText}> יומן </Text>
                </TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                minimumDate={new Date()}
                minimumTime={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                is24Hour={true}
                display="spinner"
              />

              <TouchableOpacity
                style={styles.finishedTouchable}
                onPress={() => {
                  console.log(messageForm);
                  if (
                    messageForm.sendToPhoneNumber.message < 3 &&
                    messageForm.dateAndTimeToSend < 3
                  ) {
                    setError(true);
                  } else {
                    setError(false)
                    updateMessage(messageForm._id);
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
              <Text style={styles.backText}>חזור</Text>
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
    marginTop: -20,
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
    marginRight: 20,
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
    alignSelf: "flex-end",
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
