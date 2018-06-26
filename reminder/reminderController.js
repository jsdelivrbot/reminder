
//CONNECT TO DB
var db
mongodb.MongoClient.connect("mongodb://maayanb:lemavel64@ds249025.mlab.com:49025/dev_test", function (err, database) {
  if (err) {
    console.log(err);

  }
  // Save database object from the callback for reuse.
 
    if (err) {
        console.log(err);
        process.exit(1);
    }
    db = database.db("dev_test")
  console.log("Database connection ready");
});



module.exports = {
 getRoot: function (req, res) {
    res.status(200).send({success:true})
  },
   CreateReminder: function (req, res) {
	  //GET BODY
     var reminder = req.body;
	 //CHECK IF THE CONNECTION TO DB IS STILL ALIVE
 if (!db)  {res.status(500).send('db not ready');return}
	 
 //GET SERVER DATE TO FIRE EVENT
   var reminder_date = new Date(reminder.due);
   if(reminder_date instanceof Date && !isNaN(reminder_date	))
	   console.log("date ok")
   else
   {
	   res.status(500).send('BAD REQUEST, please send a valid date')
	   return
   }
   
   
   
   var offset = reminder_date.getTimezoneOffset() * 60 *1000
   var date_with_offset = new Date(reminder_date.getTime() + offset);
 
 
console.log("offset",reminder_date,date_with_offset);

//INSERT REMINDER TO REMINDERS COLLECTION
db.collection("reminders").insert(reminder, function (err, doc) {
	  if(err)
	  {  res.json("error")
	  }
	  else{
		//SCHEDULE FIRING EVENT
var j = schedule.scheduleJob(date_with_offset, function(){
	 
  fireEvent(reminder)
})  


	  }

});
	res.status(200).send("done")  
  },
  getAllFired: function (req, res) {
	   if (!db)  {res.status(500).send('db not ready');return}
     db.collection("firedReminders").find().toArray(function(err, result) { 
		  if(err)
	  {  res.status(500).send("error")
	  }
	  else{
		  res.status(200).send(result);
	  }
		 })
	   
  }
  

}

  function fireEvent(reminder)
  {
	  
	  //ADD THE FIRED REMINDER TO THE FIRED REMINDERS COLLECTION
	  db.collection("firedReminders").insert(reminder, function (err, doc) {
		    if(err)
	  {  console.log("error")
	  }
	  else{
		  console.log("fired")
	  }
	  })
	  
	  //REMOVE FIRED REMINDER FROM THE REMINDERS COLLECTION
	  db.collection("reminders").remove( {"_id":  reminder._id });
	  
	
  }
  
  
  



