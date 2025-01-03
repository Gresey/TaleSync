import mongoose from "mongoose";

const Room=mongoose.Schema({
    roomId:{
        type:String,
        required:true,
    },
    users:{
        type:[String],
        required:true,
    },
});

const RoomModel=mongoose.model('Room',Room);
export default RoomModel;   