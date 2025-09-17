const sequelize = require('../models/connectDB');
const userMeeting = require('../models/userMeeting');
const { getIO } = require('../utils/realtime');
const meetingRoom = require('../models/meetingRoom');


const JoinRoom = async (req,res) =>{
    const { code } = req.body;
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

const LeaveRoom = async (req, res) => {
    const user = req.user;
    try {
        const UserInMeeting = await userMeeting.findOne({
            where: { userID: user.id }
        });

        if (!UserInMeeting) {
            return res.status(404).json({ message: 'User not in any meeting' });
        }

        const currentRoom = await meetingRoom.findOne({
            where: { RoomID: UserInMeeting.RoomID }
        });
        if (!currentRoom) {
            return res.status(404).json({ message: 'Meeting room not found' });
        }

        await UserInMeeting.destroy();
        return res.status(200).json({ message: 'Left room successfully' });

    } catch (e) {
        console.error("Error leaving room:", e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {JoinRoom, LeaveRoom}