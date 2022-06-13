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


exports.signup = (request, response) =>   {

}

exports.signin = (request, response) => {

}