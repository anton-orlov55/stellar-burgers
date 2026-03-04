import { useEffect } from 'react';
import { FeedInfo, OrdersList } from '@components';
import { Preloader } from '@ui';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Feed = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className='text text_type_main-medium pt-10' style={{ color: 'red' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
      <h1 className='text text_type_main-large pt-10 pb-5'>Лента заказов</h1>
      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: '1' }}>
          <OrdersList orders={orders} />
        </div>
        <div style={{ flex: '1' }}>
          <FeedInfo />
        </div>
      </div>
    </div>
  );
};
