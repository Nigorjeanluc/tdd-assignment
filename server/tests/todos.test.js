import app, { todos } from '../../server';
import chai from 'chai';
import chaiHttp from "chai-http";

const {expect} = chai;
chai.use(chaiHttp);

describe('API Tests', () => {
  let task = {
    title: 'integration test',
    completed: false,
    priority: 4
  };

  describe('### Welcome message ', () => {
    it('should welcome a user', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.body.message).to.equal('Welcome to the TDD Concept App');
          done();
        });
    });
  });

  describe('## Create task ', () => {
    it('should create a task', (done) => {
      chai.request(app)
        .post("/tasks")
        .send(task)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.title).to.equal('integration test');
          task = res.body;
          done();
        });
    });
  });

  describe('# Get all tasks', () => {
    it('should get all tasks', (done) => {
      chai.request(app)
        .get('/tasks')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.message).to.equal('Retrieved all tasks');
          done();
        });
    });
  });
  describe('Get a task by id', () => {
    it('should get a task', (done) => {
      chai.request(app)
        .get('/tasks/' + todos[0].id)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Task is fetched successfully');
          expect(res.body.data.title).to.equal('Some title One');
          done();
        });
    });
  });

  describe('Update a task by id', () => {
    it('should modify a task', (done) => {
      task.title = 'New Task'
      chai.request(app)
        .patch('/tasks/' +  todos[todos.length - 1].id)
        .send(task)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.title).to.equal('New Task');
          done();
        });
    });
  });

  describe('Update a task by id with unkown id', () => {
    it('should not modify a task', (done) => {
      task.title = 'New Task'
      chai.request(app)
        .patch('/tasks/' +  todos.length + 100)
        .send(task)
        .end((err, res) => {
          expect(res.body.error).to.equal('The given id is not found');
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('Delete a task by id', () => {
    it('should delete a task', (done) => {
      chai.request(app)
        .delete('/tasks/' + todos[todos.length - 1].id)
        .end((err, res) => {
          expect(res.status).to.equal(204);
          done();
        });
    });
  });
  describe('Not found', () => {
    it('should not allow unknown address', (done) => {
      chai.request(app)
        .get('/iwannathankmeforneverquitting')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Not Found');
          done();
        });
    });
  });
});