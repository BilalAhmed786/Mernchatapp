const app = require('express');
//const loggedinn = require('../middleware/alreadyloggedin');
const {registration,Alluser,login,logout,forgetpass,resetpass,validate,success} = require('../controller/authorizaton')
const router = app.Router();
router.get('/',(req,res)=>{
  res.json('hello world')
})
router.post('/register',registration)
router.get('/register',Alluser)
router.post('/login',login)
router.post('/forgetpass',forgetpass)
router.post('/resetpass',resetpass)
router.get('/validation',validate)
router.get('/success',success)
router.get('/logout',logout)


module.exports=router
