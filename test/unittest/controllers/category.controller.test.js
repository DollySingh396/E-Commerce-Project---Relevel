const req = require('express/lib/request');
const categoryController = require('../../../controllers/category.controller');
const model = require('../../../models');
const categoryModel = model.category;
const newCategory = require('../../mockdata/new-category.json');
const { mockRequest, mockResponse } = require('../interceptor');

let request, response;

// before each test we will call mock request and mock response in interceptor
beforeEach( () => {
    request = mockRequest();
    response = mockResponse();
});

// decsribe is used to define more than 1 tests together
describe('categoryController.create', () => {

    beforeEach( () => {
        request.body = newCategory;
    })

    // positive test
    test('should call the categoryController.create and create a new category', async () => {

        /**
         *  mocking category model create command
         *  we are calling create command of category model file to create a category table
         *  when that command is executed completely then a promise is returned in resolved state
         *  
         *  mock data is passed as newCategory
         *  
         *  spyon will wait and observe till when the mockImplementation command will get response in form of resolved promise
         * 
         */
        
        const spy = jest.spyOn(categoryModel, 'create')
                    .mockImplementation( (newCategory) => Promise.resolve(newCategory) );
                   

        /**
         *  executing the controller command
         */
         await categoryController.create(request, response);

        /**
         *  tests to verify
         */
        expect(spy).toHaveBeenCalled();
        expect(categoryModel.create).toHaveBeenCalledWith(newCategory);
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.send).toHaveBeenCalledWith(newCategory);
    })
    // negative test
    // test('should call the categoryController.create and ends with an error', () => {

    //     })

});


describe('categoryController.findAll', () => {
    test('should call categoryController.findAll with a query value', async () => {
        const queryParam = {
            where: {
                name: "Electronics"
            }
        };

        const spy = jest.spyOn( categoryModel, 'findAll')
        .mockImplementation( (queryParam) => Promise.resolve(newCategory))

        request.query = {
            name: "Electronics"
        }

        await categoryController.findAll(request, response)

        expect(spy).toHaveBeenCalled();
        expect(categoryModel.findAll).toHaveBeenCalledWith(queryParam);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.send).toHaveBeenCalledWith(newCategory);
    })
})

