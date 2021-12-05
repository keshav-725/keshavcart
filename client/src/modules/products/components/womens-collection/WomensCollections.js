import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {PRODUCT_FEATURE_KEY} from "../../../../redux/products/products.reducer";
import {getWomensCollection} from "../../../../redux/products/products.actions";
import Spinner from "../../../layout/components/spinner/Spinner";
import {Link, useHistory} from 'react-router-dom';
import {addToCart} from "../../../../redux/orders/orders.actions";

let WomensCollections = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    // get the products from REDUX Store
    let productInfo = useSelector((state) => {
        return state[PRODUCT_FEATURE_KEY];
    });

    let {products , loading} = productInfo;

    useEffect(() => {
        // dispatch an action to get women's collection when the page loads
        dispatch(getWomensCollection());
    }, [dispatch]);

    // clickAddToCart
    let clickAddToCart = (product) => {
        dispatch(addToCart(product , "1" , history));
    };

    return (
        <React.Fragment>
            <section className="p-3 bg-brains">
                <div className="container ">
                    <div className="row animated flipInY">
                        <div className="col">
                            <p className="h3">Women's Collection</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            products.length > 0 ?
                                <React.Fragment>
                                    <section className="mt-3">
                                        <div className="container">
                                            <div className="row ">
                                                {
                                                    products.map(product => {
                                                        return (
                                                            <div className="col-md-3" key={product._id}>
                                                                <div className="card animated zoomInLeft">
                                                                    <div className="card-header bg-white text-center">
                                                                        <Link to={`/products/${product._id}`}>
                                                                            <img src={product.image} alt="" className="img-fluid"/>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="card-body text-center">
                                                                        <ul className="list-group">
                                                                            <li className="list-group-item">
                                                                                <p className="h6">{product.name}</p>
                                                                            </li>
                                                                            <li className="list-group-item">
                                                                                <p className="h6">&#8377; {product.price}</p>
                                                                            </li>
                                                                        </ul>
                                                                        <button className="btn btn-brains btn-sm mt-2" onClick={clickAddToCart.bind(this, product)}>Add To Cart</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
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
export default WomensCollections;
