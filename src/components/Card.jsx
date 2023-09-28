import React, { useState, useContext } from 'react';
import 'macro-css';
import unliked from '../assets/img/unliked.svg';
import liked from '../assets/img/liked.svg'
import btnplus from '../assets/img/btn-plus.svg'
import btncheked from '../assets/img/btn-checked.svg'
import axios from 'axios';
import ContentLoader from "react-content-loader";
import appContext from '../context';

function Card({ 
  id, 
  title, 
  price, 
  img, 
  onFavorite, 
  onPlus, 
  favorited = false, 
  added = false, 
  loading = false
}) {
  const {isItemAdded} = useContext(appContext);



  // const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({id, title, price, img})
    // setIsAdded(!isAdded);
  }

  const onClickFavorite = () => {
    onFavorite({id, title, price, img});
    setIsFavorite(!isFavorite);
  }

  return (
    <div className="card">
{
  loading ? <ContentLoader 
  speed={2}
  width={165}
  height={250}
  viewBox="0 0 150 187"
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
  
>
  <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
  <rect x="0" y="100" rx="10" ry="10" width="150" height="15" /> 
  <rect x="0" y="122" rx="10" ry="10" width="100" height="15" /> 
  <rect x="0" y="153" rx="10" ry="10" width="80" height="24" /> 
  <rect x="118" y="145" rx="10" ry="10" width="32" height="32" />
</ContentLoader> 
:
<><div className='favourite' onClick={onClickFavorite}>
        <img src={isFavorite ? liked : unliked} alt="unliked" />
      </div>
      <img width='100%' height={135} src={img} alt="Sneaker Image" />
      <h5>{title}</h5>
      <div className='d-flex justify-between align-center'>
        <div className='d-flex flex-column'>
          <span>Цена: </span>
          <b>{price} руб.</b>
        </div>
        {onPlus && <img className='plus' onClick={onClickPlus} src={isItemAdded(id) ? btncheked : btnplus} alt="plus"/>}
      </div></>

}




      


    </div>
  )
}

export default Card