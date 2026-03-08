import orderReducer, {
  orderBurger,
  fetchUserOrders,
  closeOrderModal,
  OrderState
} from './orderSlice';
import { TOrder } from '../../utils/types';

jest.mock('../../utils/burger-api', () => ({
  getOrdersApi: jest.fn(),
  orderBurgerApi: jest.fn()
}));

describe('orderSlice', () => {
  const initialState: OrderState = {
    order: null,
    orderRequest: false,
    orderModalData: null,
    userOrders: [],
    loading: false,
    error: null
  };

  const mockOrder: TOrder = {
    _id: 'order1',
    number: 12345,
    name: 'Тестовый заказ',
    status: 'done',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    ingredients: ['ing1', 'ing2']
  };

  describe('orderBurger', () => {
    it('должен устанавливать orderRequest=true при pending', () => {
      const action = { type: orderBurger.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сохранять заказ при fulfilled', () => {
      const action = {
        type: orderBurger.fulfilled.type,
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toBeDefined();
      expect(state.order).toBeDefined();
    });

    it('должен сохранять ошибку при rejected', () => {
      const action = {
        type: orderBurger.rejected.type,
        error: { message: 'Ошибка создания заказа' }
      };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe('Ошибка создания заказа');
    });
  });

  describe('fetchUserOrders', () => {
    it('должен устанавливать loading=true при pending', () => {
      const action = { type: fetchUserOrders.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('должен сохранять заказы пользователя при fulfilled', () => {
      const action = {
        type: fetchUserOrders.fulfilled.type,
        payload: [mockOrder]
      };
      const state = orderReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.userOrders).toEqual([mockOrder]);
    });

    it('должен сохранять ошибку при rejected', () => {
      const action = {
        type: fetchUserOrders.rejected.type,
        error: { message: 'Ошибка загрузки истории' }
      };
      const state = orderReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки истории');
    });
  });

  describe('closeOrderModal', () => {
    it('должен очищать данные заказа', () => {
      const stateWithOrder = {
        ...initialState,
        orderModalData: mockOrder,
        order: mockOrder
      };
      const action = closeOrderModal();
      const state = orderReducer(stateWithOrder, action);
      expect(state.orderModalData).toBeNull();
      expect(state.order).toBeNull();
    });
  });
});
