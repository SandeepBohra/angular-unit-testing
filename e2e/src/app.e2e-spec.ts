import { AppPage, LoginPage } from './app.po';
import { browser, logging, protractor } from 'protractor';

describe('Angular-unit-testing App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Sign In');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

describe('Login page tests', () => {
  let page: LoginPage;
  const expectedConditions = protractor.ExpectedConditions;
  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('should show login form and the title of the page as Sign In, should have form, fields and button', () => {
    page.navigateTo();
    expect(page.loginFormTitle.getText()).toEqual('Sign In');
    expect(page.loginButton.getText()).toEqual('Login');
    browser.sleep(3000);
  });

  it('should display email is required message if the email is left blank', () => {
    page.emailField.sendKeys('');
    page.passwordFeid.sendKeys('asdadad');
    page.loginButton.click();
    browser.wait(expectedConditions.visibilityOf(page.errorMessage.first()));
    expect(page.errorMessage.first().getText()).toEqual('Email is required');
    browser.sleep(3000);
  });

  it('should display password is required message if the password is left blank', () => {
    page.emailField.sendKeys('asdadad');
    page.passwordFeid.sendKeys('');
    page.loginButton.click();
    browser.wait(expectedConditions.visibilityOf(page.errorMessage.first()));
    expect(page.errorMessage.first().getText()).toEqual('Password is required');
    browser.sleep(3000);
  });

  it('should result into an authentication error with invalid email/password', () => {
    page.emailField.sendKeys('asdadad');
    page.passwordFeid.sendKeys('asdadad');
    page.loginButton.click();
    browser.wait(expectedConditions.visibilityOf(page.authenticationErrorMessage));
    expect(page.authenticationErrorMessage.getText()).toEqual('user not found');
    browser.sleep(3000);
  });

  it('should login successfully on entering valid credentials and move to dashboard', () => {
    page.emailField.sendKeys('eve.holt@reqres.in');
    page.passwordFeid.sendKeys('cityslicka');
    page.loginButton.click();
    browser.wait(expectedConditions.visibilityOf(page.dashboardTitle));
    expect(page.dashboardTitle.getText()).toEqual('Welcome to Dashboard!!');
    browser.sleep(3000);
  });
});
