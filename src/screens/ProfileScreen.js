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
      <TouchableOpacity onPress={() => navigation.push("AddMsg")}>
        <View style={styles.bgProfile}>
          <View style={styles.innerProLayout}>
            <Text style={styles.proTitle}>לחץ כדי לתזמן הודעת ואטסאפ</Text>
            <Image
              style={styles.proImg}
              source={require("../../assets/logo.png")}
            />
           
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bgProfile: {
    height: "100%",
    backgroundColor: "#121212",
  },
  innerProLayout: {
    marginVertical: "30%",
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },

  proImg: {
    // marginVertical: 20,
    width: 330,
    height: 300,
  },
  proTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "100",
    letterSpacing: 2,
    textAlign: "center",
    width: "90%",
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
  btnOpacity: {
    width: 138,
    height: 45,
    borderRadius: 35,
    backgroundColor: "#20B038",
    alignItems: "center",
    justifyContent: "center",
  },
  btnOpacityText: {
    color: "#fff",
    fontSize: 20,
  },
});
export default ProfileScreen;
