/**
 * This file contains controller logic for category page.
 * Everytime a CRUD operation come for the category, methods defined
 * in this controller will be executed
 */

/**
 * only doing require("../models") not require("../models/index")
 * beacuse it will take db object from the index file  
 * as in controller const db is used so it will automatically map db object from 
 * index file to db object of controller file
 */

const { category } = require("../models");
const db = require("../models");

/**
 * db object has category key 
 */
const Category = db.category;

/**
 * exports.create will export the create function which can be called 
 * from other files directly instead of writing the whole create logic again
 */

//POST request - insert a new category in category table

exports.create = (req, res) => {

    /**
     * validating if the request boday has name, if it is empty then 
     * it is not a valid request because name cannot be empty
     * whereas description can be empty so no check is added for description column
     */
    if (!req.body.name) {
        /**
         * request not valid so send response status 400 client side error
         * and sending back the message to the client
         */
        res.status(400).send({
            message: "Name of category can not be empty !"
        })
        /**
         * request is invalid then simply return, no further execution.
         */
        return;
    }

    /**
     * created a category object which has name and description
     */
    const category = {
        name: req.body.name,
        description: req.body.description
    };

    /**
     * using Category object which is pointing to category table of db, 
     * creating a new entry in category table
     * if a new entry is inserted successfully then print msg on terminal 
     * and send response 201 successful and send the category object as well
     * if some error occurs while inserting then print the msg on terminal
     * and send the response status as 500 beacuse it is internal server error
     * and send the message to the client
     */
    Category.create(category)
        .then(category => {
            console.log(` category name : ${category.name} got inserted in table`);
            res.status(201).send(category);
        })
        .catch(err => {
            console.log(`Issue in inserting category name: ${category.name}`);
            console.log(`Error message : ${err.message}`);
            res.status(500).send({
                message: "Some internal error while storing the category. "
            });
        });

}

// GET request - get a list of all categories

exports.findAll = (req, res) => {
    let categoryName = req.query.name; 
    let promise;
    /**
     * if user is searching from category name then if part will execute
     */
    if (categoryName) {
        promise = Category.findAll({
            where: {
                name: categoryName
            }
        })
    } else {
        promise = Category.findAll();

    }

    promise
        .then(categories => {
            res.status(200).send(categories);
        })
        .catch(err => {
            res.status(500).send({
                meassage: "Some internal error while fetching categories details."
            })
        })

}

/**
 * Get a category based on id 
 */

exports.findOne = (req, res) => {
    const categoryId = req.params.id;

    Category.findByPk(categoryId)
        .then(category => {
            res.status(200).send(category);
        })
        .catch(err => {
            res.status(500).send({
                message: "Some internal server error while fetching the category deatils using id."
            })
        })

}

/**
 * PUT - Update the exitsing category 
 */

exports.update = (req, res) => {

    const category = {
        name: req.body.name,
        description: req.body.description
    }

    const categoryId = req.params.id;

    Category.update(category, {
        where: {
            id: categoryId
        }
    })
        .then(updatedCategory => {
            /**
             * category details updated successfully 
             * now find the updated category details by id
             * if fetching is successfull then wil handle and send the response to client
             * if error occur then catch will handle the error
             */

            Category.findByPk(categoryId)
                .then(category => {
                    res.status(200).send(category);
                })
                .catch( err => {
                    res.status(500).send({
                        /**
                         * using this catch if after successfully updating the category 
                         * then fetching the updated details to send as response to the client
                         * if in fetching the details some error occur then this catch will handle it
                         */
                        message: "Some internal serevr error while fetching the updated category details by id"
                    })
                })
        })
        .catch(err => {
            res.status(500).send({
                /**
                 * using this catch if the updation operation fails 
                 * then sending the msg as response to the client
                 */
                message: "Some internal serevr error while updating the category details by id"
            })

        })

}

/**
 * 
 */

exports.delete = (request, response) => {

    const categoryId = request.params.id;

    Category.destroy(category, {
        where: {
            id: categoryId
        }
    })
    .then( result => {
        response.status(200).send({
            message: "Category is deleted successfully"
    })
})
    .catch ( error => {
        response.status(500).send({
            message: "Some internal error while deleting the category based on id."
    })
});
}