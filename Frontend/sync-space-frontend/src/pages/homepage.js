import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="h-full w-full relative">
      <img
        src="HomeBg.jpg"
        alt="home background"
        className="w-full h-full object-cover"
      />

      <div className="absolute bg-white h-1/2 w-full border-t-2 top-[40%] shadow-slate-900 shadow-inner">
        <div className="w-full flex flex-row font-spartan font-bold text-2xl text-gray-700 text-center p-8 gap-12 justify-center">
          
          {/* Card 1 */}
          <div className="bg-slate-200/80 rounded-2xl shadow-lg shadow-black flex-1 max-w-xs flex flex-col items-center justify-center p-6 transition-transform hover:scale-105 hover:bg-slate-300 cursor-pointer">
            <img
              src="meetingIcon.svg"
              alt="MeetingIcon"
              className="w-20 h-20 mb-4"
            />
            <span>New Meeting</span>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-200/80 rounded-2xl shadow-lg shadow-black flex-1 max-w-xs flex flex-col items-center justify-center p-6 transition-transform hover:scale-105 hover:bg-slate-300 cursor-pointer">
            <img
              src="History.svg"
              alt="HistoryIcon"
              className="w-20 h-20 mb-4"
            />
            <span>Meeting History</span>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-200/80 rounded-2xl shadow-lg shadow-black flex-1 max-w-xs flex flex-col items-center justify-center p-6 transition-transform hover:scale-105 hover:bg-slate-300 cursor-pointer">
            <img
              src="Logout.svg"
              alt="LogoutIcon"
              className="w-20 h-20 mb-4 relative"
            />
            <span className>Sign Out</span>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
