import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from '../../src/app.js';

dotenv.config();

describe('Todo API', () => {
    let url = '/api/v1/user';
    let userId;
    let taskId;

    beforeAll(async () => {
        const MONGODB_URI = process.env.MONGODB_URI;
        await mongoose.connect(MONGODB_URI, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Create a dummy user for testing
        const userResponse = await request(app)
            .post('/api/v1/user/register')
            .send({ username: 'testuser', email: 'testuser@example.com' });
        userId = userResponse.body.data._id;
        console.log(userId)
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    const createTask = async (taskData) => {
        return await request(app).post(`${url}/${userId}/todo`).send(taskData);
    };

    const fetchTasks = async () => {
        return await request(app).get(`${url}/${userId}/todo`);
    };

    const updateTask = async (taskId, taskData) => {
        return await request(app).put(`${url}/${userId}/todo/${taskId}`).send(taskData);
    };

    const deleteTask = async (taskId) => {
        return await request(app).delete(`${url}/${userId}/todo/${taskId}`);
    };

    const deleteAllTasks = async () => {
        return await request(app).delete(`${url}/${userId}/todo`);
    };

    it('should create a new task', async () => {
        const taskData = { text: 'Test task', completed: false };
        const response = await createTask(taskData);
        
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('_id');

        taskId = response.body.data._id; // Store task ID for later tests
    });

    it('should fetch all tasks', async () => {
        const response = await fetchTasks();
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should update the task', async () => {
        const updatedTaskData = { text: 'Updated test task', completed: true };
        const response = await updateTask(taskId, updatedTaskData);
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Task Updated Successfully');
    });

    it('should delete the task', async () => {
        const response = await deleteTask(taskId);
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Task deleted Successfully');
    });

    it('should delete all tasks for a user', async () => {
        const taskData1 = { text: 'Task 1', completed: false };
        const taskData2 = { text: 'Task 2', completed: true };
        
        await createTask(taskData1);
        await createTask(taskData2);
        
        const response = await deleteAllTasks();
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('All task deleted Successfully');
    });
});
