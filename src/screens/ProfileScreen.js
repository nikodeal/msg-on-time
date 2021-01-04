import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import NavBar from "../nav/NavBar";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <NavBar navigation={navigation} />

      <View style={styles.bgProfile}> 
         <View style={styles.innerProLayout}>
           <Text style={styles.proTitle}>DRAFTIT</Text>
          <Image
            style={styles.proImg}
            source={require("../../assets/logo.png")}
          />
        </View>
        <View style={styles.btnTabs}>
          <TouchableOpacity
            style={styles.finishedTouchable}
            onPress={() => navigation.push("InstantMsg")}
          >
            <Text style={styles.finishedTouchableText}>שלח הודעה</Text>
          </TouchableOpacity>
       
          <TouchableOpacity
            style={styles.finishedTouchable}
            onPress={() => navigation.push("AddMsg")}
          >
            <Text style={styles.finishedTouchableText}>צור דראפט</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bgProfile: {
    height: "100%",
    flexDirection: 'column',
    backgroundColor: "#121212",
    alignItems: 'center',
    
  },

innerProLayout:{
  paddingVertical: 22
},
  proImg: {
   
    width: 280,
    height: 280,
  },
  proTitle: {
    fontSize: 30,
    color: "white",
    fontWeight: "100",
    letterSpacing: 15,
    textAlign: "center",
   
  },
  input: {
    marginVertical: 25,
    width: 266,
    height: 60,
    borderRadius: 15,
    borderColor: "#707070",
    borderWidth: 1.5,
    textAlign: "center",
  },
 
  btnTabs:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    

  },
  finishedTouchable: {
    backgroundColor: "#20B038",
    width: 250,
    height: 80,
    borderRadius: 13,
    justifyContent: "center",
    margin: 5
  },
  finishedTouchableText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  
  },
});
export default ProfileScreen;
