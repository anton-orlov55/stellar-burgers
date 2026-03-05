import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useAppSelector } from '../../services/store';
import { getOrderByNumberApi } from '../../utils/burger-api';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const ingredients = useAppSelector((state) => state.ingredients.items);
  const feedOrders = useAppSelector((state) => state.feed.orders);
  const userOrders = useAppSelector((state) => state.order.userOrders);

  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const num = Number(number);
    if (isNaN(num)) return;

    // Ищем заказ в уже загруженных
    const found = [...feedOrders, ...userOrders].find(
      (item) => item.number === num
    );
    if (found) {
      setOrderData(found);
      return;
    }

    // Если не нашли, загружаем с сервера
    setLoading(true);
    getOrderByNumberApi(num)
      .then((data) => {
        if (data.orders?.length) {
          setOrderData(data.orders[0]);
        }
      })
      .catch((err) => {
        console.error('Ошибка загрузки заказа:', err);
      })
      .finally(() => setLoading(false));
  }, [number, feedOrders, userOrders]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (loading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
