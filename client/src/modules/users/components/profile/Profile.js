import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo, updateUserAddress} from "../../../../redux/users/users.actions";
import {USER_FEATURE_KEY} from "../../../../redux/users/users.reducers";
import Spinner from "../../../layout/components/spinner/Spinner";
import Register from "../register/Register";


let Profile = () => {
    let [address , setAddress] = useState({
        flat : '',
        street : '',
        landmark : '',
        city : '',
        state : '',
        country : '',
        pin : '',
        mobile : ''
    });
    let [enableAddress , setEnableAddress] = useState(false);

    let dispatch = useDispatch();
    let userInfo = useSelector((state) => {
        return state[USER_FEATURE_KEY];
    });

    let {user , loading} = userInfo;

    useEffect(() => {
        if(user !== null && user.address !== null){
            setAddress(user.address);
        }
    }, [user]);

    // submitUpdateAddress
    let submitUpdateAddress = (event) => {
        event.preventDefault();
        setEnableAddress(false);
        dispatch(updateUserAddress(address));
    };
    return (
        <React.Fragment>
            {/*<pre>{JSON.stringify(address)}</pre>*/}
            <section className="p-3 bg-brains">
                <div className="container ">
                    <div className="row animated flipInY">
                        <div className="col">
                            <p className="h3">
                                <i className="fa fa-user-circle"/> Your Profile</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            user !== null && Object.keys(user).length !== 0 ?
                                <React.Fragment>
                                    <section className="mt-3">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-4 text-center animated zoomIn">
                                                    <img src={user.avatar} alt="" className="img-fluid img-thumbnail rounded-circle"/>
                                                </div>
                                                <div className="col-md-8 animated zoomInLeft">
                                                    <div className="card">
                                                        <div className="card-header bg-dark text-brains">
                                                            <p className="h4">Your Details</p>
                                                        </div>
                                                        <div className="card-body bg-brains">
                                                            <ul className="list-group">
                                                                <li className="list-group-item">
                                                                    NAME : {user.name}
                                                                </li>
                                                                <li className="list-group-item">
                                                                    EMAIL : {user.email}
                                                                </li>
                                                                <li className="list-group-item">
                                                                    MOBILE : {user.address?.mobile}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="card mt-3">
                                                        <div className="card-header bg-dark text-brains">
                                                            <span className="h4">Update Address</span>
                                                            <div className="custom-control custom-switch float-right">
                                                                <input
                                                                    onChange={e => setEnableAddress(e.target.checked)}
                                                                    type="checkbox" className="custom-control-input"
                                                                       id="customSwitch1"/>
                                                                    <label className="custom-control-label"
                                                                           htmlFor="customSwitch1">Enable Address</label>
                                                            </div>
                                                        </div>
                                                        <div className="card-body bg-brains">
                                                            {
                                                                enableAddress ? <React.Fragment>
                                                                    <form onSubmit={submitUpdateAddress}>
                                                                        <div className="input-group mb-3">
                                                                            <div className="input-group-prepend">
                                                                                <span className="input-group-text bg-dark text-brains">Flat</span>
                                                                            </div>
                                                                            <input type="text"
                                                                                   value={address?.flat}
                                                                                   onChange={e => setAddress({...address , flat : e.target.value})}
                                                                                   className="form-control"/>
                                                                        </div>
                                                                        <div className="input-group mb-3">
                                                                            <div className="input-group-prepend">
                                                                                <span className="input-group-text bg-dark text-brains">Street</span>
                                                                            </div>
                                                                            <input
                                                                                value={address?.street}
                                                                                onChange={e => setAddress({...address , street : e.target.value})}
                                                                                type="text" className="form-control"/>
                                                                        </div>
                                                                        <div className="input-group mb-3">
                                                                            <div className="input-group-prepend">
                                                                                <span className="input-group-text bg-dark text-brains">Landmark</span>
                                                                            </div>
                                                                            <input
                                                                                value={address?.landmark}
                                                                                onChange={e => setAddress({...address , landmark : e.target.value})}
                                                                                type="text" className="form-control"/>
                                                                        </div>
                                                                        <div className="input-group mb-3">
                                                                            <div className="input-group-prepend">
                                                                                <span className="input-group-text bg-dark text-brains">City</span>
                                                                            </div>
                                                                            <input
                                                                                value={address?.city}
                                                                                onChange={e => setAddress({...address , city : e.target.value})}
                                                                                type="text" className="form-control"/>
                                                                        </div>
                                                                        <div className="input-group mb-3">
                                                                            <div className="input-group-prepend">
                                                                                <span className="input-group-text bg-dark text-brains">State</span>
                                                                            </div>
                                                                            <input
                                                                                value={address?.state}
                                                                                onChange={e => setAddress({...address , state : e.target.value})}
                                                                                type="text" className="form-control"/>
                                                                        </div>
                                                                        <div className="input-group mb-3">
                                                                            <div className="input-group-prepend">
                                                                                <span className="input-group-text bg-dark text-brains">Country</span>
                                                                            </div>
                                                                            <input
                                                                                value={address?.country}
                                                                                onChange={e => setAddress({...address , country : e.target.value})}
                                                                                type="text" className="form-control"/>
                                                                        </div>
                                                                        <div className="input-group mb-3">
                                                                            <div className="input-group-prepend">
                                                                                <span className="input-group-text bg-dark text-brains">Pin Code</span>
                                                                            </div>
                                                                            <input
                                                                                    value={address?.pin}
                                                                                    onChange={e => setAddress({...address , pin : e.target.value})}
                                                                                    type="text" className="form-control"/>
                                                                        </div>
                                                                        <div className="input-group mb-3">
                                                                            <div className="input-group-prepend">
                                                                                <span className="input-group-text bg-dark text-brains">Mobile</span>
                                                                            </div>
                                                                            <input
                                                                                value={address?.mobile}
                                                                                onChange={e => setAddress({...address , mobile : e.target.value})}
                                                                                type="text" className="form-control"/>
                                                                        </div>
                                                                        <div>
                                                                            <input type="submit" value="Update Address" className="btn btn-dark btn-sm text-brains"/>
                                                                        </div>
                                                                    </form>
                                                                </React.Fragment> :
                                                                    <React.Fragment>
                                                                        <ul className="list-group">
                                                                            <li className="list-group-item">
                                                                                Flat : {user.address?.flat}
                                                                            </li>
                                                                            <li className="list-group-item ">
                                                                                Street : {user.address?.street}
                                                                            </li>
                                                                            <li className="list-group-item ">
                                                                                Landmark : {user.address?.landmark}
                                                                            </li>
                                                                            <li className="list-group-item ">
                                                                                City : {user.address?.city}
                                                                            </li>
                                                                            <li className="list-group-item ">
                                                                                State : {user.address?.state}
                                                                            </li>
                                                                            <li className="list-group-item ">
                                                                                Country : {user.address?.country}
                                                                            </li>
                                                                            <li className="list-group-item ">
                                                                                PinCode : {user.address?.pin}
                                                                            </li>
                                                                            <li className="list-group-item ">
                                                                                Mobile : {user.address?.mobile}
                                                                            </li>
                                                                        </ul>
                                                                    </React.Fragment>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </React.Fragment> : null
                        }
                    </React.Fragment>
            }
        </React.Fragment>
    );
};
export default Profile;
