import React, { useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
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
        <Text style={styles.textTitle}>הזן מספר טלפון</Text>

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

          {error && <Text style={styles.error}>נתונים שהוזנו אינם תקינים</Text>}
        </View>
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
            <LinearGradient
              colors={["#59cea3", "#248f94", "#0f758f"]}
              style={styles.msgBtn}
              start={{ x: 0.7, y: 0 }}
            >
              <Text>
                <FontAwesome name="whatsapp" size={30} color="white" />
              </Text>
            </LinearGradient>
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
            <LinearGradient
              colors={["#59cea3", "#248f94", "#0f758f"]}
              style={styles.msgBtn}
              start={{ x: 0.7, y: 0 }}
            >
              <Text>
                <AntDesign name="message1" size={28} color="white" />
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.push("Profile")}
        >
          <Text style={styles.backText}>חזור</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  AddMessageLayout: {
    height: "100%",
    backgroundColor: "#121212",
    alignItems: "center",
    paddingTop: 100,
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
    position: "relative",
    fontSize: 12,
    color: "red",
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
    borderColor: '#59cea3',
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
export default InstantMessage;
