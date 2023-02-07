// importing router from express for api
const router = require("express").Router();
// importing model
let User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const { verifytoken } = require("./func");
const multer = require("multer")

const path = require('path');
const fs = require('fs');
const uuid = require('uuid')
// Location where you want to store the profile Pic 
const storage = multer.diskStorage({

  destination:(req,file,callback)=>{
    callback(null,'./ProfileImgs/')
  },
  
    filename: function(req, file, cb) {
      const uniqueFileName = `${Date.now()}-${uuid.v4()}-${file.originalname}`;
      cb(null, uniqueFileName);
  }


})

const upload = multer({storage:storage})

User = User.getModel;

// view User
router.route("/").get((req, res) => {
  User.find()
    .then((Users) => res.status(200).json(Users))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.get("/profile/image/:id", (req, res) => {
  const email = req.params.id;

  User.findOne({ email: email })
    .then((user) => {
      const fileName = user.profileImage;
      
      try {
        const filePath = path.join(__dirname, "..", "ProfileImgs", fileName);
        console.log(filePath);
        fs.stat(filePath, (err, stat) => {
          if (err) {
            console.error(`Error: ${err.message}`);
            return res.status(400).send("Error: " + err.message);
          }
  
          if (!stat.isFile()) {
            console.error(`Error: ${filePath} is not a file`);
            return res.status(400).send(`Error: ${filePath} is not a file`);
          }
  
          res.sendFile(filePath);
        });
      } catch (err) {
        console.error(`Error: ${err.message}`);
        return res.status(400).send("Error: " + err.message);
      }
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});


  

router.route("/add/profileimg").post((req, res) => {
  const usr = req.body;
  const newUser = new User(usr);

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((error) => {
      const errors = handleErrors(error);
      res.status(500).json({ errors });
    });
  });
  router.route("/update/profileimg/:id").put(upload.single("profileImage"),(req, res) => {
    const email = req.params.id;
    const newUser = req.body;

    User.findOne({ email: email })
      .then((User) => {
        console.log(  req.file.filename)
        User.updateOne({profileImage :req.file.filename})
          .then(() => res.json("User updated!"))
        .catch((error) => {
          const erro = handleErrors(error);
          res.status(500).json({ erro });
        });
    })
    .catch((error) => {
      res.status(500).send({ message: "Can not find User with given id." });
    });
});

router.route("/add").post((req, res) => {
  const usr = req.body;
  const newUser = new User(usr);

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((error) => {
      const errors = handleErrors(error);
      res.status(500).json({ errors });
    });
});

router.get("/:id", verifytoken, (req, res) => {
  try {
    const email = req.params.id;

    User.findOne({ email: email }).then((User) => {
      if (User) {
        res.status(200).send(User);
      } else {
        res.status(500).send({ message: "Can not find User with given id." });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// delete User

router.route("/:id").delete((req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then(() => res.status(200).json("User deleted"))
    .catch((error) => {
      res.status(500).send({ message: "Can not find User with given id." });
    });
});
// update User with id

router.route("/update/:id").put((req, res) => {
  const email = req.params.id;
  const newUser = req.body;

  User.findOne({ email: email })
    .then((User) => {
      User.updateOne(newUser)
        .then(() => res.json("User updated!"))
        .catch((error) => {
          const erro = handleErrors(error);
          res.status(500).json({ erro });
        });
    })
    .catch((error) => {
      res.status(500).send({ message: "Can not find User with given id." });
    });
});

router.route("/updatePassword/:id").put(async (req, res) => {
  const email = req.params.id;
  const user = req.body;

  
  const userExists = await User.findOne({ email: email});
  // if user is there we validate password and if its right we sent 200 logged in
  if (userExists) {
    const isValid = await userExists.checkPassword(user.currentPassword);

    if (isValid) {
     
      User.update( {password:user.password})
        .then(() => res.json("Password Updated!"))
        .catch((error) => {
          const erro = handleErrors(error);
          res.status(500).json({ erro });
        });
      
    } else {
      return res
        .status(500)
        .send({ status: false, message: "Invalid  password" });
    }
  }
});

//-------------------------------------------------------------------//

// Login and Register User

router.post("/signup", async (req, res) => {
  const user = req.body;
  const userExists = await User.findOne({ username: user.email });
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
});

router.post("/login", async (req, res) => {
  try {
    // adding user info email and password in user variable
    const user = req.body;
    // checking if user exists

    const userExists = await User.findOne({ email: user.username });
    // if user is there we validate password and if its right we sent 200 logged in
    if (userExists) {
      const isValid = await userExists.checkPassword(user.password);

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
    const errors = handleErrors(error);
    res.status(500).json({ errors });
  }
});

/// all methods needed for User
// const handleErrors = (err) => {
//   // screating json error for all the fields

//   let errors = { first_name: "", last_name: "", email: "", gender: "" };

//   // catching the unique error msg for emails
//   if (err.code === 11000) {
//     errors.email = "that email is already registered";
//     return errors;
//   } else if (err.message.includes("User validation failed")) {
//     // looking for errors genereated from validation script

//     Object.values(err.errors).forEach(({ properties }) => {
//       errors[properties.path] = properties.message;
//     });
//   } else {
//     // for any other errors we run into
//     errors = { message: "Error while instering New User" };
//   }
//   return errors;
// };

module.exports = router;
