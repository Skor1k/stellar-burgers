describe('Проверяем доступность', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('Сервис должен быть доступен по адресу localhost:4000', () => {
    cy.visit('/');
  });

  it('Добавление булки', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=constructor-bun-1]')
      .contains('ingredient1 (верх)')
      .should('exist');

    cy.get('[data-cy=constructor-bun-2]')
      .contains('ingredient1 (низ)')
      .should('exist');
  });

  it('Добавление ингредиентов', () => {
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=constructor-ingredients]')
      .contains('ingredient2')
      .should('exist');

    cy.get('[data-cy=constructor-ingredients]')
      .contains('ingredient4')
      .should('exist');
  });
});

describe('Проверка модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('Открытие модальнго окна', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('ingredient1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('ingredient1').should('exist');
  });

  it('Закрытие модальнго окна на крестик', () => {
    cy.contains('ingredient1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=close-icon]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрытие модальнго окна по клику на оверлей', () => {
    cy.contains('ingredient1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('right', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );

    window.localStorage.setItem(
      'accessToken',
      JSON.stringify('test-accessToken')
    );

    cy.visit('/');
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it('Добавление ингредиентов и создание заказа', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=order-summ]')
      .contains('Оформить заказ')
      .should('exist')
      .click();

    cy.wait('@order')
      .its('request.body')
      .should('deep.equal', { ingredients: ['1', '2', '4', '1'] });

    cy.get('[data-cy=order-number]').contains('77714').should('exist');

    cy.get('[data-cy=close-icon]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=constructor-bun-1]').should('not.exist');
    cy.get('[data-cy=constructor-bun-2]').should('not.exist');
    cy.get('[data-cy=constructor-ingredients]').should('not.exist');
  });
});
