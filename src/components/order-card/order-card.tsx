import { FC, memo, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useAppSelector } from '../../services/store';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const ingredients = useAppSelector((state) => state.ingredients.items);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);
    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);
    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;
    const date = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  const handleClick = () => {
    navigate(`/feed/${order.number}`, {
      state: { background: location }
    });
  };

  if (!orderInfo) return null;

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <OrderCardUI
        orderInfo={orderInfo}
        maxIngredients={maxIngredients}
        locationState={{ background: location }}
      />
    </div>
  );
});
