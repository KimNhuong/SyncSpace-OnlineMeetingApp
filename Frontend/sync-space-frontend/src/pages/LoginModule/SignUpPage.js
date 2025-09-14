import { useState, useContext } from "react";
import { RegisterRequest } from "../../Services/ValidationService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await RegisterRequest(
        name,
        userName,
        passWord,
        email,
        avatarUrl
      );
      localStorage.setItem("token", res.token);
      login();
      navigate("/");
    } catch (err) {
      console.error("Đăng ký thất bại:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black min-h-screen w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Sign Up
        </h1>

        <input
          type="text"
          placeholder="Enter your username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter your Avatar URL"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          Create Account
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <a
            href="/NewRoom"
            className="text-blue-400 hover:underline hover:text-blue-300"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;
