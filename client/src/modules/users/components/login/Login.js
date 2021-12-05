import React, {useState} from "react";
import brandImage from '../../../../assets/img/brandname.png';
import {useDispatch} from "react-redux";
import {Link , useHistory} from 'react-router-dom';
import {loginUser} from "../../../../redux/users/users.actions";

let Login = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    let [user, setUser] = useState({
        email : '',
        password : ''
    });

    let [userError , setUserError] = useState({
        emailError : null,
        passwordError : null
    });

    // handle Email
    let handleEmail = (e) => {
        setUser({...user, email : e.target.value});
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        if(regExp.test(e.target.value)){
            setUserError({...userError , emailError : ''});
        }
        else{
            setUserError({...userError , emailError : 'Enter a proper Email'});
        }
    };

    // handle password
    let handlePassword = (e) => {
        setUser({...user, password : e.target.value});
        let regExp = /^[A-Za-z]\w{7,14}$/;
        if(regExp.test(e.target.value)){
            setUserError({...userError , passwordError : ''});
        }
        else{
            setUserError({...userError , passwordError : 'Enter a proper Password'});
        }
    };

    // submitLogin
    let submitLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(user,history));
    };

    return (
        <React.Fragment>
            <section className="p-3 bg-brains">
                <div className="container ">
                    <div className="row animated flipInY">
                        <div className="col">
                            <p className="h3">
                                <i className="fa fa-sign-in-alt"/> Login Here</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 m-auto">
                            <div className="card animated jello">
                                <div className="card-header bg-dark text-brains">
                                    <p className="h4">Login Here</p>
                                </div>
                                <div className="card-body bg-brains">
                                    <form onSubmit={submitLogin}>
                                        <div className="form-group">
                                            <input
                                                name="email"
                                                value={user.email}
                                                onChange={handleEmail}
                                                type="email" className={`form-control ${userError.emailError ? 'is-invalid' : ''}`} placeholder="Email"/>
                                            {
                                                userError.emailError ? <small className="text-danger">{userError.emailError}</small> : null
                                            }
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="password"
                                                value={user.password}
                                                onChange={handlePassword}
                                                type="password" className={`form-control ${userError.passwordError ? 'is-invalid' : ''}`} placeholder="Password"/>
                                            {
                                                userError.passwordError ? <small className="text-danger">{userError.passwordError}</small> : null
                                            }
                                        </div>
                                            <input type="submit" className="btn btn-dark text-brains btn-sm" value="Login"/>
                                    </form>
                                    <small className="font-weight-bold">Don't have an account ?
                                        <Link to='/users/register'> Register</Link>
                                    </small>
                                </div>
                                <div className="card-footer text-center bg-brains">
                                    <img src={brandImage} alt="" width="180" height="35"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};
export default Login;
