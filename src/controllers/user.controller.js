import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { deleteUserService, getAllUser, registerUser, userUpdateService } from "../services/user.service.js"
import { ApiError } from "../utils/ApiError.js";

const registerUserController = asyncHandler(async (req, res) => {

    const { username, email } = req.body;

    const createUser = await registerUser({ username, email })

    return res.status(201)
        .json(
            new ApiResponse(201,
                createUser,
                "User created sucessfully"
            )
        )

})

const getAllUserController = asyncHandler(async (req, res) => {
    const allUser = await getAllUser();

    return res.status(200)
        .json(
            new ApiResponse(200,
                allUser,
                "All user fetched"
            )
        )

})

const deleteUserController = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    console.log(userId, "UserID")
    if (!userId) {
        throw new ApiError(404, "User not found");
    }

    try {
        const user = await deleteUserService(userId);
        
        return res.status(200)
        .json(
            new ApiResponse(200,
                {},
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

    if(!userId){
        return new ApiError(404, "User not found");
    }

    if(!userdata){
        return new ApiError(404, "User data not found");
    }

    const user = await userUpdateService({userId, userdata});

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