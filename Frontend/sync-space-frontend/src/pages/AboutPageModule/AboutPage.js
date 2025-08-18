import Card from "../../components/Card";
import { useState } from "react";
import {Link} from "react-router-dom"

function AboutPage() {
  const [picIndex, setPicIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const pics = ["/PortfolioPic.png", "/Portfolio2.png","/Bg3.jpg"]; // Mảng ảnh

  function changePic(newIndex) {
    setFade(true);
    setTimeout(() => {
      setPicIndex(newIndex);
      setFade(false);
    }, 200); // 300ms fade duration
  }

  function nextPic() {
    changePic((picIndex + 1) % pics.length);
  }

  function prevPic() {
    changePic((picIndex - 1 + pics.length) % pics.length);
  }

  return (
    <div className="relative h-[50rem]">
      {picIndex != 0 && <p className="font-spartan font-bold text-indigo-600 absolute z-10 top-[30rem] left-1/2 text-center text-8xl md:text-9xl -translate-x-1/2 -translate-y-1/2">
        <span>ABOUT</span> <br />
        <span>ME</span>
      </p>}
      <div
        className="h-7 w-7 rounded-[45px] border-[1px] border-opacity-40 border-black hover:shadow-indigo-600 opacity-100 absolute hover:cursor-pointer z-10 left-4 top-1/2 text-center bg-white/60 -translate-y-1/2"
        onClick={prevPic}
      >
        {"<"}
      </div>
      <div
        className="h-7 w-7 rounded-[45px] border-[1px] border-opacity-40 border-black hover:shadow-indigo-600 opacity-100 absolute hover:cursor-pointer z-10 right-4 top-1/2 text-center bg-white/60 -translate-y-1/2"
        onClick={nextPic}
      >
        {">"}
      </div>
      <img
        src={pics[picIndex]}
        alt="Portfolio bg"
        className={`relative top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      />
      {picIndex === 0 && (
      <div className="absolute w-[30rem] h-[30rem] z-30 top-[6rem] left-[10rem] bg-indigo-600/70 font-spartan font-bold rounded-lg shadow-lg shadow-zinc-100 p-6 ">
        <h2 className="text-[4rem] text-wrap text-white font-bold mb-2 ml-6">Table of <br></br>Contents</h2>
        <img src="/camera.png" alt="camera" className="absolute left-[12rem] bottom-[16rem] "></img>
        <ul className="list-none pl-5 font-spartans text-2xl text-white flex-col grid grid-cols-3 grid-rows-4 gap-4">
          <li className="text-right mr-4">01</li><li className="text-left col-span-2 hover:cursor-pointer  hover:underline  hover:drop-shadow-[0_0_10px_#38bdf8]"><Link to="/about">Introduction</Link></li>
          <li className="text-right mr-4">02</li><li className="text-left col-span-2 hover:cursor-pointer hover:underline hover:drop-shadow-[0_0_10px_#38bdf8]"><Link to="/EducationBg">Education Background</Link></li>
          <li className="text-right mr-4">03</li><li className="text-left col-span-2 hover:cursor-pointer hover:underline hover:drop-shadow-[0_0_10px_#38bdf8]"><Link to="/Experiences">Working Experience</Link></li>
          <li className="text-right mr-4">04</li><li className="text-left col-span-2 hover:cursor-pointer hover:underline hover:drop-shadow-[0_0_10px_#38bdf8]"><Link to="/Skillandexpertise">Skills and Expertise</Link></li>
        </ul>
      </div>
    )}
    </div>
  );
}

export default AboutPage;