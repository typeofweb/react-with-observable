/// <reference types="cypress" />
/// <reference types="chai" />

describe('TypeScript', () => {
  it('works', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'react-with-observable — examples');
  });

  it('should display hello, world', () => {
    cy.visit('/');
    cy.get('#example-1').contains('Hello, world!');
  });

  it('should display new number every second', () => {
    cy.visit('/');
    cy.get('#example-2').contains('1');
    cy.wait(1000);
    cy.get('#example-2').contains('2');
    cy.wait(1000);
    cy.get('#example-2').contains('3');
  });

  it('should have input with a new value every second', () => {
    cy.visit('/');
    cy.get('#example-3 input').should('have.value', '0');
    cy.wait(1000);
    cy.get('#example-3 input').should('have.value', '10');
    cy.wait(1000);
    cy.get('#example-3 input').should('have.value', '30');
    cy.wait(1000);
    cy.get('#example-3 input').should('have.value', '60');
  });

  it('should fetch and display contacts', () => {
    let totalContacts = 0;

    cy.server();
    cy.route({
      url: 'api/**',
      method: 'GET',
    }).as('getContacts');

    function countContacts(xhr: Cypress.WaitXHR): number {
      const pattern = /\/\?results=(\d+)/;
      const res = xhr.url.match(pattern);

      const usersCount = Number(res && res[1]);
      return usersCount;
    }

    function assertContacts(xhr: Cypress.WaitXHR) {
      const usersCount = countContacts(xhr);
      totalContacts += usersCount;

      expect(usersCount)
        .to.be.at.least(3)
        .and.at.most(5);

      cy.get('.current-contacts ul li').should('have.length', usersCount);
      cy.get('.all-contacts ul li').should('have.length', totalContacts);
    }

    cy.visit('/');

    cy.get('.current-contacts').contains('Loading…');
    cy.get('.all-contacts').contains('Loading…');

    cy.wait(1000);
    // setTimeout
    cy.get('.current-contacts').contains('No contacts.');
    cy.get('.all-contacts').contains('No contacts.');

    // trigger first fetch
    cy.get('#example-contacts button').click({ force: true });
    cy.get('.current-contacts').contains('Loading…');
    cy.get('.all-contacts').contains('No contacts.');

    cy.wait('@getContacts').then(xhr => {
      assertContacts(xhr);

      // trigger second fetch
      cy.get('#example-contacts button').click({ force: true });
      cy.get('.current-contacts').contains('Loading…');
      cy.get('.all-contacts ul li').should('have.length', totalContacts);

      cy.wait('@getContacts').then(xhr => {
        assertContacts(xhr);
      });
    });
  });
});
