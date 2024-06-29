describe('Login Test', () => {
    it('should login successfully with valid credentials', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/userdashboard');
    });
  
    it('should show an error message with invalid credentials', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('wronguser@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid credentials').should('be.visible');
    });
  });
  