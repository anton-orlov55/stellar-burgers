import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { orderBurger, closeOrderModal } from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { bun, ingredients } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const { orderRequest, orderModalData } = useAppSelector(
    (state) => state.order
  );
  const user = useAppSelector((state) => state.user.user);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const orderData = [bun._id, ...ingredients.map((item) => item._id)];

    dispatch(orderBurger(orderData));
  };

  const closeOrderModalHandler = () => {
    dispatch(closeOrderModal());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModalHandler}
    />
  );
};
