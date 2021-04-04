'use strict';
require('dotenv').config();
const base64 = require("base-64");
const {server} = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server);


describe('Server', () => {
    it('should create a new user upon signing up', async () => {
        const response = await request.post('/signup').send({
            username : 'Mohammad',
            password : '1994'
        });
        expect(response.status).toEqual(201)
        expect(response.body.username).toEqual('Mohammad');
        // expect(response.body.password).toEqual('1994');
      })
    //   it('should log in as a user upon signing in', async () => {
    //     const response = await request.post('/signin').send({
    //         username : 'Mohammad',
    //         password : '1994'
    //     });
    //     expect(response.status).toEqual(200)
    //     expect(response.body.username).toEqual('Mohammad');
    //     // expect(response.body.password).toEqual('1994');
    //   })
    it('handle invalid routes', async () => {
        const response = await request.get('/random');
        // console.log(response.body);
        expect(response.status).toEqual(404);
        expect(response.body.method).toEqual('GET');
      });
      it('handle server errors', async () => {
        const response = await request.get('/error');
        expect(response.status).toEqual(500);
      });
})



// POST to /signin to login as a user (use basic auth)
// Need tests for auth middleware and the routes
// Does the middleware function (send it a basic header)
// Do the routes assert the requirements (signup/signin)
// This is going to require more “end to end” testing that you’ve done in the past
// To test signin, your tests actually need to create a user first, then try and login, so there’s a dependency built in
// Ensure that you use supergoose to test your routes and your database