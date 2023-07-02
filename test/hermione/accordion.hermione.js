const { assert } = require('chai');

describe('Адаптивность вёрстки', function() {
    it('должна соответствовать требованиям при ширине экрана 500px', function() {
        return this.browser.url('http://localhost:3000/hw/store')
            .setWindowSize(500, 800)
            .waitForVisible('.navbar-toggler')
            .isVisible('.navbar-toggler')
            .then((isBurgerVisible) => {
                assert.isTrue(isBurgerVisible, 'Гамбургер должен быть видим при ширине 500px');
            });
    });
});

describe('Меню "гамбургера"', function() {
    it('должно закрываться при выборе элемента', function() {
        return this.browser.url('http://localhost:3000/hw/store')
            .setWindowSize(500, 800)
            .click('.navbar-toggler')
            .waitForVisible('.nav-link')
            .click('.nav-link')
            .waitForVisible('.navbar-collapse.collapse')
            .isVisible('.navbar-collapse.collapse')
            .then((isBurgerMenuCollapsed) => {
                assert.isTrue(isBurgerMenuCollapsed, 'Меню "гамбургера" должно быть скрыто после выбора элемента');
            });
    });
});
