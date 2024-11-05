const express =require("express");
const UserModel = require("../Model/UserModel");
const bcrypt = require("bcryptjs");



const router =express.Router();

router.post('/register', async (req, res) => {

    const { email, username, password } = req.body;

    console.log(req.body,"user details");

      if(!email || !username || !password){
        res.status(400).json("all fields are required");
      }

      let checked;
    try {
      checked = await UserModel.findOne({email:email});

      if(checked){
        return res.status(400).send({ message: "User already exists" });
      }
      else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({ email, username, password: hashedPassword });
        console.log(newUser.email)
        await newUser.save();
        res.status(200).json(newUser);
        console.log("user save api called")
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post('/login', async(req, res)=>{
  const{email, password} =req.body;

  try {
      const user =await UserModel.findOne({email:email})

      if(user){

         const validity = await bcrypt.compare(password,user.password)

         validity ? (res.status(200).json(user)):(res.status(400).json("wrong password"))
      } 
      else{
          res.status(404).json("user does not exist")
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
})


module.exports = router;