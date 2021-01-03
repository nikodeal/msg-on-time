import React, { useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AppContext } from "../../context/ContextProvider";
const NavBar = ({ navigation }) => {
  const { messages, getUserMessages,setMessages } = useContext(AppContext);
  useEffect(() => {
    getUserMessages();

    return () =>{
      setMessages([])
    }
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.navBG}>
        <TouchableOpacity
          style={styles.navBtnMiddle}
          onPress={() => navigation.push("Waiting")}
        >
          <View  style={styles.navBtnMiddleView}>
          <View style={styles.numText}>
                <Text style={styles.numberTextInView}>
                  {messages ? messages.length : "0"}
                </Text>
              </View> 
               <Text style={styles.navLink}>ממתינות לשילוח</Text>
          </View>
         
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
  navBtnMiddleView:{
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
});
export default NavBar;
