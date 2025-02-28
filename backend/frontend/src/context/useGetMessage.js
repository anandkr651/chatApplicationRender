import { useEffect } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

function useGetMessage() {
  const { messages, setMessages, selectedConversation } = useConversation();
  // console.log(selectedConversation);

  useEffect(() => {
    const getMessage = async () => {
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(`/api/messages/get/${selectedConversation._id}`);
          // console.log(res.data);

          setMessages(res.data);
        } catch (error) {
          console.log("error in getting message", error);
        }
      }
    };
    getMessage();
  }, [selectedConversation, setMessages]);
  return { messages };
}

export default useGetMessage;
