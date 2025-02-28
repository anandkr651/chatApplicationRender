import Logout from "./Logout.jsx";
import Search from "./Search.jsx";
import User from "./User.jsx";

function left() {
  return (
    <div className="w-[30%] bg-black text-gray-400">
      <Search />
      <User />
      <Logout />
    </div>
  );
}

export default left;
