const mongoose = require("mongoose");
const UserSchema = require('./User')

const AdminSchema = new mongoose.Schema({
    ...UserSchema.obj,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    }
});

AdminSchema.methods.login = function() {
    this.isLoggedIn = true
    return this.save()
};

AdminSchema.methods.logout = function() {
    this.isLoggedIn = false
    return this.save()
};
