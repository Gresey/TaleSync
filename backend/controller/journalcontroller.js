const jwt = require('jsonwebtoken');
const Journal = require('../model/journal');

exports.SaveJournalEntries = async (req, res) => {
    try {
      const { username, title, body, date, roomId } = req.body;
  
      const newJournal = await Journal.create({
        username,
        roomId,
        title,
        body,
        date,
      });
  
      res.status(200).json({ message: 'Journal entry saved successfully' });
    } catch (err) {
      console.error('Error saving journal entry:', err);
      res.status(500).json({ message: 'Failed to save journal entry', error: err.message });
    }
  };
  

exports.GetJournalEntries=async(req,res)=>{
  const {roomId}=req.body;
  try{
    const response=await Journal.find({roomId});
    res.status(200).json(response);
  }catch(err){
    res.status(500).json({message:"Error Fetching Journal Entries",error:err}); 
  }

}