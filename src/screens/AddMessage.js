import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import { AppContext } from "../../context/ContextProvider";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
const AddMessage = ({ navigation }) => {
  const { userNumber } = useContext(AppContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [messageForm, setMessageForm] = useState({
    userPhoneNumber: userNumber,
    sendToPhoneNumber: "",
    message: "",
    dateAndTimeToSend: "",
    active: true,
  });
  const [error, setError] = useState(false);
  const SaveMessageToDB = async () => {
    try {
      await axios
        .post(`https://msgontimeapi.herokuapp.com/add`, messageForm)
        
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
        <View style={styles.AddMessageLayoutinner}>
          <Text style={styles.textTitle}>הזן מספר איש קשר</Text>
          <View style={styles.addContactView}>
            <TextInput
              style={styles.addContactBox}
              maxLength={10}
              keyboardType="numeric"
              onChangeText={(num) => {
                setError(false);
                setMessageForm({
                  ...messageForm,
                  sendToPhoneNumber: num,
                });
              }}
              value={messageForm.sendToPhoneNumber}
            />
          </View>
          <View style={styles.textBoxView}>
            <Text style={styles.textTitle}>כתוב הודעה</Text>
            <View style={styles.textBoxInnerView}>
              <TextInput
                style={styles.textBox}
                editable
                spellCheck
                multiline={true}
                maxLength={500}
                underlineColorAndroid="transparent"
                placeholder="כתוב הודעה"
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
          {error && <Text style={styles.error}>נתונים שהוזנו אינם תקינים</Text>}
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
          <View>
            <TouchableOpacity
              style={styles.finishedTouchable}
              onPress={() => {
                if (
                  messageForm.sendToPhoneNumber.length === 10 &&
                  messageForm.dateAndTimeToSend !== null
                ) {
                    SaveMessageToDB();
                    setMessageForm({
                      userPhoneNumber: userNumber,
                      sendToPhoneNumber: "",
                      message: "",
                      dateAndTimeToSend: "",
                      active: true,
                    });
                    setError(false);
                    navigation.push("Profile");
                  
                } else {
                  setError(true);
                
              }}}
            >
              <Text style={styles.finishedTouchableText}>סיימתי</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.backView}>
          <Text style={styles.backText}>חזור</Text>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.push("Profile")}
          >
            <Text>
              <AntDesign name="right" size={24} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  AddMessageLayout: {
    backgroundColor: "#121212",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingTop: 50,
  },
  AddMessageLayoutinner: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
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
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
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
    textAlignVertical: 'top',
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
    marginTop: 20,
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
    marginTop: -5,
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
});
export default AddMessage;
