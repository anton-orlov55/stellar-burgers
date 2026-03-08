/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  it('Должен добавлять ингредиенты в конструктор', () => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
    
    cy.document().then((doc) => {
      const iframe = doc.getElementById('webpack-dev-server-client-overlay');
      if (iframe) iframe.remove();
    });

    cy.contains('Краторная булка N-200i').parent().find('button').click({ force: true });
    cy.get('[data-cy=constructor-bun-top]').should('exist');
    cy.get('[data-cy=constructor-bun-bottom]').should('exist');
  });

  it('Должен открывать и закрывать модальное окно ингредиента', () => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
    
    cy.document().then((doc) => {
      const iframe = doc.getElementById('webpack-dev-server-client-overlay');
      if (iframe) iframe.remove();
    });

    cy.contains('Краторная булка N-200i').click({ force: true });
    cy.get('[data-cy=modal]', { timeout: 10000 }).should('exist');
    cy.get('[data-cy=modal-close]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Должен создавать заказ', () => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
    
    cy.wait('@getIngredients');
    
    cy.document().then((doc) => {
      const iframe = doc.getElementById('webpack-dev-server-client-overlay');
      if (iframe) iframe.remove();
    });

    
    cy.contains('Краторная булка N-200i').parent().find('button').click({ force: true });
    
    
    cy.contains('Биокотлета из марсианской Магнолии').parent().find('button').click({ force: true });

    
    cy.contains('Оформить заказ').click({ force: true });
    
    
    cy.wait('@createOrder', { timeout: 10000 });

    
    cy.get('[data-cy=modal]', { timeout: 10000 }).should('exist');
    cy.get('[data-cy=order-number]').should('contain', '12345');

    
    cy.get('[data-cy=modal-close]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
