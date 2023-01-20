const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 32,
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

// Hash the plain text password before saving the user
UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next()
    }

    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            return next(err)
        }
        this.password = hash
        next()
    })
})

// Compare the plain text password with the hashed password
UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password)
}

UserSchema.methods.login = function() {
    this.isLoggedIn = true
    return this.save()
}

UserSchema.methods.logout = function() {
    this.isLoggedIn = false
    return this.save()
}