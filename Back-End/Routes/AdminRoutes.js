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

// Update course
router.put("/course", async (req, res) => {
    const sql = `UPDATE courses SET courseName = ?, fees = ?, duration = ?, btcount = ? WHERE courseID = ?`;
    const { courseID, courseName, fees, duration, btcount } = req.body;
    const values = [courseName, fees, duration, btcount, courseID];

    try {
        const [result] = await db.query(sql, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Course not found. Update failed.",
            });
        }
        res.status(200).json({
            message: "Course updated successfully.",
            data: result,
        });
    } catch (err) {
        console.error("Error updating Course:", err);
        res.status(500).json({
            message: "Failed to update Course.",
            error: err.message,
        });
    }
});
// Delete Course
router.delete("/course/:id", async (req, res) => {
    const courseID = req.params.id;
    console.log("DELETE /course/:id called with ID:", courseID);

    const sql = "DELETE FROM courses WHERE courseID = ?";

    try {
        // Execute the delete query and destructure the result
        const [result] = await db.query(sql, [courseID]);

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            data: { invoiceID: courseID },
        });
    } catch (err) {
        console.error("Error deleting Course:", err.message);

        // Respond with error details
        return res.status(500).json({
            success: false,
            message: "Error deleting Course from database",
            details: err.message,
        });
    }
});


export default router;
