const { assert } = require('chai');

describe('microsoft', async function() {
    it('Тест, который пройдет', async function() {
        await this.browser.url('http://localhost:3000/hw/store?bug_1');
        await browser.assertView('plain', '.button');

        const title = await this.browser.$('').getText();
        assert.equal(title, 'Microsoft');
    });
});
