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

module.exports = { saveMsg };

