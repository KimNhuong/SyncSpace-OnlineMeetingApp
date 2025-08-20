function EducationPage() {
  return (
    <div className="bg-indigo-600 w-full h-full fixed grid grid-cols-3 grid-rows-3">
      <div classNaame="w-full h-full grid grid-cols-2 row-span-2 col-span-2">
        <img src="/retroCamera.png" alt="retroCAm" className="absolute grid rounded-lg w-full h-full ml-24 z-10 right-[30rem]"/>
        <img src="/Mypic2.jpg" alt="mypic2" className="w-full rounded-lg h-full ml-[20rem] mt-24 shadow-xl shadow-indigo-50 ring-2 rotate-6 "/>
      </div>
      <div className="grid col-start-3 items-center relative right-28"> 
        <p className="border-4 rounded-2xl w-fit p-2 font-spartan font-bold text-white absolute text-4xl">2019-2022</p>
        <p className="font-spartan font-bold text-white mt-44  text-4xl  "> BAC KAN HIGHSCHOOL FOR THE GIFTED</p>
        </div>
      <div className="grid items-center col-start-3 relative right-28">
        <p className="border-4 rounded-2xl w-fit p-2 font-spartan font-bold text-white absolute text-4xl">2022-2026</p>
        <p className="font-spartan font-bold text-white mt-44  text-4xl  "> HANOI UNIVERSITY OF SCIENCE AND TECHNOLOGY</p>
        </div>
    </div>
  )
}


export default EducationPage;