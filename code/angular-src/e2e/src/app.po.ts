import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-home h1')).getText() as Promise<string>;
  }

  getRegisterButton() {
    return element(by.name('register'));
  }

  getLoginButton() {
    return element(by.id('login'));
  }

 getLoginTitleText() {
    return element(by.css('app-login h1')).getText();
  }

getRegistrationTitleText() {
  return element(by.css('app-register h1')).getText();
}

getNameTextbox() {
  return element(by.id('name'));
 }

 getUsernameTextbox() {
  return element(by.name('username'));
 }

 getEmailTextbox() {
  return element(by.id('email'));
 }

 getPasswordTextbox() {
  return element(by.id('password'));
 }



getForm() {
  return element(by.css('form'));
}

}
