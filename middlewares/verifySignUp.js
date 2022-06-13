const req = require("express/lib/request");

const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

/**
 *  creating checkDuplicateUserNameOrEmail function 
 *   to check whether the username or email is a duplicate or not
 */
checkDuplicateUserNameOrEmail = (request, response, next) => {

    User.findOne( {
        where: {
            username : request.body.username
        }
    })
    .then( user => {
        if(user) {
            response.status(400).send( {
                message: "Failed! Username is already in use!"
            });
            return;
        }

        User.findOne( {
            where : {
                email: request.body.email
            }
        })
        .then( user => {
            if( user ){
                response.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }
            next();
        })
    })
}

/**
 *  creating checkRolesExisted function 
 *  to check whether the role exists in role table 
 */
checkRolesExisted = (request, response, next) => {

    if( request.body.roles) {
        for( let i =0; i< request.body.roles.length; i++) {
            if( !ROLES.includes(request.body.roles[i])){
                response.status(400).send({
                    message: "Failed! Roles does not exists =" +request.body.roles[i]
                });
                return;
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateUserNameOrEmail : checkDuplicateUserNameOrEmail,
    checkRolesExisted : checkRolesExisted
}

module.exports = verifySignUp;