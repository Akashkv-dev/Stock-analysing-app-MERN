interface chatdetails {
    message:string,
    username:string,
    avatar:string,
    email?:string
}
const ChatLists = ({chats}) => {


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
                    <img src={avatar} alt="" className="w-8 h-8 ml-2" />
                </div>
            </div>
        )
    }

    const ReceiverChat = ({message ,username,avatar}:chatdetails) => {
        return (
            <div className="flex justify-start mb-2">
                <div className="flex items-end max-w-[75%]">
                    <img src={avatar} alt="" className="w-8 h-8 mr-2" />
                    <p className="p-2.5 bg-gray-300 rounded-md text-black break-words break-all w-full">
                        <strong>{username}</strong>
                        <br />
                        {message}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-1 h-full">
            {
                chats.map((chat: chatdetails,index)=> {
                    if(chat.email === email ){
                        return<SenderChat 
                        message={chat.message}
                        username={name}
                        avatar ={chat.avatar} />
                    }
                    return <ReceiverChat 
                    message={chat.message}
                        username={name}
                        avatar ={chat.avatar}
                    />
                })
            }
            
            
        </div>
    )
}


export default ChatLists
