import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";
import { useState } from "react";

function TypeSend() {
  const [message, setMessage] = useState("");
  const { sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-slate-800 fixed bottom-0 w-[70%] p-2 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type here"
          className="p-2 outline-none w-[100%] rounded-lg border border-blue-500"
        />
        <div className="text-3xl px-4">
          <IoSend onClick={handleSubmit} />
        </div>
      </div>
    </form>
  );
}

export default TypeSend;
