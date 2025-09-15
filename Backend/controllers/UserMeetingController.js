const sequelize = require('../models/connectDB');
const userMeeting = require('../models/userMeeting');
const { getIO } = require('../utils/realtime');
const meetingRoom = require('../models/meetingRoom');


const JoinRoom = async (req,res) =>{
    const {code } = req.body;
    const user = req.user;
    const currentRoom = await meetingRoom.findOne(
        {
            where: {
                roomCode: code,
            }
        }
    )
    try{
        if (currentRoom!=null){
            const newUserJoined = await userMeeting.create({
                userID: user.id,
                RoomID: currentRoom.RoomID,
                role: 'PARTICIPANT',
                isBanned: false,
            })
            return res.status(201).json({
                message: 'joined succesfully',
                Join: newUserJoined, 
            })
        } else { return res.status(404).json({
            message: 'room not found'
        })}
    } catch (e){
        console.log(e);
    }
}

module.exports = {JoinRoom}