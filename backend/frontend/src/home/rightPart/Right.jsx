import { useEffect } from "react";
import useConversation from "../../zustand/useConversation.js";
import ChatUser from "./ChatUser.jsx";
import Messages from "./Messages.jsx";
import TypeSend from "./TypeSend.jsx";
import NoChat from "./NoChat.jsx";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-[70%] bg-slate-700 text-gray-300 h-screen overflow-scroll ">
      {!selectedConversation ? (
        <NoChat />
      ) : (
        <div>
          <ChatUser />
          <div className="mb-10 mt-20">
            <Messages />
          </div>
          <TypeSend />
        </div>
      )}
    </div>
  );
}
export default Right;
