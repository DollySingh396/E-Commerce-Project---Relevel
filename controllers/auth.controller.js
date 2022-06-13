/**
 * This file contains controller logic for Authentication of User.
 * 
 */

const db = require("../models");
const config = require("../configs/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 *  exporting signup function
 */
exports.signup = (request, response) =>   {

    /**
     *  first create a user and map user details
     */
    User.create( {
        username: request.body.username,
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 8)
    })
    /**
     *  if done successfully go to then block 
     *  if request body has role mentioned
     *  then find all role ids for those roles
     *  if you find all role ids go to then block 
     *  there set the roleid in relationship table "user_role_relationship" for that new user 
     *  so this will create userid and roleid entry in user_role_relationship table
     */
    .then( user => {
        console.log("User is created");
        if(request.body.roles){
            Role.findAll({
                where: {
                    name:{
                        [Op.or] : request.body.roles
                    }
                }
            })
            .then(roles => {
                user.setRoles(roles)
                .then( () => {
                    response.send({ message: "User registered successfully!"})
                })
            })
        }else{
            /**
             *  if roles are not passed in request body
             *  then by default set role as user and for user role id is 1
             */
            user.setRoles([1])
            .then( () => {
                response.send({
                    message: "User registered successfully!"
                })
            })
        }
    })
    .catch( error => {
        /**
         *  if user is not created then send error message
         */
        response.status(500).send({
            message: error.message
        })
    });

    
}
/**
 *  exporting the signin function
 */
exports.signin = (request, response) => {

    /**
     *  when user send the username and passwrd
     *  find the user with username
     *  
     */
    User.findOne( {
        where : {
            username : request.body.username
        }
    })
    /**
     *  some result is returned as user
     *  if user is null then send message user not found 
     */
    .then( user => {
        if(!user){
            return response.status(404).send({
                message: "User not found"
            });
        }

        /**
         *  if user is found 
         *  then validate the password
         *  comapre the password which is in db in hashform and the password which user has passed
         *  that paswrd wil be first converted to a hash value
         *  so now both hash values will be compared
         *  
         */
        var passwordIsValid = bcrypt.compareSync(request.body.password, user.password);
        if( !passwordIsValid ){
            /**
             *  if comparision is not true then send invalid password
             */
            return response.status(401).send( {
                message: "Invalid Password"
            })
        }

        /**
         *  if both username and password are valid then generate a token
         *  token wil be used to access web application after sign in
         *  token wil be generated using user id and secretsalt
         *  and we mention the expiry time as 24 hrs
         *  time is mentioned in seconds
         */
        var token = jwt.sign({ id: user.id}, config.secretSalt, {
            expiresIn: 86400 // 24 hrs
        });


        /**
         *  if token is generated 
         *  then send to user all the below details including access token
         */
        response.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    })
    /**
     *  if any error occur then send error message
     */
    .catch( error => {
        response.status(500).send({
            message: error.message
        });
    });

}