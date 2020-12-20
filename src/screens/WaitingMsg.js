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
  const { messages, getUserMessages, loading } = useContext(AppContext);
  useEffect(() => {
    getUserMessages();
  }, []);

  return (
    <>
      <SafeAreaView>
        <View style={styles.navBG}>
          <View style={styles.navBtnMiddle}>
            <View style={styles.navBtnMiddleView}>
            <Text style={styles.numText}>{messages ? messages.length : '0'}</Text>
              <Text style={styles.navLink}>ממתינות לשילוח</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.screenBG}>
        <View style={styles.screenBGinner}>
           {messages ? (
             
                     <FlatList
            data={messages}
            renderItem={({ item }) => {
              return <MessageItem navigation={navigation} item={item} />;
            }}
            keyExtractor={(item) => item._id}
          /> 
         
   
        ) : <Text style={styles.noMSGtext}>אין הודעות ממתינות</Text>}
        </View>
       
        {loading && (
          <View style={styles.screenBG}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
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
    </>
  );
};
const styles = StyleSheet.create({
  screenBG: {
    backgroundColor: "#121212",
    flexDirection: 'column',
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  numText: {
    color: "white",
    borderColor: "white",
    borderWidth: 2,
    width: 23,
    textAlign: "center",
    borderRadius: 50,
    marginRight: 20,
    height: 23,
    fontSize: 12,
    paddingVertical: 2,
    marginTop: 10,
  },
  navLink: {
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontSize: 16,
    //  marginTop: 5
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
    alignItems: 'center',
    alignSelf: 'flex-end',
    flex: 2
   
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 20,
    marginRight: 10
  },
  noMSGtext: {
    color: "#FFFFFF",
    fontSize: 25,
    marginTop: 20,
    textAlign: 'center'
  }
});
export default WaitingMsg;
