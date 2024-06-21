import ALink from "../components/common/ALink"
import { useEffect, useState } from "react"
import LoginModal from "../components/features/modals/login-modal"
import axios from "axios"
import { Link } from "react-router-dom";

export default function UpdatePassword () {
    const [formData, setFormData] = useState({
        token: '',
        password: '',
        confirmPassword: '',
       
    });
    // const userCredsBody= { customer:{
    //     "firstName":"Pratik",
    //     "lastName":"Mahandule",
    //     "email":"pratik10mahandule@gmail.com",
    //     "password":"PR@TIK1999",
    //     "confirmPassword":"PR@TIK1999",
    //     "otp":1234
    // }}
    const handleRegisterVales=(event)=>{
        const { id, value } = event.target;
        setFormData({
            ...formData,
            [id]: value
        });

    }
    // useEffect(() => {
    //     axios.post(`http://localhost:3000/v1/customer` , {header:{
    //         'service_ref':"8xuf4dev"
    //     }}  ).then((response)=>{
    //           console.log('response for user creation' , response);


    //     })
    // }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
         const userCredsBody= { customer:{
            ...formData
         }}
             axios.post(`http://localhost:3000/v1/customer/resetPassword` , userCredsBody , {header:{
            'service_ref':"8xuf4dev"
        }}  ).then((response)=>{
              console.log('response for user creation' , response);
              if(response.success === true){
                window.location.href = window.location.origin ;
              }
        })
        // Handle form submission, e.g., send form data to an API

        console.log('Form data submitted:', formData);
    };
    
    return (
        <main className="main">
            <div className="page-header">
                <div className="container d-flex flex-column align-items-center">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><ALink href="/">Home</ALink></li>
                                <li className="breadcrumb-item"><ALink href="/shop">Shop</ALink></li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    My Account
                            </li>
                            </ol>
                        </div>
                    </nav>

                    <h1>My Account</h1>
                </div>
            </div>



            <div className="container login-container">
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <div className="row">
                            {/* <div className="col-md-6"> */}
                                {/* <div className="heading mb-1">
                                    <h2 className="title">Login</h2>
                                </div> */}

                                {/* <form action="#">
                                    <label htmlFor="login-email">
                                        Username or email address <span className="required">*</span>
                                    </label>
                                    <input type="email" className="form-input form-wide" id="login-email" required />

                                    <label htmlFor="login-password">
                                        Password <span className="required">*</span>
                                    </label>
                                    <input type="password" className="form-input form-wide" id="login-password" required />

                                    <div className="form-footer">
                                        <div className="custom-control custom-checkbox mb-0">
                                            <input type="checkbox" className="custom-control-input" id="lost-password" />
                                            <label className="custom-control-label mb-0" htmlFor="lost-password">Remember
												me</label>
                                        </div>

                                        <ALink href="/pages/forgot-password"
                                            className="forget-password text-dark form-footer-right">Forgot
											Password?</ALink>
                                    </div>
                                    <button type="submit" className="btn btn-dark btn-md w-100">
                                        LOGIN
									</button>
                                </form> */}
                            {/* </div> */}
                            <div className="col-md-12" style={{padding:"0 20%"}}>
                                <div className="heading mb-1">
                                    {/* <h2 className="title" style={{display:"flex", justifyContent:"space-around"}}>Register</h2> */}
                                    <h2 className="title">Change Password</h2>
                                </div>

                                <form onSubmit={handleSubmit} action="#">
                                   

                                    <label htmlFor="register-password">
                                        Password <span className="required">*</span>
                                    </label>
                                    <input type="password" value={formData.password} className="form-input form-wide" onChange={handleRegisterVales} id="password" required />

                                    <label htmlFor="register-password">
                                        Confirm Password <span className="required">*</span>
                                    </label>
                                    <input type="password"   value={formData.confirmPassword} className="form-input form-wide" onChange={handleRegisterVales} id="confirmPassword" required />
                                   

                                    <div className="form-footer mb-2">
                                        <button type="submit" className="btn btn-dark btn-md w-100 mr-0">
                                            Set Password
                                    </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{textAlign:'center'}} className="mb-1">
            <ALink href="/pages/login">
              Login your Account
            </ALink>
            </div>
           
            {/* <LoginModal/> */}
        </main>
    )
}