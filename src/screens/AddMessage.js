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
import { LinearGradient } from "expo-linear-gradient";
const AddMessage = ({ navigation }) => {
  const { userNumber, SaveMessageToDB } = useContext(AppContext);

  const [messageForm, setMessageForm] = useState({
    draftName: "",
    userPhoneNumber: userNumber,
    sendToPhoneNumber: "",
    message: "",
  });
  const [error, setError] = useState(false);

  return (
    <SafeAreaView>
      <View style={styles.AddMessageLayout}>
        <Text style={styles.textTitle}>הזן שם לדראפט</Text>

        <TextInput
          style={styles.addContactBox}
          maxLength={15}
          onChangeText={(text) => {
            setError(false);
            setMessageForm({
              ...messageForm,
              draftName: text,
            });
          }}
          value={messageForm.draftName}
        />

        <Text style={styles.textTitle}>הזן מספר איש קשר</Text>

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
        </View>


        <TouchableOpacity
          style={styles.finishedTouchable}
          onPress={() => {
            if (messageForm.sendToPhoneNumber.length === 10) {
              SaveMessageToDB(messageForm);

              setError(false);
              navigation.push("Profile");
            } else {
              setError(true);
            }
          }}
        >
          <LinearGradient
            colors={["#59cea3", "#248f94", "#0f758f"]}
            style={styles.finishedTouchable}
            start={{ x: 0.7, y: 0 }}
          >
            <Text style={styles.finishedTouchableText}>סיימתי</Text>
          </LinearGradient>
        </TouchableOpacity>
        {error && <Text style={styles.error}>נתונים שהוזנו אינם תקינים</Text>}

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
    paddingTop: 90,
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

  finishedTouchable: {
    
    width: 266,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    marginTop:10,
  },
  finishedTouchableText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
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
});
export default AddMessage;
