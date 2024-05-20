import React, { useEffect , useState } from 'react'
import Product from '../../pages/Product'
import axios from 'axios';


const NewSale = () => {
    // const [products , setProducts] = useState([]);
       
    //   useEffect(() => {
    //     axios.get('http://localhost:3003/v1/product' , { headers: { 'service_ref': '8xuf4dev'}})
    //         .then(response => {
    //             // Access the response data
    //             const responseData = response.data;
    //             console.log("response Data for products-->", responseData);
    //             setProducts(responseData?.data?.products)
    //             // Process the response data here
    //         })
    //         .catch(error => {
    //             // Handle any errors
    //         });
        
    // }, [])
  return (
    <div>
       <Product/>
     
      </div>
  )
}

export default NewSale