import ChatInput from "./ChatInput";
import ChatLists from "./ChatLists";
import socketIOClient from "socket.io-client";
import { API_URL } from "../../Axios/BaseURL";
import { useEffect, useState } from "react";
import add from '../../assets/icons/cross.svg'
import GroupCreateComponent from "./GroupCreateComponent";

interface Chat {
  email: string | null;
  message: string;
  name: string | null;
}

const ChatContainer = () => {
  const socketio = socketIOClient(API_URL);
  const [chats, setChats] = useState<Chat[]>([]);
  const [group, setGroup] = useState<boolean>(false)

  useEffect(() => {
    socketio.on("chat", (newChat: Chat) => {
      console.log('Received chat from socket:', newChat);
      setChats((prevChats) => [...prevChats, newChat]);
    });
    return () => {
      socketio.off("chat");
      socketio.disconnect();
    };
  }, [socketio]);

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
  const handlesubmit= ()=>{
    setGroup(true)
  }
  const cancelGroup=()=>{
    setGroup(false)
  }

  return (
    <>
    <div className="bg-slate-500 h-[36.3rem] flex flex-col">
      <div className="border border-white bg-slate-800 py-4">
        <p className="text-center capitalize text-white">#community</p>
      </div>
      <div className="flex flex-grow overflow-hidden">
        <aside className="flex flex-col items-center  bg-slate-800 border-l-2 lg:w-20 md:w-16 sm:w-12 w-10 h-full rounded-r-sm flex-shrink-0">
          <div className="mt-2 flex lg:h-12 lg:w-12 md:w-10 md:h-10 sm:w-8 sm:h-8 h-8 w-8 items-center justify-center rounded-full bg-blue-600">
            <p>M</p>
          </div>
          
          <div className="mt-2">
            <img onClick={handlesubmit} src={add} alt="" />
          </div>
        </aside>
        <div className="flex-grow flex flex-col">
          <div className="flex-grow overflow-y-auto p-1">
            <ChatLists chats={chats} />
          </div>
          <ChatInput addMessage={addMessage} />
        </div>
      </div>    
    </div>
      {group && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <GroupCreateComponent cancelGroup={cancelGroup}/>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
