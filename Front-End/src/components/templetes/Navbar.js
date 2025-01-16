import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is imported
import logo from '../../assets/logo1.jpg';
import user from '../../assets/user.png';
import arrow from '../../assets/arrow.png';


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
            style={{ width: '40px', height: '40px' , borderRadius:'20px'}}
            className="me-2"
          />
          <span
            className=" text-white fs-6 fs-md-4"
            style={{ lineHeight: '1.2' }}
          >
            The U-Dot Information
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="navbar-nav d-flex flex-row justify-content-center justify-content-lg-end w-auto mt-2 mt-lg-0 " style={{}}>
          <li className="nav-item">
                <a className="nav-link text-white me-2" href="#"><img src={user} alt="user" style={{ width: '37px',paddingRight: '9px',marginRight: '5px' }}/><img src={arrow} alt="user" style={{ width: '15px' }}/></a>
              </li>
        </ul>
      </div>
    </div>
  </nav>
</div>

  );
}


