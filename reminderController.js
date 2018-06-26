
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
    res.json("reminders");
  },
   CreateReminder: function (req, res) {
    db.collection("SignalsIndex").find({}, { sort: { $natural: -1 } }).toArray(function (err, doc) {
      res.send(doc)
    })
  },
  getAllFired: function (req, res) {
     db.collection("firedReminders").find().toArray(function(err, result) { 
		  if(err)
	  {  res.json("error")
	  }
	  else{
		  res.json(result);
	  }
		 })
	   
  }
  

}

  function fireEvent(x)
  {
	  db.collection("firedReminders").insert(x, function (err, doc) {
		    if(err)
	  {  console.log("error")
	  }
	  else{
		  console.log("fired")
	  }
	  })
	  db.collection("reminders").remove( {"_id":  x._id });
	  
	
  }
  
  
  



