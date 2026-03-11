/// <reference types="cypress" />

describe('Конструктор бургера - добавление ингредиентов', () => {
  it('Должен добавлять ингредиенты в конструктор', () => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
    
    cy.contains('Краторная булка N-200i').parent().find('button').click({ force: true });
    cy.get('[data-cy=constructor-bun-top]').should('exist');
    cy.get('[data-cy=constructor-bun-bottom]').should('exist');
  });
});

describe('Конструктор бургера - модальное окно', () => {
  it('Должен открывать и закрывать модальное окно ингредиента', () => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
    
    cy.contains('Краторная булка N-200i').click({ force: true });
    cy.get('[data-cy=modal]', { timeout: 10000 }).should('exist');
    cy.get('[data-cy=modal]').should('contain', 'Краторная булка N-200i');
    
    cy.get('[data-cy=modal-close]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');

    cy.contains('Биокотлета из марсианской Магнолии').click({ force: true });
    cy.get('[data-cy=modal]', { timeout: 10000 }).should('exist');
    cy.get('[data-cy=modal]').should('contain', 'Биокотлета из марсианской Магнолии');
    
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('Конструктор бургера - создание заказа', () => {
  it('Должен создавать заказ', () => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');

    cy.visit('/');
    cy.wait('@getIngredients', { timeout: 10000 });

    localStorage.setItem('refreshToken', 'fake-refresh-token');
    cy.setCookie('accessToken', 'fake-access-token');

    // Явно ждём появления элементов
    cy.get('[data-cy=constructor-bun-top]').should('not.exist'); // Сначала пусто
    
    cy.contains('Краторная булка N-200i', { timeout: 10000 }).should('be.visible');
    cy.contains('Краторная булка N-200i').parent().find('button').click({ force: true });
    
    cy.get('[data-cy=constructor-bun-top]', { timeout: 10000 }).should('be.visible');
    
    cy.contains('Биокотлета из марсианской Магнолии', { timeout: 10000 }).should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии').parent().find('button').click({ force: true });
    
    cy.get('[data-cy=constructor-ingredient]', { timeout: 10000 }).should('have.length', 1);

    cy.contains('Оформить заказ').click({ force: true });
    
    cy.wait('@createOrder', { timeout: 10000 });

    cy.get('[data-cy=modal]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-cy=order-number]').should('contain', '12345');

    cy.get('[data-cy=modal-close]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor-bun-top]').should('not.exist');
    cy.get('[data-cy=constructor-ingredient]').should('have.length', 0);

    localStorage.clear();
    cy.clearCookie('accessToken');
  });
});
