const jwt = require('jsonwebtoken');
const user = require('../model/userScheme');
const config = require('../config/config')



exports.isAuthenticated = async (req, res, next) => {
    let token = req.get('Authorization');
    console.log(token)

    tokena = token.split(" ")
    if (tokena.length > 1) {
        token = tokena[1]
    }
    console.log(token)
    try {


        // console.log(token)
        if (!token) {
            res.status(400).json({
                success: false,
                message: "Authentication Faliure"
            })
            return
        }
        // verfiying the user using jwt token
        const verfiyUser = jwt.verify(token, config.JWT);
        console.log('verfiyr', verfiyUser)

        req.user = await user.findById(verfiyUser.id)

        next()
    }
    catch (err) {
        console.log(err)
        res.status(401).json({ message: "invalid token request " })
    }
}

exports.authorizeRoles = (...roles) => {
    return async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            console.log(req.user.role, 'roles');
            return next(res.json("roles not allowed"))
        }
        next()
    }
}

