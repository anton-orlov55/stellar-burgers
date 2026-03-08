/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
    
    cy.document().then((doc) => {
      const iframe = doc.getElementById('webpack-dev-server-client-overlay');
      if (iframe) iframe.remove();
    });
  });

  it('Должен добавлять ингредиенты в конструктор', () => {
    cy.contains('Краторная булка N-200i').parent().find('button').click({ force: true });
    cy.get('[data-cy=constructor-bun-top]').should('exist');
    cy.get('[data-cy=constructor-bun-bottom]').should('exist');
  });

  it('Должен открывать и закрывать модальное окно ингредиента', () => {
    // Открытие модального окна
    cy.contains('Краторная булка N-200i').click({ force: true });
    cy.get('[data-cy=modal]', { timeout: 10000 }).should('be.visible');
    
    // Закрытие по крестику
    cy.get('[data-cy=modal-close]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');

    // Открываем снова
    cy.contains('Краторная булка N-200i').click({ force: true });
    cy.get('[data-cy=modal]', { timeout: 10000 }).should('be.visible');
    
    // Закрытие по оверлею
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Должен создавать заказ', () => {
    // Устанавливаем фейковые токены
    localStorage.setItem('refreshToken', 'fake-refresh-token');
    cy.setCookie('accessToken', 'fake-access-token');

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');

    // Добавляем булку
    cy.contains('Краторная булка N-200i').parent().find('button').click({ force: true });
    
    // Добавляем начинку
    cy.contains('Биокотлета из марсианской Магнолии').parent().find('button').click({ force: true });

    // Нажимаем "Оформить заказ"
    cy.contains('Оформить заказ').click({ force: true });
    
    // Ждем ответ от сервера
    cy.wait('@createOrder', { timeout: 10000 });

    // Проверяем модальное окно
    cy.get('[data-cy=modal]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-cy=order-number]').should('contain', '12345');

    // Закрываем модальное окно
    cy.get('[data-cy=modal-close]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');

    // Проверяем, что конструктор очистился
    cy.get('[data-cy=constructor-bun-top]').should('not.exist');
    cy.get('[data-cy=constructor-ingredients]').children().should('have.length', 0);

    // Очищаем токены
    localStorage.clear();
    cy.clearCookie('accessToken');
  });
});
