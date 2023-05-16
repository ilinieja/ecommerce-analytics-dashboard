import {getAppUrl} from '../utils/url';

describe('Overview page', () => {
    it('displays overview dashboard', () => {
        cy.visit(`http://localhost:3001/overview`);

        cy.wait(1000);

        cy.compareSnapshot('overview');
    });
})
