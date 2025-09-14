import {Link} from "react-router-dom"

function EducationPage() {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black w-full h-full fixed grid grid-cols-3 grid-rows-3">
      <div>
        <img src="/retroCamera.png" alt="retroCAm" className="absolute grid rounded-lg w-full h-full ml-24 z-10 right-[30rem]"/>
        <img src="/Mypic2.jpg" alt="mypic2" className="w-[20rem] rounded-lg h-full ml-[20rem] mt-28 shadow-xl shadow-indigo-50 ring-2 rotate-6 object-cover"/>
        <Link to="/about" className="font-spartan font-bold text-white text-5xl absolute top-3/4 left-60 pr-24 border-r-4 z-30 hover:cursor-pointer  hover:underline  hover:drop-shadow-[0_0_10px_#38bdf8]">Education Background</Link>
      </div>
      <div className="grid col-start-3 items-center relative right-28"> 
        <p className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border-white/20 border-4 w-fit p-2 font-spartan font-bold text-white absolute text-4xl">2019-2022</p>
        <p className="font-spartan font-bold text-white mt-44  text-4xl  "> BAC KAN HIGHSCHOOL FOR THE GIFTED</p>
        </div>
      <div className="grid items-center col-start-3 relative right-28">
        <p className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border-white/20 border-4 w-fit p-2 font-spartan font-bold text-white absolute text-4xl">2022-2026</p>
        <p className="font-spartan font-bold text-white mt-44  text-4xl  "> HANOI UNIVERSITY OF SCIENCE AND TECHNOLOGY</p>
        </div>
    </div>
  )
}


export default EducationPage;