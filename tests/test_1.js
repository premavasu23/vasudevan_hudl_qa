const { Builder, By, Key} = require("selenium-webdriver");
const assert = require("assert");

// const (Builder) = require ("selenium-webdriver");

async function test_1(email, pass) {

    // launch the browser
    let driver = await new Builder().forBrowser("chrome").build();

    // navigate to website
    await driver.get("https://www.hudl.com/");

    // click Log In dropdown
    const loginDropdown = await driver.findElement(By.css('.mainnav__item[data-qa-id="login-select"]'));
    await loginDropdown.click();

    // click hudl to nav to login form
    const hudlLoginItem = await driver.findElement(By.css('a[data-qa-id="login-hudl"]'));
    await hudlLoginItem.click();

    // load in credentials from JSON file
    let { email, pass } = require("../credentials.json");

    // type email into "Email" input box
    const emailInput = await driver.findElement(By.id("email"));
    await emailInput.sendKeys(email);

    // type pass into "Password" input box
    const passInput = await driver.findElement(By.id("password"));
    await passInput.sendKeys(pass, Key.RETURN);

    // wait for 10 seconds for things to load
    await new Promise(resolve => setTimeout(resolve, 10000));

    // assert
    const expectedURL = "https://www.hudl.com/home";
    const currentURL = await driver.getCurrentUrl();
    
    assert.strictEqual(currentURL, expectedURL);


    // close the browswer
    await driver.quit();

}

test_1();