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
db.product = require("./product.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.cart = require("./cart.model")(sequelize, Sequelize)

// created a new key in db object which has array of values 
db.ROLES = ["user", "admin"];


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
        Sequelize : Sequelize,
        sequelize : sequelize,
        category : function(2 parameters) {

        },
        product : function(2 parameters){
            
        },
        user : function(2 parameters){
            
        },
        role : function(2 parameters){
            
        },
        cart: function(2 parameters){
            
        },
        Roles: [user, admin]

    }
*/

/**
 *  relationship from category to product is many to one beacuse 
    one category can have many products
    now this will create a foreign key column in product table as categoryId
    which will point to id column of Category table which is a primary key
 */
db.category.hasMany(db.product)

/**
 *  Establishing Realtionship bewteen User and Role
 *  User and Role will have many to many relationship
 *  so, one table 'users' is created for user
 *  second table 'roles' is created for role
 *  and third table 'user_role_relationship' is created for the realtionship 
 *  bcz it is many to many relationship so a new table will be created for the realtion
 */

/**
 *   how to define many to many relation
 *   through means the realtion table with which they hold the relationship
 *   user_role_relationship this table will be created automatically
 *  
 *    user_role_relationship fields:
 *    1. userId --- this is a foreign key which points to id column of users table which is a primary key
 *    2. roleId --- this is a foreign key which points to id column of roles table which is a primary key
 *   
*/
db.role.belongsToMany( db.user, {
    through: "user_role_relationship",
    foreignKey: "roleId"
});
db.user.belongsToMany( db.role, {
    through: "user_role_relationship",
    foreignKey: "userId"
});
/**
 *  Relationship between cart and products - Many to Many
 *  one cart can have many products
 *  one product can be present in many user's cart
 *  here we are talking about different users 
 *  
 */
 db.product.belongsToMany( db.cart, {
    through: "cart_product_relationship",
    foreignKey: "productId"
});

db.cart.belongsToMany( db.product, {
    through: "cart_product_relationship",
    foreignKey: "cartId"
});

/**
 *  Relationship between user and cart is One to Many
 *  one user can have many cart over lifetime
 *  creatded one cart then placed order then create a new cart and placed order and so on
 *  so one user can create many carts over life time
 * 
 *  in cart table we will have userid as foreign key which will point to
 *  id of user table which is primary key
 *  
 *  
 */

db.user.hasMany(db.cart);

/* exporting the file so that it can be used by other files */
module.exports = db;
