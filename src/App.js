import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

// Contexts
import { ProductContext } from "../src/contexts/ProductContext";
import { CartContext } from "../src/contexts/CartContext";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);
  console.log(cart);

  const removeItem = (item) => {
    cart.filter((product) => {
      return product.id !== item.id;
    });
  };

  const addItem = (item) => {
    // add the given item to the cart

    const newItem = {
      id: Date.now(),
      title: item.title,
      price: item.price,
      image: item.image,
    };
    setCart([...cart, newItem]);
  };

  return (
    <div className="App">
      <CartContext.Provider value={cart}>
        <Navigation />
        <ProductContext.Provider value={{ products, addItem }}>
          {/* Routes */}
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/cart">
            <ShoppingCart cart={cart} />
          </Route>
        </ProductContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default App;
