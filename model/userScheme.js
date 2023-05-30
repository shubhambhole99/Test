const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config/config')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        match: [/^[a-zA-Z]+$/, 'First name should only contain alphabets'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        match: [/^[a-zA-Z]+$/, 'Last name should only contain alphabets'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function (value) {
                // Validate password format
                // Password should have at least one special character, one uppercase letter, and one number
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                return passwordRegex.test(value);
            },
            message:
                'Password should have at least one special character, one uppercase letter, and one number',
        },
    },

    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        validate: {
            validator: function (value) {
                // Validate phone number format
                // Phone number should be 10 digits
                const phoneRegex = /^\d{10}$/;
                return phoneRegex.test(value);
            },
            message: 'Phone number should be 10 digits',
        },
    },

    dob: {
        type: String,
        required: [true, 'Date of birth is required'],
        validate: {
            validator: function (value) {
                // Validate date of birth format
                // Date of birth should be in dd-MM-yy format
                const dobRegex = /^\d{2}-\d{2}-\d{4}$/;
                return dobRegex.test(value);
            },
            message: 'Invalid date of birth format. Should be in dd-MM-yy format',
        },
    },
    role: {
        type: String,
        default: 'user'
    },
}, { timestamps: true }
)

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, config.JWT, {
        expiresIn: '7d'
    })
}



module.exports = mongoose.model('User', userSchema)