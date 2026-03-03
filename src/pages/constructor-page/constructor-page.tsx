import { useEffect } from 'react';
import { BurgerIngredients } from '../../components/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor';
import { Preloader } from '../../components/ui/preloader';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const ConstructorPage = () => {
  const dispatch = useAppDispatch();
  const { items: ingredients, loading, error } = useAppSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch(fetchIngredients());
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

  if (!ingredients.length) {
    return (
      <div className='text text_type_main-medium pt-10'>
        Нет ингредиентов
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
      <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: '1', maxWidth: '600px' }}>
          <BurgerIngredients />
        </div>
        <div style={{ flex: '1', maxWidth: '600px' }}>
          <BurgerConstructor />
        </div>
      </div>
    </div>
  );
};
