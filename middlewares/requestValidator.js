const db = require('../models');

const Category = db.category;

const validateCategoryRequest = (request, response, next) => {
    /**
     * validating if the request boday has name, if it is empty then 
     * it is not a valid request because name cannot be empty
     * whereas description can be empty so no check is added for description column
     */
    if(!request.body.name){
         /**
         * request not valid so send response status 400 client side error
         * and sending back the message to the client
         */
        response.status(400 ). send({
            message : "Name of Category can't be empty !"
        })
    }
    next();
}

const validateProductRequest = (request, response, next) => {
    if( !request.body.name) {
        response.status(400).send( {
            message: "Name of the product can't be empty !"
        });
        return;
    }

    if( !request.body.cost) {
        response.status(400).send( {
            message: "Cost of the product can't be empty !"
        });
        return;
    }

    if(request.body.categoryId) {

        Category.findByPk(request.body.categoryId)
        .then( category => {
            if(!category){
                response.status(400).send({
                    message: "Category id is passed but not available!"
                })
                return;
            }
            next();
        })
    .catch( error => {
        response.status(500).send( {
            message: "Some Internal error while fetching the product details !"
        })
    })
    }
    else{
        response.status(400).send( {
            message: "Category id was not passed !"
        })
        return;
    }

}


module.exports = {
    validateCategoryRequest : validateCategoryRequest,
    validateProductRequest : validateProductRequest
}