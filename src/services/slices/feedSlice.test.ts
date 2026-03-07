import feedReducer, {
  fetchFeeds,
  FeedState
} from './feedSlice';
import { TOrder } from '../../utils/types';

describe('feedSlice', () => {
  const initialState: FeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  const mockOrders: TOrder[] = [
    {
      _id: 'order1',
      number: 12345,
      name: 'Заказ 1',
      status: 'done',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      ingredients: ['ing1', 'ing2']
    }
  ];

  it('должен устанавливать loading=true при pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять данные при fulfilled', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: mockOrders,
        total: 100,
        totalToday: 10
      }
    };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('должен сохранять ошибку при rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка загрузки ленты' }
    };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ленты');
  });
});
