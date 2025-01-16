import express from "express";
import db from "../utils/db.js";

const router = express.Router();

// Save Course
router.post("/course", async (req, res) => {
    const  sql = `INSERT INTO courses (courseID,courseName,fees,duration,btcount) VALUES (?,?,?,?,?)`;
    const {courseID,courseName,fees,duration,btcount} = req.body;
    const values = [courseID,courseName,fees,duration,btcount];
    try {
        const [result] = await db.query(sql, values);
        res.status(200).json({
            message: 'Course added successfully.',
            data: result
        });
    } catch (err) {
        console.error('Error adding Course:', err);
        res.status(500).json({
            message: 'Failed to add Course.',
            error: err.message
        });
    }

});

// Get all courses
router.get("/course", async (req, res) => {
    try {
        const sql = "SELECT * FROM courses";
        const [data] = await db.query(sql); // Use await for the promise-based query
        console.log("Query successful, sending data:", data);

        // Return the data inside a 'data' key
        return res.json({
            success: true,
            message: "Courses retrieved successfully.",
            data: data,
        });
    } catch (err) {
        console.error("Error executing query:", err.message);
        return res.status(500).json({ error: "Database query failed" });
    }
});


export default router;
