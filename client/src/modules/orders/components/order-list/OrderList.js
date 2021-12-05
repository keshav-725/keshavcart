import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllOrders} from "../../../../redux/orders/orders.actions";
import {ORDER_FEATURE_KEY} from "../../../../redux/orders/orders.reducer";
import Spinner from "../../../layout/components/spinner/Spinner";

let OrderList = () => {
    let dispatch = useDispatch();

    let orderInfo = useSelector((state) => {
        return state[ORDER_FEATURE_KEY];
    });

    let {orders , loading} = orderInfo;


    useEffect(() => {
        dispatch(getAllOrders());
    }, []);


    return (
        <React.Fragment>
            <section className="p-3 bg-brains">
                <div className="container ">
                    <div className="row animated flipInY">
                        <div className="col">
                            <p className="h3">
                                <i className="fa fa-list"/> Orders List</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            orders.length > 0 ? <React.Fragment>
                                    <div className="container-fluid mt-3">
                                        <div className="row">
                                            <div className="col">
                                                <table className="table table-hover table-striped bg-brains text-center">
                                                    <thead className="bg-dark text-white">
                                                        <tr>
                                                            <th>Order ID</th>
                                                            <th>NAME</th>
                                                            <th>EMAIL</th>
                                                            <th>MOBILE</th>
                                                            <th>ITEMS</th>
                                                            <th>TOTAL</th>
                                                            <th>DATE</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        orders.length > 0 ? <React.Fragment>
                                                            {
                                                                orders.map(order => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{order._id}</td>
                                                                            <td>{order.name}</td>
                                                                            <td>{order.email}</td>
                                                                            <td>{order.mobile}</td>
                                                                            <td>
                                                                                <ul className="list-group">
                                                                                    {
                                                                                        order.items.map(item => {
                                                                                            return (
                                                                                                <React.Fragment>
                                                                                                    <li className="list-group-item">
                                                                                                        NAME : {item.name} {" "}
                                                                                                        Qty : {item.qty} {" "}
                                                                                                        Price : {item.price} {" "}
                                                                                                    </li>
                                                                                                </React.Fragment>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </ul>
                                                                            </td>
                                                                            <td>&#8377;{(order.total + order.tax).toFixed(2)}</td>
                                                                            <td>{new Date(order.created).toLocaleString()}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </React.Fragment> : null
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment> :
                               <React.Fragment>
                                   <p className="h3 text-center text-brains">------------ No Orders Found ----------</p>
                               </React.Fragment>
                        }
                    </React.Fragment>
            }
        </React.Fragment>
    );
};
export default OrderList;
