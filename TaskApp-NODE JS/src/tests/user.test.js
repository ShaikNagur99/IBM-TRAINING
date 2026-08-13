const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../index');
const User = require('../models/user');

beforeAll(async () => {
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/taskapp_test'
    );
});

beforeEach(async () => {
    await User.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

test('Should create a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'MyPass777'
        })
        .expect(201);

    expect(response.body.user.email).toBe('test@example.com');
    expect(response.body.token).toBeDefined();
});

test('Should login existing user', async () => {

    await request(app)
        .post('/users')
        .send({
            name: 'Test User',
            email: 'login@example.com',
            password: 'MyPass777'
        })
        .expect(201);

    const response = await request(app)
        .post('/users/login')
        .send({
            email: 'login@example.com',
            password: 'MyPass777'
        })
        .expect(200);

    expect(response.body.token).toBeDefined();
});

test('Should get user profile with authentication', async () => {

    const signupResponse = await request(app)
        .post('/users')
        .send({
            name: 'Profile User',
            email: 'profile@example.com',
            password: 'MyPass777'
        })
        .expect(201);

    const token = signupResponse.body.token;

    const response = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

    expect(response.body.email).toBe('profile@example.com');
});

test('Should reject request without authentication', async () => {

    await request(app)
        .get('/users/me')
        .expect(401);
});