// src/utils/ApiError.test.js
import { ApiError } from '../../../src/utils/ApiError.js';  // Adjust the path accordingly

describe('ApiError', () => {
    it('should create an ApiError instance with default values', () => {
        const error = new ApiError(500);
        expect(error).toBeInstanceOf(ApiError);
        expect(error.statusCode).toBe(500);
        expect(error.message).toBe('Something went wrong');
        expect(error.errors).toEqual([]);
        expect(error.stack).toBeDefined(); // Should capture stack trace
    });

    it('should create an ApiError instance with a custom message', () => {
        const error = new ApiError(404, 'Not Found');
        expect(error).toBeInstanceOf(ApiError);
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe('Not Found');
        expect(error.errors).toEqual([]);
        expect(error.stack).toBeDefined(); // Should capture stack trace
    });

    it('should create an ApiError instance with custom errors', () => {
        const error = new ApiError(400, 'Validation Error', ['Field is required']);
        expect(error).toBeInstanceOf(ApiError);
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe('Validation Error');
        expect(error.errors).toEqual(['Field is required']);
        expect(error.stack).toBeDefined(); // Should capture stack trace
    });

    it('should create an ApiError instance with a custom stack trace', () => {
        const customStack = 'Custom stack trace';
        const error = new ApiError(500, 'Internal Server Error', [], customStack);
        expect(error.stack).toBe(customStack); // Custom stack should be used
    });

    it('should capture stack trace automatically if not provided', () => {
        const error = new ApiError(500, 'An error occurred');
        expect(error.stack).toBeDefined();
        expect(error.stack).not.toBe(''); // Ensure that the stack is not empty
    });
});
