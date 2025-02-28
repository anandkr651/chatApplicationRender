import { useEffect, useState } from "react";
import axios from "axios";

function useGetAllUser() {
  const [alluser, setAlluser] = useState([]);

  useEffect(() => {
    const getusers = async () => {
      try {
        const response = await axios.get("/api/users/allUserExceptOnline");
        // console.log(response.data.data);

        setAlluser(response.data.data);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      }
    };
    getusers();
  }, []);
  return [alluser];
}

export default useGetAllUser;

//NOTES --> the file name of custom hook always start with "small letter" useuseGetAllUser
