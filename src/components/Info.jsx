import React, { useContext } from 'react';
import appContext from '../context';
import arrow from '../assets/img/arrow.svg';

function Info({title, description, image}) {
    const {setCartOpened} = useContext(appContext);

  return (
    <div className='cart__empty d-flex align-center flex-column flex'>
        <img className='mb-20' width={120} src={image} alt="emptyCart" />
        <h2>{title}</h2>
        <p className='opacity-6'>{description}</p>
        <button onClick={() => setCartOpened(false)} className='green_button'>
            <img src={arrow} alt="arrow" style={{transform: 'rotate(0.5turn)'}}/>
            Вернуться назад
        </button>
    </div>
  )
}

export default Info