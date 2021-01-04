import React, { createContext, useState } from "react";
import { diffClamp } from "react-native-reanimated";
import db from "../src/firebase";
export const AppContext = createContext();

const ContextProvider = (props) => {
  const [userNumber, setUserNumber] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingForSingleMsg, setLoadingForSingleMsg] = useState(true);
  const [singleMsg, setSingleMsg] = useState(null);
  const [msgId, setMsgId] = useState("");

  const messagesRef = db.collection("messages");

  const getUserMessages = async () => {
    let msgArr = [],
      msgObject = {};
    const getMsgs = await messagesRef
      .where("userPhoneNumber", "==", userNumber)
      .get();
    getMsgs.forEach((doc) => {
      msgObject = {
        message_id: doc.id,
        message_info: doc.data(),
      };
      msgArr.push(msgObject);
    });
    setLoading(false);
    setMessages(msgArr);
  };
  const getSingleMessage = async () => {
    const msg = await messagesRef.doc(msgId).get();
    setLoadingForSingleMsg(false);
    setSingleMsg(msg.data());
  };
  const updateMessage = async (form) => {
    await messagesRef.doc(msgId).update(form);
  };
  const SaveMessageToDB = async (form) => {
    await messagesRef.add(form);
  };
  const deleteSingleMsg = async () =>{
    await messagesRef.doc(msgId).delete();
  }
  const addUserNumber = (num) => {
    setUserNumber(num);
  };

  const setMessageId = (id) => {
    setMsgId(id);
  };

  return (
    <AppContext.Provider
      value={{
        userNumber,
        addUserNumber,
        messages,
        getUserMessages,
        loading,
        setMessageId,
        getSingleMessage,
        singleMsg,
        loadingForSingleMsg,
        setSingleMsg,
        setMessages,
        updateMessage,
        SaveMessageToDB,
        deleteSingleMsg
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
