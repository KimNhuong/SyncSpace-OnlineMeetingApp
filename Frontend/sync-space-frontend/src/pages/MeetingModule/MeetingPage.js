import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function MeetingPage() {
  const socketRef = useRef();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    socketRef.current = io("http://localhost:8080");

    socketRef.current.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn == false) {
      setTimeout(() => {
        navigate("/NewRoom");
      }, 1000);
    }
  }, [isLoggedIn]);

  function sendMessage(e) {
    e.preventDefault();
    if (!message.trim()) return;
    socketRef.current.emit("message", message);
    setMessages((prev) => [...prev, message]); // hiển thị luôn tin nhắn mình gửi
    setMessage("");
    console.log(user.username);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-400 via-slate-100 to-indigo-400">
      {isLoggedIn == true && (
        <div className="min-h-screen w-full bg-gradient-to-b from-indigo-400 via-slate-100 to-indigo-400 flex font-spartan">
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="w-full h-[70vh] bg-black rounded-2xl shadow-lg flex items-center justify-center text-white">
              Video Chat
            </div>
            <div className="flex gap-4 mt-4">
              <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow">
                🎤 Mic
              </button>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow">
                📹 Video
              </button>
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow">
                ❌ Leave
              </button>
            </div>
          </div>
          <div className="w-1/4 h-full flex flex-col bg-white shadow-xl rounded-l-2xl overflow-hidden mt-40">
            <div className="flex-1 p-4 space-y-2 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[80%] px-3 py-2 rounded-2xl shadow 
                ${
                  idx % 2 === 0
                    ? "bg-indigo-200 self-start"
                    : "bg-green-200 self-end"
                }`}
                >
                  {user.username}:{msg}
                </div>
              ))}
            </div>
            <form
              onSubmit={sendMessage}
              className="flex border-t border-gray-200 p-2"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-full border border-gray-300 focus:outline-none"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {isLoggedIn == false && (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="p-8 bg-white shadow-lg rounded-2xl text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <h2 className="text-xl font-semibold text-gray-700">
                Bạn chưa đăng nhập
              </h2>
              <p className="text-gray-500">Đang chuyển hướng về trang chủ...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MeetingPage;
