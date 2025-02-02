import { expect, test, describe } from '@jest/globals';

import ingredientReducer, { initialState } from './ingredientSlice';

const ingredientArray = [
  {
    _id: '77712',
    name: 'Булка',
    type: 'bun',
    proteins: 12,
    fat: 112,
    carbohydrates: 212,
    calories: 312,
    price: 1012,
    image: 'bun.png',
    image_large: 'bun-large.png',
    image_mobile: 'bun-mobile.png'
  },
  {
    _id: '77713',
    name: 'Котлета',
    type: 'main',
    proteins: 13,
    fat: 113,
    carbohydrates: 213,
    calories: 313,
    price: 413,
    image: 'beef.png',
    image_large: 'beef-large.png',
    image_mobile: 'beef-mobile.png'
  },
  {
    _id: '77714',
    name: 'Филе',
    type: 'main',
    proteins: 14,
    fat: 114,
    carbohydrates: 214,
    calories: 314,
    price: 1014,
    image: 'beef.png',
    image_large: 'beef-large.png',
    image_mobile: 'beef-mobile.png'
  },
  {
    _id: '77715',
    name: 'Соус',
    type: 'sauce',
    proteins: 15,
    fat: 115,
    carbohydrates: 215,
    calories: 315,
    price: 1015,
    image: 'sauce.png',
    image_large: 'sauce-large.png',
    image_mobile: 'sauce-mobile.png'
  }
];

describe('Ингредиенты', () => {
  test('Процесс загрузки', () => {
    expect(
      ingredientReducer(initialState, {
        type: 'ingredient/fetchIngredients/pending'
      })
    ).toEqual({
      data: [],
      isLoading: true,
      error: null
    });
  });

  test('Данные загружены', () => {
    expect(
      ingredientReducer(initialState, {
        type: 'ingredient/fetchIngredients/fulfilled',
        payload: ingredientArray
      })
    ).toEqual({
      data: ingredientArray,
      isLoading: false,
      error: null
    });
  });

  test('Ошибка при загрузке', () => {
    const errorMessage = 'Не удалось загрузить ингредиенты';
    expect(
      ingredientReducer(initialState, {
        type: 'ingredient/fetchIngredients/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      data: [],
      isLoading: false,
      error: errorMessage
    });
  });
});
