// importing router from express for api
const router = require('express').Router()
// importing model
let User = require('../models/userModels')

User = User.getModel

// view User 
router.route('/').get((req,res)=>{
    User.find()
    .then(Users => res.status(200).json(Users))
    .catch(err => res.status(400).json('Error: ' + err))
})


router.route('/add').post((req,res)=>{
 const usr = req.body
  const newUser= new  User(usr)

newUser.save()
  .then(() => res.json('User added!'))
  .catch(error => 
   { const errors = handleErrors(error);
    res.status(500).json({errors})});
});
   

router.route('/:id').get( (req,res)=>{

const id = req.params.id
 
User.findById(id)
.then(User=> res.status(200).send(User))
.catch(() =>{  res.status(500).send({message: "Can not find User with given id."})})

})

// delete User

router.route('/:id').delete( (req,res)=>{

    const id = req.params.id
     
    User.findByIdAndDelete(id)
    .then(()=> res.status(200).json("User deleted"))
    .catch(error =>{  res.status(500).send({message: "Can not find User with given id."})})
    
    })
// update User with id

router.route("/update/:id").put((req,res)=>{

    const id = req.params.eid
    const newUser = req.body

    EmployeeModel.findById(id)
    .then(User =>{
        User = newUser
        User.save()
        .then(() => res.json('User updated!'))
        .catch(error => 
         { const errors = handleErrors(error);
          res.status(500).json({errors})});
      })
     .catch((error) =>  res.status(500).send({message: "Can not find User with given id."}));
})






/// all methods needed for User
const handleErrors = (err) => {
    // screating json error for all the fields 
  
      let errors = { first_name: '', last_name: '' ,email: '', gender: '' };
    
  // catching the unique error msg for emails
      if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
      }
  
    else if (err.message.includes('User validation failed')) {
      // looking for errors genereated from validation script 
  
      Object.values(err.errors).forEach(({ properties }) => {
        
        errors[properties.path] = properties.message;
       
      });
  
       } 
       else{
          // for any other errors we run into 
          errors={message:"Error while instering New User"}
       }
    return errors;
    
  }
  module.exports = router;