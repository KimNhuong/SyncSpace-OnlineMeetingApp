import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-white to-indigo-300 flex flex-col">
      {/* Header */}
      <header className="flex flex-col items-center justify-center pt-16 pb-8">
        <h1 className="font-spartan font-extrabold text-5xl md:text-7xl text-indigo-700 drop-shadow-lg tracking-wide mb-4">
          SYNC-SPACE
        </h1>
        <p className="font-spartan text-xl md:text-2xl text-gray-700 bg-white/70 backdrop-blur-md rounded-full px-6 py-2 shadow">
          Sync smarter. Work better.
        </p>
      </header>

      {/* 3 chức năng chính */}
      <section className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
          {/* New Meeting */}
          <Link
            to="/NewMeeting"
            className="group relative rounded-2xl shadow-xl bg-white/80 hover:bg-indigo-50 transition flex flex-col items-center justify-center py-12 px-6 cursor-pointer"
          >
            <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition shadow-lg">
              <img src="meetingIcon.svg" alt="MeetingIcon" className="w-16 h-16 group-hover:blur-sm transition" />
            </div>
            <span className="font-bold text-indigo-700 text-xl mb-2 tracking-wide">New Meeting</span>
            <span className="text-gray-500 text-base">Tạo phòng họp mới, bắt đầu cuộc trò chuyện ngay!</span>
          </Link>
          {/* Meeting History */}
          <div className="group relative rounded-2xl shadow-xl bg-white/80 hover:bg-indigo-50 transition flex flex-col items-center justify-center py-12 px-6 cursor-pointer">
            <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition shadow-lg">
              <img src="History.svg" alt="HistoryIcon" className="w-16 h-16 group-hover:blur-sm transition" />
            </div>
            <span className="font-bold text-indigo-700 text-xl mb-2 tracking-wide">Meeting History</span>
            <span className="text-gray-500 text-base">Xem lại lịch sử các cuộc họp đã tham gia.</span>
          </div>
          {/* Sign Out */}
          <div className="group relative rounded-2xl shadow-xl bg-white/80 hover:bg-indigo-50 transition flex flex-col items-center justify-center py-12 px-6 cursor-pointer">
            <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition shadow-lg">
              <img src="Logout.svg" alt="LogoutIcon" className="w-16 h-16 group-hover:blur-sm transition" />
            </div>
            <span className="font-bold text-indigo-700 text-xl mb-2 tracking-wide">Sign Out</span>
            <span className="text-gray-500 text-base">Đăng xuất khỏi nền tảng Sync-Space.</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;