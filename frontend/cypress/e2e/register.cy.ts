describe('Registration Test', () => {
    it('should register a new user', () => {
      cy.visit('/register');
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/login');
      cy.contains('Registration successful').should('be.visible');
    });
  });
  