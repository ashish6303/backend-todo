import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from '../../src/app.js';

dotenv.config();

describe('User API', () => {
    let userId;

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

    const createUser = async (userData) => {
        return await request(app).post('/api/v1/user/register').send(userData);
    };

    const fetchAllUsers = async () => {
        return await request(app).get('/api/v1/user/users');
    };

    const updateUser = async (id, userData) => {
        return await request(app).put(`/api/v1/user/${id}`).send(userData);
    };

    const deleteUser = async (id) => {
        return await request(app).delete(`/api/v1/user/${id}`);
    };

    it('should create a new user', async () => {
        const newUser = { username: 'testuser', email: 'testuser@example.com' };
        const response = await createUser(newUser);
        
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('_id');

        userId = response.body.data._id;
    });

    it('should fetch all users', async () => {
        const response = await fetchAllUsers();
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should update the user', async () => {
        const updatedUser = { username: 'updatedUser', email: 'updated@example.com' };
        const response = await updateUser(userId, updatedUser);
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User updated successfully');
    });

    it('should delete the user', async () => {
        const response = await deleteUser(userId);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User deleted successfully');
    });
});
