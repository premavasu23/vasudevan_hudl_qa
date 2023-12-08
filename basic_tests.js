const { Builder, By, Key} = require("selenium-webdriver");
const assert = require("assert");

// const (Builder) = require ("selenium-webdriver");

async function basic_login_setup(driver, email, pass) {

    // navigate to website
    await driver.get("https://www.hudl.com/");

    // click Log In dropdown
    const loginDropdown = await driver.findElement(By.css('.mainnav__item[data-qa-id="login-select"]'));
    await loginDropdown.click();

    // click hudl to nav to login form
    const hudlLoginItem = await driver.findElement(By.css('a[data-qa-id="login-hudl"]'));
    await hudlLoginItem.click();

    // type email into "Email" input box
    const emailInput = await driver.findElement(By.id("email"));
    await emailInput.sendKeys(email);

    // type pass into "Password" input box
    const passInput = await driver.findElement(By.id("password"));
    await passInput.sendKeys(pass, Key.RETURN);

    // wait for 10 seconds for things to load
    await new Promise(resolve => setTimeout(resolve, 10000));

    // // assert
    // const expectedURL = "https://www.hudl.com/home";
    // const currentURL = await driver.getCurrentUrl();
    
    // assert.strictEqual(currentURL, expectedURL);
    // console.log(currentURL + " " + expectedURL + "\n\n");
    // console.log(assert.strictEqual(currentURL, expectedURL))

    // // close the browswer
    // await driver.quit();

}

async function test_valid_creds(email, pass) {

    // set up
    let driver = await new Builder().forBrowser("chrome").build();

    // execute
    await basic_login_setup(driver, email, pass)

    // assert
    const expectedURL = "https://www.hudl.com/home";
    const currentURL = await driver.getCurrentUrl();

    assert.strictEqual(currentURL, expectedURL);
    console.log("___\nTest Valid Credentials\nExpected URL: " + expectedURL + "\nActual URL: " + currentURL + "\n___");

    // close the driver
    await driver.quit();
}

async function test_invalid_creds_url(email, pass) {

    // set up
    let driver = await new Builder().forBrowser("chrome").build();

    // execute
    await basic_login_setup(driver, email, pass)

    // assert
    const expectedURL = "https://www.hudl.com/home";
    const currentURL = await driver.getCurrentUrl();

    assert.notStrictEqual(currentURL, expectedURL);
    console.log("___\nTest Invalid Credentials\n\Actual URL: " + currentURL + "\nShould Not Equal URL: " + expectedURL + "\n___");

    // close the driver
    await driver.quit();
}

async function test_invalid_creds_error_message(email, pass) {

    // set up
    let driver = await new Builder().forBrowser("chrome").build();

    // execute
    await basic_login_setup(driver, email, pass)

    // find the error message
    const errorElement = await driver.findElement(By.className("error-container"));

    // assert
    const expectedErrorTest = "We don't recognize that email and/or password";
    const elementText = await errorElement.getText();

    assert.strictEqual(elementText, expectedErrorTest);
    console.log("___\nTest Invalid Credentials return Error Message\n\nExpected Error Text: " + expectedErrorTest + "\nActual Error Text: " + elementText + "\n___");

    // close the driver
    await driver.quit();
}

// load in credentials from credentials.json file
let { corr_email, corr_pass, incorr_email, incorr_pass } = require("./credentials.json");

// Test valid credentials lead to the home page
test_valid_creds(corr_email, corr_pass);

// test invalid email and password don't lead to home page
test_invalid_creds_url(incorr_email, incorr_pass);

// test invalid email but valid password don't lead to home page
test_invalid_creds_url(incorr_email, corr_pass);

// test valid email but invalid password don't lead to home page
test_invalid_creds_url(corr_email, incorr_pass);

// test invalid email and password show the user the correct error message
test_invalid_creds_error_message(incorr_email, incorr_pass);

// test invalid email but valid password shows correct error message
test_invalid_creds_url(incorr_email, corr_pass);

// test valid email but invalid password shows correct error message
test_invalid_creds_url(corr_email, incorr_pass);