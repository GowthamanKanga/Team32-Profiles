// importing router from express for api
const router = require("express").Router();
// importing model
let User = require("../models/userModels");
let Admin = require("../models/adminModels");
let Client = require("../models/clientModels");
const jwt = require("jsonwebtoken");
const handleErrors =require("../routes/func")
const { verifytoken } = require("./func");

User = User.getModel;


router.post("/signup", async (req, res) => {

    const user = req.body;
       
      let userExists 
      // checking variable name admin,user,client 
      if(user.role === "admin"){
         userExists = await Admin.findOne({ email: user.email });
         console.log(userExists)
         if (userExists) {
            res.status(400).json("Admin already Exists");
            // throw new Error('User already exists')
          } else {
            const newAdmin = new Admin(req.body);
            try {
              await newAdmin.save();
              res.status(201).send(newAdmin);
            } catch (error) {
              const errors = handleErrors(error);
              res.status(500).json({ errors });
            }
          }

      }
      else if  (user.role === "client"){
         userExists = await Client.findOne({ email: user.email });
         if (userExists) {
            res.status(400).json("Client already Exists");
            // throw new Error('User already exists')
          } else {
            const newClient = new Client(req.body);
            try {
              await newClient.save();
              res.status(201).send(newClient);
            } catch (error) {
              const errors = handleErrors(error);
              res.status(500).json({ errors });
            }
          }
      }
      else if (user.role === "user") {
         userExists = await User.findOne({ email: user.email });
         if (userExists) {
            res.status(400).json("User already Exists");
            // throw new Error('User already exists')
          } else {
            const newUser = new User(req.body);
            try {
              await newUser.save();
              res.status(201).send(newUser);
            } catch (error) {
              const errors = handleErrors(error);
              res.status(500).json({ errors });
            }
          }
      }
      

   
  });
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
              expiresIn: "1800s",
            },
            (err, token) => {
              res
                .status(200)
                .send({
                  status: true,
                  username: user.username,
                  message: "User logged in successfully",
                  accessToken: token,
                  expiresIn: "1800",
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