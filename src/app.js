// import cookieParser from 'cookie-parser';
// import express from 'express';
// import ApiError from './common/utils/api-error.js';
// import authRoute from './modules/auth/auth.route.js';

// const app = express();

// app.use(express.json())
// app.use(express.urlencoded({extended : true}))
// app.use(cookieParser())



// app.use('/api/auth' , authRoute)
// // app.get('/api/start' , (req, res) => {
// //     res.status(200).json({message : "new post "})
// // })

// // Catch-all for undefined routes
// app.all("{*path}", (req, res) => {
//     throw ApiError.notFound(`Route ${req.originalUrl} not found`);
// });

// export default app 

import cookieParser from 'cookie-parser';
import express from 'express';
import ApiError from './common/utils/api-error.js';
import authRoute from './modules/auth/auth.route.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoute);

// Catch-all for undefined routes 
app.all("{*path}", (req, res, next) => {
    next(ApiError.notFound(`Route ${req.originalUrl} not found`));
});

// Global Error Handler 
// app.use((err, req, res, next) => {    

//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Internal Server Error";

//     res.status(statusCode).json({
//         success: false,
//         statusCode: statusCode,
//         message: message,
//         stack: process.env.NODE_ENV === "development" ? err.stack : undefined
//     });
// });

export default app;