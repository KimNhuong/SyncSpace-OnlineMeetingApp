export default function SkillandexpertisePage() {
  const skills = [
    {
      category: "Frontend",
      image: "/React.svg",
      items: ["ReactJS (Hooks, State/Props, CRUD UI)", "TailwindCSS"],
    },
    {
      category: "Backend",
      image: "/Node.js.svg",
      items: ["Node.js & Express (REST API, Socket.IO)"],
    },
    {
      category: "Database",
      image: "/database.png",
      items: ["MySQL", "Sequelize (thiết kế bảng, CRUD dữ liệu)"],
    },
    {
      category: "DevOps & Tools",
      image: "/Git.svg",
      items: ["Docker", "Git & GitHub (branch, pull request)"],
    },
    {
      category: "Programming",
      image: "/JavaScript.svg",
      items: ["JavaScript (Vanilla, ES6+)"],
    },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black text-white font-spartan">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      ></div>

      {/* Overlay */}
      <div className="relative z-10 flex flex-col md:flex-row items-stretch justify-between w-full p-10 bg-gradient-to-b from-gray-900 via-gray-950 to-black bg-opacity-90">
        {/* Left side */}
<div className="flex flex-col items-center md:items-start justify-center text-center md:text-left w-full md:w-1/2 p-6 relative">
  <h1 className="text-5xl md:text-7xl font-extrabold leading-tight relative z-10">
    SKILL <br /> & EXPERTISE
  </h1>
  {/* Icon loa đè lên chữ */}
  <div className="absolute top-[15rem] left-1/2 md:left-40 transform -translate-x-1/2 md:-translate-x-0 z-0 opacity-90">
    <img
      src="/speaker.svg"
      alt="speaker icon"
      className="w-72 md:w-96"
    />
  </div>
</div>


        {/* Right side */}
        <div className="flex flex-col gap-8 w-full md:w-1/2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Image */}
              <div className="w-40 h-40 flex-shrink-0 flex items-center justify-center bg-white">
                <img
                  src={skill.image}
                  alt={skill.category}
                  className="w-28 h-28 object-contain"
                />
              </div>
              {/* Content */}
              <div className="flex-1 px-8 py-6">
                <h2 className="text-2xl font-bold mb-3">{skill.category}</h2>
                <ul className="list-disc list-inside text-base text-white space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
