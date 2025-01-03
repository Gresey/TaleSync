import mongoose from "mongoose";

const Journal=mongoose.Schema({
   title:{
    type:String,
    required:true,
   },
   username:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
   },
   roomId:{
       type:String,
       required:true,
   },
   date:{
       type:Date,
       default:Date.now,
   },
    body:{
     type:String,
     required:true,
    }
   
});

const JournalModel=mongoose.model('Journal',Journal);
export default JournalModel;