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
      it('should log in as a user upon signing in', async () => {
        const user = base64.encode("Mohammad:1994");
        const response = await request.post('/signin').set('Authorization', `Basic ${user}`)
        expect(response.status).toEqual(200)
        expect(response.body.username).toEqual('Mohammad');
        // expect(response.body.password).toEqual('1994');
      })
      it('should fails log in as an invalid user upon signing in', async () => {
        const user = base64.encode("Mohamad:1994");
        const response = await request.post('/signin').set('Authorization', `Basic ${user}`)
        expect(response.status).toEqual(403)
        // expect(response.body.password).toEqual('1994');
      })
      it('should fails log in with wrong password upon signing in', async () => {
        const user = base64.encode("Mohammad:194");
        const response = await request.post('/signin').set('Authorization', `Basic ${user}`)
        expect(response.status).toEqual(500)
        // expect(response.body.password).toEqual('1994');
      })
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

