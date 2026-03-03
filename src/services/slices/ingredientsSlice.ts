import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

// Тип для состояния ингредиентов
export interface IngredientsState {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: IngredientsState = {
  items: [],
  loading: false,
  error: null
};

// Асинхронный thunk для получения ингредиентов с сервера
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

// Слайс
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // pending — запрос начался
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // fulfilled — запрос выполнен успешно
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      // rejected — ошибка
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
      });
  }
});

export default ingredientsSlice.reducer;
