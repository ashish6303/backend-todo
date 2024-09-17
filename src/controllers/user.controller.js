import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { deleteUserService, findUserByEmail, findUserByUsername, getAllUser, isValidEmail, registerUser, userUpdateService } from "../services/user.service.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const registerUserController = asyncHandler(async (req, res) => {
    try {
        const { username, email } = req.body;

        // Validate required fields
        if (!username || !email) {
            return res.status(400).json(new ApiResponse(400, null, "Username and email are required fields"));
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json(new ApiResponse(400, null, "Invalid email format"));
        }

        const existingUserByUsername = await findUserByUsername(username);
        if (existingUserByUsername) {
            // Throw ApiError with specific message
            return res.status(400).json(new ApiResponse(400, null, "Username already exists"));
        }

        const existingUserByEmail = await findUserByEmail(email);
        if (existingUserByEmail) {
            // Throw ApiError with specific message
            return res.status(400).json(new ApiResponse(400, null, "Email already exists"));
        }


        // Call the service to register the user
        const createUser = await registerUser({ username, email });

        // Send successful response
        return res.status(201).json(
            new ApiResponse(
                201,
                createUser,
                "User created successfully"
            )
        );
    } catch (error) {
        throw new ApiError(500, "Something went wrong");
    }
});

const getAllUserController = asyncHandler(async (req, res) => {
    try {
        const allUser = await getAllUser();

        return res.status(200)
            .json(
                new ApiResponse(200,
                    allUser,
                    "All user fetched"
                )
            )
    } catch (error) {
        throw new ApiError(500, "Something went wrong");
    }
})

const deleteUserController = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json(new ApiResponse(400, null, "User does not exist"));
    }

    const existedUser = await User.findById(userId);
    if(!existedUser){
        return res.status(400).json(new ApiResponse(400, null, "User does not exist"));
    }

    try {
        const user = await deleteUserService(userId);

        return res.status(200)
            .json(
                new ApiResponse(200,
                    null,
                    "User deleted successfully"
                )
            )

    } catch (error) {
        return new ApiError(500, "Something went wrong");
    }
})

const updateUserController = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const userdata = req.body;

    if (!userId) {
        return new ApiError(404, "User not found");
    }

    if (!userdata || Object.keys(userdata).length === 0) {
        return res.status(400).json(new ApiResponse(400, null, "User data not provided"));
    }

    console.log("Requested data is : ", userdata);

    const usesdataname = userdata.username;

    if (userdata.username) {
        if (typeof userdata.username !== 'string' || !userdata.username.trim()) {
            console.log('Invalid username:', userdata.username);
            return res.status(400).json(new ApiResponse(400, null, "Username cannot be empty or only whitespace"));
        }

        // Check for conflicting username
        const existingUserByUsername = await findUserByUsername(usesdataname);
        if (existingUserByUsername && existingUserByUsername._id.toString() !== userId) {
            return res.status(400).json(new ApiResponse(400, null, "Username already exists"));
        }
    }

    if (userdata.email) {
        if (typeof userdata.email !== 'string' || !userdata.email.trim()) {
            console.log('Invalid email:', userdata.email);
            return res.status(400).json(new ApiResponse(400, null, "Email cannot be empty or only whitespace"));
        }

        // Check for conflicting email
        const existingUserByEmail = await findUserByEmail(userdata.email);
        if (existingUserByEmail && existingUserByEmail._id.toString() !== userId) {
            return res.status(400).json(new ApiResponse(400, null, "Email already exists"));
        }
    }

    const user = await userUpdateService({ userId, userdata });

    return res.status(200)
        .json(
            new ApiResponse(
                201,
                user,
                "User updated successfully"
            )
        )

})




export { registerUserController, getAllUserController, deleteUserController, updateUserController }