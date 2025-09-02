export default function Footer() {
  return (
    <footer className="bg-indigo-600 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + Slogan */}
        <div>
          <h1 className="text-2xl font-bold">SyncSpace</h1>
          <p className="mt-3 text-gray-200 text-sm">
            Nơi kết nối và chia sẻ ý tưởng của bạn với thế giới.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold mb-2">Liên kết</h2>
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/rooms" className="hover:text-gray-300">Rooms</a>
          <a href="/about" className="hover:text-gray-300">About</a>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Theo dõi chúng tôi</h2>
          <div className="flex space-x-4 mt-2">
            <a href="https://www.facebook.com/Dokimnhuong/" className="hover:text-gray-300">
              <img src="/facebook.svg" alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/%C4%91%E1%BB%97-kim-nh%C6%B0%E1%BB%9Dng/" className="hover:text-gray-300">
              <img src="/linkedin.svg" alt="linkedin" className="w-6 h-6" />
            </a>
            <a href="https://github.com/KimNhuong" className="hover:text-gray-300">
              <img src="/github.svg" alt="git" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-indigo-500 mt-8 pt-4 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} SyncSpace. All rights reserved.
      </div>
    </footer>
  );
}
