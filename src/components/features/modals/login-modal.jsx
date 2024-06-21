import React, { useState } from "react";
import Modal from "react-modal";
// import { useRouter } from "next/router";
import ALink from "../../common/ALink";
// Import Custom Component

import { useSelector } from "react-redux";
import { getStoreDetails } from "../../../store/cart/storeData/storeDetailsSlice";
import { Link } from "react-router-dom";
import axios from "axios";

const customStyles = {
  content: {
    position: "relative",
    maxWidth: "525px",
    marginLeft: "1rem",
    marginRight: "1rem",
    outline: "none",
    backgroundColor: "#fff",
  },
};

export default function LoginModal() {
  const [FormData , setFormData ] = useState(
    {"email":'' , "password":''}
);
  const storeDatas = useSelector(getStoreDetails);
  const fontType = storeDatas?.storeDetails?.fontType;
  const fontSize = storeDatas?.storeDetails?.fontSize;
  // const router = useRouter();
  const [open, setOpen] = useState(false);

  function closeModal(e) {
    if (!document.querySelector(".open-modal")) return;
    e.preventDefault();
    document.querySelector(".open-modal").classList.add("close-modal");

    // if (e.currentTarget.classList.contains("btn-regist")) {
    //   router?.push("/pages/login");
    // }

    // if (e.currentTarget.classList.contains("forgot-password")) {
    //   router?.push("/pages/forgot-password");
    // }

    setTimeout(() => {
      setOpen(false);
    }, 350);
  }
  function handleUserLogin(event){
    const {id, value} = event.target;
    setFormData({
        ...FormData,[id]:value
    })
  }
  function handleLogin(event){
    
    event.preventDefault()
    console.log('data');
    const userCreds = {customer:{
        ...FormData
    }}
    console.log('form data for user login' , userCreds );
    axios.post(`http://localhost:3000/v1/customer/login` , userCreds ,{header:{'service_ref':'8xuf4dev'}} ).then((response)=>{
        
      if(response.data.success === true){
        const loginToken = response.data.data.token;
        
        console.log('login response' , response.data.data.token);
              localStorage.setItem("loginToken",loginToken);
            }
        
    })

}

  function openModal(e) {
    e.preventDefault();
    setOpen(true);
  }

  return (
    // <li>
    <div>

      {/* <i className="icon-user-2 text-black mr-2"></i> */}
      <Link className="login-link mr-4" style={{ textTransform:"uppercase"}} onClick={openModal}>
      {/* <Link className="login-link mr-4" style={{fontFamily:fontType , fontSize:fontSize + 'px' ,textTransform:"uppercase"}} onClick={openModal}> */}
        <strong>Login</strong>
        
      </Link>

      {open ? (
        <Modal
          isOpen={open}
          style={customStyles}
          contentLabel="login Modal"
          className="login-popup"
          overlayClassName="ajax-overlay open-modal"
          shouldReturnFocusAfterClose={false}
          onRequestClose={closeModal}
          closeTimeoutMS={10}
        >
          <div className="modal-wrapper">
            <div className="container">
              <h2 className="title">Login</h2>

              <form action="#" className="mb-0" onSubmit={handleLogin}>
              {/* <form onSubmit={handleLogin}> */}
                <label htmlFor="login-email">
                  Username or email address
                  <span className="required">*</span>
                </label>
                {/* <input
                  type="email"
                  className="form-input form-wide mb-2"
                  id="login-email"
                  required
                /> */}
                <input type="email" className="form-input form-wide mb-2" value={FormData.email} onChange={handleUserLogin} id="email" required />


                <label htmlFor="login-password">
                  Password<span className="required"> *</span>
                </label>

                {/* <input
                  type="password"
                  className="form-input form-wide mb-2"
                  id="login-password"
                  required
                /> */}
                <input type="password" className="form-input form-wide mb-2" value={FormData.password} onChange={handleUserLogin} id="password" required />


                <div className="form-footer">
                  <div className="custom-control custom-checkbox ml-0">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="lost-password"
                    />
                    <label
                      className="custom-control-label form-footer-right"
                      htmlFor="lost-password"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="form-footer-right">
                    <a
                      href="/pages/forgot-password"
                      className="forget-password text-dark"
                      // onClick={closeModal}
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-dark btn-block btn-md"
                  >
                    LOGIN
                  </button>
                  {/* <button
                    type="submit"
                    className="btn btn-dark btn-block btn-md"
                  >
                    LOGIN
                  </button> */}

                  {/* <a
                    href="/pages/register"
                    className="btn btn-regist text-dark bg-transparent text-transform-none p-0"
                    // onClick={closeModal}
                  >
                    Register Now!
                  </a> */}
                </div>
              </form>
            </div>

            <button
              title="Close (Esc)"
              type="button"
              className="mfp-close"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

