/*
* This file will be used for the following purpose: 
*
* 1. Create the DB connection with the help of sequelize
* 2. Export all the functionalities of the model through the file. 
* 
* One of the advantages of using index.js file is, other file
* trying to import this file, just need to provide the
* module name.
*
*/

/* requiring whatever is required */

const config = require("../configs/db.config");
const Sequelize = require("sequelize");

/* setting up db connection */

const sequelize = new Sequelize( 
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host : config.HOST,
        dialect : config.dialect
    }
);

/* creating a db object */

const db = {}

/* binding everything with the db object 
    db.key = value;
*/

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category  = require("./category.model")(sequelize, Sequelize);
db.product = require("./product.model")(sequelize, Sequelize)

/* passing sequelize object and Sequelize module as parameters
    so that in every model file we don't need to require them again n again
    and setup the connection in each model file

    
    the db connection is already created in index.js file and 
    is passed to other category file using parameters and 
    we made a function in category file which will take these two parameters 
    so no need to create db connection again
*/

/* db object will look like 
    db = {
        Sequelize : Sequelize 
        sequelize : sequelize
        category : function(2 parameters) {

        }
        product : function(2 parameters){
            
        }
    }
*/

/* exporting the file so that it can be used by other files */

module.exports = db;
