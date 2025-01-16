import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import adminRoutes from './Routes/AdminRoutes.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(bodyParser.json());

// Route
app.use('/api/admin', adminRoutes);


// Default route
app.get('/', (req, res) => {
    res.send('Student Management System API is running.');
});

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

