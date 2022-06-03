/**
 * 
 *  This file will contain the routing logic for the Category controller page
 * 
 */

const categoryController = require('../controllers/category.controller');

module.exports = function(app){

    // Route for the POST request, to create a new category
    app.post("/ecom/api/v1/categories", categoryController.create);

    // Route for the GET request, to fetch all categories
    app.get("/ecom/api/v1/categories", categoryController.findAll)

    // Route for the GET request, to fetch a category based on category id
    app.get("/ecom/api/v1/categories/:id", categoryController.findOne)

    // Route for the PUT request, to update a category based on category id 
    app.put("/ecom/api/v1/categories/:id", categoryController.update);

    // Route for the DELETE request, to delete a category based on id
    app.delete("/ecom/api/v1/categories/:id", categoryController.delete);


}