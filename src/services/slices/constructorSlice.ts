import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('constructor');
    if (serializedState === null) {
      return { bun: null, ingredients: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { bun: null, ingredients: [] };
  }
};

const saveState = (state: {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('constructor', serializedState);
  } catch (err) {
    console.error('Ошибка сохранения:', err);
  }
};

export interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = loadState();

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
        saveState(state);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
      saveState(state);
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
      saveState(state);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      localStorage.removeItem('constructor');
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;
