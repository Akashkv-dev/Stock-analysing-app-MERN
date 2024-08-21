import ChatInput from "./ChatInput";
import ChatLists from "./ChatLists";
import socketIOClient from "socket.io-client";
import { API_URL } from "../../Axios/BaseURL";
import { useEffect, useRef, useState } from "react";
import add from "../../assets/icons/cross.svg";
import GroupCreateComponent from "./GroupCreateComponent";
import { getGroups } from "../../Service/UserApi";
import AddGrpMem from "./AddGrpMem";

interface Chat {
  email: string | null;
  message: string;
  name: string | null;
}
interface Group {
  groupId: string;
  gName: string;
  admin: number;
}
interface GroupData {
  Group:Group
  initial: string;
  id: string;
  gName: string;
}

const ChatContainer = () => {
  const socketio = socketIOClient(API_URL);
  const [chats, setChats] = useState<Chat[]>([]);
  const [group, setGroup] = useState<boolean>(false);
  const [groupData, setGroupData] = useState<{initial: string;id: string;gName: string}[]>([]);
  const [groupClk, setGroupClk] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socketio.on("chat", (newChat: Chat) => {
      console.log("Received chat from socket:", newChat);
      setChats((prevChats) => [...prevChats, newChat]);
    });
    return () => {
      socketio.off("chat");
      socketio.disconnect();
    };
  }, [socketio]);
  useEffect(() => {
    const fetchGrp = async () => {
      const id = localStorage.getItem("id");
      if (id) {
        const parseId = +id;
        console.log(parseId);

        try {
          const response = await getGroups(parseId);
          if (response.status === 200) {
            console.log(response);
            const groups: GroupData[] = response.data
            const groupData = groups.map((group) => ({
              initial: group.Group.gName.charAt(0).toUpperCase(),
              id: group.Group.groupId,
              gName: group.Group.gName,
            }));
            setGroupData(groupData);
            console.log(groupData);
            
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchGrp();
  }, [group]);

  useEffect(()=>{
    if(chatListRef.current){
      chatListRef.current.scrollTop=chatListRef.current.scrollHeight;
    }
  },[chats])

  const sendToSocket = (chat: Chat) => {
    socketio.emit("chat", chat);
  };

  const addMessage = (chat: Omit<Chat, "email" | "name">) => {
    const newChat: Chat = {
      ...chat,
      email: localStorage.getItem("email"),
      name: localStorage.getItem("name"),
    };
    setChats((prevChats) => {
      const updatedChats = [...prevChats, newChat];
      sendToSocket(newChat); // send the new chat message to the socket
      return updatedChats;
    });
  };
  const handlesubmit = () => {
    setGroup(true);
  };
  const cancelGroup = () => {
    setGroup(false);
  };
  const handleGroup = (gId: string) => {
    setGroupClk(true);
    setSelectedId(gId);
  };
  const selectedGrp = groupData.find((group) => group.id === selectedId);

  return (
    <>
      <div className="bg-slate-500 h-[36.3rem] flex flex-col">
        <div className="border border-white bg-slate-800 py-4">
          <p className="text-center capitalize text-white">#community</p>
        </div>
        <div className="flex flex-grow overflow-hidden">
          <aside className=" flex flex-col items-center  bg-slate-800 border-l-2 lg:w-20 md:w-16 sm:w-12 w-10 h-full rounded-tr-lg flex-shrink-0">
            {groupData.map((group) => {
              if (!group.initial) {
                return null; // Return null instead of void or undefined
              }

              return (
                <div
                  key={group.id}
                  onClick={() => handleGroup(group.id)}
                  className="cursor-pointer mt-2 flex lg:h-12 lg:w-12 md:w-10 md:h-10 sm:w-8 sm:h-8 h-8 w-8 items-center justify-center rounded-full bg-blue-600"
                >
                  {group.initial}
                </div>
              );
            })}

            <div className="mt-2">
              <img onClick={handlesubmit} src={add} alt="" />
            </div>
          </aside>
          {groupClk ? (
            <div className="flex-grow flex flex-col">
                <div className="flex justify-between text-xl font-bold text-white text-left px-2 rounded-md py-2 bg-slate-800 mx-1">
                  {selectedGrp?.gName}
                  <AddGrpMem group={selectedGrp}/>
                </div>
                <div className="flex-grow overflow-y-auto px-1" ref={chatListRef}>
                  <ChatLists chats={chats} />
                </div>
              <ChatInput addMessage={addMessage} />
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center uppercase text-white">
              Select Group
            </div>
          )}
        </div>
      </div>
      {group && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <GroupCreateComponent cancelGroup={cancelGroup} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
