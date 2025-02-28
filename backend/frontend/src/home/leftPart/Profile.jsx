import { useSocketContext } from "../../context/socketContext.jsx";
import useConversation from "../../zustand/useConversation.js";

function Profile({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  // console.log(isSelected);
  const {socket,onlineUser}= useSocketContext()
  const isOnline=onlineUser.includes(user._id)
  // console.log(isOnline);
  

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex px-5 py-2 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" :""}`}>
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="ml-2">
          <h1 className="text-xl italic font-bold ">{user.fullname}</h1>
          <span className="font-medium ">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
