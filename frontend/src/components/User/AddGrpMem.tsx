import { useState } from "react";
import addUser from "../../assets/icons/addUser.svg";
import { addMem } from "../../Service/UserApi";
import { ToastContainer, toast } from "react-toastify";

interface Group {
    id: string;
    gName: string;
  }
  interface GroupProps {
    group: Group | undefined;
  }

const AddGrpMem = ({group}:GroupProps) => {
  const [addMember, setAddMember] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const handlesubmit = () => {
    setAddMember(true);
  };

  const handleSubmitMem =async () => {
    console.log(group);
    if (!group) {
        console.log("No group selected");
        return;
      }
    const grpId=+group.id
        try {
            const response= await addMem(email,grpId)
            if(response.status=== 200){
                setAddMember(false)
                console.log(response); 
            }
        } catch (err) {
            console.log(err);
            
            const error = err as { response: { data: { message: string } } };
            toast(error.response.data.message)
        }
  };
  const handleCancel = () => {
    setAddMember(false);
  };
  return (
    <>
    <ToastContainer/>
      <img className="cursor-pointer" src={addUser} alt="add" onClick={handlesubmit} />
      {addMember && (
        <div className=" mx-auto absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className=" bg-white p-6 rounded shadow-md">
            <form className="">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="groupName"
                >
                  Add Member
                </label>
                <input
                  type="email"
                  id="groupMem"
                  value={email}
                  name="groupMem"
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter email"
                  required
                />
              </div>
            </form>
            <button
              onClick={handleSubmitMem}
              className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >

              Add
            </button>

            <button
              onClick={handleCancel}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddGrpMem;
