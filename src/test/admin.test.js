import chai from 'chai';  
import chaiHttp from 'chai-http';  
import express from 'express';  
import router from '../Admin/routes/admin.route.js';  

const { expect } = chai;  
chai.use(chaiHttp);  

const app = express();  
app.use(express.json());  
app.use('/admin', router);  

// Mock database  
import { User, OpenAIChat } from '../Database/models/db.model.js';  
User.find = () => ({ exec: () => Promise.resolve([]) });  
User.countDocuments = () => Promise.resolve(100);  
OpenAIChat.find = () => ({ exec: () => Promise.resolve([]) });  
OpenAIChat.countDocuments = () => Promise.resolve(50);  

describe('Admin API', () => {  
  describe('GET /admin/export/users', () => {  
    it('should return 404 if no user data is found', (done) => {  
      chai.request(app)  
        .get('/admin/export/users?limit=10')  
        .end((err, res) => {  
          expect(res).to.have.status(404);  
          expect(res.body.message).to.equal('No user data found.');  
          done();  
        });  
    });  
  });  

  describe('GET /admin/export/chats', () => {  
    it('should return 404 if no chat data is found', (done) => {  
      chai.request(app)  
        .get('/admin/export/chats?limit=10')  
        .end((err, res) => {  
          expect(res).to.have.status(404);  
          expect(res.body.message).to.equal('No chat data found.');  
          done();  
        });  
    });  
  });  

  describe('GET /admin/export/users/count', () => {  
    it('should return the total count of users', (done) => {  
      chai.request(app)  
        .get('/admin/export/users/count')  
        .end((err, res) => {  
          expect(res).to.have.status(200);  
          expect(res.body.count).to.equal(100);  
          done();  
        });  
    });  
  });  

  describe('GET /admin/export/chats/count', () => {  
    it('should return the total count of chats', (done) => {  
      chai.request(app)  
        .get('/admin/export/chats/count')  
        .end((err, res) => {  
          expect(res).to.have.status(200);  
          expect(res.body.count).to.equal(50);  
          done();  
        });  
    });  
  });  
});
