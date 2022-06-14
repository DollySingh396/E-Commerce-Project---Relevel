const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const db = require("../models");
const User = db.user;

/**
 *  Verify Token is used for verifying the token
 *  when use hit any api then a token is send in hashed form
 *  then this hashed token is matched with token generated then
 *  we further chcek the role which user has and 
 *  as per the role the user will have access
 *  so then we chcek the authentication \
 */
verifyToken = (request, response, next) => {

    /**
     *  get the token from request headers
     */
    let token = request.headers["x-access-token"];

    /**
     *  if token is not provided then we will send the message as token not provided
     */
    if (!token) {
        return response.status(403).send({
            message: "No token provided !!"
        });
    }

    /**
     *  if token is provided then we will verify token first
     *  if not verified then send the error message as Unauthorised
     *  decoded will contain user id and secret salt
     */
    jwt.verify(token, config.secretSalt, (error, decoded) => {
        if (error) {
            return response.status(401).send({
                message: "Unauthorised!"
            });
        }

        /**
         *  if verified successfully then store the id which was returned after verification
         */
        request.userId = decoded.id;
        next();
    })
}

/**
 *  verifying the role is admin or not
 *  first find the user by primary key
 *  if found then get roles of that user, here user_role_realtionship table is used
 *  so for that particular user we get all role id
 *  and for those role id we get role names from role table
 *  if we get all roles then traverse all array and see if admin is present in array of roles or not
 *  if yes then go to next functionality which is controller
 *  if not found then send error message as required admin role
 */
isAdmin = (request, response, next) => {

    User.findByPk(request.userId)
        .then(user => {
            user.getRoles() // user_role_realtionship
                .then(roles => {
                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].name === "admin") {
                            next();
                            return;
                        }
                    }

                    response.status(403).send({
                        message: "Required Admin Role"
                    });
                    return;
                });
        });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};

module.exports = authJwt;