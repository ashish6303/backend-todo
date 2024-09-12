import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";


const createUser = async ({ username, email }) => {
    // Create a new user
    const user = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase()
    });
    return user;
};

const findUserByEmailandUsername = async ({ username, email }) => {
    // Check if a user with the same username or email already exists
    return await User.findOne({
        $or: [{ username }, { email }]
    });
};

const registerUser = async ({ username, email }) => {
    if (!username || !email) {
        throw new ApiError(400, "All fields are required");
    }

    // Check for existing user
    const existedUser = await findUserByEmailandUsername({ username, email });

    if (existedUser) {
        throw new ApiError(409, "Username or email already exists");
    }

    // Create new user
    try {
        const user = await createUser({ username, email });
        if (!user) {
            throw new ApiError(500, "User creation failed");
        }
    
        // Extract relevant fields and log them
        const { username: createdUsername, email: createdEmail } = user;
    
        // Return only the relevant fields
        return { username: createdUsername, email: createdEmail };
    } catch (error) {
        throw new ApiError(500, "Something went wrong");
    }
};

// This is an to create a user 
const getAllUser = async () => {
    const allUser = await User.find({}).exec();
    return allUser;
};

// Delete user 
const deleteUserService = async (userId) => {
    const result = await User.deleteOne({ _id: userId });
    return result.deletedCount > 0;
}

// This is for update the user details 
const userUpdateService = async ({ userId, userdata }) => {
    try {
        const user = await User.findByIdAndUpdate(
            userId, 
            userdata, 
            {
                new: true, 
                runValidators: false 
            }
        );

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        return user;
    } catch (error) {
        // Log the error for debugging
        console.error(error);

        // Throw a custom error
        throw new ApiError(500, "Something went wrong");
    }
};


export { registerUser, getAllUser, deleteUserService, userUpdateService };
