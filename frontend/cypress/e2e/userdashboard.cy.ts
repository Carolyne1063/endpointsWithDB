describe('User Dashboard Test', () => {
    beforeEach(() => {
      // Assume the user is logged in
      cy.visit('/login');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
    });
  
    it('should display user notebooks', () => {
      cy.visit('/userdashboard');
      cy.contains('Your Notebooks').should('be.visible');
      cy.get('.notebook').should('have.length.greaterThan', 0);
    });
  
    it('should create a new notebook', () => {
      cy.visit('/userdashboard');
      cy.get('button#create-notebook').click();
      cy.get('input[name="title"]').type('New Notebook');
      cy.get('textarea[name="body"]').type('This is a new notebook.');
      cy.get('button[type="submit"]').click();
      cy.contains('New Notebook').should('be.visible');
    });
  
    it('should edit an existing notebook', () => {
      cy.visit('/userdashboard');
      cy.contains('Edit').first().click();
      cy.get('input[name="title"]').clear().type('Updated Notebook');
      cy.get('textarea[name="body"]').clear().type('This is an updated notebook.');
      cy.get('button[type="submit"]').click();
      cy.contains('Updated Notebook').should('be.visible');
    });
  
    it('should delete a notebook', () => {
      cy.visit('/userdashboard');
      cy.contains('Delete').first().click();
      cy.contains('Notebook deleted').should('be.visible');
    });
  });
  