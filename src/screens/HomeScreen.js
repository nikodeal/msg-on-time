import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AppContext } from "../../context/ContextProvider";
import FadedIntroLogo from "../components/FadedIntroLogo";
const USER_KEY = "user";
const HomeScreen = ({ navigation }) => {
  const { addUserNumber } = useContext(AppContext);
  const [active, setActive] = useState(true);
  const [phoneNum, setPhoneNum] = useState("");
  const [error, setError] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

 

  const saveUser = async (phoneNumber) => {
    try {
      await AsyncStorage.setItem(USER_KEY, phoneNumber);
      addUserNumber(phoneNumber);
      setIsLogged(true);
    } catch (err) {
      console.log("failed to save users number.");
    }
  };
  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem(USER_KEY);
      if (user !== null && user.length === 10) {
        addUserNumber(user);
        setPhoneNum(user);
        setIsLogged(true);
      }
    } catch (err) {
      console.log("failed to load users number.");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
    
          {isLogged ? (
            <>
              {active ? (
                <View style={styles.bg}>
                  <FadedIntroLogo setActive={setActive}>
                    <Image
                      style={styles.img}
                      source={require("../../assets/logo.png")}
                    />
                  </FadedIntroLogo>
                </View>
              ) : (
                <View style={styles.bg}>
                  <Text style={styles.title}>{phoneNum}</Text>

                  <TouchableOpacity
                    style={styles.btnOpacity}
                    onPress={(e) => {
                      e.preventDefault();

                      navigation.push("Profile");
                    }}
                  >
                    <Text style={styles.btnOpacityText}>אישור</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <>
              {active ? (
                <View style={styles.bg}>
                  <FadedIntroLogo setActive={setActive}>
                    <Image
                      style={styles.img}
                      source={require("../../assets/logo.png")}
                    />
                  </FadedIntroLogo>
                </View>
              ) : (
                <View style={styles.bg}>
                  <Text style={styles.title}>הזן את המספר טלפון שלך</Text>
                  <TextInput
                  
                   maxLength={10}
                   keyboardType="numeric"
                    style={styles.input}
                    placeholder="הזן מספר טלפון"
                    onChangeText={(text) => {
                      setPhoneNum(text);
                      setError(false);
                    }}
                    value={phoneNum}
                  />
                  <TouchableOpacity
                    style={styles.btnOpacity}
                    onPress={(e) => {
                      e.preventDefault();
                      console.log(phoneNum);
                      if (phoneNum.length === 10) {
                        for (let i = 0; i < phoneNum.length; i++) {
                          if (phoneNum.indexOf(i) !== Number()) {
                            setError(true);
                            break;
                          }
                          setError(false)
                          saveUser(phoneNum)
                          navigation.push('Profile')
                        }
                      } else {
                        setError(true);
                      }
                    }}
                  >
                    <Text style={styles.btnOpacityText}>סיימתי</Text>
                  </TouchableOpacity>
                  {error && (
                    <Text style={styles.error}>מספר טלפון אינו תקין</Text>
                  )}
                </View>
              )}
            </>
          )}
   
    </>
  );
};

const styles = StyleSheet.create({
  bg: {
    height: "100%",
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 330,
    height: 330,
  },
  title: {
  marginVertical: 10,
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "100",
    letterSpacing: 2,
  },
  input: {
    marginVertical: 25,
    width: 266,
    height: 60,
    borderRadius: 15,
    borderColor: "#707070",
    borderWidth: 1.5,
    textAlign: "center",
    color: '#707070',
    backgroundColor: "#FFFFFF",
  },
  btnOpacity: {
    width: 108,
    height: 45,
    borderRadius: 35,
    backgroundColor: "#20B038",
    alignItems: "center",
    justifyContent: "center",
  },
  btnOpacityText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  error: {
    position: "relative",
    top: "5%",
    fontSize: 16,
    color: "red",
    fontWeight: "100",
    letterSpacing: 2,
  },
});
export default HomeScreen;
