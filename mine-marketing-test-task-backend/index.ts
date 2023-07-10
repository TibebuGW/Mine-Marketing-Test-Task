import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoute';
import connectDB from './config/db';
import resultRoute from './routes/resultRoute';

// Connect to the MongoDB database through the function exported in config/db
connectDB();

// Create an Express app
const app = express();

// Apply middleware to handle cross origin resource sharing and JSON parsing
app.use(express.json());
app.use(cors());

// Instruct the app to use the authRoutes routes we created in /routes/authRoutes. This will handle routing
app.use('/api/auth', authRoutes);
app.use('/api/result', resultRoute)

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
