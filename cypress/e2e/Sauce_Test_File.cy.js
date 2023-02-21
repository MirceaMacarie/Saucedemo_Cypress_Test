describe ('Different test cases on Saucedemo', () => {

    //Access the website www.saucedemo.com
    it('Saucedemo testing functions', () => {
        cy.visit('https://www.saucedemo.com/v1/inventory.html');
        cy.get('.bm-burger-button').click();
        cy.get('#logout_sidebar_link').click();
        cy.wait(3000);


        //Verify the login with wrong username and correct password
        cy.get('#user-name').type('stand_user'); //typing stand_user instead of standard_user
        cy.get('#password').type('secret_sauce'); //correct password
        cy.get('#login-button').type('{enter}');
        cy.get('[data-test="error"]').should('exist');
        cy.wait(500);


        //Verify the login with correct credentials
        cy.reload();
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').type('{enter}');
        cy.get('.product_label').should('exist');
        cy.wait(500);


        //Verify the logout function
        cy.get('.bm-burger-button > button').click();
        cy.get('#logout_sidebar_link').click();
        cy.get('#login-button').should('exist');
        cy.wait(500);


        //Access the user account and verify the side menu
        cy.get('#user-name').type('standard_user'); //Login on the website
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').type('{enter}');

        cy.get('.bm-burger-button > button').click(); //Open the menu and verify the assertion
        cy.get('.bm-menu').should('exist');
        cy.wait(500);
        cy.get('.bm-cross-button > button').click(); //Close the menu and verify the assertion
        cy.get('.bm-menu').should('not.be.visible');


        //Verify if you can add a product to cart
        cy.get(':nth-child(1) > .pricebar > .btn_primary').should('exist'); //Select a product and add it to cart
        cy.get(':nth-child(1) > .pricebar > .btn_primary').click();

        cy.get('.shopping_cart_link').click(); //Open the cart and verify if the product was added
        cy.get('.item_pricebar > .btn_secondary').should('exist');
        cy.wait(500);


        //Verify if you can delete a product from cart
        cy.get('.item_pricebar > .btn_secondary').click();
        cy.get('.item_pricebar > .btn_secondary').should('not.exist');
        cy.wait(500);


        //Add a product to cart and check all the steps for ordering it
        cy.get('.btn_secondary').click(); //Return to shop and add a product to cart
        cy.get(':nth-child(1) > .pricebar > .btn_primary').click();
        cy.get('.shopping_cart_link').click();

        cy.get('.btn_action').click(); //Click checkout button and verify the steps
        cy.get('[data-test="firstName"]').type('Gabriel'); //Complete the firstname, the lastname and postal Code
        cy.wait(500);
        cy.get('[data-test="lastName"]').type('Florescu');
        cy.wait(500);
        cy.get('[data-test="postalCode"]').type('123456');
        cy.wait(500);
        cy.get('.btn_primary').click();
        cy.get('.btn_action').should('exist');
        cy.get('.btn_action').click();
        cy.get('.complete-text').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get\n                there!\n            ');
        cy.wait(500);


        //Verify and access the page with product details
        cy.get('.bm-burger-button > button').click();
        cy.get('#inventory_sidebar_link').click();
        cy.get('#item_4_title_link > .inventory_item_name').click();
        cy.get('.inventory_details_desc_container').should('exist');
        cy.wait(500);


        //Verify if the 'Back to products' button from the page with product details works properly
        cy.get('.inventory_details_back_button').should('exist');
        cy.get('.inventory_details_back_button').click({ force: true });
        cy.get('.product_label').should('exist');
        cy.wait(500);

        
        //Verify the Sort button
        cy.get('.product_sort_container').should('exist'); //Verify if Sort button exist, then select the option 'Name (Z to A)'
        cy.get('.product_sort_container').select('za');
        cy.get('#item_3_title_link').should('have.text', 'Test.allTheThings() T-Shirt (Red)')
        
    });
})