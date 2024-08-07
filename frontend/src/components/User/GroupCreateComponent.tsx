import React, { useState } from "react";

interface GroupCreateComponentProps {
    cancelGroup: () => void;
  }

const GroupCreateComponent: React.FC<GroupCreateComponentProps> = ({cancelGroup}) => {
  const [groupName, setGroupName] = useState<string>('');

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    // Handle group creation logic here
    console.log('Group Name:', groupName);
  };
  const handleCancel= ()=>{
    cancelGroup()
  }

  return (
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
            onChange={(e) => setGroupName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter group name"
            required
          />
        </div>
        </form>
        <button
          type="submit"
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
  );
};

export default GroupCreateComponent;
