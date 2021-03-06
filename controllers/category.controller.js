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
            if(!category){
                // if category id is not present in table then page not found error 
                return res.status(404).send({
                    message: "Category is not found."
                })
            }
            //if category id is present in table then simply give details of that category
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
                .catch(err => {
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
 * Delete - to delete a category using id
 */

exports.delete = (request, response) => {

    const categoryId = request.params.id;

    Category.destroy({
        where: {
            id: categoryId
        }
    })
        .then(result => {
            response.status(200).send({
                message: "Category is deleted successfully."
            })
        })
        .catch(error => {
            response.status(500).send({
                message: "Some internal error while deleting the category based on id."
            })
        })
}