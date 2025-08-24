import { useState } from "react";
import { LoginRequest } from "../../Services/ValidationService"

function RegisterPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")

  const handleUsernameChange= (event) =>{
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
     event.preventDefault();
     console.log(username,"\n",password);
     LoginRequest(username,password)
  }


  return (
    <div
      className="h-full min-w-full absolute items-center justify-center"
      style={{
        backgroundImage: "url('stacked-peaks-haikei.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative shadow-xl shadow-slate-900 h-1/2 w-[30rem] rounded-[5rem] p-16 left-[12%] top-[17%] bg-white/80">
        <form
          className="p-2 rounded-xl border-black z-10"
          onSubmit={handleSubmit}
        >
          <label className="font-spartan font-bold inline-block">
            <input
              type="text"
              className="border-2 rounded-[10px] border-black z-10 ml-2 p-1 w-[100%]"
              placeholder="Username" onChange={handleUsernameChange}
            />
            <input
              type="password"
              className=" rounded-md border-black z-10 ml-2 p-1 "
               placeholder="Password" onChange={handlePasswordChange}
            />
            <button type="submit" className="bg-indigo-600/50 w-fit h-fit rounded-lg p-3 hover:bg-indigo-600"> Login</button>
          </label>
        </form>
        <div> or Login with <b>Google</b></div>

      </div>
    </div>
  );
}

export default RegisterPage;
