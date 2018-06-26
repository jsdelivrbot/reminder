var reminderController = require('./reminder/reminderController')


exports.ReminderRouter = (function () {
    var ReminderRouter = express.Router();
   
    ReminderRouter.route('/').get(reminderController.getRoot);
    ReminderRouter.route('/createReminder').post(reminderController.CreateReminder);
    ReminderRouter.route('/allFired').get(reminderController.getAllFired);
    
    
    return ReminderRouter;

})(); 