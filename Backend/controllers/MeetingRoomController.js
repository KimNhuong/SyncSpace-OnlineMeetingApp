const { now } = require("sequelize/lib/utils");
const meetingRoom = require("../models/meetingRoom");
const { DATE } = require("sequelize");

const CreateRoom = async (req, res) => {
  const user = req.user;
  try {
     const existingRoom = await meetingRoom.findOne({
      where: {
        creatorID: user.id,
        status: "Active",
      },
    });
    if (existingRoom) {
      return res.status(400).json({
        message: "You need to end the current meeting first",
      });
    }
    const newRoom = await meetingRoom.create({
      creatorID: user.id,
      status: "Active",
    });
    return res.status(201).json({
      message: "room created succesfully",
      Room: newRoom,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const EndRoom = async (req, res) => {
  const user = req.user;
  try {
    const currentRoom = await meetingRoom.findOne({
      where: { creatorID: user.id, status: "Active" },
    });
    if (currentRoom != null) {
      currentRoom.status = "ended";
      currentRoom.endedAt = new Date();
      await currentRoom.save();
      return res.status(200).json({ message: "ended" });
    } else {
      return res.status(404).json({
        message: "Unknown error",
      });
    }
  } catch (e) {
    console.log(" error ", e.message);
  }
};

module.exports = { CreateRoom, EndRoom };
