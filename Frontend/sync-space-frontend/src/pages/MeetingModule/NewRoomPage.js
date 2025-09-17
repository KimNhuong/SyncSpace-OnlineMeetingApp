import { default as axios } from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NewRoomPage() {
  const [text, setText] = useState("");
  const [err, setErr] = useState(false);
  const token = localStorage.getItem("token");
  const RoomAPI = process.env.REACT_APP_API_URL + "meeting/CreateMeeting";
  const JoinRoomAPI = process.env.REACT_APP_API_URL + "Room/Join";

  const CreateRoomRequest = async () => {
    try {
      const response = await axios.post(
        RoomAPI,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("Room", JSON.stringify(response.data.Room));
      return { success: true, data: response.data };
    } catch (err) {
      console.log(err.response?.data || err.message);
      return { success: false, error: err.response?.status || err.message };
    }
  };

  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    const result = await CreateRoomRequest();
    if (result.success) {
      navigate("/Meeting");
    } else if (result.error === 404) {
      setErr(true);
    } else {
      alert("Có lỗi xảy ra, thử lại sau.");
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();           // ngăn reload page
  if (!text.trim()) return;     // check empty input

  try {
    const response = await axios.post(
      JoinRoomAPI,
      { code: text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("Room", JSON.stringify(response.data.Room));
    navigate("/Meeting");
  } catch (err) {
    // Hiển thị lỗi nếu join thất bại
    setErr(err.response?.data?.message || "Failed to join room");//Chinh cai nay!!!!!!!!!
  }
};

  return (
    <div className="relative h-[50rem] bg-gradient-to-br from-indigo-200 via-white to-indigo-400">
      <div
        className="absolute h-full w-full z-0"
        style={{
          backgroundImage: `url('NewRoomPageBg.svg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "50rem",
          opacity: 0.12,
        }}
      ></div>
      <div className="flex w-4/5 mx-auto pt-24 relative z-10 min-h-[32rem]">
        {/* Left: Card */}
        <div className="flex flex-col justify-center items-start w-2/5 gap-8">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full border border-indigo-100">
            <p className="font-bold font-spartan text-indigo-700 text-5xl mb-4 tracking-wide drop-shadow-lg">
              SYNC-SPACE
            </p>
            <p className="font-spartan text-gray-700 text-xl mb-2">
              Sync smarter. Work better.
            </p>
            <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-semibold shadow mt-2">
              Collaboration Platform
            </span>
          </div>
          {err == false && (
            <div
              className="font-bold font-spartan text-white text-lg px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 hover:from-indigo-700 hover:to-indigo-500 transition shadow-lg w-full text-center tracking-wide hover:cursor-pointer"
              onClick={handleCreateRoom}
            >
              + Create Room
            </div>
          )}
          {err == true && (
            <div className="w-full p-4 bg-red-100 text-red-700 border border-red-300 rounded-xl font-spartan shadow text-center">
              Room already exists or not found. Please try another code.
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center w-full border border-indigo-100"
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-gray-100 border-none rounded-full px-5 py-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg shadow"
              placeholder="Enter room code..."
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold px-8 py-3 rounded-full hover:from-green-500 hover:to-green-700 transition w-full shadow-lg tracking-wide"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex items-center justify-center w-3/5 ml-8">
          <img
            src="meeting.webp"
            alt="meeting img"
            className="w-[90%] h-auto rounded-3xl shadow-2xl border-4 border-white object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default NewRoomPage;
