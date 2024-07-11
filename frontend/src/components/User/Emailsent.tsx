
const EmailSent = () => {
  return (
    <div className="bg-gray-500 bg-opacity-25 fixed inset-0 flex items-center justify-center ">
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">
            <img src="https://img.icons8.com/fluency/48/000000/checked.png" alt="Success Icon" className="w-12 h-12"/>
        </div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">Email sent</h2>
        <p className="text-gray-700 mb-4">We've sent a link to your inbox. Kindly verify your email by clicking the link.</p>
        <p className="text-gray-700">Thank you</p>
    </div>
</div>
  )
}

export default EmailSent