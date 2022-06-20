/**
 *  While testing a controller,
 *  we need to make sure that the request object contains all the
 *  desired parameters and body object  and 
 *  response objeect also has all the desired parameters
 * 
 */
module.exports =  {

    /**
     *  if a person calls mockRequest method then return request object
     *  if calls request.body then return request object
     *  if calls request.params then also return request object
     */
    mockRequest: () => {

        const request = {} // dummy object
        request.body = jest.fn().mockReturnValue(request);
        request.params = jest.fn().mockReturnValue(request);
        request.query = jest.fn().mockReturnValue(request);
        return request;
    },

    mockResponse: () => {

    /**
     *  if a person calls mockResponse method then return response object
     *  if calls request.body then return response object
     *  if calls request.params then also return response object
     */
        const response = {}
        response.status = jest.fn().mockReturnValue(response);
        response.send = jest.fn().mockReturnValue(response);
        response.json   = jest.fn().mockReturnValue(response);
        return response;
    }
}