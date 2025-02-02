import { expect, test, describe } from '@jest/globals';
import feedReducer, { initialState } from './feedSlice';

const feedArray = [
  {
    _id: '33312',
    ingredients: [
      '44413',
      '44413',
      '44414',
      '44413',
      '44414',
      '44414',
      '44414',
      '44414'
    ],
    status: 'done',
    name: 'Метеоритный бургер',
    createdAt: '2025-02-02',
    updatedAt: '2025-02-02',
    number: 77713
  },
  {
    _id: '67930448133acd001be4c613',
    ingredients: ['44413', '44414', '44413', '44414', '44414', '44414'],
    status: 'done',
    name: 'Метеоритный бургер',
    createdAt: '2025-02-02',
    updatedAt: '2025-02-02',
    number: 77714
  },
  {
    _id: '33314',
    ingredients: ['44414', '44415', '44415', '44415', '44414'],
    status: 'done',
    name: 'Марсианский бургер био',
    createdAt: '2025-02-02',
    updatedAt: '2025-02-02',
    number: 77715
  },
  {
    _id: '33315',
    ingredients: ['44414', '44415', '44414'],
    status: 'done',
    name: 'Бургер',
    createdAt: '2025-02-02',
    updatedAt: '2025-02-02',
    number: 77716
  }
];

describe('Подача', () => {
  test('Процесс загрузки', () => {
    expect(
      feedReducer(initialState, {
        type: 'feed/fetchFeeds/pending'
      })
    ).toEqual({
      orders: [],
      isLoading: true,
      error: null,
      total: 0,
      totalToday: 0
    });
  });

  const feedResponse = {
    orders: feedArray,
    total: 4,
    totalToday: 4
  };

  test('Ошибка при загрузке', () => {
    const errorMessage = 'Не удалось загрузить заказы';
    expect(
      feedReducer(initialState, {
        type: 'feed/fetchFeeds/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      orders: [],
      isLoading: false,
      error: errorMessage,
      total: 0,
      totalToday: 0
    });
  });

  test('Данные загружены', () => {
    expect(
      feedReducer(initialState, {
        type: 'feed/fetchFeeds/fulfilled',
        payload: feedResponse
      })
    ).toEqual({
      orders: feedArray,
      isLoading: false,
      error: null,
      total: 4,
      totalToday: 4
    });
  });
});
