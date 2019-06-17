import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Put A Soc In It');
  });

  it('should display Register and Login Buttons', () => {
    expect(page.getRegisterButton().getText()).toEqual('Register');
    expect(page.getLoginButton().getText()).toEqual('Login');
  });

  it('should route to login page', () => {
    page.navigateTo();
    page.getLoginButton().click();
    expect(page.getLoginTitleText()).toEqual('Login');
  });


  it('should route to Registration page', () => {
    page.navigateTo();
    page.getRegisterButton().click();
    expect(page.getRegistrationTitleText()).toEqual('Register');
  });


  it('should route to Login page', () => {
    page.navigateTo();
    page.getLoginButton().click();
    expect(page.getLoginTitleText()).toEqual('Login');
  });

  it('should route to Login page', () => {
    page.navigateTo();
    page.getLoginButton().click();
    expect(page.getLoginTitleText()).toEqual('Login');
  });

  it('Should be valid login', () => {
    page.navigateTo();
    page.getLoginButton().click();
    page.getUsernameTextbox().sendKeys('test');
    page.getPasswordTextbox().sendKeys('test');
    let form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-valid');
   });

  it('Should be valid Register', () => {
    page.navigateTo();
    page.getRegisterButton().click();
    page.getEmailTextbox().sendKeys('test@test.ie');
    page.getNameTextbox().sendKeys('test');
    page.getUsernameTextbox().sendKeys('test');
    page.getPasswordTextbox().sendKeys('test');
    let form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-valid');
   });

  it('Post Should be Valid', () => {
    browser.get('http://localhost:4200/forum');
    page.getTitleTextbox().sendKeys('TestTitle');
    page.getContentTextbox().sendKeys('postContent');
    let form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
