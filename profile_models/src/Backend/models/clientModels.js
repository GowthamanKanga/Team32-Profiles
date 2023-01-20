const mongoose = require("mongoose")
const UserSchema = require('./User')

const ClientSchema = new mongoose.Schema({
    ...UserSchema.obj,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    pages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page',
        required: true
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }],
    isLoggedIn: {
        type: Boolean,
        default: false
    }
})

ClientSchema.methods.addPage = function(page) {
    this.pages.push(page)
    return this.save()
}

ClientSchema.methods.deletePage = function(pageId) {
    this.pages = this.pages.filter(page => page._id.toString() !== pageId.toString())
    return this.save()
}

ClientSchema.methods.editPage = function(pageId, newPage) {
    this.pages = this.pages.map(page => {
        if (page._id.toString() === pageId.toString()) {
            return newPage
        }
        return page
    })
    return this.save()
}

ClientSchema.methods.addEvent = function(event) {
    this.events.push(event)
    return this.save()
}

ClientSchema.methods.login = function() {
    this.isLoggedIn = true
    return this.save()
}

ClientSchema.methods.logout = function() {
    this.isLoggedIn = false
    return this.save()
}
