import React, {useEffect, useState} from "react";
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../../../redux/products/products.actions";
import {PRODUCT_FEATURE_KEY} from "../../../../redux/products/products.reducer";
import Spinner from "../../../layout/components/spinner/Spinner";
import {addToCart} from "../../../../redux/orders/orders.actions";

let ProductDetails = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    let productId = useParams().id;

    let [productQty , setProductQty] = useState("");
    let productInfo = useSelector((state) => {
        return state[PRODUCT_FEATURE_KEY];
    });

    let {selectedProduct , loading} = productInfo;

    useEffect(() => {
        dispatch(getProduct(productId));
    }, [productId]);

    // clickAddToCart
    let clickAddToCart = () => {
        // dispatch an action selectedProduct , qty , history
        dispatch(addToCart(selectedProduct , productQty , history));
    };

    return (
        <React.Fragment>
            <section className="p-3 bg-brains">
                <div className="container ">
                    <div className="row animated flipInY">
                        <div className="col">
                            <p className="h3">Product Details</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            Object.keys(selectedProduct).length > 0 ?
                                <React.Fragment>
                                    <section className="p-3 mt-3">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-5 text-center">
                                                    <img src={selectedProduct.image} alt="" className="img-fluid"/>
                                                </div>
                                                <div className="col-md-7">
                                                    <p className="h4">{selectedProduct.name}</p>
                                                    <small>Brand : {selectedProduct.brand}</small>
                                                    <p className="h5">&#8377; {selectedProduct.price}</p>
                                                    <form className="form-inline">
                                                        <div className="form-group">
                                                            <select
                                                                value={productQty}
                                                                onChange={(e) => setProductQty(e.target.value)}
                                                                className="form-control">
                                                                <option value="">Select Qty</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div>
                                                   </form>
                                                    <div>
                                                        <button className="btn btn-brains text-dark btn-sm mt-2" onClick={clickAddToCart}>Add to Cart</button>
                                                    </div>
                                                    <p>{selectedProduct.description}</p>
                                                    <p>{selectedProduct.usage}</p>
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
export default ProductDetails;
