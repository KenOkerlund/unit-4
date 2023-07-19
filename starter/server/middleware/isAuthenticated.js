// import required variables/features
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        // Declare a variable that can be used to store if authorization has been requested or not.
        const headerToken = req.get('Authorization')

        // If the authorization request returns falsy, then send back an "unauthorized" status.
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        // attempt to validate the authentication attempt
        try {
            token = jwt.verify(headerToken, SECRET)
            //if invalid, return an internal server error status
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        //  If there is no token, error with "unauthorized" status
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}