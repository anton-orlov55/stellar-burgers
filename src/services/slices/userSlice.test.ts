import userReducer, {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  UserState
} from './userSlice';
import { TUser } from '../../utils/types';

describe('userSlice', () => {
  const initialState: UserState = {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null
  };

  const mockUser: TUser = {
    email: 'test@test.com',
    name: 'Test User'
  };

  describe('registerUser', () => {
    it('должен устанавливать loading=true при pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сохранять пользователя при fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('должен сохранять ошибку при rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'Ошибка регистрации' }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка регистрации');
    });
  });

  describe('loginUser', () => {
    it('должен устанавливать loading=true при pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сохранять пользователя при fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('должен сохранять ошибку при rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Ошибка входа' }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка входа');
    });
  });

  describe('logoutUser', () => {
    it('должен очищать пользователя при fulfilled', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser
      };
      const action = { type: logoutUser.fulfilled.type };
      const state = userReducer(stateWithUser, action);
      expect(state.user).toBeNull();
    });
  });

  describe('getUser', () => {
    it('должен устанавливать loading=true при pending', () => {
      const action = { type: getUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('должен сохранять пользователя при fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('должен сохранять ошибку при rejected', () => {
      const action = {
        type: getUser.rejected.type,
        error: { message: 'Ошибка получения пользователя' }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('Ошибка получения пользователя');
    });
  });

  describe('updateUser', () => {
    it('должен устанавливать loading=true при pending', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('должен обновлять пользователя при fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
    });

    it('должен сохранять ошибку при rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'Ошибка обновления' }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка обновления');
    });
  });
});
