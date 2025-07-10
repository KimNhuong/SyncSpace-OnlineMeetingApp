const {Sequelize,DataTypes,Model} = require ('sequelize');
const sequelize = require('../models/connectDB');

const userMeeting = sequelize.define(
    'userMeeting',
    {
        userMeetingID:{
            types: DataTypes.INTEGER,
            autoIncrement: true, 
        },
        userID:{

        },
        RoomID:{
            
        },
        joinTime:{

        },
        leaveTime:{

        },
        role:{

        },
        isBanned:{
          types: DataTypes.BOOLEAN,   
        },
    }

)