function DisplayMessage({ messageFromSender }) {
  // console.log(messageFromSender);

  const authUser = JSON.parse(localStorage.getItem("chatApp"));
  // console.log(authUser);

  const itsMe = authUser.user._id === messageFromSender.senderId;
  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "chat-bubble-info" : "chat-bubble-primary";

const createdAt = new Date(messageFromSender.createdAt)
const formattedTime = createdAt.toLocaleTimeString([],{
  hour:'2-digit',
  minute:'2-digit'
})

  return (
    <div className="">
      <div className={`chat ${chatName} `}>
        <div className={`chat-bubble font-bold italic ${chatColor}`}>
          {messageFromSender.message}
        </div>
        <div className="chat-footer">{formattedTime}</div>
      </div>
    </div>
  );
}

export default DisplayMessage;
