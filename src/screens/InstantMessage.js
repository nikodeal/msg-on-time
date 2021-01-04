import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Linking,
} from "react-native";
import * as SMS from "expo-sms";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const InstantMessage = ({ navigation }) => {
  const [messageForm, setMessageForm] = useState({
    sendToPhoneNumber: "",
    message: "",
  });
  const [error, setError] = useState(false);


  const sendRegularMessage = async () => {
    await SMS.sendSMSAsync(
      `0${messageForm.sendToPhoneNumber}`,
      `${messageForm.message}`
    );
  };
  const sendWhatsAppMessage = () => {
    let url =
      "whatsapp://send?text=" +
      messageForm.message +
      "&phone=972" +
      messageForm.sendToPhoneNumber;
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened");
      })
      .catch(() => {
        alert("Make sure Whatsapp installed on your device");
      });
  };



  return (
    <SafeAreaView>
      <View style={styles.AddMessageLayout}>
        <View style={styles.AddMessageLayoutinner}>
          <Text style={styles.textTitle}>הזן מספר טלפון</Text>
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

          <View style={styles.sendMessageTo}>
            <TouchableOpacity
              style={styles.msgBtn}
              onPress={() => {
                if (
                  messageForm.sendToPhoneNumber === 10 &&
                  messageForm.message > 3
                ) {
                  sendWhatsAppMessage();
                } else {
                  setError(true);
                }
              }}
            >
              <Text>
                <FontAwesome name="whatsapp" size={30} color="white" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.msgBtn}
              onPress={() => {
                if (
                  messageForm.sendToPhoneNumber.length === 10 &&
                  messageForm.message.length > 3
                ) {
                  sendRegularMessage();
                } else {
                  setError(true);
                }
              }}
            >
              <Text>
                <AntDesign name="message1" size={28} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.backView}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.push("Profile")}
          >
            <Text>
              <AntDesign name="right" size={24} color="white" />
            </Text>
          </TouchableOpacity>
          <Text style={styles.backText}>חזור</Text>
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
    marginBottom: 15,
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
  sendMessageTo: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  msgBtn: {
    backgroundColor: "#20B038",
    borderRadius: 20,
    height: 62,
    width: 62,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
export default InstantMessage;
