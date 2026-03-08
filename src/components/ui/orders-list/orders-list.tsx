import { FC } from 'react';
import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => {
  console.log('OrdersListUI orderByDate:', orderByDate);
  
  return (
    <div style={{ 
      overflowY: 'auto', 
      maxHeight: 'calc(100vh - 300px)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {orderByDate.map((order) => {
        console.log('Rendering OrderCard for:', order.number);
        return <OrderCard order={order} key={order._id} />;
      })}
    </div>
  );
};
