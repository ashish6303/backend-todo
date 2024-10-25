import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { createTaskService, getTaskService, editTaskService, deleteTaskService, deleteAllTaskService } from "../services/todo.service.js";
import { Task } from "../models/task.model.js";

const createTodoControllers = asyncHandler(async (req, res) => {
    const userId = req.params.userId; // Extract userId from params
    const { text, completed } = req.body; // Extract text and completed from body

    if (!text) {
        return res.status(400).json(new ApiResponse(400, null, "Text is required"));
    }

    try {
        const newTask = await createTaskService(userId, { text, completed });
        return res.status(201)
            .json(
                new ApiResponse(
                    201,
                    newTask,
                    "Task created successfully"
                )
            );
    } catch (error) {
        throw new ApiError(400, "New task creation failed");
    }
});
const getTaskControllers = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json(new ApiResponse(400, null, "User does not exixts"));
    }
    try {
        const task = await getTaskService(userId);
        return res.status(200)
            .json(
                new ApiResponse(201,
                    task,
                    "All tasks fetched sucessfully"
                )
            )
    } catch (error) {
        return new ApiError(500, "Something went wrong");
    }
})

const editTaskControllers = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    const taskData = req.body;

    if (!taskId || !taskData) {
        return res.status(400).json(new ApiResponse(400, null, "Task Id and Task Data is required"));
    }

    try {
        const task = await editTaskService({ taskId, taskData });

        return res.status(200)
            .json(
                new ApiResponse(
                    201,
                    task,
                    "Task Updated Successfully"
                )
            )
    } catch (error) {
        console.log("Error is", error)
        throw new ApiError(500, "Something went wrong");
    }

})

const deleteTaskControllers = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    if (!taskId) {
        return res.status(400).json(new ApiResponse(400, null, "Task does not exists"));
    }

    const taskExists = await Task.findById(taskId);
    if(!taskExists)
    {
        return res.status(400).json(new ApiResponse(400, null, "Task does not exists"));
    }

    const task = await deleteTaskService(taskId);

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Task deleted Successfully"
            )
        )

})

const deleteAllTaskControllers = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json(new ApiResponse(400, null, "User not found"));
        }
        const task = await deleteAllTaskService(userId);

        return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "All task deleted Successfully"
                )
            )

    } catch (error) {
        throw new ApiError(500, 'Something went wrong');
    }
})



export { createTodoControllers, getTaskControllers, editTaskControllers, deleteTaskControllers, deleteAllTaskControllers }