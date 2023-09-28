import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import appContext from '../context';


function Orders() {
  const { onAddFavorite, isLoading} = useContext(appContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://625c13efc9e78a8cb9b36cf3.mockapi.io/orders');
        setOrders(data.map(obj => obj.items).flat());
      } catch(e) {
        alert('ошибка')
      }
      
      
    })()
  },[])

  return (
    <div className="content p-40">
        <div className='d-flex align-center mb-40 justify-between'>
          <h1>Мои заказы</h1>
        </div>
        <div className="content__container">
          {
            (isLoading ? [...Array(8)] : orders).map((item,index) => {
              return (
                <Card 
                  key={index}
                  onFavorite={(obj) => onAddFavorite(obj)}
                  loading={isLoading}
                  {...item}
                />
              )
            })
          }
        </div>
        
        

      </div>
  )
}

export default Orders;