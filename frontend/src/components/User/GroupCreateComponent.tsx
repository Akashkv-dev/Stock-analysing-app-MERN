import React, { useState } from "react";
import { addgroup } from "../../Service/UserApi";
import { ToastContainer, toast } from "react-toastify";

interface GroupCreateComponentProps {
    cancelGroup: () => void;
  }

const GroupCreateComponent: React.FC<GroupCreateComponentProps> = ({cancelGroup}) => {
  const [groupName, setGroupName] = useState<string>('');

  const handleSubmit =async (event:React.FormEvent) => {
    event.preventDefault();
    // Handle group creation logic here
    const id=localStorage.getItem('id')
    if (!id) {
      console.error("User ID not found");
      return;
    }
    const userId = parseInt(id, 10);
    try {
      const data={
        gName:groupName,
        adminId:userId
      }
      const response=await addgroup(data);
      if(response.status==200){
        console.log(response);
        toast('Group Created')    
      }
      cancelGroup()
    } catch (err) {
      console.error(err);
      const error = err as { response: { data: { message: string } } };
      toast(error.response.data.message)
    }
  };
  const handleCancel= ()=>{
    cancelGroup()
  }

  return (
    <>
    <ToastContainer/>
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">New Group</h2>
      <div className=" bg-white p-6 rounded shadow-md">
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="groupName">
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            name="group"
            onChange={(e) => setGroupName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter group name"
            required
          />
        </div>
        </form>
        <button
          onClick={handleSubmit}
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Group
        </button>
      
        <button
        onClick={handleCancel}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Close</button>
      </div>
    </div>
    </>
  );
};

export default GroupCreateComponent;
