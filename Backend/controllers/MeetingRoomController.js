const meetingRoom = require('../models/meetingRoom');

const CreateRoom = async (req,res) => {
    const user = req.user;
    try{
    const newRoom = await meetingRoom.create(
        {
            creatorID: user.userID,
            status: 'Active',
        }
        );
    return res.status(201).json(
        {
            message: 'room created succesfully',
            Room : newRoom,
        }
    )    
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        })
    }
}


module.exports = {CreateRoom};