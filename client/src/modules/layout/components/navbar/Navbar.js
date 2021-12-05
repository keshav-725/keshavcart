import React from "react";
import {Link, useHistory} from 'react-router-dom';
import brandImage from '../../../../assets/img/brandname.png';
import {useDispatch, useSelector} from "react-redux";
import {USER_FEATURE_KEY} from "../../../../redux/users/users.reducers";
import {logOut} from "../../../../redux/users/users.actions";
import {ORDER_FEATURE_KEY} from "../../../../redux/orders/orders.reducer";

let Navbar = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    let userInfo = useSelector((state) => {
        return state[USER_FEATURE_KEY];
    });

    let cartInfo = useSelector((state) => {
        return state[ORDER_FEATURE_KEY];
    });

    let {cartItems} = cartInfo;

    let {isAuthenticated , loading , user} = userInfo;

    // logOutUser
    let logOutUser = () => {
        dispatch(logOut(history));
    };

    let beforeLinks = (
        <React.Fragment>
            <li className="nav-item">
                <Link to='/users/login' className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
                <Link to='/users/register' className="nav-link">Register</Link>
            </li>
        </React.Fragment>
    );

    let afterLinks = (
        <React.Fragment>
            {
                user ? <li className="nav-item">
                    <Link to='/users/profile' className="nav-link">
                        <img src={user.avatar} alt="" width="20" height="20" className="rounded-circle"/>
                         &nbsp;{user.name}</Link>
                </li> : null
            }
            <li className="nav-item">
                <Link to='#!' onClick={logOutUser} className="nav-link">Logout</Link>
            </li>
        </React.Fragment>
    );



    return (
        <React.Fragment>
            <nav className="navbar navbar-dark bg-dark navbar-expand">
                <div className="container">
                    <Link to='/' className="navbar-brand">
                        <img src={brandImage} alt="" width="120" height="35"/>
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/products/men" className="nav-link">Men's Wear</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products/kids" className="nav-link">kid's Wear</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products/women" className="nav-link">Women's Wear</Link>
                            </li>
                            <li className="nav-item">
                                {
                                    user && user.isAdmin &&
                                    <Link to="/products/upload" className="nav-link">Upload</Link>
                                }
                            </li>
                            <li className="nav-item">
                                <Link to="/orders/cart" className="nav-link">
                                    <i className="fa fa-shopping-cart"/>
                                    <span className="badge badge-success">{cartItems.length}</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                {
                                    user && <Link to="/orders/list" className="nav-link">Order List</Link>
                                }
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {
                                !loading &&
                                <React.Fragment>
                                    {
                                        !isAuthenticated ? beforeLinks : afterLinks
                                    }
                                </React.Fragment>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
};
export default Navbar;
