import ChatInput from './ChatInput'
import ChatLists from './ChatLists'
import socketIOClient from 'socket.io-client'
import {API_URL} from '../../Axios/BaseURL'
import { useEffect, useState } from 'react'



const ChatContainer = () => {
    const socketio = socketIOClient(API_URL)
    const [chats,setChats] = useState<[]>([])

    useEffect(()=>{
        socketio.on('chat', (chats)=>{
            setChats(chats)
        })
        
    });

    const sendToSocket = (chat) => {
        socketio.emit('chat',chat)
    }

    const addMessage = (chat) => {
        const newChat = {...chat, email:localStorage.getItem('email')}
        setChats([...chats,newChat])
        sendToSocket([...chats,newChat])
    }
  return (
    <div className='bg-slate-500 h-[36.3rem] flex flex-col'>
      <div className='border border-white bg-slate-800 py-4'>
        <p className='text-center capitalize text-white'>#community</p>
      </div>
      <div className='flex flex-grow overflow-hidden'>
        <aside className='bg-slate-800 border-l-2 lg:w-20 md:w-16 sm:w-12 w-10 h-full rounded-r-sm flex-shrink-0'>
          <span className='text-white'>mak</span>
        </aside>
        <div className='flex-grow flex flex-col'>
          <div className='flex-grow overflow-y-auto p-1'>
            <ChatLists chats={chats}/>
          </div>
          <ChatInput addMessage={addMessage} />
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
