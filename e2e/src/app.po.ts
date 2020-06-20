import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('h2')).getText() as Promise<string>;
  }
}

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  get loginFormTitle() {
    return element(by.css('h2'));
  }

  get emailField() {
    return element(by.className('email-field'));
  }

  get passwordFeid() {
    return element(by.className('password-field'));
  }

  get loginButton() {
    return element(by.css('button'));
  }

  get errorMessage() {
    return element.all(by.className('invalid-feedback'));
  }

  get authenticationErrorMessage() {
    return element(by.className('auth-error'));
  }

  get dashboardTitle() {
    return element(by.className('dashboard-title'));
  }
}
