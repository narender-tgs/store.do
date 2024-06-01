import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getStoreDetails, setStoreDetails } from '../store/cart/storeData/storeDetailsSlice';
import { setCartDetails } from '../store/cart/cartDetailsSlice';
import { resolveHref } from 'next/dist/next-server/lib/router/router';

const Payment = ({order_amount , order_id ,name , email , contact , currency , orderGuid }) => {
    const dispatch = useDispatch();
    const storeDetails = useSelector(getStoreDetails);
   console.log("order is present" , storeDetails);
    const [rzpInstance, setRzpInstance] = useState(null);
    useEffect(() => {
        if (rzpInstance) {
          rzpInstance.open();
        }
      }, [rzpInstance]);
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
            const options = {
                "key": "rzp_test_yOKYbCegxy0WUh",
                "amount": order_amount *100,
                "currency": currency,
                "name": "Store.do",
                "description": "Test Transaction",
                "image": storeDetails?.storeDetails?.store_logo_url,
                // "order_id": order_id,
                "order_id": order_id,
                // "handler": function (response) {
                //     alert(response.razorpay_payment_id);
                //     alert(response.razorpay_order_id);
                //     alert(response.razorpay_signature)
                // },
                "handler":paymentResponseHandler,
                "prefill": {
                    "name": name ,
                    "email": email,
                    "contact": contact
                },
                "notes": {
                    "address": "Bareilly",
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            const rzp1 = new window.Razorpay(options);

            setRzpInstance(rzp1);

            rzp1.on('payment.failed', (response) => {
                console.log(response.error.code);
                console.log(response.error.description);
                console.log(response.error.source);
                console.log(response.error.step);
                console.log(response.error.reason);
                console.log(response.error.metadata.order_id);
                console.log(response.error.metadata.payment_id);

                if(response?.error){
                    let orderBody = {order: {
                            "paymentStatus": "Failed",
                            "paymentSignature":"",
                            "paymentId":""
                    }}
                     axios.post(`http://localhost:3000/v1/order/${orderGuid}/update/payment` ,orderBody ,{ headers: { 'service_ref': '8xuf4dev' } } ).then(response =>{
                        if(response.data.success === true){
                            // alert('order updated successfully');
                        }
                     })
                }
            });
        };
        document.body.appendChild(script);

        return () => {
            if (rzpInstance) {
                rzpInstance.close();
            }
            document.body.removeChild(script);
        };
    }, []);
    function paymentResponseHandler(response) {
        const resOrderId = response.razorpay_order_id;
        // Logging the payment details in the console
        // console.log("response for razor pay " , response);
        console.log('Payment ID:', response.razorpay_payment_id);
        console.log('Order ID:', response.razorpay_order_id);
        console.log('Signature:', response.razorpay_signature);
        

        
    
           if(resOrderId){
                let orderBody = {order: {
                    
                    "paymentStatus": "Completed",
                    "paymentSignature":response.razorpay_signature,
                    "paymentId": response.razorpay_payment_id
                }}
                //'http://localhost:3000/v1/order/ord-b3e65b2f-0c94-48af-8208-55b49e08929c
                axios.post(`http://localhost:3000/v1/order/${orderGuid}/update/payment` ,orderBody ,{ headers: { 'service_ref': '8xuf4dev' } } ).then(response =>{
                    if(response.data.success === true){
                        window.location.href = "http://localhost:3002/thankyou";
                    
                    // alert('order updated successfully');

                }
             })
        }
         
        // Here you can add your own logic, e.g., updating the UI or sending details to your server
        // updatePaymentStatus(response);
    }

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     if (rzpInstance) {
    //         rzpInstance.open();
    //     }
    // }

    // return (
    //     <button id="rzp-button1" onClick={handleClick}>Pay</button>
    // );
    
}

export default Payment;
