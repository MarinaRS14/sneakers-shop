import React, { useContext, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import '../App.css';
import 'macro-css'
import data from '../data.js'
import remove from '../assets/img/btn-remove.svg';
import appContext from '../context'

function Favorites() {
  const { favorites, onAddFavorite } = useContext(appContext)
 
  return (
    <div className="content p-40">
        <div className='d-flex align-center mb-40 justify-between'>
          <h1>Мои закладки</h1>
        </div>
        <div className="content__container">
          {
            favorites && favorites.map(item => {
              return (
                <Card 
                  key={item.id} 
                  id={item.id}
                  title={item.title} 
                  price={item.price}
                  img={item.img}
                  favorited={true}
                  onFavorite={onAddFavorite}
                />
              )
            })
          }
        </div>
        
        

      </div>
  )
}

export default Favorites