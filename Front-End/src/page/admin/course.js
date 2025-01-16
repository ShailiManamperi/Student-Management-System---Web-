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
        try {
            const courseResponse = await axios.post(
                "http://localhost:5000/api/admin/course",
                formData
            );
            const createdCourse = courseResponse.data.data;
            if (createdCourse) {
                clearFields();
                toast.success("Course saved successfully!");
                fetchCourses();
            }
        } catch (error) {
            console.error("Error creating course:", error);
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };

    const updateInvoice = async () => {
        try {
            const courseResponse = await axios.put(
                "http://localhost:5000/api/admin/course",
                formData
            );
            if (courseResponse.status === 200) {
                toast.success("Course updated successfully!");
                fetchCourses(); // Refresh the course list
                clearFields();
            }
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };

    const handleDelete = async (courseID) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/course/${courseID}`);
                toast.success("Course deleted successfully.");
                fetchCourses(); // Refresh the course list after deletion
            } catch (error) {
                toast.error("Failed to delete course.");
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

    const fetchCourses = () => {
        setLoading(true);
        axios
            .get("http://localhost:5000/api/admin/course")
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    setCourses(response.data.data);
                } else {
                    setError("Invalid response format.");
                }
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch courses.");
                setLoading(false);
                toast.error("Error fetching courses");
            });
    };

    const handleRowClick = (course) => {
        setFormData({
            courseID: course.courseID,
            courseName: course.courseName,
            fees: course.fees,
            duration: course.duration,
            btcount: course.btcount || "0",
        });
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="yks-invoice-page">
                <nav>
                    <p className="yks-profile-breadcrumb">
                        <span className="home">Home</span> /
                        <span className="contact"> Courses</span>
                    </p>
                </nav>
                <div className="yks-head">
                    <h1>Courses</h1>
                </div>
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

                <div className="yks-button-group mt-3">
                    <button className="yks-save-btn" onClick={saveInvoice}>
                        Save Course
                    </button>
                    <button className="yks-update-btn" onClick={updateInvoice}>
                        Update Course
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
                            <tr
                                key={course.courseID}
                                onClick={() => handleRowClick(course)}
                                style={{ cursor: "pointer" }}
                            >
                                <td>{course.courseID}</td>
                                <td>{course.courseName}</td>
                                <td>{course.fees}</td>
                                <td>{course.duration}</td>
                                <td>{course.btcount}</td>
                                <td>
                                    <button
                                        className="yks-delete-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(course.courseID);
                                        }}
                                    >
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
