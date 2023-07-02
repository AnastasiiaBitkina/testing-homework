const { assert } = require('chai');

describe('microsoft', async function() {
    it('Тест, который пройдет', async function() {
        await this.browser.url('http://localhost:3000/hw/store');
        await this.browser.assertView('plain', '.button');

        const title = await this.browser.$(`[data-testid=“BrandLink”]`).getText();
        assert.equal(title, 'Example store');
    });
});