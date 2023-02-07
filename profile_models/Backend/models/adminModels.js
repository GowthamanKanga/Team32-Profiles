const mongoose = require("mongoose");
const {isEmail} = require('validator')
const User = require('../models/userModels')

const AdminSchema = new mongoose.Schema({

   
    
    first_name:{
        type:String,
        required : [true, "Please enter a First name."],

    },
    last_name:{
        type:String,
        required : [true, "Please enter a Last name."],

    },
   
    gender:{
        type:String,
         enum : { values: ['Male', 'Female','Other'], message: '{VALUE} is not supported' },
        // required : [true, "Please enter a Gender."],
    }
    , email:{
            type:String,
            required : [true, "Please enter an Email."],
            unique: true,
            validate:[isEmail, "Please Enter a valid Email."]
    
    
        },
    
    password: {
        type: String,
        minlength: 8,
        maxlength: 32,
    },
    address:{
        type:String,
     

    },
    city:{
        type:String,
       

    },
    country:{
        type:String,
     

    },
    province:{
        type:String,
       

    },
    zip_code:{
        type:String,
       

    },
    about_me:{
        type:String,
       
     

    },
   
    isLoggedIn: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;

AdminSchema.methods.login = function() {
    this.isLoggedIn = true
    return this.save()
};

AdminSchema.methods.logout = function() {
    this.isLoggedIn = false
    return this.save()
};
