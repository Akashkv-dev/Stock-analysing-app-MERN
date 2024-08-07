import React from "react";

interface chatdetails {
    message:string,
    username:string | null,
    avatar?:string,
    email?:string
}
interface Chat {
    email: string | null;
    message: string;
    name:string | null;
  }
interface ChatListsProps {
    chats: Chat[];
  }

const ChatLists:React.FC<ChatListsProps> = ({chats}) => {
    console.log(chats);
    
    const email= localStorage.getItem('email');
    const name= localStorage.getItem('name') || 'Unknown';
     
    const SenderChat = ({message,username,avatar}:chatdetails) => {
        return (
            <div className="flex justify-end mb-2">
                <div className="flex items-end max-w-[75%]">
                    <p className="p-2.5 bg-slate-600 rounded-md text-white break-words word-break-all w-full">
                        <strong>{username}</strong>
                        <br />
                        {message}
                    </p>
                    <img src={avatar} alt="i" className="w-8 h-8 ml-2" />
                </div>
            </div>
        )
    }

    const ReceiverChat = ({message ,username,avatar}:chatdetails) => {
        
        return (
            <div className="flex justify-start mb-2">
                <div className="flex items-end max-w-[75%]">
                    <img src={avatar} alt="i" className="w-8 h-8 mr-2" />
                    <p className="p-2.5 bg-gray-300 rounded-md text-black break-words break-all w-full">
                        <strong>{username}</strong>
                        <br />
                        {message}
                    </p>
                </div>
            </div>
        )
    }
    if (!Array.isArray(chats)) {
        return <div>Loading chats...</div>;
      }
    return (
        <>
        <div className="p-1 h-full">
            {chats.map((chat: Chat,index: number)=> {
                    if(chat.email === email ){
                        return<SenderChat 
                        message={chat.message}
                        username={name}
                        // avatar ={chat.avatar}
                        key={index} />
                    }
                    return (
                    <ReceiverChat 
                    message={chat.message}
                        username={chat.name}
                        // avatar ={chat.avatar}
                        key={index}
                    />
                );
                })
            }
            
            
        </div>
        </>
    );
};


export default ChatLists
