import React, { useEffect, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AppContext } from "../../context/ContextProvider";
import MessageItem from "../components/MessageItem";
import { AntDesign } from "@expo/vector-icons";

const WaitingMsg = ({ navigation }) => {
  const { messages, getUserMessages, loading, setMessages } = useContext(
    AppContext
  );
  useEffect(() => {
    getUserMessages();
  }, []);

  return (
    <>
      <SafeAreaView>
        <View style={styles.navBG}>
          <View style={styles.navBtnMiddle}>
            <View style={styles.navBtnMiddleView}>
              <View style={styles.numText}>
                <Text style={styles.numberTextInView}>
                  {messages ? messages.length : "0"}
                </Text>
              </View>

              <Text style={styles.navLink}>ממתינות לשילוח</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.screenBG}>
        <View style={styles.screenBGinner}>
          {messages !== 0 ? (
            <FlatList
              data={messages}
              renderItem={({ item }) => {
                return <MessageItem navigation={navigation} item={item} />;
              }}
              keyExtractor={(item) => item.message_id}
            />
          ) : (
            <Text style={styles.noMSGtext}>אין הודעות ממתינות</Text>
          )}
        </View>

        {loading && (
          <View style={styles.screenBG}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
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
    </>
  );
};
const styles = StyleSheet.create({
  screenBG: {
    backgroundColor: "#121212",
    flexDirection: "column",
    flex: 1,
  },
  screenBGinner: {
    flex: 10,
  },
  navBG: {
    height: 103,
    backgroundColor: "#121212",
  },

  navBtnMiddle: {
    width: "100%",
    height: 100,
    backgroundColor: "#20B038",
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    shadowColor: "#00000029",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  navBtnMiddleView: {
    marginTop: 7,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  numText: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
    width: 23,
    borderRadius: 50,
    marginRight: 20,
    height: 23,
    paddingVertical: 2,
    marginTop: 10,
  },
  numberTextInView: {
    fontSize: 10,
    color: "white",
  },
  navLink: {
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontSize: 16,
    //  marginTop: 5
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
  noMSGtext: {
    color: "#FFFFFF",
    fontSize: 25,
    marginTop: 20,
    textAlign: "center",
  },
});
export default WaitingMsg;
