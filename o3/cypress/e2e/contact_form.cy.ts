describe('template spec', () => {
  it('Default case', () => {
    cy.visit('localhost:4173/kontakt')
    cy.get('[data-testid="f_name"]').should('be.empty');
    cy.get('[data-testid="f_email"]').should('be.empty');
    cy.get('[data-testid="f_msg"]').should('be.empty');
    cy.get('[data-testid="f_button"]').should('not.be.disabled');
  })

  it('Only name', () => {
    const name = 'Håkon F. Fjellanger';

    cy.visit('localhost:4173/kontakt')
    cy.get('[data-testid="f_name"]').type(name);
    
    cy.get('[data-testid="f_button"]').click();
    
    cy.get('[data-testid="f_name"]').should('have.value', name);
    cy.get('[data-testid="f_email"]').should('be.empty');
    cy.get('[data-testid="f_msg"]').should('be.empty');
  })

  it('Only email', () => {
    const email = 'hfredrif@gmail.com';

    cy.visit('localhost:4173/kontakt')
    cy.get('[data-testid="f_email"]').type(email);
    
    cy.get('[data-testid="f_button"]').click();
    
    cy.get('[data-testid="f_name"]').should('be.empty');
    cy.get('[data-testid="f_email"]').should('have.value', email);
    cy.get('[data-testid="f_msg"]').should('be.empty');
  })

  it('Only message', () => {
    const msg = 'This is a short little message just to say hi :3'

    cy.visit('localhost:4173/kontakt')
    cy.get('[data-testid="f_msg"]').type(msg);
    
    cy.get('[data-testid="f_button"]').click();
    
    cy.get('[data-testid="f_name"]').should('be.empty');
    cy.get('[data-testid="f_email"]').should('be.empty');
    cy.get('[data-testid="f_msg"]').should('have.value', msg);
  })

  it('Complete process', () => {
    cy.visit('localhost:4173/kontakt')
    cy.get('[data-testid="f_name"]').type('Håkon F. Fjellanger');
    cy.get('[data-testid="f_email"]').type('hfredrif@gmail.com');
    cy.get('[data-testid="f_msg"]').type('This is a short little message just to say hi :3');

    cy.get('[data-testid="f_button"]').click();
    
    cy.get('[data-testid="f_name"]').should('be.empty');
    cy.get('[data-testid="f_email"]').should('be.empty');
    cy.get('[data-testid="f_msg"]').should('be.empty');
  })
})