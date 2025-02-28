import { CiLogout } from "react-icons/ci";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

function Logout() {
  const handlelogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      localStorage.removeItem("chatApp");
      Cookies.remove("accessToken");
      toast.success(response.data.message);
      window.location.reload();
    } catch (error) {
      console.log("error in logout " + error);
    }
  };
  return (
    <div className="p-4 fixed bottom-0 bg-black w-[30%] text-3xl">
      <CiLogout onClick={handlelogout} />
    </div>
  );
}

export default Logout;
