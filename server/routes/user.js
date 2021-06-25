//Routes for user registration,login and getting users data

const router=require('express').Router();
const {catchErrors}=require('../handlers/errorHandlers');
const userController=require('../controllers/userController');
const auth=require('../middlewares/auth')
var multer=require('multer');
var path=require('path');

var Storage=multer.diskStorage({
    destination:"./public/profilepics/",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    }
});

var upload=multer({
    storage:Storage
}).single('profilephoto');

router.post('/login',catchErrors(userController.login));
router.post('/register',upload,catchErrors(userController.register));
router.get('/users',auth,catchErrors(userController.getAllUsers));

module.exports=router;