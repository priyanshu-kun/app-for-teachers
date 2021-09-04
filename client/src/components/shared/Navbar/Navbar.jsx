import React from 'react';
import style from "./Navbar.module.css"
import { Link } from "react-router-dom";

function Navbar() {
    const brandStyle = {
        color: "#fff",
        textDecoration: "none",
        fontSize: "18px",
        
        display: "flex",
        alignItems: "center",
    }
    const logoText = {
        marginLeft: "3px"
    }
    return (
        <nav className={`container ${style.navbar}`}>
            <Link style={brandStyle} to="/">
                <span>👋</span><span style={logoText}>forTeachers</span>
            </Link>
        </nav>
    );
}

export default Navbar;