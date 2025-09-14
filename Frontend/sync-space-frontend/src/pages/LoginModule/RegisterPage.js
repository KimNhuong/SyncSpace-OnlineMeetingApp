import { useContext, useState } from "react";
import { LoginRequest, DecodeToken } from "../../Services/ValidationService"
import { Navigate, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import { Link } from "react-router-dom";

function RegisterPage() {

  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState(0);

  const handleUsernameChange= (event) =>{
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await LoginRequest(username, password);
      const token = res.accessToken;
      console.log(res);
      if (token) {
        const decoded = DecodeToken(token);
        localStorage.setItem("user", JSON.stringify(decoded));
        localStorage.setItem("token",token);
        setError(0);
        login();
        navigate("/");   
      }
    } catch (e) {
      console.log("Error: ",e);
      setError(error+1);
    }
  };




  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('stacked-peaks-haikei.svg')",
      }}
    >
      <div className="backdrop-blur-xl bg-white/70 shadow-2xl rounded-3xl px-10 py-12 flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-3xl font-bold font-spartan text-indigo-600 mb-6 drop-shadow-lg">Sign In</h2>
        {error !== 0 && (
          <div className="mb-4 w-full text-center text-red-600 font-semibold bg-red-100 rounded-xl py-2 shadow">Đăng nhập thất bại, vui lòng thử lại!</div>
        )}
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            className="border-2 border-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all text-lg font-spartan shadow"
            placeholder="Username"
            onChange={handleUsernameChange}
            autoComplete="username"
          />
          <input
            type="password"
            className="border-2 border-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all text-lg font-spartan shadow"
            placeholder="Password"
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white font-bold py-3 rounded-xl shadow-lg hover:from-indigo-700 hover:to-indigo-500 transition-all text-lg mt-2"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-gray-700 font-spartan text-base">
          Didn't have an account? Sign-Up <Link to="/SignUp" className="text-indigo-600 font-bold hover:underline">HERE</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
