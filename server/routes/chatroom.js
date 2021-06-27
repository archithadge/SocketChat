//Route to create chatroom,get all chatroom and get chatroom messages
const router=require('express').Router();
const {catchErrors}=require('../handlers/errorHandlers');
const chatroomController=require('../controllers/chatroomController');
const auth=require('../middlewares/auth')

router.get('/',auth,catchErrors(chatroomController.getAllChatrooms));
router.post('/',auth,catchErrors(chatroomController.createChatroom));
router.post('/addmemberrequest',auth,catchErrors(chatroomController.addmemberrequest));
router.post('/messages',auth,catchErrors(chatroomController.getChatroomMessages));


module.exports=router;