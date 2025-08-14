import Card from "../components/Card";
import { useState } from "react";

function AboutPage() {
  const [picIndex, setPicIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const pics = ["/PortfolioPic.png", "/Portfolio2.png"]; // Mảng ảnh

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
      <p className="font-spartan font-bold text-indigo-600 absolute z-10 top-[30rem] left-1/2 text-center text-8xl md:text-9xl -translate-x-1/2 -translate-y-1/2">
        <span>ABOUT</span> <br />
        <span>ME</span>
      </p>
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
    </div>
  );
}

export default AboutPage;