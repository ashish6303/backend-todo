import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { createTaskService, getTaskService, editTaskService, deleteTaskService, deleteAllTaskService } from "../services/todo.service.js";

const createTodoControllers = asyncHandler(async (req, res) => {
    const { text, complete, owner } = req.body;
    if (!text || !owner) {
        throw new ApiError(400, "Text and user are required");
    }
    try {
        const newTask = await createTaskService({ text, complete, owner });
        return res.status(201)
            .json(
                new ApiResponse(201,
                    newTask,
                    "Task created sucessfully"
                )
            )

    } catch (error) {
        throw new ApiError(400, "New task creation failed");
    }
})

const getTaskControllers = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    console.log(userId)
    if (!userId) {
        throw new ApiError(404, "User not found");
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
        throw new ApiError(400, "Task id and data is required")
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
    }

})

const deleteTaskControllers = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    if (!taskId) {
        throw new ApiError(404, "Task not found");
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
            throw new ApiError(404, "User not found");
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