import React, { useState, useContext } from 'react';
import axios from 'axios';
import 'macro-css';
import remove from '../assets/img/btn-remove.svg';
import arrow from '../assets/img/arrow.svg'
import emptycart from '../assets/img/empty-cart.jpg'
import completeOrder from '../assets/img/complete-order.jpg'
import Info from './Info';
import appContext from '../context';

const delay = () => {
    new Promise((resolve) => setTimeout(resolve, 1000))
}

function Drawer({onCloseCart, items = [], onRemoveItem}) {
    const {cartItems, setCartItems} = useContext(appContext);

    const [isComplete, setIsComplete] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const totalPrice = cartItems.reduce((sum, obj) => obj.price+sum, 0)


    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://625c13efc9e78a8cb9b36cf3.mockapi.io/orders', {
                items: cartItems
            });
            setOrderId(data.id);
            setIsComplete(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                axios.delete(`https://625c13efc9e78a8cb9b36cf3.mockapi.io/cart/${item.id}`);
                await delay();
            }
        }
        catch(e) {
            alert('Не удалось создать заказ')
        }
        setIsLoading(false)
    }
     

  return (
    <div className='overlay'>
        <div className="drawer">
            {
                items.length > 0 ? 
                <>
                    <div>
                        <h2 className='mb-30 d-flex justify-between'>
                            Корзина
                            <img onClick={onCloseCart} className='remove__btn' src={remove} alt="remove" />
                        </h2>
                        <div className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cart__item d-flex align-center mb-20">
                                <div 
                                    // style={{backgroundImage: `url(Sneaker${obj.id})`}}
                                    className='cartItemImage'>
                                <img 
                                    className='mr-10'
                                    width={70} 
                                    height={70} 
                                    src={obj.img} 
                                    alt="sneakers" 
                                />
                                </div>
                                <div className='mr-20'>
                                <p className='mb-5'>{obj.title}</p>
                                <b>{obj.price} руб.</b> 
                                </div>
                                <img onClick={() => onRemoveItem(obj.id)} className='remove__btn' src={remove} alt="remove" />
                                </div>
                            ) )}
                        </div>
                    </div>
                    <div className="cart_total_block">
                        <ul>
                            <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>{totalPrice} руб.</b>
                            </li>
                            <li>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{Math.floor(totalPrice*0.05*100)/100} руб.</b>
                            </li>
                        </ul>
                        <button disabled={isLoading} onClick={onClickOrder} className='green_button'>Оформить заказ <img src={arrow} alt="arrow" /></button>
                    </div>
                </>
                :
                <>
                    <h2 className='mb-30 d-flex justify-between'>
                        Корзина
                        <img onClick={onCloseCart} className='remove__btn' src={remove} alt="remove" />
                    </h2>
                    <Info 
                        title={isComplete ? 'Заказ оформлен' : 'Корзина пустая'} 
                        description={isComplete ? `Ваш заказ №${orderId} скоро будет передан курьерской службе` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'} 
                        image={isComplete ? completeOrder : emptycart}/>
                </>       
            }        
            
        </div>
    </div>
  )
}

export default Drawer