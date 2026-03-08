import { store } from './store';

describe('rootReducer', () => {
  it('должен инициализироваться с правильной структурой', () => {
    const state = store.getState();
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('order');
  });
});
