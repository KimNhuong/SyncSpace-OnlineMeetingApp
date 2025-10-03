const sequelize = require('../models/connectDB');
const userMeeting = require('../models/userMeeting');
const meetingRoom = require('../models/meetingRoom');
const Message = require('../models/message');


const saveMsg = async (req,res) => { 
    const { user, Room, msg } = req.body; 
    try{
        await Message.create(
            {
                roomID: Room.roomID,
                SeenderID: user.id,
                content: msg, 
            })
        return res.status(201).json({
            message: 'saved success'
        })
    } catch (e){ 
        console.log(e);
        return res.status(404).json({ message: e});
    }
}

const initMessageSocket = () => {
    
};

const getAllRoomMsg = async (req,res) => {
    const roomID = req.body;
    const user = req.user;
    try {
        const JoinedRoom  = await userMeeting.findAll({
            where:{
                RoomID: roomID,
                userID: user.id,
            }
        }).then(
        reponse = await Message.findAll({
                where: {
                    roomID: JoinedRoom.RoomID, 
                }
             })
        )
        return res.status(201).json({
            message: 'Success',
            reponse,
        })
    } catch (e) {
        console.log(e);
    }
}

module.exports = { saveMsg, getAllRoomMsg };

