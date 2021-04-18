//Routes for user registration,login and getting users data

const router=require('express').Router();
const {catchErrors}=require('../handlers/errorHandlers');
const userController=require('../controllers/userController');
const auth=require('../middlewares/auth')

router.post('/login',catchErrors(userController.login));
router.post('/register',catchErrors(userController.register));
router.get('/users',auth,catchErrors(userController.getAllUsers));

module.exports=router;