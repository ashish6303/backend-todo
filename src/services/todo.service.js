import mongoose from "mongoose";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id) && id.length === 24;

const createTaskService = async (userId, taskData) => {
    try {
        // Validate userId
        if (!isValidObjectId(userId)) {
            return res.status(400).json(new ApiResponse(400, null, "User does not exixts"));
        }

        const user = await User.findById(userId);
        if (!user) throw new ApiError(403, 'User not found');

        // Create task with the userId as owner
        const newTask = new Task({
            ...taskData,
            owner: userId
        });

        return await newTask.save();
    } catch (error) {
        throw new ApiError(400, 'Failed to create new task');
    }
};

const getTaskService = async (userId) => {
    try {
        // Validate userId
        if (!isValidObjectId(userId)) {
            throw new ApiError(400, "Invalid userId format");
        }
        const tasks = await Task.aggregate([
            {
                $match: {
                    owner: new mongoose.Types.ObjectId(userId) // Ensure userId is valid ObjectId
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $project: {
                    text: 1,
                    completed: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ]);
        return tasks;
    } catch (error) {
        console.error("Error in getTaskService:", error.message || error);
        throw new ApiError(500, "Failed to fetch the tasks");
    }
};

const editTaskService = async ({taskId, taskData}) => {
    try {
        const updatetTask = await Task.findByIdAndUpdate(
            taskId,
            taskData,
            { new: true, runValidators: false }
        )
        return updatetTask;
    } catch (error) {
        console.log("Error is : ", error);
        throw new ApiError(500, "Something went wrong");
    }
}

const deleteTaskService = async(taskId) => {
    try {
        return await Task.findByIdAndDelete(taskId);
    } catch (error) {
        throw new ApiError(500, "Something went wrong");
    }
}

const deleteAllTaskService = async(userId) => {
    try {
        return await Task.deleteMany(
            {
                owner : userId
            }
        )
    } catch (error) {
        throw new ApiError(500,"Failed to delete");
    }
}

// const getTasksForUser = async (userId) => {
//     // Ensure `tasksDatabase` is an array of tasks if you're filtering tasks
//     const user = await User.findOne({ _id: userId }).exec();
//     if (!user) {
//         throw new Error('User not found');
//     }

//     // Assuming `tasks` is an array of tasks within the user document
//     return user.tasks.filter(task => task.userId === userId);
// };

export { createTaskService, getTaskService, editTaskService, deleteTaskService, deleteAllTaskService }