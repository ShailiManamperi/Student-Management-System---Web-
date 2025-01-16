import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../css/admin/course.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/templetes/Navbar";
import Sidebar from "../../components/templetes/SideBar";
import Footer from "../../components/PagesFooter";

const Invoice = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        courseID: "",
        courseName: "",
        fees: "",
        duration: "",
        btcount: "0",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const saveInvoice = async () => {
        console.log(formData);
        try {
            // Step 1: Create the invoice
            const courseResponse = await axios.post(
                "http://localhost:5000/api/admin/course",
                formData
            );
            const createdCourse = courseResponse.data.data;
            if (createdCourse) {
                clearFields();
                toast.success("Course saved successfully!");

                // Step 2: Refresh the courses list
                fetchCourses();
            }
        } catch (error) {
            // Enhanced error logging
            console.error("Error creating invoice and saving services:", error);

            if (error.response) {
                console.error("Error Response:", error.response);
                toast.error(
                    `Error: ${error.response.data.message || "Something went wrong"}`
                );
            } else {
                toast.error("Network error or server unreachable");
            }
        }
    };

    const clearFields = () => {
        setFormData({
            courseID: "",
            courseName: "",
            fees: "",
            duration: "",
            btcount: "0",
        });
    };

    // Function to fetch courses from the API
    const fetchCourses = () => {
        setLoading(true);
        axios
            .get("http://localhost:5000/api/admin/course")
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    setCourses(response.data.data);
                } else {
                    setError("Invalid response format. Expected an array.");
                }
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch courses.");
                setLoading(false);
                toast.error("Error fetching courses");
            });
    };

    // Fetch courses on component mount
    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="yks-invoice-page">
                {/* Breadcrumb Navigation */}
                <nav>
                    <p className="yks-profile-breadcrumb">
                        <span className="home">Home</span> /
                        <span className="contact"> Courses</span>
                    </p>
                </nav>
                {/* Page Title */}
                <div className="yks-head">
                    <h1>Courses</h1>
                </div>

                {/* Invoice Form Section */}
                <div className="yks-invoice-box">
                    <div className="yks-invoice-form">
                        <div className="yks-form-group">
                            <label htmlFor="courseID">Course ID</label>
                            <input
                                type="text"
                                id="courseID"
                                name="courseID"
                                className="yks-form-control"
                                value={formData.courseID}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="yks-form-group">
                            <label htmlFor="courseName">Course Name</label>
                            <input
                                type="text"
                                id="courseName"
                                name="courseName"
                                className="yks-form-control"
                                value={formData.courseName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="yks-form-group">
                            <label htmlFor="fees">Fees</label>
                            <input
                                type="text"
                                id="fees"
                                name="fees"
                                className="yks-form-control"
                                value={formData.fees}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="yks-form-group">
                            <label htmlFor="duration">Duration</label>
                            <input
                                type="text"
                                id="duration"
                                name="duration"
                                className="yks-form-control"
                                value={formData.duration}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="yks-button-group mt-4">
                    <button className="yks-save-btn" onClick={saveInvoice}>
                        Save Course
                    </button>
                </div>

                <div className="yks-head">
                    <h1>All Courses</h1>
                </div>
                <div className="yks-admin-invoice-table-container mt-1">
                    <table className="table table-bordered yks-admin-invoice-table">
                        <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Fees</th>
                            <th>Duration</th>
                            <th>Batch Count</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {courses.map((course) => (
                            <tr key={course.courseID}>
                                <td>{course.courseID}</td>
                                <td>{course.courseName}</td>
                                <td>{course.fees}</td>
                                <td>{course.duration}</td>
                                <td>{course.btcount}</td>
                                <td>
                                    <button className="yks-delete-btn">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Sidebar />
            <div className="container3">
                <Footer />
            </div>
        </div>
    );
};

export default Invoice;
