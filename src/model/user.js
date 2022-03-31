const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPT_KEY);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

}, {
    timestamps: true
})

//generate token
userSchema.methods.generateAuthToken = async function () {
    try {
        const user = this
        const tokenTemp = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
        const token = cryptr.encrypt(tokenTemp);

        user.tokens = user.tokens.concat({ token })
        await user.save()
        return token
    }
    catch (e) {
        throw new Error(e)
    }
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User