import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
     const [products, setProducts] = useState([]);
     const [cart,setCart] = useState([]);
     const [displayProduct, setDisplayProduct] = useState([]);
     useEffect( () => {
         fetch('./products.JSON')
         .then(res => res.json())
         .then(data => {
            setProducts(data);
            setDisplayProduct(data);
         })
     } , []);
     
      useEffect( () => {
          
          if(products.length) {
            const saveCart = getStoredCart();
            const storedCart = []; 
             for (const key in saveCart){
                 const addedProduct = products.find(product => product.key === key);
                 if(addedProduct){
                     const quantity = saveCart[key];
                     addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                 }
                  
            }
            setCart(storedCart)
          }
      } , [products])

     const handleAddToCart = (product) => {
         const exists = cart.find(pd => pd.key === product.key);
         let newCart = [];
         if(exists){
             const rest = cart.filter(pd => pd.key !== product.key);
             exists.quantity = exists.quantity + 1;
             newCart = [...rest, exists];
         }
         else{
             product.quantity = 1;
             newCart = [...cart, product];
         }
         
         setCart(newCart)
        //  save to local storage (for now)
         addToDb(product.key)
     }
     const handleSearch = event =>{
          const searchText = event.target.value;
          const matchProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
          setDisplayProduct(matchProducts);

     }
    return (
        <div>
            <div className="search-container">
            <input type="text" onChange={handleSearch} placeholder="Search Product" />
        </div>
        <div className="shop-container">
            <div className="product-container">
                {/* <h3>Products: {products.length} </h3> */}
                {
                    displayProduct.map(product => <Product
                    key={product.key}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                   
                   <Link to="/orders">
                       <button className='btn-regular'>Review your Order</button>
                   </Link>
               </Cart>
            </div>
            
        </div>
        </div>
    );
};

export default Shop;