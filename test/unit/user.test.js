import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from '../../src/app.js';

dotenv.config();

describe('User API', () => {
    let userId;
    const wrongId = '5f50c31b3c6fd18d3f1a4040';  // Non-existent valid ObjectId


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

    // This is going to test the user creation
    it('should create a new user', async () => {
        const newUser = { username: 'testuser', email: 'testuser@example.com' };
        const response = await createUser(newUser);
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('_id');
        userId = response.body.data._id;
    });

    it('should create a new  user without username', async () => {
        const newUser = {username: '', email: "test2@example.com"};
        const response = await createUser(newUser);
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('should ceate a new user with valid email', async() => {
        const newUser = {username:  'testuser', email: 'testuser.com' };
        const response = await createUser(newUser);
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('should create with existing username', async() => {
        const newUser = {username:  'testuser', email: 'test@user.com' };
        const newUser1 = {username:  'testuser', email: 'test1@user.com' };
        const response = await createUser(newUser);
        const response1 = await createUser(newUser1);
        expect(response1.status).toBe(400);
        expect(response1.body.success).toBe(false);
    })

    it('should not allow creating a user with an existing email', async () => {
        const newUser = { username: 'testuser', email: 'test@user.com' };
        const newUser1 = { username: 'testuser1', email: 'test@user.com' };
        const response = await createUser(newUser);
        expect(response.status).toBe(201);  // Expect success for the first user creation
        const response1 = await createUser(newUser1);
        expect(response1.status).toBe(400);  // Expect failure due to duplicate email
        expect(response1.body.success).toBe(false);
        expect(response1.body.error).toBe('Email already exists');  // Modify based on your API's actual error message
    });
    
    // To fetch the user
    it('should fetch all users', async () => {
        const response = await fetchAllUsers();
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    // To update the user
    it('should update the user', async () => {
        const updatedUser = { username: 'updatedUser', email: 'updated@example.com' };
        const response = await updateUser(userId, updatedUser); 
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User updated successfully');
    });

    it('should not update the user with invalid data', async () => {
        const updatedUser = { username: 'updatedUser', email: 'updated@example.com' };
        const response = await  updateUser(wrongId, updatedUser);
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('should return 400 when updating with empty username or email', async () => {
        const response = await updateUser(userId, { username: '   ', email: ' ' });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Username cannot be empty or only whitespace');
    });

    it('should not update the user without providing data', async () => {
        const response = await updateUser(userId, {}); // No data provided
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('User data not provided');
    });
    
    it('should return 400 when updating with an empty or whitespace-only email', async () => {
        const updatedUser = { email: '    ' };  // Empty email or only whitespace
        const response = await updateUser(userId, updatedUser);
        
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Email cannot be empty or only whitespace');
    });
    
    it('should return 400 when updating with an email that already exists', async () => {
        // Create another user to ensure duplicate email exists
        const newUser = { username: 'anotherUser', email: 'existinguser@example.com' };
        await createUser(newUser);  // Ensure this email exists in the database
        
        const updatedUser = { email: 'existinguser@example.com' };  // Use the same email
        const response = await updateUser(userId, updatedUser);  // Try to update with the duplicate email
        
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Email already exists');
    });
    
    // To delete the user
    it('should delete the user with wrong id', async () => {
        const response = await deleteUser(wrongId);
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });
    
    it('should delete the user', async () => {
        const response = await deleteUser(userId);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User deleted successfully');
    });

    
    
});
