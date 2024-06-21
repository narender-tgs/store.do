// import { connect } from "react-redux";
import { useEffect } from "react";
import SlideToggle from "react-slide-toggle";
import ALink from "../../components/common/ALink";
import { getCartTotal } from "../../utils";
import axios from "axios";
import { useSelector } from "react-redux";
import { getCartDetails } from "../../store/cart/cartDetailsSlice";
import { toast } from "react-toastify";
import validator from "validator";
import Payment from "../Payment";
import "react-toastify/dist/ReactToastify.min.css";
import { useState } from "react";
import { getStoreDetails } from "../../store/cart/storeData/storeDetailsSlice";
import { ClipLoader } from "react-spinners";
function CheckOut() {
  const cartDetails = useSelector(getCartDetails);
  const [subtotal, setSubTotal] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderAmount, setOrderAmount] = useState();
  const [orderCurrency, setOrderCurrency] = useState();
  const [orderId, setOrderId] = useState();
  const [orderGuid, setOrderGuid] = useState();
  const [storeGuid, setStoreGuid] = useState();
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const cartList = cartDetails.cartData.data;

  const storeDetails = useSelector(getStoreDetails);
  const paymentMethods = storeDetails?.storeDetails?.paymentMethods;

  useEffect(() => {
    let totalPrice = 0;
    if (cartList && cartList.length > 0) {
      console.log('cart list items to show' , cartList);
      setStoreGuid(cartList[0]?.store_guid);
      cartList.forEach((element) => {
        totalPrice = totalPrice + element.price * element.qty;
      });
      setSubTotal(totalPrice);
    }
  }, []);

  const apiUrl = "http://localhost:3000/v1/order";

  const [formData, setFormData] = useState({
    firstName: "",
    
    lastName: "",
    email: "",
    phoneNumber: "",
    shipping_street: "",
    shipping_street2: "",
    shipping_city: "",
    shipping_state: "",
    shipping_postalCode: "",
    shipping_country: "",
    billing_street: "",
    billing_street2: "",
    billing_city: "",
    billing_state: "",
    billing_postalCode: "",
    billing_country: "",
    paymentMethod: "",
    companyName: "",
    // Add other fields here as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    let errors = {};
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (key === "firstName") {
          errors[key] = validator.isEmpty(value)
            ? `First Name is required`
            : "";
        } else if (key === "lastName") {
          errors[key] = validator.isEmpty(value) ? `Last Name is required` : "";
        } else if (key === "email") {
          errors[key] = validator.isEmpty(value)
            ? "Email is required"
            : !validator.isLength(value, { min: 0, max: 1000 })
              ? `Character Length Exceeded`
              : "";
        } else if (key === "phoneNumber") {
          errors[key] = validator.isEmpty(value)
            ? "Phone Number is required"
            : !validator.isLength(value, { min: 0, max: 1000 })
              ? `Character Length Exceeded`
              : "";
        } else if (key === "shipping_street") {
          errors[key] = validator.isEmpty(value)
            ? "Address Line 1 is required"
            : !validator.isLength(value, { min: 0, max: 1000 })
              ? `Character Length Exceeded`
              : "";
        } else if (key === "shipping_street2") {
          errors[key] = validator.isEmpty(value)
            ? "Address Line 2 is required"
            : !validator.isLength(value, { min: 0, max: 1000 })
              ? `Character Length Exceeded`
              : "";
        } else if (key === "shipping_city") {
          errors[key] = validator.isEmpty(value)
            ? "City is required"
            : !validator.isLength(value, { min: 0, max: 1000 })
              ? `Character Length Exceeded`
              : "";
        } else if (key === "shipping_state") {
          errors[key] = validator.isEmpty(value)
            ? "State is required"
            : !validator.isLength(value, { min: 0, max: 1000 })
              ? `Character Length Exceeded`
              : "";
        } else if (key === "shipping_postalCode") {
          errors[key] = validator.isEmpty(value)
            ? "Postal Code is required"
            : !validator.isLength(value, { min: 0, max: 1000 })
              ? `Character Length Exceeded`
              : "";
        } else if (key === "shipping_country") {
          errors[key] = validator.isEmpty(value)
            ? "Country is required"
            : !validator.isLength(value, { min: 0, max: 1000 })
              ? `Character Length Exceeded`
              : "";
        } else if (key === "companyName") {
          errors[key] = validator.isEmpty(value)
            ? "Company Name is required"
            : !validator.isLength(value, { min: 0, max: 1000 })
              ? `Character Length Exceeded`
              : "";
        }
      }
    }

    setValidationErrors(errors);

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (
      hasErrors ||
      !paymentMethod ||
      paymentMethod === null ||
      paymentMethod === ""
    ) {
      toast.warning(
        "please fill the shipping  details and select any payment method before placing order!",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000, // Adjust the duration the toast stays visible (in milliseconds)
          hideProgressBar: false, // Set to true to hide the progress bar
          closeOnClick: true, // Set to false to disable close on click
          pauseOnHover: true, // Set to false to disable pause on hover
          draggable: true, // Set to false to disable dragging
          progress: undefined, // Set a custom progress indicator (e.g., progress: <Element>)
          className: "custom-toast", // Add a custom CSS class for styling
          bodyClassName: "custom-toast-body", // Add a custom CSS class for the toast body
          closeButton: false,
          style: { wordWrap: "break-word", padding: "20px" }, // Set to true to show a close button
          // Set a custom transition effect
        },
      );
      //   return;
    } else {
      setIsOrderCreated(true);
      // showSuccessToast()
    }

    // const products_list = cartList.map((pro) => {
    //   return {
    //     product_guid: pro.guid,
    //     quantity: pro.qty,
    //     price: pro.price,
    //     variants: pro.variants,
    //     // variation:[ {RAM , guid} , {Storage , guid}]
    //   };
    // });
    
  //   const products_list = cartList.map(item => ({
  //     product_guid: item.guid,
  //     quantity: item.qty,
  //     price: item.variants.Price || item.price,
  //     variants: {
  //         variant_sf_id: item.variants.variant_sf_id,
  //         option_value: item.variants.option_value
  //     }
  // }));
 const products_list = cartList.map(item => {
    if (item.variants === null) {
        return {
            option_value: item.name,
            option_price: item.price,
            variant_sf_id: item.sf_id,
            
        };
    } else {
        return {
            product_guid: item.guid,
            quantity: item.qty,
            price: item.variants.Price || '',
            variants: {
                variant_sf_id: item.variants.variant_sf_id,
                option_value: item.variants.option_value,
                option_price: item.variants.Price || ''
            }
        };
    }
});


    // Here you can access formData and proceed with your logic

    let orderData = {
      order: {
        store_guid: storeGuid,
        customer_guid:localStorage.getItem('loginToken') || '',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        companyName: formData.companyName,
        phoneNumber: {
          countryCode: +1,
          number: formData.phoneNumber,
        },
        products: products_list,
        // totalAmount: getCartTotal(cartList),
        totalAmount: subtotal,
        shippingAddress: {
          shipping_street: formData.shipping_street,
          shipping_street2: formData.shipping_street2,
          shipping_city: formData.shipping_city,
          shipping_state: formData.shipping_state,
          shipping_postalCode: formData.shipping_postalCode,
          shipping_country: formData.shipping_country,
        },
        billingAddress: {
          billing_street: "",
          billing_street2: "",
          billing_city: "",
          billing_state: "",
          billing_postalCode: "",
          billing_country: "",
        },
        paymentMethod: paymentMethod,
      },
    };

    axios
      .post(apiUrl, orderData, { headers: { service_ref: "8xuf4dev" } })
      .then((response) => {
        if (response?.data?.success === true) {
          setOrderId(response?.data?.data?.order?.id);
          setOrderCurrency(response?.data?.data?.order?.currency);
          setOrderAmount(response?.data?.data?.order?.amount);
          setOrderGuid(response?.data?.data?.orderDetails?.guid);
          setShowPayment(true);
          setIsOrderCreated(false);
          //  window.location.href = "http://localhost:3002/thankyou";
          if(paymentMethod === 'Cash On Delivery'){
            window.location.href = window.location.origin + '/thankyou'
          }
        }

        // Handle response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });

    // Call your onClickPlaceOrder function or any other logic you need
  };
  // const handlePaymentChange = (event) => {
  //     setPaymentMethod(event.target.value);
  //    // console.log('Selected Payment Method:', event.target.value);
  //   };
  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  function showSuccessToast() {
    toast.success("Order Placed Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  const onClickPlaceOrder = () => {
    //  setShowPayment(true);
    handleSubmit();
  };

  return (
    <main className="main main-test">
      <div className="container checkout-container">
        <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
          <li>
            <ALink href="/pages/cart">Shopping Cart</ALink>
          </li>
          <li className="active">
            <ALink href="/pages/checkout">Checkout</ALink>
          </li>
          <li className="disabled">
            <ALink href="#">Order Complete</ALink>
          </li>
        </ul>
        {!cartList || cartList.length === 0 ? (
          <div className="cart-empty-page text-center">
            <p className="noproduct-msg mb-2">
              Checkout is not available while your cart is empty.
            </p>
            <i className="icon-bag-2"></i>
            <p>No products added to the cart</p>
            <ALink
              href="/shop"
              className="btn btn-dark btn-add-cart product-type-simple btn-shop font1"
            >
              return to shop
            </ALink>
          </div>
        ) : (
          <>
            <div className="checkout-discount">
              <SlideToggle duration={300} collapsed>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                  <h4>
                    {/* Returning customer? <button className="btn btn-link btn-toggle" onClick={ onToggle }>Login</button> */}
                    <div
                      className="login-form-container"
                      ref={setCollapsibleElement}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="login-section feature-box">
                        <div className="feature-box-content">
                          <form action="#" id="login-form">
                            <p className="ls-0">
                              If you have shopped with us before, please enter
                              your details below. If you are a new customer,
                              please proceed to the Billing & Shipping section.
                            </p>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="mb-0 pb-1">
                                    Username or email{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    required
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="mb-0 pb-1">
                                    Password <span className="required">*</span>
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    required
                                  />
                                </div>
                              </div>
                            </div>

                            <button type="submit" className="btn">
                              LOGIN
                            </button>

                            <div className="form-footer mb-1">
                              <div className="custom-control custom-checkbox mb-0 mt-0">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="lost-password"
                                />
                                <label
                                  className="custom-control-label mb-0"
                                  htmlFor="lost-password"
                                >
                                  Remember me
                                </label>
                              </div>

                              <ALink
                                href="forgot-password"
                                className="forget-password ls-0"
                              >
                                Lost your password?
                              </ALink>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </h4>
                )}
              </SlideToggle>
            </div>
            {/* <div className="checkout-discount">
                            <SlideToggle duration={200} collapsed >
                                {({ onToggle, setCollapsibleElement }) => (
                                    <div className="m-b-3">
                                        <h4 className="mb-1">Have a coupon? <button className="btn btn-link btn-toggle" onClick={onToggle}>ENTER YOUR CODE</button></h4>
                                        <div className="feature-box feature-coupon mb-0" ref={setCollapsibleElement} style={{ overflow: 'hidden' }}>
                                            <div className="feature-box-content mt-0">
                                                <p className="ls-0">If you have a coupon code, please apply it below.</p>

                                                <form action="#">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control htmlForm-control-sm w-auto"
                                                            placeholder="Coupon code" required />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-sm mt-0" type="submit">
                                                                Apply Coupon
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </SlideToggle >
                        </div> */}
            <div className="row">
              <div className="col-lg-7">
                <ul className="checkout-steps">
                  <li>
                    <h2 className="step-title">Shipping details</h2>

                    <form action="#" id="checkout-form" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              First name{" "}
                              <span className="required" title="required">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                            {validationErrors.firstName && (
                              <small className="text-danger">
                                {validationErrors.firstName}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Last name{" "}
                              <span className="required" title="required">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                            {validationErrors.lastName && (
                              <small className="text-danger">
                                {validationErrors.lastName}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Company name </label>
                        <input
                          type="text"
                          name="companyName"
                          onChange={handleChange}
                          className="form-control"
                        />
                        {validationErrors.companyName && (
                          <small className="text-danger">
                            {validationErrors.companyName}
                          </small>
                        )}
                      </div>

                      {/* <div className="select-custom">
                                                    <label>Country / Region <span className="required" title="required">*</span></label>
                                                    <select name="orderby" className="form-control">
                                                        <option value="" defaultValue="selected">Vanuatu
                                            </option>
                                                        <option value="1">Brunei</option>
                                                        <option value="2">Bulgaria</option>
                                                        <option value="3">Burkina Faso</option>
                                                        <option value="4">Burundi</option>
                                                        <option value="5">Cameroon</option>
                                                    </select>
                                                </div> */}

                      <div className="form-group mb-1 pb-2">
                        <label>
                          Street address{" "}
                          <span className="required" title="required">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="shipping_street"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="House number and street name"
                          required
                        />
                        {validationErrors.shipping_street && (
                          <small className="text-danger">
                            {validationErrors.shipping_street}
                          </small>
                        )}
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="shipping_street2"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Apartment, suite, unite, etc. (optional)"
                          required
                        />
                        {validationErrors.shipping_street2 && (
                          <small className="text-danger">
                            {validationErrors.shipping_street2}
                          </small>
                        )}
                      </div>

                      <div className="form-group">
                        <label>
                          Town / City{" "}
                          <span className="required" title="required">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="shipping_city"
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                        {validationErrors.shipping_city && (
                          <small className="text-danger">
                            {validationErrors.shipping_city}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label>
                          State{" "}
                          <span className="required" title="required">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="shipping_state"
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                        {validationErrors.shipping_state && (
                          <small className="text-danger">
                            {validationErrors.shipping_state}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label>
                          Country{" "}
                          <span className="required" title="required">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="shipping_country"
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                        {validationErrors.shipping_country && (
                          <small className="text-danger">
                            {validationErrors.shipping_country}
                          </small>
                        )}
                      </div>

                      {/* <div className="select-custom">
                                                    <label>State / County <span className="required" title="required">*</span></label>
                                                    <select name="orderby" className="form-control">
                                                        <option value="" defaultValue="selected">NY</option>
                                                        <option value="1">Brunei</option>
                                                        <option value="2">Bulgaria</option>
                                                        <option value="3">Burkina Faso</option>
                                                        <option value="4">Burundi</option>
                                                        <option value="5">Cameroon</option>
                                                    </select>
                                                </div> */}

                      <div className="form-group">
                        <label>
                          Postcode / Zip{" "}
                          <span className="required" title="required">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="shipping_postalCode"
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                        {validationErrors.shipping_postalCode && (
                          <small className="text-danger">
                            {validationErrors.shipping_postalCode}
                          </small>
                        )}
                      </div>

                      <div className="form-group">
                        <label>
                          Phone{" "}
                          <span className="required" title="required">
                            *
                          </span>
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                        {validationErrors.phoneNumber && (
                          <small className="text-danger">
                            {validationErrors.phoneNumber}
                          </small>
                        )}
                      </div>

                      <div className="form-group">
                        <label>
                          Email address{" "}
                          <span className="required" title="required">
                            *
                          </span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                        {validationErrors.email && (
                          <small className="text-danger">
                            {validationErrors.email}
                          </small>
                        )}
                      </div>
                      <SlideToggle duration={200} collapsed>
                        {/* {({ onToggle, setCollapsibleElement }) => (
                                                    <div className="form-group mb-1">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="create-account" onChange={onToggle} />
                                                            <label className="custom-control-label" htmlFor="create-account">Create an account?</label>
                                                        </div>
                                                        <div className="form-group" ref={setCollapsibleElement} style={{ overflow: 'hidden' }}>
                                                            <label className="mt-14">Create account password <span className="required" title="required">*</span></label>
                                                            <input type="password" placeholder="Password" className="form-control"
                                                                required />
                                                        </div>
                                                    </div>
                                                )} */}
                      </SlideToggle>
                      <SlideToggle duration={300} collapsed>
                        {({ onToggle, setCollapsibleElement }) => (
                          <div className="form-group mb-11">
                            <div className="custom-control custom-checkbox mt-0 address-box">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="different-shipping"
                                onChange={onToggle}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="different-shipping"
                              >
                                Add different billing address?
                              </label>
                            </div>
                            <div
                              className="shipping-info"
                              ref={setCollapsibleElement}
                              style={{ overflow: "hidden" }}
                            >
                              <div className="row"></div>

                              <div className="form-group mb-1 pb-2">
                                <label>
                                  Street address{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  name="billing_stree"
                                  onChange={handleChange}
                                  className="form-control"
                                  placeholder="House number and street name"
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <input
                                  type="text"
                                  name="billing_stree2"
                                  onChange={handleChange}
                                  className="form-control"
                                  placeholder="Apartment, suite, unit, etc. (optional)"
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <label>
                                  Town / City{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  name="billing_city"
                                  onChange={handleChange}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>
                                  State{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  name="billing_state"
                                  onChange={handleChange}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>
                                  Country{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  name="billing_country"
                                  onChange={handleChange}
                                  className="form-control"
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <label>
                                  Postcode / ZIP{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  name="billing_postalCode"
                                  onChange={handleChange}
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </SlideToggle>

                      <div className="form-group">
                        <label className="order-comments">
                          Order notes (optional)
                        </label>
                        <textarea
                          className="form-control"
                          placeholder="Notes about your order, e.g. special notes for delivery."
                          required
                        ></textarea>
                      </div>
                    </form>
                  </li>
                </ul>
              </div>

              <div className="col-lg-5">
                <div className="order-summary">
                  <h3>YOUR ORDER</h3>

                  <table className="table table-mini-cart">
                    <thead>
                      <tr>
                        <th colSpan="2">Product</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartList &&
                        cartList.length > 0 &&
                        cartList.map((item, index) => (
                          <tr key={"checks" + index}>
                            <td className="product-col">
                              <h2 className="product-title">
                                {item.name + "×" + (item.qty || 1)}
                                {/* {item.name } */}
                              </h2>
                            </td>

                            <td className="price-col">
                              <span>
                                {" "}
                                &#x20B9;{item.price * (item.qty || 1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                    <tfoot>
                      <tr className="cart-subtotal">
                        <td>
                          <h4>Subtotal</h4>
                        </td>

                        <td className="price-col">
                          <span>&#x20B9;{subtotal}</span>
                        </td>
                      </tr>
                      {/* <tr className="order-shipping">
                                                <td className="text-left" colSpan="2">
                                                    <h4 className="m-b-sm">Shipping</h4>
                                                    <div className="form-group form-group-custom-control">
                                                        <div className="custom-control custom-radio d-flex">
                                                            <input type="radio" className="custom-control-input" name="radio"
                                                                defaultChecked />
                                                            <label className="custom-control-label">Local Pickup</label>
                                                        </div>
                                                    </div>

                                                    <div className="form-group form-group-custom-control mb-0">
                                                        <div className="custom-control custom-radio mb-0 d-flex">
                                                            <input type="radio" name="radio" className="custom-control-input" />
                                                            <label className="custom-control-label">Flat Rate</label>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr> */}

                      <tr className="order-total">
                        <td>
                          <h4>Total</h4>
                        </td>
                        <td>
                          {/* <b className="total-price"><span>&#x20B9;{getCartTotal(cartList).toFixed(2)}</span></b> */}
                          <b className="total-price">
                            <span>&#x20B9;{subtotal}</span>
                          </b>
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="payment-methods">
                    <h4 className="">Payment methods</h4>
                    <div className="info-box with-icon p-0">
                      <ul className="m-0">
                        {paymentMethods &&
                          paymentMethods.map((item, index) => (
                            <li key={index}>
                              <label>
                                <input
                                  type="radio"
                                  name="paymentGateway"
                                  value={item}
                                  checked={paymentMethod === item}
                                  onChange={handlePaymentChange}
                                />
                                {"  "}
                                {item}
                              </label>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  {showPayment && (
                    <Payment
                      orderGuid={orderGuid}
                      order_amount={subtotal}
                      order_id={orderId}
                      currency={orderCurrency}
                      name={"Naren"}
                      email={"naren@yopmail.com"}
                      contact={452423453}
                    />
                  )}
                  <button
                    type="submit"
                    onClick={() => {
                      onClickPlaceOrder();
                    }}
                    value="Place Order"
                    name="form-control"
                    className="btn btn-dark btn-place-order"
                  >
                    PLACE ORDER
                    {isOrderCreated && (
                      <ClipLoader size={22} className="ml-2" color="#FFFFF" />
                    )}
                    {/* <div className="bounce-loader">
                                         <div className="bounce1"></div>
                                         </div> */}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// const mapStateToProps = (state) => {
//     return {
//         cartList: state.cartlist.cart ? state.cartlist.cart : []
//     }
// }

export default CheckOut;
