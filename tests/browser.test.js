const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

// Här anger vi var testfilen ska hämtas. De konstiga replaceAll-funktionerna ersätter
// mellanslag med URL-säkra '%20' och backslash (\) på Windows med slash (/).
const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});

test('pop on stack removes the latest element', async () => {
    let push = await driver.findElement(By.id('push'));
    await push.click();
    let alert = await driver.switchTo().alert();
    await alert.sendKeys("Test1");
    await alert.accept();

    await push.click();
    alert = await driver.switchTo().alert();
    await alert.sendKeys("Test2");
    await alert.accept();

    let pop = await driver.findElement(By.id('pop'));
    await pop.click();
    alert = await driver.switchTo().alert();
    alertText = await alert.getText();
    expect(alertText).toEqual("Tog bort Test2");
    await alert.accept();

    // Verifiera att det översta elementet nu är "Test1"
    let peek = await driver.findElement(By.id('peek'));
    await peek.click();
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("Test1");
});