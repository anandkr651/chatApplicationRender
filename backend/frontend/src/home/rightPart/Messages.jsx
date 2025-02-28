import { useEffect, useRef } from "react";
import useGetMessage from "../../context/useGetMessage.js";
import DisplayMessage from "./DisplayMessage.jsx";
import useGetSocketMessages from "../../context/useGetSocketMessages.js";

function Messages() {
  const { messages } = useGetMessage();
  // console.log(messages);
  useGetSocketMessages()  //listin incomming messages

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);
  }, [messages]);
  return (
    <div>
      {messages && (
        <div className="mb-[8%]">
          {messages.map((dispMessage) => {
            return (
              <div key={dispMessage._id}  ref={lastMsgRef}>
              <DisplayMessage messageFromSender={dispMessage} />
                </div>
            );
          })}
        </div>
      )}

      {messages.length === 0 && (
        <div className="text-center mt-[20%] font-bold text-3xl italic">
          <p>say hii to start the conversation</p>
        </div>
      )}
    </div>
  );
}

export default Messages;
