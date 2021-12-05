import React from "react";
import {Link} from 'react-router-dom';

let Home = () => {
    return (
        <React.Fragment>
            <div className="landing-page">
                <div className="wrapper">
                    <div className="d-flex flex-column text-center justify-content-center align-items-center h-100">
                        <h3 className="display-3 animated slideInDown">Welcome to Keshavcart</h3>
                        <p className="lead px-3 animated slideInUp">Keshavcart provide you with all your needs.It's a one stop destination where you can find everything you need starting from fashion to daily need and many more....</p>
                        <Link to="/products/men" className="btn btn-brains btn-sm animated zoomIn">Shop Now</Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Home;
