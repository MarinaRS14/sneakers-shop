import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

import './App.css';
import 'macro-css'
import data from './data.js'
import remove from './assets/img/btn-remove.svg';

import Drawer from './components/Drawer';
import Header from './components/Header';

import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Favorites from './pages/Favorites';

import appContext from './context';
import Orders from './pages/Orders';



function App() {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  const onAddToCart = (obj) => {
    if(cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      setCartItems((prev) => prev.filter(i => Number(i.id) != Number(obj.id)));
      axios.delete(`https://625c13efc9e78a8cb9b36cf3.mockapi.io/cart/${obj.id}`);
    } else {
      axios.post('https://625c13efc9e78a8cb9b36cf3.mockapi.io/cart', obj)
      setCartItems((prev) => [...prev, obj]);
    }
  }


  const onAddFavorite = async (obj) => {
    try {
      if(favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://625c13efc9e78a8cb9b36cf3.mockapi.io/favorite/${obj.id}`);
        setFavorites((prev) => prev.filter(item => item.id !== obj.id))
        }
      else {
        const {data} = await axios.post('https://625c13efc9e78a8cb9b36cf3.mockapi.io/favorite', obj);
        setFavorites((prev) => [...prev, data])
      }
    }
    catch(e) {
      console.log(e)
    }
    
  }

  
  useEffect(() => {
    async function fetchData() {  
      setIsLoading(true)  
      const cartResponse = await axios.get('https://625c13efc9e78a8cb9b36cf3.mockapi.io/cart');
      const favoriteResponse = await axios.get('https://625c13efc9e78a8cb9b36cf3.mockapi.io/favorite');
      const itemsResponse = await axios.get('https://625c13efc9e78a8cb9b36cf3.mockapi.io/items');
      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoriteResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);



  const onRemoveItem = (id) => {
    axios.delete(`https://625c13efc9e78a8cb9b36cf3.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id!==id))
  }



  return (
    <appContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddFavorite, onAddToCart, setCartOpened, setCartItems, cartItems, isLoading}}>
    <div className="wrapper clear">
      {cartOpened ? <Drawer onRemoveItem={onRemoveItem} items={cartItems} onCloseCart={() => setCartOpened(false)} /> : null}

      <Header onClickCart={() => setCartOpened(true)}/>

      <Routes>
        <Route path='/' element={
          <Home 
            onAddToCart={onAddToCart} 
            onAddFavorite={onAddFavorite}
            items={items}
            cartItems={cartItems}
            isLoading={isLoading}
          />} />

        <Route path='/favorites' element={<Favorites />} />
        <Route path='/orders' element={<Orders />} />

      </Routes>
      
    </div>
    </appContext.Provider>
  );
}

export default App;
