import useGetAllUser from "../../context/useGetAllUser.jsx";
import Profile from "./Profile.jsx";

function User() {
  const [alluser] = useGetAllUser();
  // console.log(alluser);

  return (
    <div className=" max-h-screen overflow-scroll">
      <h1 className="px-8 py-2 text-white bg-slate-900 text-xl fixed top-20  w-[30%] z-10">
        Message
      </h1>
      <div className="mt-32 mb-10">
        {alluser.map((user, index) => (
          <Profile key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default User;
