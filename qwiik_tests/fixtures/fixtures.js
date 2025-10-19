import { test as base } from 'playwright-bdd';
import * as Pages from './pages'; //Dynamic import

const {LoginPage} = Pages;

const createTestFunction = (PageClass) => async ({page}, use) => {
    await use (new PageClass(page));
}

export const test = base.extend({
    loginPage: createTestFunction(LoginPage),
});