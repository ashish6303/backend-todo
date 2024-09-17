import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Comprehensive API documentation for the Express application, including endpoints for user management and TODO task management. This documentation provides details on all available API routes, their expected parameters, request bodies, responses, and potential error messages. It is designed to help developers understand and integrate with the backend services efficiently.',
        },
        servers: [
            {
                url: 'http://localhost:8002/api/v1/user',
            },
        ],
    },
    apis: [
        './docs/apis/**/*.js',
        './docs/schemas/**/*.js'
    ]
};

const specs = swaggerJsdoc(options);
export default specs;
