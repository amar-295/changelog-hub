import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
// app.use(express.static("public"))
app.use(cookieParser());

// routes import
import userRouter from './routes/user.routes.js';
import releaseRouter from './routes/release.routes.js';
import publicRouter from './routes/public.routes.js';
import subscriberRouter from './routes/subscriber.routes.js';
import workspaceRouter from './routes/workspace.routes.js';

// routes declaration
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/releases', releaseRouter);
app.use('/api/v1/public', publicRouter);
app.use('/api/v1/subscribers', subscriberRouter);
app.use('/api/v1/workspaces', workspaceRouter);

app.get('/', (req, res) => {
  res.send(`Server is running`);
});

// 404 handler
// eslint-disable-next-line no-unused-vars
app.use((req, res, _next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Route ${req.originalUrl} not found`,
    errors: [],
  });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err.errors || [],
  });
});

export default app;
