// importing router from express for api
const router = require("express").Router();
// importing model
let User = require("../models/userModels");
let Admin = require("../models/adminModels");
let Client = require("../models/clientModels");
const jwt = require("jsonwebtoken");
const { verifytoken } = require("./func");

User = User.getModel;

router.post("/login", async (req, res) => {
    try {
      // adding user info email and password in user variable
      const user = req.body;
     
    
      
      let userExists 
      // checking variable name admin,user,client 
      if(user.role === "admin"){
         userExists = await Admin.findOne({ email: user.username });
      }
      else if  (user.role === "client"){
         userExists = await Client.findOne({ email: user.username });
      }
      else if (user.role === "user") {
         userExists = await User.findOne({ email: user.username });
      }
      

      // if user is there we validate password and if its right we sent 200 logged in
      if (userExists) {
        const isValid = await userExists.checkPassword(user.password);
  console.log(isValid)
        if (isValid) {
          jwt.sign(
            { userExists },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            },
            (err, token) => {
              res
                .status(200)
                .send({
                  status: true,
                  username: user.username,
                  message: "User logged in successfully",
                  accessToken: token,
                });
            }
          );
        } else {
          return res
            .status(401)
            .send({ status: false, message: "Invalid  password" });
        }
      }
      // or sending error
      else {
        return res
          .status(401)
          .send({ status: false, message: "Invalid Username and password" });
      }
    } catch (error) {
    
      res.status(500).json( error );
    }
  });
  
  module.exports = router;