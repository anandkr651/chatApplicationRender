import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUser from "../../context/useGetAllUser";
import useConversation from "../../zustand/useConversation";
import { toast } from "react-hot-toast";

function Search() {

  const[search,setSearch]=useState("")
  const [alluser]=useGetAllUser()
  const {setSelectedConversation} = useConversation()

const handleSubmit = (e)=>{
      e.preventDefault();
      if(!search) return;
      const conversation = alluser.find((user)=>
      user.fullname.toLowerCase().includes(search.toLowerCase()))
      if(conversation){
        setSelectedConversation(conversation)
        setSearch("")
      }else{
        toast.error("user not found");
        setSearch("")
      }
}


  return (
    <div className="p-5 z-10 fixed bg-black w-[30%]">
      <form action="" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label className="">
            <input
              type="text"
              className="px-5 py-2 rounded-xl text-xl outline-none border border-slate-700"
              placeholder="Search"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </label>
          <FaSearch className="text-4xl px-1 rounded-full duration-300" />
        </div>
      </form>
    </div>
  );
}

export default Search;
