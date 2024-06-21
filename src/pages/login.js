import { useState } from "react"
import ALink from "../components/common/ALink"
import LoginModal from "../components/features/modals/login-modal"
import axios from "axios";

export default function Login () {
    const [FormData , setFormData ] = useState(
        {"email":'' , "password":''}
    );

    function handleUserLogin(event){
        const {id, value} = event.target;
        setFormData({
            ...FormData,[id]:value
        })


    }
    function handleLogin(e){
        e.preventDefault();
        const userCreds = {customer:{
            ...FormData
        }}
        console.log('form data for user login' , userCreds );
        axios.post(`http://localhost:3000/v1/customer/login` , userCreds ,{header:{'service_ref':'8xuf4dev'}} ).then((response)=>{
            if(response.data.success === true){
                console.log('login response' , response);
                const loginToken = response.data.data.token;
        
                
                      localStorage.setItem("loginToken",loginToken);
            }
        })

    }


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
                            <div className="col-md-12" style={{padding:'0 20%'}}>
                                <div className="heading mb-1">
                                    <h2 className="title">Login</h2>
                                </div>

                                <form onSubmit={handleLogin}>
                                    <label htmlFor="login-email">
                                        Username or email address <span className="required">*</span>
                                    </label>
                                    <input type="email" className="form-input form-wide" value={FormData.email} onChange={handleUserLogin} id="email" required />

                                    <label htmlFor="login-password">
                                        Password <span className="required">*</span>
                                    </label>
                                    <input type="password" className="form-input form-wide" value={FormData.password} onChange={handleUserLogin} id="password" required />

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
                                    <span>Dont have  an account ?</span><a
                    href="/pages/register"
                    className="btn btn-regist text-dark bg-transparent text-transform-none p-0"
                    // onClick={closeModal}
                  >
                    Register Now!
                  </a>
                                </form>
                            </div>
                            {/* <div className="col-md-6">
                                <div className="heading mb-1">
                                    <h2 className="title">Register</h2>
                                </div>

                                <form action="#">
                                    <label htmlFor="register-email">
                                        Email address <span className="required">*</span>
                                    </label>
                                    <input type="email" className="form-input form-wide" id="register-email" required />

                                    <label htmlFor="register-password">
                                        Password <span className="required">*</span>
                                    </label>
                                    <input type="password" className="form-input form-wide" id="register-password"
                                        required />

                                    <div className="form-footer mb-2">
                                        <button type="submit" className="btn btn-dark btn-md w-100 mr-0">
                                            Register
                                    </button>
                                    </div>
                                </form>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <LoginModal/> */}
        </main>
    )
}