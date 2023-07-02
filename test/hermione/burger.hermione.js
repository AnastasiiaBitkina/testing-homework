const assert = require('assert');

describe('Меню', function () {
    it('должно закрываться', async function () {
        // перейти на страницу
        await this.browser.url('http://localhost:3000/hw/store');
        // установить размер окна
        await this.browser.setWindowSize(500, 3000);

        // кликаем на бургер
        const navigationToggle = await this.browser.$('[aria-label="Toggle navigation"]');
        await navigationToggle.click();

        // даем анимации меню время на то, чтобы полностью отобразиться
        await this.browser.pause(1000);

        // ждем, пока меню не станет видимым
        const navbar = await this.browser.$('.navbar-collapse');
        await navbar.waitForDisplayed({ timeout: 5000 });

        // кликаем на ссылку каталога для открытия
        const catalogLink = await this.browser.$(`[data-testid="nav-link-catalog"]`);
        await catalogLink.click();

        // проверяем, что элемент больше не видим
        const catalogLinkNotVisible = await catalogLink.isDisplayed();
        assert.ok(!catalogLinkNotVisible, 'Элемент все еще видим');
    });
});
