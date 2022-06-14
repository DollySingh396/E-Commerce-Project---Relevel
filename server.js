// importing the modules which are required
const express = require('express');
const BodyParser = require('body-parser');

// requiring server congfigs
const serverConfigs = require('./configs/server.config');

//initialising the application
const app = express();

/**
 * Using body parser middleware
 * Using Body Parser to parse the request
 * Parsing the request of the Content-type: json and convert that to object
 */
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());


/**
 * Initialising the database
 */
const db = require('./models');



// passing the category schema to Category object
const Category = db.category;
const Product = db.product;
const Role = db.role;

// relationship from category to product is many to one beacuse 
// one category can have many products
// now this will create a foreign key column in product table as categoryId
// which will point to id column of Category table which is a primary key
//Category.hasMany(Product); -- moved to index.js in models

// sync function will drop whatever data that already exists in category table  
// and create a new category table again
db.sequelize.sync({ force: true })
    .then(() => {
        console.log('tables dropped and created');
        // function to insert dummy data into the new category table
        init();
    })

// inserting dummy data in the new created Category table
function init() {

    // categories is an object which hold dummy data
    var categories = [{
        name: "Electronics",
        description: "This category  will contain all the Electronics products."
    },
    {
        name: "KitchenItems",
        description: "This category  will contain all the Kitchen products."
    }];

    // inserting the dummy data into Category table
    Category.bulkCreate( categories )
    .then( () => {
        console.log( "Category table initialised.")
    })
    .catch( err => {
        console.log( "Error while initialising the Category table.")
    })

    /**
     *  creating 2 entries in role table
     *  only 2 roles are present 
     *  user - roleid as 1
     *  admin - roleid as 2
     */
    Role.create({
        id : 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "admin"
    })

}

// requiring the routes function and passing the app instance as parameter
require('./routes/category.routes')(app);
require('./routes/product.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/cart.routes')(app);

app.listen(serverConfigs.PORT, () => {
    console.log(`Application is running on port number: ${serverConfigs.PORT}`)
});