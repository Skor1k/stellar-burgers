import { rootReducer } from './store';
import { expect, describe, test } from '@jest/globals';
import { initialState as constructorSlice } from './constructorSlice';
import { initialState as feed } from './feedSlice';
import { initialState as ingredients } from './ingredientSlice';
import { initialState as order } from './orderSlice';
import { initialState as user } from './userSlice';

describe('rootReducer', () => {
  test('Должен инициализироваться и возвращать исходное состояние', () => {
    const initAction = { type: 'init' };
    const state = rootReducer(undefined, initAction);

    expect(state).toEqual({
      ingredients,
      constructorSlice,
      user,
      feed,
      order
    });
  });
});
