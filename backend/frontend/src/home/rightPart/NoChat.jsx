import { useAuth } from "../../context/AuthProvider.jsx";

function NoChat() {
  const [authUser] = useAuth();
  // console.log(authUser.user.fullname);
  return (
    <div className="mt-[30%] text-center ">
      <h1 className="font-bold text-4xl italic ">
        welcome <span className="text-green-500">{authUser.user.fullname}</span>
      </h1>
      <p className="font-medium text-xl ">
        No chat selected, please start conversation by selecting anyone from
        your contact
      </p>
    </div>
  );
}

export default NoChat;
