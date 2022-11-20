const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asynchandler = require("express-async-handler")
const User = require("../modal/userModel")


const reqisterUser = asynchandler( async(req, res)=>{
    const {name,email,password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please fill all the fields")
    }

    const userExist =await  User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error("User already exists")
    }



    // password encryption

    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt)

    // create user
    const user =await User.create({
        name,
        email,
        password: hashedpassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateTokens(user._id)
        })

    }else{
        res.status(400)
        throw new Error("Invalid User data")
    }

    
   
})

const login = asynchandler( async (req, res)=>{
    const {email , password} = req.body

    const user =await User.findOne({email})

    if(user && (await bcrypt.compare(password , user.password)))
    {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateTokens(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid Credentials")
    }
    
})

const me =  asynchandler( async(req, res)=>{
  


    res.status(200).json(req.user)
})

const generateTokens = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: "30d",})
}


module.exports={
    reqisterUser,
    login,
    me,
}