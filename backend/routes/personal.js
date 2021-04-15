//Route to get personal messages between 2 users.
const router=require('express').Router();
const {catchErrors}=require('../handlers/errorHandlers');
const personalController=require('../controllers/personalController');
const auth=require('../middlewares/auth')


router.post('/messages',auth,catchErrors(personalController.getPersonalMessages));


module.exports=router;