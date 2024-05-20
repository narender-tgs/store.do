import { connect } from 'react-redux';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '../components/common/ALink';

// import { actions as WishlistAction } from "../../store/wishlist";
// import { actions as CartAction } from "../../store/cart";
// import { actions as ModalAction } from "../../store/modal";

function Thankyou(props) {
    const { wishlist, addToCart, removeFromWishlist, showQuickView } = props;
    const [flag, setFlag] = useState(0);

    const onMoveFromToWishlit = (e, item) => {
        setFlag(2);
        e.preventDefault();
        addToCart(item);
        removeFromWishlist(item);
    }

    const removeProduct = (e, item) => {
        setFlag(1);
        e.preventDefault();
        removeFromWishlist(item);
    }

    const onQuickViewClick = (e, product) => {
        e.preventDefault();
        showQuickView(product.slug);
    }

    return (
        <main className="main">
            <div className="page-header">
                <div className="container d-flex flex-column align-items-center">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container">
                            {/* <ol className="breadcrumb">
                                <li className="breadcrumb-item"><ALink href="/">Home</ALink></li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Wishlist
                                </li>
                            </ol> */}
                        </div>
                    </nav>

                    <h1>Thankyou...</h1>
                </div>
            </div>

            <div className="container">
                <div className="success-alert">
                    {
                        flag === 1 ? <p>Product successfully removed.</p> : ''
                    }
                    {
                        flag === 2 ? <p>Product added to cart successfully.</p> : ''
                    }
                </div>
                <div className="wishlist-title" style={{textAlign:'center'}}>
                    <h2>  Thank You for Your Order!</h2>


                    <p>
                        Your order has been successfully placed. We're excited to get your purchase on its way to you.

                        If you have any questions or need to make changes, feel free to reach out. Keep an eye on your inbox for updates and tracking information.

                        Thanks again for choosing us!</p>
                </div>

                <div className="wishlist-table-container">
                    <div className="table table-wishlist mb-0">
                        <div className="wishlist-empty-page text-center">
                            <i className="far fa-heart"></i>
                            <p>Thanks for visiting Store.Do</p>
                            <ALink href="/" className="btn btn-dark btn-add-cart product-type-simple btn-shop font1 w-auto">
                                continue shopping </ALink>
                        </div>
                    </div>
                </div>



            </div>
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        wishlist: state.wishlist.list ? state.wishlist.list : []
    }
}

export default Thankyou;