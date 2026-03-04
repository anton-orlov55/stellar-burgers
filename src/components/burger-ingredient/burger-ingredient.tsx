import { FC, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch } from '../../services/store';
import { addIngredient } from '../../services/slices/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    const handleClick = () => {
      navigate(`/ingredients/${ingredient._id}`, {
        state: { background: location }
      });
    };

    return (
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div onClick={(e) => e.stopPropagation()}>
          <BurgerIngredientUI
            ingredient={ingredient}
            count={count}
            locationState={{ background: location }}
            handleAdd={handleAdd}
          />
        </div>
      </div>
    );
  }
);
