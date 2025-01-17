import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is imported
import logo from '../../assets/logo1.jpg';



export default function Navbar() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{ backgroundColor: '#0a1f23', color: '#ffffff'}}
      >
        <div className="container-fluid">
          {/* Logo and Branding */}
          <div className="d-flex align-items-center flex-wrap flex-lg-nowrap w-100">
            <div className="d-flex align-items-center flex-grow-1">
              <img
                src={logo}
                alt="Logo"
                style={{ width: '40px', height: '40px' , borderRadius:'20px' }}
                className="me-2"
              />
              <span
                className=" text-white fs-6 fs-md-4"
                style={{ lineHeight: '1.2' }}
              >
                The U-Dot Information
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
