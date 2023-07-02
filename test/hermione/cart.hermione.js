const assert = require('assert');

const ha = require('hermione').asyncAssert;

describe('TestOrderMessage', function () {
    it('should confirm the order', async function () {
        // перейти на страницу
        await this.browser.url('http://localhost:3000/hw/store/catalog');

        // найти все элементы ProductItem на странице
        const productItems = await this.browser.$$('.ProductItem');

        // выбрать первый товар
        const firstProduct = productItems[0];

        // кликнуть на ссылку деталей первого товара
        const productDetailsLink = await firstProduct.$('.ProductItem-DetailsLink');
        await productDetailsLink.click();

        // кликнуть на кнопку "Add to Cart"
        const addToCartButton = await this.browser.$('.ProductDetails-AddToCart');
        await addToCartButton.click();


        // кликнуть на кнопку добавления товара
        await addToCartButton.click();

        // const messageClass = await browser.getAttribute('.Cart .Cart-Message', 'class');
        //assert.ok(messageClass.includes('success'), 'Product was not successfully added to cart');

        // перейти в корзину
        const viewCartButton = await this.browser.$('[data-testid="nav-link-cart"]');
        await viewCartButton.click();

        // Заполнение формы заказа
        const nameInput = await this.browser.$('#f-name');
        await nameInput.setValue('John Doe');

        const phoneInput = await this.browser.$('#f-phone');
        await phoneInput.setValue('1234567890');

        const addressInput = await this.browser.$('#f-address');
        await addressInput.setValue('123 Main St');

        // Нажатие на кнопку оформления заказа
        const submitButton = await this.browser.$('.Form-Submit');
        await submitButton.click();


        // подождать, пока появится сообщение об успешном заказе
        const successMessageSelector = '.Cart .Cart-SuccessMessage.alert-success';
        await this.browser.waitUntil(async () => {
            const successMessageElement = await this.browser.$(successMessageSelector);
            return successMessageElement.isDisplayed();
        }, { timeout: 5000 });
        

        // проверить класс сообщения об успешном заказе
        const successMessageElement = await this.browser.$(successMessageSelector);
        const successMessageClass = await successMessageElement.getAttribute('class');
        assert.ok(successMessageClass.includes('alert-success'), 'Incorrect order success message class');        

    });
});
