import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js'; // Adjust the path as needed
import todoRoutes from './routes/todo.route.js'; // Adjust the path as needed
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swaggerOptions.js';

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({extended : true , limit : "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/user', todoRoutes);

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export {app}