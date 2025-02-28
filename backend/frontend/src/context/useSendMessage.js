import useConversation from "../zustand/useConversation.js";
import axios from "axios";

function useSendMessage() {
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message) => {
    try {
      const res = await axios.post(`/api/messages/sender/${selectedConversation._id}`,{ message });
      setMessages([...messages, res.data]);
    } catch (error) {
      console.log("error in getting message", error);
    }
  };
  return { sendMessage };
}

export default useSendMessage;
