import React, { useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AppContext } from "../../context/ContextProvider";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as SMS from "expo-sms";
const MessageItem = ({ item, navigation }) => {
  const { setMessageId } = useContext(AppContext);

  const messageLength = (message) => {
    if (message.length > 20) {
      const newMsg = message.slice(0, 27);
      return <Text>{newMsg}...</Text>;
    } else {
      return <Text>{message}</Text>;
    }
  };
  const sendRegularMessage = async () => {
    const sendMessage = await SMS.sendSMSAsync(
      `0${item.message_info.sendToPhoneNumber}`,
      `${item.message_info.message}`
    );
  };
  const sendWhatsAppMessage = () => {
    let url =
      "whatsapp://send?text=" +
      item.message_info.message +
      "&phone=972" +
      item.message_info.sendToPhoneNumber;
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened");
      })
      .catch(() => {
        alert("Make sure Whatsapp installed on your device");
      });
  };
  return (
    <View style={styles.messageBG}>
      <TouchableOpacity
        style={styles.msgBtn}
        onPress={() => {
          setMessageId(item.message_id);
          navigation.push("Edit");
        }}
      >
        <LinearGradient
          colors={["#59cea3", "#248f94", "#0f758f"]}
          style={styles.msgBtn}
          start={{ x: 0.7, y: 0 }}
        >
          <Text>
            <MaterialIcons name="edit" size={24} color="white" />
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.msgBtn} onPress={sendWhatsAppMessage}>
        <LinearGradient
          colors={["#59cea3", "#248f94", "#0f758f"]}
          style={styles.msgBtn}
          start={{ x: 0.7, y: 0 }}
        >
          <Text>
            <FontAwesome name="whatsapp" size={26} color="white" />
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={styles.msgBtn} onPress={sendRegularMessage}>
        <LinearGradient
          colors={["#59cea3", "#248f94", "#0f758f"]}
          style={styles.msgBtn}
          start={{ x: 0.7, y: 0 }}
        >
          <Text>
            <AntDesign name="message1" size={22} color="white" />
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.infoView}>
        <Text style={styles.phoneNumInfo}>{item.message_info.draftName}</Text>
        <Text style={styles.phoneNumInfo}>
          {item.message_info.sendToPhoneNumber}
        </Text>
        <Text style={styles.messageInfo}>
          {messageLength(item.message_info.message)}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  messageBG: {
    backgroundColor: "#121212",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 2,
    borderBottomColor: "#DFDFDF",
  },

  msgBtn: {
 
    borderRadius: 50,
    height: 42,
    width: 42,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  infoView: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  phoneNumInfo: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  messageInfo: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0f758f",
  },
});
export default MessageItem;
