import axios from "axios";
import { useState, useEffect } from "react";

const MeetingAPI = process.env.REACT_APP_API_URL + "meeting/FindAllRoom";
const EndRoomAPI = process.env.REACT_APP_API_URL + "meeting/EndRoom";

function HistoryPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(MeetingAPI, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setRooms(response.data.allRooms || []);
      } catch (e) {
        setErr(e.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    };

    getHistory();
  });

  const handleEnd = async () => {
    await axios.post(EndRoomAPI,{}, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-200 via-white to-indigo-400 p-8">
      <h1 className="text-4xl font-bold text-indigo-700 font-spartan mb-8 text-center drop-shadow-lg">
        Meeting History
      </h1>

      {loading && (
        <div className="text-center text-indigo-600 font-semibold">Loading...</div>
      )}

      {err && (
        <div className="text-center text-red-600 font-semibold mb-4">{err}</div>
      )}

      {!loading && rooms.length === 0 && (
        <div className="text-center text-gray-600 font-medium">
          No meeting rooms found.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.roomID}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100 hover:scale-105 transform transition"
          >
            <h2 className="text-xl font-bold text-indigo-700 mb-2">
              Room ID: {room.roomID}
            </h2>
            <p className="text-gray-700 mb-1">
              Creator ID: {room.creatorID}
            </p>
            <p className="text-gray-700 mb-1">
              Status:{" "}
              <span
                className={
                  room.status === "Active"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              > 
                {room.status}
              </span>
              <button className="bg-gradient-to-br from-red-600 via-white to-red-300 shadow-xl rounded-xl w-fit  h-fit p-2 font-bold ml-8 hover:p-4" onClick={handleEnd}>EndRoom</button>
            </p>
            <p className="text-gray-500 text-sm">
              Created At: {new Date(room.createdAt).toLocaleString()}
            </p>
            {room.endedAt && (
              <p className="text-gray-500 text-sm">
                Ended At: {new Date(room.endedAt).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;
