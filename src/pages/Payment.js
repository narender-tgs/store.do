import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Payment = ({order_amount , order_id ,name , email , contact , currency , orderGuid }) => {
   // console.log("order id generated->", orderGuid);
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
                "image": "https://example.com/your_logo",
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
                        "paymentStatus": "Failed"
                    }}
                     axios.post(`http://localhost:3000/v1/order/${orderGuid}` ,orderBody ,{ headers: { 'service_ref': '8xuf4dev' } } ).then(response =>{
                        if(response.data.success === true){
                            alert('order updated successfully');
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
        // Logging the payment details in the console
        console.log("response for razor pay " , response);
        console.log('Payment ID:', response.razorpay_payment_id);
        console.log('Order ID:', response.razorpay_order_id);
        console.log('Signature:', response.razorpay_signature);
        

        if(response?.razorpay_order_id){
            let orderBody = {order: {
                "paymentStatus": "Completed"
            }}
             axios.post(`http://localhost:3000/v1/order/${orderGuid}` ,orderBody ,{ headers: { 'service_ref': '8xuf4dev' } } ).then(response =>{
                if(response.data.success === true){
                    // alert('order updated successfully');
                     window.location.href = "http://localhost:3001/thankyou";

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
