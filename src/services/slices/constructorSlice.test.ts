import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  ConstructorState
} from './constructorSlice';
import { TConstructorIngredient } from '../../utils/types';

jest.mock('uuid', () => ({
  v4: () => 'fixed-uuid-id'
}));

describe('constructorSlice', () => {
  const initialState: ConstructorState = {
    bun: null,
    ingredients: []
  };

  const mockBun: TConstructorIngredient = {
    _id: 'bun1',
    id: 'fixed-uuid-id',
    name: 'Булка',
    type: 'bun',
    price: 100,
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 10,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const mockIngredient: TConstructorIngredient = {
    _id: 'ing1',
    id: 'fixed-uuid-id',
    name: 'Начинка',
    type: 'main',
    price: 50,
    proteins: 5,
    fat: 5,
    carbohydrates: 5,
    calories: 5,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  it('должен добавлять булку', () => {
    const action = addIngredient(mockBun);
    const state = constructorReducer(initialState, action);

    expect(state.bun).toBeDefined();
    expect(state.bun?._id).toBe('bun1');
    expect(state.bun?.id).toBe('fixed-uuid-id');
  });

  it('должен добавлять ингредиент', () => {
    const action = addIngredient(mockIngredient);
    const state = constructorReducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('ing1');
    expect(state.ingredients[0].id).toBe('fixed-uuid-id');
  });

  it('должен удалять ингредиент', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredients: [{ ...mockIngredient, id: 'test-id' }]
    };
    const action = removeIngredient('test-id');
    const state = constructorReducer(stateWithIngredient, action);
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен перемещать ингредиент', () => {
    const ingredient2 = { ...mockIngredient, id: 'ing2', name: 'Начинка2' };
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, id: 'ing1', name: 'Начинка' },
        ingredient2
      ]
    };
    const action = moveIngredient({ from: 0, to: 1 });
    const state = constructorReducer(stateWithIngredients, action);
    expect(state.ingredients[0].name).toBe('Начинка2');
    expect(state.ingredients[1].name).toBe('Начинка');
  });

  it('должен очищать конструктор', () => {
    const stateWithItems = {
      bun: mockBun,
      ingredients: [mockIngredient]
    };
    const action = clearConstructor();
    const state = constructorReducer(stateWithItems, action);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
