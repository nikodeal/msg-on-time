import React, { createContext, useState } from "react";
import axios from "axios";
export const AppContext = createContext();

const ContextProvider = (props) => {
  const [userNumber, setUserNumber] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingForSingleMsg, setLoadingForSingleMsg] = useState(true);
  const [singleMsg, setSingleMsg] = useState(null);
  const [msgId, setMsgId] = useState("");

  
  const getUserMessages = async () => {
    try {
      const result = await axios.get(
        `https://msgontimeapi.herokuapp.com/${userNumber}`
      );
      setMessages(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const getSingleMessage = async () => {
    try {
      const result = await axios.get(
        `https://msgontimeapi.herokuapp.com/message/${msgId}`
      );
      setSingleMsg(result.data);
      setLoadingForSingleMsg(false);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteSingleMsg = async () => {
    try {
      await axios.delete(
        `https://msgontimeapi.herokuapp.com/message/${msgId}`
      );
      
    } catch (err) {
      console.log(err);
    }
  };
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
        deleteSingleMsg,
    
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
