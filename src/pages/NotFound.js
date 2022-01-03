import React from 'react';
import { Link } from 'react-router-dom'

function NotFound() {
    return ( 
        <div>
            <h1 style={{color: "red"}}>Error! Page not found </h1>
            <Link className="nav-link" to="/">Go back Home</Link>
        </div>
    );
}

export default NotFound;