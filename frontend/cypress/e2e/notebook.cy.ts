describe('Notebook App', () => {
    it('successfully loads', () => {
      cy.visit('/'); // Replace with your app's URL
      cy.contains('Hello, frontend').should('be.visible'); // Adjust as per your app's content
    });
  });
  