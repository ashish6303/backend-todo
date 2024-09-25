import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from './src/app.js'; // Import the app directly

dotenv.config();

describe('User API', () => {
    beforeAll(async () => {
        const MONGODB_URI = process.env.MONGODB_URI;
        await mongoose.connect(MONGODB_URI, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    let userId;

    it('should create a new user', async () => {
        const newUser = {
            username: 'testuser',
            email: 'testuser@example.com',
        };

        const response = await request(app)
            .post('/api/v1/user/register') // Adjust the URL as needed
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('_id'); // Ensure an ID is returned
        expect(response.body.data.username).toBe(newUser.username);
        expect(response.body.data.email).toBe(newUser.email);

        // Store the created user ID for later deletion
        userId = response.body.data._id;
        console.log(userId, "userID")
    });

    it('should fetch all users', async () => {
        const response = await request(app).get('/api/v1/user/users'); // Correct URL to fetch users
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('All user fetched');
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should update the user', async () => {
        const updatedUser = {
            username: 'updatedUser',
            email: 'updated@example.com',
        };

        const response = await request(app)
            .put(`/api/v1/user/${userId}`)
            .send(updatedUser);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User updated successfully');
        // expect(response.body.data.username).toBe(updatedUser.username);
        // expect(response.body.data.email).toBe(updatedUser.email);
    });

    it('should delete the user', async () => {
        const response = await request(app)
            .delete(`/api/v1/user/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User deleted successfully');
    });


});
