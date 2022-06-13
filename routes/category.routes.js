/**
 * 
 *  This file will contain the routing logic for the Category controller page
 * 
 */

const categoryController = require('../controllers/category.controller');
const { requestValidator, authjwt } = require('../middlewares');

module.exports = function(app){

    // Route for the POST request, to create a new category
    app.post("/ecom/api/v1/categories", [requestValidator.validateCategoryRequest, authjwt.verifyToken, authjwt.isAdmin],categoryController.create);

    // Route for the GET request, to fetch all categories
    app.get("/ecom/api/v1/categories", categoryController.findAll)

    // Route for the GET request, to fetch a category based on category id
    app.get("/ecom/api/v1/categories/:id", categoryController.findOne)

    // Route for the PUT request, to update a category based on category id 
    app.put("/ecom/api/v1/categories/:id", [requestValidator.validateCategoryRequest, authjwt.verifyToken, authjwt.isAdmin],categoryController.update);

    // Route for the DELETE request, to delete a category based on id
    app.delete("/ecom/api/v1/categories/:id", [authjwt.verifyToken, authjwt.isAdmin], categoryController.delete);


}