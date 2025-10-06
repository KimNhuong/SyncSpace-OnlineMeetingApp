
import { useContext, useEffect, useRef, useState, createRef  } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RealtimeService from "../../Services/realtime";

const EndRoomAPI = (process.env.REACT_APP_API_URL || "http://localhost:8080/") + "meeting/EndRoom";
const token = localStorage.getItem("token");

function MeetingPage() {
  const realtimeRef = useRef();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const videoRef = useRef();
  const [video, setVideo] = useState(false);
  const peers = useRef({});
  const code = JSON.parse(localStorage.getItem("Room"));
  const [remoteVideos, setRemoteVideos] = useState([]);
  const [hasCamera, setHasCamera] = useState(false);
  const [localStream, setLocalStream] = useState(null);

   // Whiteboard state
  const canvasRef = useRef();
  // Sửa: drawing là object lưu trạng thái vẽ, luôn là object
  const drawing = useRef({ active: false, prevX: 0, prevY: 0 });
  const [drawColor, setDrawColor] = useState('#222');
  const [drawWidth, setDrawWidth] = useState(2);


  // Gửi dữ liệu vẽ lên socket
  const emitDraw = (drawData) => {
    realtimeRef.current.emitDraw(drawData, code.roomCode);
  };

  // Xóa toàn bộ canvas và đồng bộ
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Gửi sự kiện xóa cho mọi người
    realtimeRef.current.emitDraw({ type: 'clear' }, code.roomCode);
  };

  // Nhận dữ liệu vẽ từ socket
  useEffect(() => {
    if (!realtimeRef.current) return;
    const handleDraw = ({ data }) => {
      // Khi nhận từ socket, chỉ vẽ, không emit lại
      drawOnCanvas(data, false);
    };
    realtimeRef.current.onDraw(handleDraw);
    return () => {
      // Không cần removeListener vì socket sẽ disconnect khi unmount
    };
  }, []);

  // Hàm vẽ lên canvas
  function drawOnCanvas(data, emit = true) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (data.type === 'clear') {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    ctx.strokeStyle = data.color || '#222';
    ctx.lineWidth = data.lineWidth || 2;
    ctx.beginPath();
    ctx.moveTo(data.prevX, data.prevY);
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
    ctx.closePath();
    // Chỉ emit khi là thao tác local (emit=true)
    if (emit) emitDraw(data);
  }

  // Xử lý mouse event trên canvas
  const handleMouseDown = (e) => {
    // Đảm bảo luôn là object, không bị gán boolean
    if (typeof drawing.current !== 'object' || drawing.current === null) {
      drawing.current = { active: false, prevX: 0, prevY: 0 };
    }
    drawing.current.active = true;
    drawing.current.prevX = e.nativeEvent.offsetX;
    drawing.current.prevY = e.nativeEvent.offsetY;
  };
  const handleMouseUp = () => {
    if (typeof drawing.current !== 'object' || drawing.current === null) {
      drawing.current = { active: false, prevX: 0, prevY: 0 };
    }
    drawing.current.active = false;
  };
  const handleMouseMove = (e) => {
    if (typeof drawing.current !== 'object' || drawing.current === null || !drawing.current.active) return;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const prevX = drawing.current.prevX;
    const prevY = drawing.current.prevY;
    const drawData = { x, y, prevX, prevY, color: drawColor, lineWidth: drawWidth };
    drawOnCanvas(drawData, true);
    drawing.current.prevX = x;
    drawing.current.prevY = y;
  };



  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Hàm ngắt camera
  function stopCamera() {
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
        console.log("Camera track stopped:", track.kind);
      });
      setLocalStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  function turnOnCamera() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        setLocalStream(stream);
        setHasCamera(true);
        
        // Cập nhật stream cho tất cả peers hiện có
        Object.values(peers.current).forEach(({peer}) => {
          stream.getTracks().forEach(track => peer.addTrack(track, stream));
        });
      })
      .catch(err => {
        console.error("Error accessing camera:", err);
        alert("Không thể truy cập camera");
      });
  }

  console.log("API URL:", process.env.REACT_APP_API_URL || "http://localhost:8080/");

  useEffect(() => {
    const serverUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
    const token = localStorage.getItem("token");
    realtimeRef.current = new RealtimeService(serverUrl, token);
    realtimeRef.current.onDraw(({ data }) => drawOnCanvas(data, false));
    realtimeRef.current.joinRoom(code.roomCode);

    // Đảm bảo chỉ gắn handler 1 lần duy nhất
    const handleUserConnected = (userId) => {
      const newVideoRef = createRef();
      const peer = realtimeRef.current.createPeer(
        userId,
        localStream || new MediaStream(),
        (to, signal) => realtimeRef.current.sendSignal(to, signal),
        (remoteStream) => {
          if (newVideoRef.current && remoteStream) {
            newVideoRef.current.srcObject = remoteStream;
          }
        },
        (err) => console.error("Peer error:", err)
      );
      peers.current[userId] = { peer, videoRef: newVideoRef };
      addVideoElement(newVideoRef);
    };
    const handleSignal = ({ from, signal }) => {
      if (!peers.current[from]) {
        const newVideoRef = createRef();
        const peer = realtimeRef.current.addPeer(
          signal,
          from,
          localStream || new MediaStream(),
          (to, signal) => realtimeRef.current.sendSignal(to, signal),
          (remoteStream) => {
            if (newVideoRef.current && remoteStream) {
              newVideoRef.current.srcObject = remoteStream;
            }
          },
          (err) => console.error("Peer error:", err)
        );
        peers.current[from] = { peer, videoRef: newVideoRef };
        addVideoElement(newVideoRef);
      } else {
        peers.current[from].peer.signal(signal);
      }
    };
    const handleUserDisconnected = (userId) => {
      if (peers.current[userId]) {
        const videoRef = peers.current[userId].videoRef;
        peers.current[userId].peer.destroy();
        delete peers.current[userId];
        if (videoRef.current && videoRef.current.parentNode) {
          videoRef.current.parentNode.removeChild(videoRef.current);
        }
        setRemoteVideos((prev) => prev.filter((ref) => ref !== videoRef));
      }
    };
    const handleRoomMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
    // Gắn handler 1 lần duy nhất
    realtimeRef.current.onUserConnected(handleUserConnected);
    realtimeRef.current.onSignal(handleSignal);
    realtimeRef.current.onUserDisconnected(handleUserDisconnected);
    realtimeRef.current.onRoomMessage(handleRoomMessage);

    // Sau khi setup xong mới gọi getUserMedia
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setHasCamera(true);
        setLocalStream(stream);
        videoRef.current.srcObject = stream;
      })
      .catch(() => {
        setHasCamera(false);
        setLocalStream(null);
      });

    return () => {
      stopCamera();
      Object.values(peers.current).forEach(({ peer }) => {
        peer.destroy();
      });
      realtimeRef.current.disconnect();
    };
  }, []);

  // Hàm tạo peer mới (initiator)


  // Hàm thêm video element
  function addVideoElement(videoRef) {
    console.log("➕ Adding video element to DOM");
    
    // Tạo video element
    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.playsInline = true;
    videoElement.width = 300;
    videoElement.style.width = '300px';
    videoElement.style.height = 'auto';
    videoElement.style.borderRadius = '8px';
    videoElement.style.margin = '5px';
    videoElement.style.backgroundColor = 'black';
    
    // Gán video element vào ref
    videoRef.current = videoElement;
    
    // Thêm vào DOM trực tiếp (KHÔNG dùng React state)
    const videoContainer = document.getElementById('video-container');
    if (videoContainer) {
      videoContainer.appendChild(videoElement);
      console.log("✅ Video element added to DOM");
    } else {
      console.log("❌ Video container not found");
    }
  }
  

  useEffect(() => {
    if (isLoggedIn == false) {
      setTimeout(() => {
        navigate("/NewRoom");
      }, 1000);
    }
  }, [isLoggedIn]);

  function sendMessage(event) {
    event.preventDefault();
    if (!message.trim()) return;
    // Chỉ gửi qua socket, không tự thêm vào messages
    realtimeRef.current.sendMessage(code.roomCode, message, user.username);
    setMessage("");
  }

  const handleEnd = async () => {
    // Ngắt camera trước khi rời phòng
    stopCamera();
    
    // Ngắt tất cả peer connections
    Object.values(peers.current).forEach(({peer}) => {
      peer.destroy();
    });
    
    await axios
      .post(
        EndRoomAPI,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(navigate("/"));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-400 via-slate-100 to-indigo-400">
      {isLoggedIn == true && (
        <div className="min-h-screen w-full bg-gradient-to-b from-indigo-400 via-slate-100 to-indigo-400 flex font-spartan">
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="w-full h-[70vh] bg-black rounded-2xl shadow-lg flex flex-col items-center justify-center text-white relative">
              {/* Remote video */}
              <div id="video-container" className="h-3/5 w-full rounded-2xl object-cover flex flex-wrap"></div>
              {/* Local video (nhỏ góc) */}
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-1/4 h-1/4 absolute bottom-4 right-4 bg-black rounded-xl shadow-lg"
              />
              {/* Whiteboard canvas + controls */}
              <div className="w-full flex flex-col items-center mt-4">
                <div className="flex gap-2 mb-2">
                  <label className="flex items-center gap-1">
                    <span className="text-xs">Màu:</span>
                    <input type="color" value={drawColor} onChange={e => { setDrawColor(e.target.value); setDrawWidth(2); }} className="w-8 h-8 p-0 border-none" />
                  </label>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs"
                    onClick={() => { setDrawColor('#fff'); setDrawWidth(16); }}
                    type="button"
                    title="Cục tẩy"
                  >🧹 Tẩy</button>
                  <button
                    className="px-3 py-1 bg-red-200 rounded hover:bg-red-300 text-xs"
                    onClick={clearCanvas}
                    type="button"
                    title="Xóa tất cả"
                  >Xóa bảng</button>
                </div>
                <canvas
                  ref={canvasRef}
                  width={700}
                  height={250}
                  className="border-2 border-indigo-400 rounded-xl bg-white shadow-lg cursor-crosshair"
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseOut={handleMouseUp}
                  onMouseMove={handleMouseMove}
                />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="px-4 py-2 bg-gray-500 text-white rounded-full shadow">
                {hasCamera ? "📹 Camera: ON" : "📹 Camera: OFF"}
              </div>
              <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow">
                🎤 Mic
              </button>
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow"
                onClick={turnOnCamera}
              >
                📹 Video
              </button>
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
                onClick={handleEnd}
              >
                ❌ Leave
              </button>
            </div>
          </div>
          <div className="w-1/4 h-full flex flex-col bg-white shadow-xl rounded-l-2xl overflow-hidden mt-[5rem]">
            <div className="flex-1 p-4 space-y-2 overflow-y-auto  max-h-[50vh]">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[80%] px-3 py-2 rounded-2xl shadow break-words whitespace-pre-wrap
                  ${
                    idx % 2 === 0
                      ? "bg-indigo-200 self-start"
                      : "bg-green-200 self-end"
                  }`}
                >
                  {msg.sender}: {msg.message}
                </div>
              ))}
              <div ref={messagesEndRef} />
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
            <div className="bg-white shadow-xl rounded-l-2xl overflow-hidden p-4 z-20">
              {" "}
              ROOMCODE: {code.roomCode}
            </div>
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