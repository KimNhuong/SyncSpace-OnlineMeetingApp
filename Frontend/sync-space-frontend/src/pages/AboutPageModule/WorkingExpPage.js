export default function WorkingExpPage() {
  const projects = [
    {
      title: "Sync-Space – Online Meeting App",
      time: "05/2025 – 09/2025",
      type: "Dự án cá nhân",
      description: [
        "Thiết kế database MySQL & phân tích yêu cầu.",
        "Xây dựng backend với Node.js, Express, Socket.IO.",
        "Phát triển frontend với ReactJS, TailwindCSS.",
        "Triển khai ứng dụng bằng Docker.",
        "Điểm nổi bật: hỗ trợ real-time board & chat, triển khai end-to-end.",
      ],
    },
    {
      title: "E-commerce Website",
      time: "02/2025 – 05/2025",
      type: "Dự án nhóm (4 người)",
      description: [
        "Thực hiện API CRUD cho sản phẩm bằng Node.js, Sequelize (MySQL).",
        "Phát triển giao diện quản lý sản phẩm bằng ReactJS, kết nối API backend.",
        "Vai trò cá nhân: phụ trách backend API và UI quản trị sản phẩm (~40% công việc).",
      ],
      link: "https://20225218.id.vn",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white font-spartan p-10">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
          Working Experience
        </h1>

        {/* Timeline */}
        <div className="relative border-l border-gray-700">
          {projects.map((project, index) => (
            <div key={index} className="mb-12 ml-6 group">
              {/* Dot */}
              <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-2 top-2 group-hover:scale-125 transition-transform duration-300"></div>

              {/* Card */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h2 className="text-2xl font-bold text-indigo-400">{project.title}</h2>
                  <span className="text-sm text-gray-400">{project.time}</span>
                </div>
                <p className="text-sm italic text-gray-300 mb-3">{project.type}</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {project.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                {project.link && (
                  <div className="mt-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 underline text-sm"
                    >
                      Xem dự án
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
