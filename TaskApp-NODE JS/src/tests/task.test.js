const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../index');

const User = require('../models/user');
const Task = require('../models/task');

let user;
let token;

beforeAll(async () => {
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/taskapp_test'
    );
});

beforeEach(async () => {

    await User.deleteMany({});
    await Task.deleteMany({});

    user = new User({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'MyPass777'
    });

    await user.save();

    token = await user.generateAuthToken();
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});


test('Should create a task', async () => {

    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
            description: 'Finish Node.js project'
        })
        .expect(201);

    expect(response.body.description)
        .toBe('Finish Node.js project');

    expect(response.body.completed)
        .toBe(false);
});


test('Should get tasks', async () => {

    await Task.create({
        description: 'Task 1',
        owner: user._id
    });

    await Task.create({
        description: 'Task 2',
        owner: user._id
    });

    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

    expect(response.body.length).toBe(2);
});


test('Should filter completed tasks', async () => {

    await Task.create({
        description: 'Completed task',
        completed: true,
        owner: user._id
    });

    await Task.create({
        description: 'Pending task',
        completed: false,
        owner: user._id
    });

    const response = await request(app)
        .get('/tasks?completed=false')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

    expect(response.body.length).toBe(1);

    expect(response.body[0].completed)
        .toBe(false);
});


test('Should paginate tasks', async () => {

    await Task.create({
        description: 'Task 1',
        owner: user._id
    });

    await Task.create({
        description: 'Task 2',
        owner: user._id
    });

    await Task.create({
        description: 'Task 3',
        owner: user._id
    });

    const response = await request(app)
        .get('/tasks?limit=2&skip=0')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

    expect(response.body.length).toBe(2);
});


test('Should update a task', async () => {

    const task = await Task.create({
        description: 'Old task',
        owner: user._id
    });

    const response = await request(app)
        .patch(`/tasks/${task._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            description: 'Updated task',
            completed: true
        })
        .expect(200);

    expect(response.body.description)
        .toBe('Updated task');

    expect(response.body.completed)
        .toBe(true);
});


test('Should delete a task', async () => {

    const task = await Task.create({
        description: 'Task to delete',
        owner: user._id
    });

    await request(app)
        .delete(`/tasks/${task._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

    const deletedTask = await Task.findById(task._id);

    expect(deletedTask).toBeNull();
});


test('Should reject task request without authentication', async () => {

    await request(app)
        .post('/tasks')
        .send({
            description: 'Unauthorized task'
        })
        .expect(401);
});