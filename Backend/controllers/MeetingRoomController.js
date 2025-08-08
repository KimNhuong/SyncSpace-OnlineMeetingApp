const meetingRoom = require('../models/meetingRoom');

const CreateRoom = async (req,res) => {
    const user = req.body;
    try{
    const newRoom = await meetingRoom.create(
        {
            roomID,
            roomCode,
            capacity,
            creatorID: user.userID,
            status: 'Active',
            createdAt,
            endedAt,
        }
        );
    return res.status(201).json(
        {
            message: 'room created succesfully',
            Room : newRoom,
        }
    )    
    } catch (err) {
        return res.status(404).json({
            message: err,
        })
    }
}

module.exports = {CreateRoom};