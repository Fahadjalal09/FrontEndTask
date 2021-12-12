import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Checkout from "./pages/checkout/Checkout";
import AddItems from "./pages/addItems/AddItems";
import Cart from "./pages/cart/Cart";
import PreviousOrder from "./pages/previousOrders/PreviousOrder";

function App() {
    
    const [cartItem, setCartItem] = useState([]);
    const [previousOrder, setPreviousOrder] = useState([])
    
    const addToPreviousOrder =(item)=> {
        previousOrder.push(item)
        setCartItem([])
        
    }
    
    const addToCart = (item) => {
        cartItem.push(item);
    }
    
    
    return (
      <Routes>
          <Route  path="/" element={<Home addToCart={addToCart}/>}/>
          <Route  path="/checkout" element={<Checkout addToPreviousOrder={addToPreviousOrder} cartItem={cartItem}/>}/>
          <Route  path="/additem" element={<AddItems/>}/>
          <Route  path="/previous_order" element={<PreviousOrder previousOrder={previousOrder}/>}/>
          <Route  path="/cart" element={<Cart cartItem={cartItem}/>}/>
          <Route path="*" element={"404 NOT FOUND"}/>
      </Routes>
  );
}

export default App;
