import { expect, test, describe } from '@jest/globals';
import constructorSliceReducer, {
  addIngredient,
  removeIngredient,
  reorderConstructor
} from './constructorSlice';

const ingredient = {
  _id: '33312',
  name: 'Соус',
  type: 'sauce',
  proteins: 12,
  fat: 112,
  carbohydrates: 212,
  calories: 312,
  price: 1012,
  image: 'sauce.png',
  image_mobile: 'sauce-mobile.png',
  image_large: 'sauce-large.png'
};

const ingredientsBeforeReordered = [
  {
    _id: '33313',
    name: 'Соус',
    type: 'sauce',
    proteins: 13,
    fat: 113,
    carbohydrates: 313,
    calories: 413,
    price: 1013,
    image: 'sauce.png',
    image_large: 'sauce-large.png',
    image_mobile: 'sauce-mobile.png'
  },
  {
    _id: '44412',
    name: 'Кольца',
    type: 'main',
    proteins: 12,
    fat: 112,
    carbohydrates: 212,
    calories: 312,
    price: 1012,
    image: 'rings.png',
    image_large: 'rings-large.png',
    image_mobile: 'rings-mobile.png'
  }
];

const ingredientsAfterReordered = [
  {
    _id: '44413',
    name: 'Кольца',
    type: 'main',
    proteins: 13,
    fat: 113,
    carbohydrates: 213,
    calories: 313,
    price: 1013,
    image: 'rings.png',
    image_large: 'rings-large.png',
    image_mobile: 'rings-mobile.png'
  },
  {
    _id: '33314',
    name: 'Соус',
    type: 'sauce',
    proteins: 13,
    fat: 113,
    carbohydrates: 313,
    calories: 413,
    price: 1013,
    image: 'sauce.png',
    image_large: 'sauce-large.png',
    image_mobile: 'sauce-mobile.png'
  }
];

describe('Синхронные экшены', () => {
  const initialConstructorState = {
    bun: null,
    ingredients: []
  };

  test('Добавление ингредиента', () => {
    const newState = constructorSliceReducer(
      initialConstructorState,
      addIngredient(ingredient)
    );
    const { ingredients } = newState;
    expect(ingredients.length).toBe(1);

    const addedIngredient = ingredients[0];
    expect(addedIngredient._id).toBe(ingredient._id);
    expect(addedIngredient.name).toBe(ingredient.name);
    expect(addedIngredient.type).toBe(ingredient.type);
    expect(addedIngredient.proteins).toBe(ingredient.proteins);
    expect(addedIngredient.fat).toBe(ingredient.fat);
    expect(addedIngredient.carbohydrates).toBe(ingredient.carbohydrates);
    expect(addedIngredient.calories).toBe(ingredient.calories);
    expect(addedIngredient.price).toBe(ingredient.price);
    expect(addedIngredient.image).toBe(ingredient.image);
    expect(addedIngredient.image_mobile).toBe(ingredient.image_mobile);
    expect(addedIngredient.image_large).toBe(ingredient.image_large);
  });

  test('Изменение порядка ингредиентов в начинке', () => {
    const newState = constructorSliceReducer(
      {
        bun: null,
        ingredients: ingredientsBeforeReordered
      },
      reorderConstructor({ from: 0, to: 1 })
    );
    const { ingredients } = newState;

    expect(ingredients).toEqual(ingredientsAfterReordered);
  });

  test('Удаление ингредиента', () => {
    const newState = constructorSliceReducer(
      initialConstructorState,
      removeIngredient(ingredient)
    );

    const { ingredients } = newState;

    expect(ingredients.length).toBe(0);

    expect(newState).toEqual(initialConstructorState);
  });
});
