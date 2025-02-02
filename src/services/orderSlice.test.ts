import { expect, test, describe } from '@jest/globals';
import orderReducer, { initialState } from './orderSlice';

const orderArray = [
  {
    _id: '88812',
    ingredients: [
      '44412',
      '44412',
      '44413',
      '44412',
      '44413',
      '44413',
      '44414',
      '44414'
    ],
    status: 'done',
    name: 'Бургер',
    createdAt: '2025-02-02',
    updatedAt: '2025-02-02',
    number: 88890
  },
  {
    _id: '88813',
    ingredients: ['44412', '44413', '44412', '44413', '44414', '44414'],
    status: 'done',
    name: 'Бургер',
    createdAt: '2025-02-02',
    updatedAt: '2025-02-02',
    number: 88891
  }
];

const orderResponse = {
  success: true,
  name: 'Бургер био',
  order: { number: 88892 }
};

describe('Заказ', () => {
  test('Процесс загрузки', () => {
    expect(
      orderReducer(initialState, {
        type: 'order/orderBurgerThunk/pending'
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
      orderRequest: true
    });
  });

  test('Данные загружены', () => {
    expect(
      orderReducer(initialState, {
        type: 'order/orderBurgerThunk/fulfilled',
        payload: orderResponse
      })
    ).toEqual({
      ...initialState,
      orderModalData: orderResponse.order,
      name: orderResponse.name,
      isLoading: false,
      orderRequest: false
    });
  });

  test('Ошибка при загрузке', () => {
    const errorMessage = 'Не удалось загрузить заказы';
    expect(
      orderReducer(initialState, {
        type: 'order/orderBurgerThunk/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      ...initialState,
      error: errorMessage,
      isLoading: false,
      orderRequest: false
    });
  });

  test('Процесс загрузки', () => {
    expect(
      orderReducer(initialState, {
        type: 'order/getOrdersThunk/pending'
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
      orderRequest: true,
      error: null
    });
  });

  test('Данные загружены', () => {
    expect(
      orderReducer(initialState, {
        type: 'order/getOrdersThunk/fulfilled',
        payload: orderArray
      })
    ).toEqual({
      ...initialState,
      orders: orderArray,
      isLoading: false,
      error: null
    });
  });

  test('Ошибка при загрузке', () => {
    const errorMessage = 'Не удалось загрузить заказы';
    expect(
      orderReducer(initialState, {
        type: 'order/getOrdersThunk/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: errorMessage
    });
  });

  test('Процесс загрузки', () => {
    expect(
      orderReducer(initialState, {
        type: 'order/getOrderByNumberThunk/pending'
      })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  const orderByNumberResponse = {
    success: true,
    orders: [orderArray[0]]
  };

  test('Данные загружены', () => {
    expect(
      orderReducer(initialState, {
        type: 'order/getOrderByNumberThunk/fulfilled',
        payload: orderByNumberResponse
      })
    ).toEqual({
      ...initialState,
      orderByNumber: orderArray[0],
      isLoading: false
    });
  });

  test('Ошибка при загрузке', () => {
    const errorMessage = 'Не удалось загрузить заказы';
    expect(
      orderReducer(initialState, {
        type: 'order/getOrderByNumberThunk/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      orderByNumberError: errorMessage
    });
  });
});
