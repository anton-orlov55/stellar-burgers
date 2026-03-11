import ingredientsReducer, {
  fetchIngredients,
  IngredientsState
} from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('ingredientsSlice', () => {
  const initialState: IngredientsState = {
    items: [],
    loading: false,
    error: null
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Ингредиент 1',
      type: 'bun',
      price: 100,
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 10,
      image: '',
      image_large: '',
      image_mobile: ''
    }
  ];

  it('должен устанавливать loading=true при pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять данные при fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
  });

  it('должен сохранять ошибку при rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
