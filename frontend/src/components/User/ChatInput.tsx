import { useState } from "react"

const ChatInput = ({addMessage}) => {
    const [message , setMessage] =useState<string>('')
    const sendMessage = ()=> {
      if (message.trim() !== '') {
        addMessage({ message })
        setMessage('') // Clear the input
    }
    }
    return (
      <div className='bg-slate-700 flex items-center'>
        <textarea
          name="message"
          id="msg"
          rows={2}
          className="flex-grow p-2 rounded-md bg-slate-800 text-white resize-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        ></textarea>
        <button className="ml-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={()=>sendMessage()}
        >
          Send
        </button>
      </div>
    )
  }
  
  export default ChatInput
  