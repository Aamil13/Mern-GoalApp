const express = require("express")
const router = express.Router()
const {reqisterUser,login,me} = require("../ticketControllers/userController")
const {protect} = require("../middleware/authMiddleware")


router.post("/",reqisterUser)
router.post("/login",login)
router.get("/me",protect,me)



module.exports=router;
