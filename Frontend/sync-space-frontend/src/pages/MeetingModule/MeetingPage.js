import { io } from 'socket.io-client';
import {default as axios} from 'axios';
import { useRef, useEffect } from 'react';


const RoomAPI = process.env.REACT_APP_API_URL + 'meeting/CreateMeeting';
const roomObj = JSON.parse(localStorage.getItem('Room')); 
const roomCode = roomObj.roomCode; 


function MeetingPage(){
    const socketRef = useRef();
    
    useEffect(()=>{
        socketRef.current  = io('http://localhost:8080'); 
        socketRef.current.emit("Room code", { code: roomCode });
        return ()=>{
            socketRef.current.disconnect();
        };
        }, []);

    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-white to-indigo-300 flex flex-col">
        <div className="flex flex-col items-center justify-center pt-16 pb-8 border-cyan-200">
          
        </div>
      </div>
    );
}

export default MeetingPage;